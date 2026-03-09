import { z } from "zod";
import { commentTextboxSchema, textInputSchema, imageSchema } from "@/app/lib/ZodSchema";

export const NewCommentSchema = z.object({
  headline: textInputSchema,
  author: textInputSchema,
  comment: commentTextboxSchema,
  image: imageSchema,
});
