import dbConnect from "@/app/lib/mongodb";
import Booking, { Bookings } from "../models/booking";
import { NewBooking } from "./bookingsActions";

//für zukünftige funktionen (timeslot für raum x ist schon vergeben usw)
export async function getBookings() {
  dbConnect();
  const result = await Booking.find<Bookings>({});
  const bookings = result.map((doc) => {
    //JSON.parse(JSON.stringify()) to convert Mongoose documents to plain objects, as Next.js requires serializable data.
    const booking = JSON.parse(JSON.stringify(doc)) as Bookings;
    const book = {
      ...booking,
      firstDay: new Date(booking.firstDay),
      lastDay: new Date(booking.lastDay),
    };

    return book;
  });
  return bookings;
}

export async function postBooking(newBooking: NewBooking) {
  await dbConnect();
  const bookingToInsert = {
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

  await Booking.create(bookingToInsert);
}
