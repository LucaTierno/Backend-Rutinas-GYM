import { RequestExt } from "../interfaces/requestExt.interface";
import prisma from "../lib/prisma";

const getUserById = async (id: string) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        routines: {
          include: {
            routineExercises: {
              include: {
                exercise: true,
              },
            },
          },
        },
        categoryPlans: {
          include: {
            categoryPlan: true,
          },
        },
      },
    });

    if (!getUser) {
      throw { status: 400, message: "No se encontró el usuario" };
    }

    const { password: _, ...userWithoutPassword } = getUser;

    return userWithoutPassword;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener el usuario." };
  }
};

const getUsers = async (req: RequestExt) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageInt = parseInt(page as string);
    const limitInt = parseInt(limit as string);
    const offset = (pageInt - 1) * limitInt;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: offset,
        take: limitInt,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          routines: true,
          categoryPlans: {
            include: {
              categoryPlan: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      prisma.user.count(), // Total de usuarios para calcular las páginas
    ]);

    if (!users || users.length === 0) {
      throw { status: 404, message: "No se encontró ningún usuario" };
    }

    const formattedUsers = users.map((user) => ({
      createAt: user.createdAt,
      updateAt: user.updatedAt,
      id: user.id,
      name: user.name,
      age: user.age,
      email: user.email,
      phone: user.phone,
      phoneEmergency: user.phoneEmergency,
      address: user.address,
      role: user.role,
      routines: user.routines,
      categoryPlans: user.categoryPlans.map((cp) => cp.categoryPlan.name),
    }));

    return {
      formattedUsers,
      total,
      page: pageInt,
      limit: limitInt,
      totalPages: Math.ceil(total / limitInt),
    };
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener los usuarios" };
  }
};

const updateUserById = async (id: string, data: any) => {
  try {
    const findUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw { status: 400, message: "No se encontró el usuario" };
    }

    const { categoryPlans, routines, ...userData } = data;

    // Verificar si el email ha cambiado y si ya está en uso
    if (userData.email && userData.email !== findUser.email) {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (existingEmail) {
        throw {
          status: 400,
          message: "El email ya está en uso por otro usuario",
        };
      }
    }

    // Si hay categoryPlans, actualizamos las relaciones
    if (categoryPlans && Array.isArray(categoryPlans)) {
      // Primero obtenemos los IDs de los planes por nombre
      const plansIds = await prisma.categoryPlan.findMany({
        where: {
          name: { in: categoryPlans },
        },
        select: { id: true },
      });

      // Eliminamos todas las relaciones existentes
      await prisma.userCategoryPlan.deleteMany({
        where: { userId: id },
      });

      // Solo creamos nuevas relaciones si se encontraron planes
      if (plansIds.length > 0) {
        const newCategoryPlans = plansIds.map((plan) => ({
          userId: id,
          categoryPlanId: plan.id,
        }));

        await prisma.userCategoryPlan.createMany({
          data: newCategoryPlans,
        });
      }
    }

    // Actualizamos el resto de los datos del usuario
    const updateUser = await prisma.user.update({
      where: { id },
      data: userData,
      include: {
        categoryPlans: {
          include: {
            categoryPlan: true,
          },
        },
      },
    });

    return updateUser;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 500,
      message: error.message || "Error al actualizar el usuario",
    };
  }
};

const deleteUserById = async (id: string) => {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!findUser) {
      throw { status: 400, message: "No se encontró el usuario" };
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!deleteUser) {
      throw { status: 400, message: "No se pudo eliminar el usuario" };
    }

    return deleteUser;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al eliminar el usuario" };
  }
};

export const userService = {
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
};
