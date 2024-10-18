import { z } from "zod";

export const RegisterUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    age: z.number().nonnegative().max(100),
    email: z.string().email(),
    password: z.string(),
    phone: z.number().nonnegative(),
    phoneEmergency: z.number().nonnegative(),
    address: z.string().min(5),
  }),
});

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
