import { z } from "zod";


export const UpdateUserSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(20).optional(),
        age: z.number().nonnegative().max(100).optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        phone: z.number().nonnegative().optional(),
        phoneEmergency: z.number().nonnegative().optional(),
        address: z.string().min(5).optional(),
    }),
  });