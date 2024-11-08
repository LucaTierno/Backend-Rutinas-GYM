
import prisma from "../lib/prisma";

const getUserById = async (id: string) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        routines: true,
        categoryPlans: true,
      }
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

const getUsers = async () => {
  try {
    const findUsers = await prisma.user.findMany({
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
    });
    if (!findUsers || findUsers.length === 0) {
      throw { status: 404, message: "No se encontró ningún usuario" };
    }

    const usersWithoutPasswords = findUsers.map(
      ({ password, ...user }) => user
    );

    // formateo de la data para que llegue mejor ordernada
    const formattedUsers = findUsers.map((user) => ({
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

    return formattedUsers;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener los usuarios" };
  }
};

const updateUserById = async (id: string, data: any) => {
  console.log("DATA RECIBIDA EN EL BACK", data);
  try {
    const findUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw { status: 400, message: "No se encontró el usuario" };
    }

    const { categoryPlans, routines, ...userData } = data;

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
