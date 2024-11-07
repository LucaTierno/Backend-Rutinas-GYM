import { Response } from "express";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import prisma from "../lib/prisma";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async (data: User, res: Response) => {
  try {
    const {
      name,
      age,
      email,
      password,
      phone,
      phoneEmergency,
      address,
      categoryPlans: plansNames,
    } = data;

    const alreadyUser = await prisma.user.findFirst({ where: { email } });

    if (alreadyUser) {
      throw { status: 409, message: "El email ya está en uso" };
    }

    const passHash = await encrypt(password);

    const resCreate = await prisma.user.create({
      data: {
        name,
        age,
        email,
        password: passHash,
        phone,
        phoneEmergency,
        address,
        routines: {
          create: [
            { day: 'lunes' },
            { day: 'martes' },
            { day: 'miercoles' },
            { day: 'jueves' },
            { day: 'viernes' },
            { day: 'sabado' },
            { day: 'domingo' }
          ],
        },
      },
    });

    const plansIds = await prisma.categoryPlan.findMany({
      where: {
        name: { in: plansNames as unknown as string[] },
      },
      select: {
        id: true,
      },
    });

    const userCategoryPlans = plansIds.map((categoryPlan) => ({
      userId: resCreate.id,
      categoryPlanId: categoryPlan.id,
    }));

    await prisma.userCategoryPlan.createMany({
      data: userCategoryPlans,
    });

    const { password: _, ...user } = resCreate;

    return user;
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
      throw { status: 400, message: "Email incorrecto" };
    }

    const passwordHash = findUser.password;

    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) {
      throw { status: 401, message: "Contraseña incorrecta" };
    }

    const token = generateToken(findUser.id, findUser.email, findUser.name);

    const { password: _, ...user } = findUser;

    return { user, token };
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
