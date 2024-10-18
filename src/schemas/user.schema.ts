import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    age: z.number().nonnegative().min(7).max(17),
    email: z.string().email(),
    password: z.string(),
    phone: z.number().nonnegative().min(7).max(17),
    phoneEmergency: z.number().nonnegative().min(7).max(17),
    address: z.string().min(5),
  }),
});
