import { User } from "../interfaces/user.interface";
import prisma from "../lib/prisma";

const createUser = async (data: User) => {
  try {
    const { name, age, email, password, phone, phoneEmergency, address } = data;

    const alreadyUser = await prisma.user.findFirst({ where: { email } });

    if (alreadyUser) {
      throw { status: 409, message: "El email ya está en uso" };
    }

    const resCreate = await prisma.user.create({
      data: {
        name,
        age,
        email,
        password,
        phone,
        phoneEmergency,
        address,
      },
    });

    return resCreate;
  } catch (error) {
    throw { status: 500, message: "Error al crear el usuario." };
  }
};

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

    return getUser;
  } catch (error) {
    throw { status: 500, message: "Error al obtener el usuario." };
  }
};

const getUsers = async () => {
  try {
    const findUsers = await prisma.user.findMany({});

    if (!findUsers) {
      throw { status: 400, message: "No se encontró ningún usuario" };
    }

    return findUsers;
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    throw { status: 500, message: "Error al eliminar el usuario" };
  }
};

export const userService = {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
};
