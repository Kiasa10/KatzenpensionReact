import mongoose from "mongoose";

const mongoURL = "mongodb://localhost:27017/reactKatzenpension";

async function dbConnect() {
  if (!mongoURL) {
    throw new Error("Mongo Url wrong");
  }
  await mongoose.connect(mongoURL);
  return mongoose;
}

export default dbConnect;
