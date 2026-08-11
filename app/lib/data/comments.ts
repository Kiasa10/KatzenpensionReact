"use server";

//import fs from "node:fs/promises";
import { NewComment } from "./commentActions";
//import { v4 as uuid } from "uuid";
import { put } from "@vercel/blob";

interface Comment {
  id: string;
  date: Date;
  headline: string;
  author: string;
  content: string;
  imagePath: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function getComments(page = 1, sortOrder: "asc" | "desc" = "asc", limit = 5) {
  const skip = (page - 1) * limit;
  //1 = old; -1 = new
  try {
    const response = await fetch(`${baseUrl}/Comment`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Error loading comments");
    }

    const allComments: Comment[] = await response.json();
    const mappedComments = allComments.map((c) => ({
      ...c,
      date: new Date(c.date),
    }));

    mappedComments.sort((a, b) => {
      const timeA = a.date.getTime();
      const timeB = b.date.getTime();
      return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });
    const paginatedComments = mappedComments.slice(skip, skip + limit);
    return paginatedComments;
  } catch (error) {
    console.error("Network error or server down: ", error);
    throw error;
  }
}

export const postComment = async (newComment: NewComment) => {
  let imagePath = "";
  if (newComment.image && typeof newComment.image === "object" && newComment.image.size > 0) {
    /*    
    const extension = newComment.image.name.split(".").pop();
    const fileName = `${uuid()}.${extension}`;
    const folderPath = "./public/userImages";
    const bufferedImage = await newComment.image.arrayBuffer();
    await fs.writeFile(`${folderPath}/${fileName}`, Buffer.from(bufferedImage));
    imagePath = `/userImages/${fileName}`;
    */

    //uploads directly to vercel blob
    const blob = await put(newComment.image.name, newComment.image, {
      access: "public",
    });
    //CDN-Url
    imagePath = blob.url;
  }

  const commentToSend = {
    headline: newComment.headline,
    author: newComment.author,
    content: newComment.content,
    imagePath: imagePath,
  };

  try {
    await fetch(`${baseUrl}/Comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToSend),
    });
  } catch (error) {
    console.error("Error post new comment ServerAction: ", error);
    throw error;
  }
};
