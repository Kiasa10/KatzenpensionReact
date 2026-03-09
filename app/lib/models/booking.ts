import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface Bookings extends mongoose.Document<string> {
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

const BookingSchema = new Schema<Bookings>({
  room: {
    type: String,
    required: true,
  },
  firstDay: {
    type: Date,
    required: true,
  },
  lastDay: {
    type: Date,
    required: true,
  },
  contactInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  catInfo: {
    catAmount: {
      type: Number,
      required: true,
    },
    medication: {
      type: String,
      required: false,
    },
    vaccination: {
      type: Boolean,
      required: true,
    },
  },
});

export default models.Booking || model<Bookings>("Booking", BookingSchema);
