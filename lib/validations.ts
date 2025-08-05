import { z } from "zod";

export const bookingSchema = z.object({
  date: z
    .string()
    .refine(
      (val) => /^\d{4}-\d{2}-\d{2}$/.test(val),
      "Date must be in YYYY-MM-DD format"
    )
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
});
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
export const roomSchema = z.object({
  name: z.string().min(2).max(50),
  capacity: z.string(),
  price: z.string(),
  description: z.string().min(10).max(200),
});
export const deleteSchema = z.object({
  confirmText: z.string().refine((val) => val === "DELETE", {
    message: "You must type 'delete' to confirm.",
  }),
});
