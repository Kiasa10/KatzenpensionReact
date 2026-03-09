import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface Comments extends mongoose.Document<string> {
  date: Date;
  headline: string;
  author: string;
  content: string;
  image: string;
}

const CommentSchema = new Schema<Comments>({
  date: {
    type: Date,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export default models.Comment || model<Comments>("Comment", CommentSchema);
