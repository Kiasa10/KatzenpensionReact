"use server";

import { postBooking } from "./bookings";
import { isInvalidText, inputTooBig, inputTooSmall, smallInputTooBig, textAreaInputTooBig } from "./actionsHelper";
import { Booking } from "../../../components/BookingForm/bookingFormHelper";

export interface NewBooking {
  room: string;
  firstDay: Date;
  lastDay: Date;
  contactInfo: {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    email: string;
    phoneNumber: string;
  };
  catInfo: {
    catAmount: number;
    medication: string;
    vaccination: boolean;
  };
}

export interface FormStateBooking {
  errors: {
    dates?: string;
    room?: string;
    catAmount?: string;
    _form?: string;
  };
  enteredValues?: {
    room: string;
    firstDayRaw: string;
    lastDayRaw: string;
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    email: string;
    phoneNumber: string;
    catAmount: number;
    medication: string;
    vaccination: boolean;
  };
  success?: boolean;
}

export const createNewBooking = async (prevState: FormStateBooking, booking: Booking): Promise<FormStateBooking> => {
  const { room, firstDayRaw, lastDayRaw } = booking;
  const { firstName, lastName, street, houseNumber, postalCode, city, email, phoneNumber } = booking.contactInfo;
  const { catAmount, medication, vaccination } = booking.catInfo;

  const enteredValues = {
    room,
    firstDayRaw,
    lastDayRaw,
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    email,
    phoneNumber,
    catAmount,
    medication,
    vaccination,
  };

  const oneYearFromNow = new Date();
  oneYearFromNow.setDate(oneYearFromNow.getDate() + 365);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(firstDayRaw);
  firstDay.setHours(0, 0, 0, 0);
  const lastDay = new Date(lastDayRaw);
  lastDay.setHours(0, 0, 0, 0);
  const diffMs = lastDay.getTime() - firstDay.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (firstDay < today) {
    return {
      errors: {
        dates: "Das Startdatum darf nicht in der Vergangenheit liegen.",
      },
      enteredValues,
    };
  }
  if (lastDay <= firstDay) {
    return {
      errors: {
        dates: "Das Enddatum muss nach dem Startdatum liegen.",
      },
      enteredValues,
    };
  }
  if (firstDay > oneYearFromNow || lastDay > oneYearFromNow) {
    return {
      errors: {
        dates: "Das Start- und Enddatum kann höchstens ein Jahr in der Zukunft liegen",
      },
      enteredValues,
    };
  }

  if (diffDays > 14) {
    return {
      errors: {
        dates: "Die maximale Buchungsdauer beträgt 14 Tage.",
      },
      enteredValues,
    };
  }

  const allowedRooms = ["commonRoom", "singleRoom", "doubleRoom", "suite", "lakeView", "mountainView"];
  if (!allowedRooms.includes(room)) {
    return {
      errors: {
        room: "Bitte wählen Sie einen gültigen Raum aus der Liste.",
      },
      enteredValues,
    };
  }

  if (
    isInvalidText(firstName) ||
    isInvalidText(lastName) ||
    isInvalidText(street) ||
    isInvalidText(houseNumber) ||
    isInvalidText(postalCode) ||
    isInvalidText(city) ||
    isInvalidText(email) ||
    isInvalidText(phoneNumber)
  ) {
    return {
      errors: {
        _form: "Ihre Eingaben müssen Text enthalten. Bitte versuchen Sie es nochmal.",
      },
      enteredValues,
    };
  }

  if (
    !room ||
    !firstDayRaw ||
    !lastDayRaw ||
    !firstName ||
    !lastName ||
    !street ||
    !houseNumber ||
    !postalCode ||
    !city ||
    !email ||
    !phoneNumber ||
    !catAmount ||
    !vaccination
  ) {
    return {
      errors: {
        _form: "Pflichtfelder fehlen",
      },
      enteredValues,
    };
  }

  if (inputTooBig(firstName) || inputTooBig(lastName) || inputTooBig(street) || inputTooBig(city) || inputTooBig(email) || inputTooBig(phoneNumber)) {
    return {
      errors: {
        _form: "Eingabe zu groß (max. 50 Zeichen).",
      },
      enteredValues,
    };
  }

  if (
    inputTooSmall(firstName) ||
    inputTooSmall(lastName) ||
    inputTooSmall(street) ||
    inputTooSmall(city) ||
    inputTooSmall(email) ||
    inputTooSmall(phoneNumber)
  ) {
    return {
      errors: {
        _form: "Eingabe zu klein (min. 3 Zeichen).",
      },
      enteredValues,
    };
  }

  if (smallInputTooBig(houseNumber) || smallInputTooBig(postalCode)) {
    return {
      errors: {
        _form: "Eingabe zu groß (max. 10 Zeichen).",
      },
      enteredValues,
    };
  }

  if (textAreaInputTooBig(medication)) {
    return {
      errors: {
        _form: "Eingabe zu groß (max. 500 Zeichen).",
      },
      enteredValues,
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      errors: {
        _form: "Bitte gültige E-Mail-Adresse eingeben",
      },
      enteredValues,
    };
  }

  if (isNaN(catAmount) || catAmount < 1) {
    return {
      errors: {
        catAmount: "Es muss mindestens eine Katze sein.",
      },
      enteredValues,
      success: false,
    };
  } else if (catAmount > 4) {
    return {
      errors: {
        catAmount: "Es können maximal vier Katzen abgegeben werden.",
      },
      enteredValues,
    };
  }

  try {
    const newBooking: NewBooking = {
      room,
      firstDay,
      lastDay,
      contactInfo: {
        firstName,
        lastName,
        street,
        houseNumber,
        postalCode,
        city,
        email,
        phoneNumber,
      },
      catInfo: {
        catAmount,
        medication,
        vaccination,
      },
    };
    await postBooking(newBooking);
    return {
      errors: {},
      success: true,
      enteredValues: undefined,
    };
  } catch (error) {
    return { errors: { _form: "Datenbankfehler. Bitte versuchen Sie es später noch einmal." }, enteredValues, success: false };
  }
};
