import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface Rooms extends mongoose.Document<string> {
  title: string;
  cost: string;
  imageUrl: string;
  descriptionShort: string;
  descriptionLong: string;
  catsPossible: number;
}

const RoomSchema = new Schema<Rooms>({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
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
  catsPossible: {
    type: Number,
    required: true,
  },
});

export default models.Room || model<Rooms>("Room", RoomSchema);
