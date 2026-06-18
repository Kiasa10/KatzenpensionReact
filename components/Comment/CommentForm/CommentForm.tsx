"use client";
import classes from "./commentForm.module.css";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import ImagePicker from "@/components/FormComponents/ImagePicker/ImagePicker";
import { createNewComment } from "@/app/lib/data/commentActions";
import { useActionState, useState } from "react";
import RequiredText from "@/components/FormComponents/RequiredText/RequiredText";
import Input from "@/components/FormComponents/Input/Input";
import FormRowItem from "@/components/FormComponents/FormRowItem/FormRowItem";
import Textarea from "@/components/FormComponents/TextArea/TextArea";
import FormRow from "@/components/FormComponents/FormRow/FormRow";
import FormControls from "@/components/FormComponents/FormControls/FormControls";
import { NewCommentSchema } from "./ZodSchemaComment";
import { Comment } from "@/components/Comment/CommentForm/commentFormHelper";
import z from "zod";

interface LocalCommentState {
  headline: string;
  author: string;
  comment: string;
  imageFile: File | undefined;
}

interface ValidationErrors {
  headline: string;
  author: string;
  comment: string;
  imageFile: string;
}

const initialFormState: LocalCommentState = {
  headline: "",
  author: "",
  comment: "",
  imageFile: undefined,
};

export default function CommentForm() {
  const [state, dispatch, isPending] = useActionState(createNewComment, { errors: {} });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({ headline: "", author: "", comment: "", imageFile: "" });
  const [formValues, setFormValues] = useState<LocalCommentState>(initialFormState);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    setValidationErrors((prev) => {
      const hasMinThreeChars = ["headline", "author", "comment"].includes(name);
      if (hasMinThreeChars && value.trim().length >= 3) {
        return { ...prev, [name]: "" };
      }
      return prev;
    });
  };

  const handleImageChange = (file: File | undefined) => {
    setFormValues((prev) => ({ ...prev, imageFile: file }));
  };

  const validate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    let errorMessage = "";

    const result = NewCommentSchema.safeParse({
      headline: name === "headline" ? value : formValues.headline,
      author: name === "author" ? value : formValues.author,
      comment: name === "comment" ? value : formValues.comment,
      imageFile: formValues.imageFile,
    });

    if (!result.success) {
      const treefieldErrors = z.treeifyError(result.error);
      const fieldname = name as keyof ValidationErrors;
      errorMessage = treefieldErrors.properties?.[fieldname]?.errors[0] || "";
    }
    setValidationErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const backendMsg = state.errors?._form;
  const msgPlace = backendMsg ? <p className={classes.backendError}>{backendMsg}</p> : <p className={classes.placeholder}>Placeholder</p>;

  const formAction = () => {
    const dataToValidate = {
      headline: formValues.headline,
      author: formValues.author,
      comment: formValues.comment,
      imageFile: formValues.imageFile,
    };

    const result = NewCommentSchema.safeParse(dataToValidate);

    if (!result.success) {
      const treefieldErrors = z.treeifyError(result.error);

      setValidationErrors({
        headline: treefieldErrors.properties?.headline?.errors[0] || "",
        author: treefieldErrors.properties?.author?.errors[0] || "",
        comment: treefieldErrors.properties?.comment?.errors[0] || "",
        imageFile: treefieldErrors.properties?.imageFile?.errors[0] || "",
      });
      return;
    }
    const payload: Comment = {
      headline: formValues.headline,
      author: formValues.author,
      content: formValues.comment,
      imageFile: formValues.imageFile,
    };

    dispatch(payload);
  };

  return (
    <form action={formAction} className={classes.createCommentForm}>
      <FormRow>
        <FormRowItem>
          <Input
            name="headline"
            label="Überschrift *"
            type="text"
            value={formValues.headline}
            onChange={handleFieldChange}
            onBlur={validate}
            error={validationErrors.headline}
            isComment
            required
          />
        </FormRowItem>
        <FormRowItem>
          <Input
            name="author"
            label="Autor *"
            type="text"
            value={formValues.author}
            onChange={handleFieldChange}
            onBlur={validate}
            error={validationErrors.author}
            isComment
            required
          />
        </FormRowItem>
      </FormRow>
      <FormRowItem>
        <Textarea
          name="comment"
          label="Kommentar *"
          required
          value={formValues.comment}
          onChange={handleFieldChange}
          onBlur={validate}
          error={validationErrors.comment}
          isComment
        />
      </FormRowItem>
      <ImagePicker
        key={state.errors?.image ? `reset-${state.errors.image}` : "reset"}
        label="Foto-Upload"
        name="image"
        onChange={handleImageChange}
        error={validationErrors.imageFile || state.errors?.image}
      />
      <RequiredText />
      {msgPlace}
      <FormControls>
        <ButtonLink isLink href="/guestbook">
          Abbrechen
        </ButtonLink>
        <ButtonLink disabled={isPending} type="submit">
          {isPending ? "Speichert..." : "Speichern"}
        </ButtonLink>
      </FormControls>
    </form>
  );
}
