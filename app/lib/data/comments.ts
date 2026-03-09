//server action -> nextJS uses secure HTTP-Request instead of trying to execute Mongoose in the browser
"use server";
import dbConnect from "@/app/lib/mongodb";
import fs from "node:fs/promises";
import Comment, { Comments } from "../models/comment";
import { NewComment } from "./commentActions";
import { v4 as uuid } from "uuid";

interface CommentAfterParse {
  _id: string;
  date: string;
  headline: string;
  author: string;
  content: string;
  imageSrc: string;
}

export async function getComments(page = 1, sortOrder: "asc" | "desc" = "asc", limit = 5) {
  await dbConnect();
  const skip = (page - 1) * limit;
  //1 = old; -1 = new
  const result = await Comment.find<Comments>({})
    .sort({ date: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);
  const comments = result.map((doc) => {
    //JSON.parse(JSON.stringify()) to convert Mongoose documents to plain objects, as Next.js requires serializable data.
    const comment = JSON.parse(JSON.stringify(doc)) as CommentAfterParse;

    const com = {
      ...comment,
      date: new Date(comment.date),
    };

    return com;
  });
  return comments;
}

export const postComment = async (newComment: NewComment) => {
  await dbConnect();
  let imagePath = "";

  if (newComment.image) {
    const extension = newComment.image.name.split(".").pop();
    const fileName = `${uuid()}.${extension}`;
    const folderPath = "./public/userImages";
    const bufferedImage = await newComment.image.arrayBuffer();
    await fs.writeFile(`${folderPath}/${fileName}`, Buffer.from(bufferedImage));
    imagePath = `/userImages/${fileName}`;
  }
  const commentToInsert = {
    date: newComment.date,
    headline: newComment.headline,
    author: newComment.author,
    content: newComment.content,
    image: imagePath,
  };

  await Comment.create(commentToInsert);
};
