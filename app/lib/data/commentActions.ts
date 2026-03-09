"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { postComment } from "./comments";
import { isInvalidText, inputTooBig, inputTooSmall, textAreaInputTooBig } from "./actionsHelper";
import { Comment } from "../../../components/Comment/CommentForm/commentFormHelper";

export interface NewComment {
  date: Date;
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
  enteredValues?: {
    headline: string;
    author: string;
    comment: string;
  };
}

export const createNewComment = async (prevState: FormStateComment, commentData: Comment) => {
  const currentDate = new Date();
  const { headline, author, content: comment, image: imageFile } = commentData;

  const enteredValues = {
    headline,
    author,
    comment,
  };

  if (typeof headline !== "string" || typeof author !== "string" || typeof comment !== "string") {
    return {
      errors: {
        _form: "Bitte füllen Sie alle Pflichtfehler aus.",
      },
      enteredValues,
    };
  }
  if (isInvalidText(headline) || isInvalidText(author) || isInvalidText(comment)) {
    return {
      errors: {
        _form: "Ihre Eingaben müssen Text enthalten. Bitte versuchen Sie es nochmal.",
      },
      enteredValues,
    };
  }
  if (inputTooBig(headline) || inputTooBig(author)) {
    return {
      errors: {
        _form: "Eingabe zu groß (max. 50 Zeichen).",
      },
      enteredValues,
    };
  }
  if (inputTooSmall(headline) || inputTooSmall(author) || inputTooSmall(comment)) {
    return {
      errors: {
        _form: "Eingabe zu klein (min. 3 Zeichen).",
      },
      enteredValues,
    };
  }

  if (textAreaInputTooBig(comment)) {
    return {
      errors: {
        _form: "Eingabe zu groß (max. 500 Zeichen).",
      },
      enteredValues,
    };
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    const maxSize = 5 * 1024 * 1024; //5MB
    if (imageFile.size > maxSize) {
      return {
        errors: {
          image: "Bild zu groß. < 5MB erlaubt.",
        },
        enteredValues,
      };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      return {
        errors: {
          image: "Nur JPEG, PNG, WEBP oder JPG Files erlaubt.",
        },
        enteredValues,
      };
    }
  }

  try {
    const newComment: NewComment = {
      date: currentDate,
      headline: headline,
      author: author,
      content: comment,
      image: imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined,
    };
    await postComment(newComment);
  } catch (error) {
    return { errors: { _form: "Datenbankfehler. Bitte versuchen Sie es später noch einmal." } };
  }

  revalidatePath("/guestbook");
  redirect("/guestbook");
  return { errors: {} };
};
