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
import { transformFormDataToPlainObject } from "@/components/Comment/CommentForm/commentFormHelper";
import z from "zod";

interface ValidationErrors {
  headline: string;
  author: string;
  comment: string;
  image?: string;
}

export default function CommentForm() {
  const [state, dispatch, isPending] = useActionState(createNewComment, { errors: {} });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({ headline: "", author: "", comment: "", image: "" });

  const backendMsg = state.errors?._form || state.errors?.image;
  let msgPlace;
  if (backendMsg) {
    msgPlace = <p className={classes.backendError}>{backendMsg}</p>;
  } else {
    msgPlace = <p className={classes.placeholder}>Placeholder</p>;
  }

  const formAction = (formData: FormData) => {
    const transformedData = transformFormDataToPlainObject(formData);
    const result = NewCommentSchema.safeParse(transformedData);

    if (!result.success) {
      const treefieldErrors = z.treeifyError(result.error);

      setValidationErrors({
        headline: treefieldErrors.properties?.headline?.errors[0] || "",
        author: treefieldErrors.properties?.author?.errors[0] || "",
        comment: treefieldErrors.properties?.comment?.errors[0] || "",
        image: treefieldErrors.properties?.image?.errors[0] || "",
      });
    }
    dispatch(transformedData);
  };

  const validate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    let errorMessage = "";

    const result = NewCommentSchema.safeParse({ [name]: value });
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

  return (
    <form action={formAction} className={classes.createCommentForm}>
      <FormRow>
        <FormRowItem>
          <Input
            name="headline"
            label="Überschrift *"
            type="text"
            defValue={state.enteredValues?.headline}
            onBlur={validate}
            error={validationErrors.headline}
            isComment
            required
          />
        </FormRowItem>
        <FormRowItem>
          <Input
            name="author"
            label="Author *"
            type="text"
            defValue={state.enteredValues?.author}
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
          defValue={state.enteredValues?.comment}
          onBlur={validate}
          error={validationErrors.comment}
          isComment
        />
      </FormRowItem>
      <ImagePicker
        key={state.errors?.image ? `reset-${state.errors.image}` : "reset"}
        label="Foto-Upload"
        name="image"
        onBlur={validate}
        error={state.errors?.image}
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
