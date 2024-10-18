import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import prisma from "../lib/prisma";
import { encrypt, verified } from "../utils/bcrypt.handle";

const registerNewUser = async (data: User) => {
  try {
    const { name, age, email, password, phone, phoneEmergency, address } = data;

    const alreadyUser = await prisma.user.findFirst({ where: { email } });

    const passHash = await encrypt(password);

    if (alreadyUser) {
      throw { status: 409, message: "El email ya está en uso" };
    }

    const resCreate = await prisma.user.create({
      data: {
        name,
        age,
        email,
        password: passHash,
        phone,
        phoneEmergency,
        address,
      },
    });

    const { password: _, ...userWithoutPassword } = resCreate;

    return userWithoutPassword;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }

    throw { status: 500, message: "Error al crear el usuario." };
  }
};

const loginUser = async (data: Auth) => {
  try {
    const { password, email } = data;

    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw { status: 400, message: "No se encotró el usuario" };
    }

    const passwordHash = findUser.password;

    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) {
      throw { status: 401, message: "Contraseña incorrecta" };
    }

    const { password: _, ...userWithoutPassword } = findUser;

    return userWithoutPassword;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }

    throw { status: 500, message: "Error al iniciar sesion." };
  }
};

export const authService = {
  registerNewUser,
  loginUser,
};
