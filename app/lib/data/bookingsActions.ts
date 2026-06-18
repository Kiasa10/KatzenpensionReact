"use server";

import { postBooking } from "./bookings";
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
    _form?: string;
  };
  success?: boolean;
}

export const createNewBooking = async (prevState: FormStateBooking, booking: Booking): Promise<FormStateBooking> => {
  const firstDay = new Date(booking.firstDayRaw);
  const lastDay = new Date(booking.lastDayRaw);

  const { room } = booking;
  const { firstName, lastName, street, houseNumber, postalCode, city, email, phoneNumber } = booking.contactInfo;
  const { catAmount, medication, vaccination } = booking.catInfo;

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
    };
  } catch (error) {
    return {
      errors: { _form: "Datenbankfehler oder API-Verbindungsfehler aufgetreten." },
      success: false,
    };
  }
};
