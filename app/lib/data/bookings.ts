import { NewBooking } from "./bookingsActions";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const postBooking = async (newBooking: NewBooking) => {
  const bookingToSend = {
    room: newBooking.room,
    firstDay: newBooking.firstDay,
    lastDay: newBooking.lastDay,
    contactInfo: {
      firstName: newBooking.contactInfo.firstName,
      lastName: newBooking.contactInfo.lastName,
      street: newBooking.contactInfo.street,
      houseNumber: newBooking.contactInfo.houseNumber,
      postalCode: newBooking.contactInfo.postalCode,
      city: newBooking.contactInfo.city,
      email: newBooking.contactInfo.email,
      phoneNumber: newBooking.contactInfo.phoneNumber,
    },
    catInfo: {
      catAmount: newBooking.catInfo.catAmount,
      medication: newBooking.catInfo.medication,
      vaccination: newBooking.catInfo.vaccination,
    },
  };

  try {
    await fetch(`${baseUrl}/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingToSend),
    });
  } catch (error) {
    console.error("Error at post-request booking: ", error);
  }
};
