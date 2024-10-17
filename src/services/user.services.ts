import { User } from "../interfaces/user.interface";
import prisma from "../lib/prisma";

const createUser = async (data: User) => {
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

  return {
    success: true,
    message: "Usuario creado exitosamente",
    user: resCreate,
  };
};

const getUserById = async (id: string) => {
  console.log(id);

  const getUser = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!getUser) {
    throw { status: 400, message: "No se encontró el usuario" };
  }

  return {
    success: true,
    message: "Usuario encontrado exitosamente",
    user: getUser,
  };
};

const getUsers = async () => {
  const findUsers = await prisma.user.findMany({});

  if (!findUsers) {
    throw { status: 400, message: "No se encontró ningún usuario" };
  }

  return {
    success: true,
    message: "Usuarios encontrados exitosamente",
    user: findUsers,
  };
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

  return {
    success: true,
    message: "Usuario actualizado exitosamente",
    user: updateUser,
  };
};

const deleteUserById = async (id: string) => {
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

  return {
    success: true,
    message: "Usuario eliminado exitosamente",
    user: deleteUser,
  };
};

export const userService = {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
};
