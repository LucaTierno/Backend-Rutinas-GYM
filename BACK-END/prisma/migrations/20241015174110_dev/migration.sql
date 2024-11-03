-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('pecho', 'espalda', 'hombros', 'biceps', 'triceps', 'cuadriceps', 'isquiotibiales', 'gluteos', 'pantorrillas', 'abdominales', 'trapecio', 'antebrazos', 'oblicuos');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COACH', 'CLIENT');

-- CreateTable
CREATE TABLE "CategoryPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "muscleGroups" "MuscleGroup"[],

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "day" "Day" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineExercises" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "time" DOUBLE PRECISION,
    "comment" TEXT,
    "exercisesId" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,

    CONSTRAINT "RoutineExercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "phoneEmergency" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryPlan_name_key" ON "CategoryPlan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercises" ADD CONSTRAINT "RoutineExercises_exercisesId_fkey" FOREIGN KEY ("exercisesId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercises" ADD CONSTRAINT "RoutineExercises_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
