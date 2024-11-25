import { CategoryPlan } from "../interfaces/categoryPlan.interface";
import prisma from "../lib/prisma";

//* Crear plan de entrenamiento
const createCategoryPlan = async (data: CategoryPlan) => {
  try {
    const resCreate = await prisma.categoryPlan.create({ data });

    return resCreate;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw { status: 409, message: "El plan de entrenamiento ya existe." };
    }

    throw { status: 500, message: "Error al crear el plan de entrenamiento." };
  }
};

//* Obtener todos los planes de entrenamiento
const getCategoryPlans = async () => {
  try {
    const findCategoryPlans = await prisma.categoryPlan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!findCategoryPlans || findCategoryPlans.length === 0) {
      throw {
        status: 404,
        message: "No se encontró ningún plan de entrenamiento",
      };
    }

    return findCategoryPlans;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 500,
      message: "Error al obtener los planes de entrenamiento",
    };
  }
};

export const categoryPlanService = {
  createCategoryPlan,
  getCategoryPlans,
};
