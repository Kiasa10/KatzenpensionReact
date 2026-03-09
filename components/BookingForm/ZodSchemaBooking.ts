import { z } from "zod";
import { roomSchema, firstDaySchema, lastDaySchema, addressSchema, catInfoSchema, oneYearFromNow } from "@/app/lib/ZodSchema";

export const bookingSchema = z
  .object({
    room: roomSchema,
    firstDay: firstDaySchema,
    lastDay: lastDaySchema,
    contactInfo: addressSchema,
    catInfo: catInfoSchema,
  })
  .refine((data) => data.lastDay > data.firstDay, { message: "Das Enddatum muss nach dem Startdatum liegen.", path: ["lastDay"] })
  .refine(
    (data) => {
      const diffMs = data.lastDay.getTime() - data.firstDay.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      return diffDays <= 14;
    },
    { message: "Die maximale Buchungsdauer beträgt 14 Tage.", path: ["lastDay"] },
  )
  .refine((data) => data.lastDay <= oneYearFromNow, {
    message: "Datum kann höchstens ein Jahr in der Zukunft liegen",
    path: ["lastDay"],
  })
  .refine(
    (data) => {
      const start = new Date(data.firstDay).setHours(0, 0, 0, 0);
      const end = new Date(data.lastDay).setHours(0, 0, 0, 0);
      const oneDayMs = 1000 * 60 * 60 * 24;
      return end - start >= oneDayMs;
    },
    {
      message: "Min. Buchungsdauer ist 1 Nacht.",
      path: ["lastDay"],
    },
  );
