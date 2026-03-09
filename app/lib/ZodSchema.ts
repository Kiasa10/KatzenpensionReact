import { z } from "zod";

const maxSize = 5 * 1024 * 1024; //5MB
const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const imageSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    if (!file || file.size === 0) return true;
    return file.size <= maxSize;
  }, "Das Bild muss kleiner als 5MB sein.")
  .refine((file) => {
    if (!file || file.size === 0) return true;
    return allowedTypes.includes(file.type);
  }, "Nur JPEG, PNG or JPG Files erlaubt.");

export const textInputSchema = z
  .string()
  .trim()
  .min(3, { message: "Pflichtfeld (min. 3 Zeichen)" })
  .max(50, { message: "Eingabe zu lang(max. 50 Zeichen)" });

const shortInputSchema = z.string().trim().min(1, { message: "Pflichtfeld" }).max(10, { message: "Eingabe zu lang (max 10 Zeichen)" });

export const commentTextboxSchema = z
  .string()
  .trim()
  .min(3, { message: "Die Eingabe muss mind. 3 Zeichen lang sein" })
  .max(500, { message: "Eingabe zu lang(max. 500 Zeichen)" });

const bookingTextboxSchema = z
  .string()
  .trim()
  .min(3, { message: "Die Eingabe muss mind. 3 Zeichen lang sein" })
  .max(500, { message: "Eingabe zu lang(max. 500 Zeichen)" })
  .or(z.literal(""))
  .optional();

const vaccinationSchema = z
  .preprocess((val) => {
    if (val === "on" || val === "true") return true;
    if (val === "off" || val === "false") return false;
    return val;
  }, z.boolean())
  .refine((val) => val === true, {
    message: "Ihre Katze muss die erforderten Impfungen erhalten haben.",
  });

const today = new Date();
today.setHours(0, 0, 0, 0);
export const oneYearFromNow = new Date();
oneYearFromNow.setDate(oneYearFromNow.getDate() + 365);

export const firstDaySchema = z.coerce
  .date({ message: "Wählen Sie ein Startdatum" })
  .refine((d) => d >= today, {
    message: "Datum kann höchstens ein Jahr in der Zukunft liegen.",
  })
  .refine((d) => d <= oneYearFromNow, {
    message: "Datum darf maximal ein Jahr in der Zukunft liegen",
  });

export const lastDaySchema = z.coerce.date({ message: "Wählen Sie ein Enddatum" });

const allowedRooms = ["commonRoom", "singleRoom", "doubleRoom", "suite", "lakeView", "mountainView"] as const;

export const roomSchema = z.enum(allowedRooms, {
  message: "Bitte wählen Sie einen Raum aus der Liste aus.",
});

const catAmountSchema = z
  .number("Bitte wählen Sie eine Katzenanzahl aus der Liste aus.")
  .min(1, "Mindestens eine Katze")
  .max(4, "Maximal vier Katzen");

const emailSchema = z
  .string()
  .trim()
  .min(5, "E-Mail zu kurz (min. 5 Zeichen)")
  .max(50, "E-Mail zu lang (max. 50 Zeichen)")
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Bitte geben Sie eine gültige E-Mail Adresse an",
  });

export const addressSchema = z.object({
  firstName: textInputSchema,
  lastName: textInputSchema,
  street: textInputSchema,
  houseNumber: shortInputSchema,
  postalCode: shortInputSchema,
  city: textInputSchema,
  email: emailSchema,
  phoneNumber: textInputSchema,
});

export const catInfoSchema = z.object({
  catAmount: catAmountSchema,
  medication: bookingTextboxSchema,
  vaccination: vaccinationSchema,
});
