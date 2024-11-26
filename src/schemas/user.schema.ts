import { z } from "zod";

export const UpdateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .max(20, { message: "El nombre no puede tener más de 20 caracteres" })
      .optional(),
    age: z
      .number({ invalid_type_error: "La edad debe ser un número" })
      .nonnegative({ message: "La edad no puede ser negativa" })
      .max(100, { message: "La edad no puede ser mayor a 100 años" })
      .optional(),
    email: z
      .string()
      .email({ message: "El correo electrónico no tiene un formato válido" })
      .optional(),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .optional(),
    phone: z
      .number({ invalid_type_error: "El teléfono debe ser un número" })
      .nonnegative({ message: "El teléfono no puede ser negativo" })
      .optional(),
    phoneEmergency: z
      .number({
        invalid_type_error: "El teléfono de emergencia debe ser un número",
      })
      .nonnegative({
        message: "El teléfono de emergencia no puede ser negativo",
      })
      .optional(),
    address: z
      .string()
      .min(5, { message: "La dirección debe tener al menos 5 caracteres" })
      .optional(),
  }),
});
