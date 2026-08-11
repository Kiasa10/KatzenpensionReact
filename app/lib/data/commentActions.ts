"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { postComment } from "./comments";
import { Comment } from "../../../components/Comment/CommentForm/commentFormHelper";

export interface NewComment {
  headline: string;
  author: string;
  content: string;
  image?: File;
}

export interface FormStateComment {
  errors: {
    image?: string;
    _form?: string;
  };
}

export const createNewComment = async (prevState: FormStateComment, commentData: Comment): Promise<FormStateComment> => {
  const { headline, author, content: comment, imageFile } = commentData;

  if (typeof headline !== "string" || typeof author !== "string" || typeof comment !== "string") {
    return {
      errors: {
        _form: "Bitte füllen Sie alle Pflichtfelder aus.",
      },
    };
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    const maxSize = 5 * 1024 * 1024; //5MB
    if (imageFile.size > maxSize) {
      return {
        errors: {
          image: "Bild zu groß. < 5MB erlaubt.",
        },
      };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/JPEG", "image/PNG", "image/JPG", "image/WEBP"];
    if (!allowedTypes.includes(imageFile.type)) {
      return {
        errors: {
          image: "Nur JPEG, PNG, WEBP oder JPG Files erlaubt.",
        },
      };
    }
  }

  try {
    const newComment: NewComment = {
      headline,
      author,
      content: comment,
      image: imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined,
    };

    await postComment(newComment);
  } catch (error) {
    return { errors: { _form: "Datenbankfehler. Bitte versuchen Sie es später noch einmal." } };
  }

  revalidatePath("/guestbook");
  redirect("/guestbook");

  //braucht man weil redirect kein FormStateComment zurückgibt
  return { errors: {} };
};
