import { useState } from "react";
import { addressSchema, catInfoSchema, roomSchema, firstDaySchema, lastDaySchema } from "./ZodSchema";

const initValidation = {
  room: "",
  startDate: "",
  endDate: "",
  firstName: "",
  lastName: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  city: "",
  email: "",
  phoneNumber: "",
  catAmount: "",
  medication: "",
  vaccination: "",
};

export const useBookingValidation = () => {
  const [validationErrors, setValidationErrors] = useState(initValidation);

  const validate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    let errorMessage = "";
    const contactFields = ["firstName", "lastName", "street", "houseNumber", "postalCode", "city", "email", "phoneNumber"];
    const catInfoFields = ["catAmount", "medication", "vaccination"];

    if (name === "room") {
      const result = roomSchema.safeParse(value);
      errorMessage = !result.success ? result.error.issues[0].message : "";
      setValidationErrors((prev) => ({ ...prev, [name]: errorMessage }));

      return;
    }

    if (name === "startDate" || name === "endDate") {
      const form = (event.target as HTMLInputElement).form;
      const firstVal = (form?.elements.namedItem("startDate") as HTMLInputElement)?.value;
      const lastVal = (form?.elements.namedItem("endDate") as HTMLInputElement)?.value;

      const firstResult = firstDaySchema.safeParse(firstVal);
      const lastResult = lastDaySchema.safeParse(lastVal);

      const firstErr = !firstResult.success ? firstResult.error.issues[0].message : "";
      let lastErr = !lastResult.success ? lastResult.error.issues[0].message : "";

      if (!firstErr && !lastErr && firstVal && lastVal) {
        const start = new Date(firstVal);
        const end = new Date(lastVal);
        if (end <= start) {
          lastErr = "Das Ende muss nach dem Start liegen.";
        } else if (Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) > 14) {
          lastErr = "Maximale Buchungsdauer beträgt 14 Tage";
        }
      }
      setValidationErrors((prev) => {
        return {
          ...prev,
          startDate: name === "startDate" || firstVal ? firstErr : prev.startDate,
          endDate: name === "endDate" || lastVal ? lastErr : prev.endDate,
        };
      });

      return;
    }

    if (contactFields.includes(name)) {
      const fieldName = name as keyof typeof addressSchema.shape;
      const result = addressSchema.shape[fieldName].safeParse(value);
      errorMessage = !result.success ? result.error.issues[0].message : "";
      setValidationErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    }

    if (catInfoFields.includes(name)) {
      const fieldName = name as keyof typeof catInfoSchema.shape;
      let validateValue: unknown = value;

      if (name === "catAmount") {
        validateValue = value === "" ? undefined : Number(value);
      } else if (name === "vaccination") {
        validateValue = (event.target as HTMLInputElement).checked;
      }

      const result = catInfoSchema.shape[fieldName].safeParse(validateValue);
      errorMessage = !result.success ? result.error.issues[0].message : "";
      setValidationErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    }
  };
  return { validationErrors, setValidationErrors, validate, initValidation };
};
