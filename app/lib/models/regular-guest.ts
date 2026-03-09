import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface Guest extends mongoose.Document<string> {
  name: string;
  age: number;
  imageUrl: string;
  descriptionShort: string;
  descriptionLong: string;
}

const RegularGuestSchema = new Schema<Guest>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  descriptionShort: {
    type: String,
    required: true,
  },
  descriptionLong: {
    type: String,
    required: true,
  },
});

export default models.RegularGuest || model<Guest>("RegularGuest", RegularGuestSchema);
