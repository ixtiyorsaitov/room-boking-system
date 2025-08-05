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
