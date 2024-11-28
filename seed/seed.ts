import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Primero limpiamos los datos existentes
  await prisma.userCategoryPlan.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.categoryPlan.deleteMany({});

  // Crear CategoryPlans
  const categoryPlans = await prisma.categoryPlan.createMany({
    data: [
      { name: "Aeróbico" },
      { name: "Fuerza" },
      { name: "Resistencia" },
      { name: "Funcional" },
      { name: "Musculación" },
      { name: "Recuperación" },
      { name: "Déficit" },
    ],
  });

  // Crear usuario Admin
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.create({
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
  const coach = await prisma.user.create({
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

  console.log("Seeding completed!");
  console.log("Created CategoryPlans:", categoryPlans);
  console.log("Created Users:", { admin, coach });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
