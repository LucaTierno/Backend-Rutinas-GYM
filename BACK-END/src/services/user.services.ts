import prisma from "../lib/prisma";

const getUserById = async (id: string) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id,
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

const getUsers = async () => {
  try {
    const findUsers = await prisma.user.findMany({
      include: {
        routine: true,
        categoryPlan: true,
      },
    });

    if (!findUsers || findUsers.length === 0) {
      throw { status: 404, message: "No se encontró ningún usuario" };
    }

    const usersWithoutPasswords = findUsers.map(
      ({ password, ...user }) => user
    );

    return usersWithoutPasswords;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener los usuarios" };
  }
};

type UpdateUserData = {
  address?: string;
  age?: number;
  email?: string;
  name?: string;
  phone?: number;
  phoneEmergency?: number;
};

const updateUserById = async (id: string, data: UpdateUserData) => {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!findUser) {
      throw { status: 400, message: "No se encontró el usuario" };
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    if (!updateUser) {
      throw { status: 400, message: "No se pudo actualizar el usuario" };
    }

    return updateUser;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al actualizar el usuario" };
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
