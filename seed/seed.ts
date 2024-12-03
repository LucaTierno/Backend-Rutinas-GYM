import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Primero limpiamos los datos existentes
  await prisma.userCategoryPlan.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.categoryPlan.deleteMany({});
  await prisma.exercise.deleteMany({});

  // Crear CategoryPlans
  await prisma.categoryPlan.createMany({
    data: [
      { name: "Fuerza" },
      { name: "Resistencia" },
      { name: "Funcional" },
      { name: "Musculación" },
      { name: "CrossFit" },
      { name: "Cardio" },
      { name: "Pilates" },
      { name: "Yoga" },
      { name: "Boxeo" },
    ],
  });

  // Obtener todos los categoryPlans creados
  const plans = await prisma.categoryPlan.findMany();

  // Crear usuario Admin
  const adminPassword = await hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin User",
      age: 30,
      email: "admin@gym.com",
      password: adminPassword,
      phone: 1234567890,
      phoneEmergency: 9876543210,
      address: "Calle Admin 123",
      role: "ADMIN",
    },
  });

  // Crear usuario Coach
  const coachPassword = await hash("coach123", 10);
  await prisma.user.create({
    data: {
      name: "Coach User",
      age: 28,
      email: "coach@gym.com",
      password: coachPassword,
      phone: 2345678901,
      phoneEmergency: 8765432109,
      address: "Calle Coach 456",
      role: "COACH",
    },
  });

  // Crear usuarios CLIENT y asignarles un CategoryPlan
  for (let i = 1; i <= 20; i++) {
    const userPassword = await hash(`password${i}`, 10);

    await prisma.user.create({
      data: {
        name: `Usuario ${i}`,
        age: 20 + i, // Edades entre 21 y 40
        email: `usuario${i}@gym.com`,
        password: userPassword,
        phone: 1000000000 + i, // Números de teléfono únicos
        phoneEmergency: 2000000000 + i, // Números de emergencia únicos
        address: `Calle Fitness ${i}`,
        role: "CLIENT",
        routines: {
          create: [
            { day: "lunes" },
            { day: "martes" },
            { day: "miercoles" },
            { day: "jueves" },
            { day: "viernes" },
            { day: "sabado" },
            { day: "domingo" },
          ],
        },
        categoryPlans: {
          create: {
            categoryPlanId: plans[i % plans.length].id, // Asignar un CategoryPlan rotativo
          },
        },
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
