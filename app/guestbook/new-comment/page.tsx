import classes from "./page.module.css";
import CommentForm from "@/components/Comment/CommentForm/CommentForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import FormWrapper from "@/components/FormWrapper/FormWrapper";

export default function NewComment() {
  return (
    <FormWrapper>
      <div className={classes.createCommentContainer}>
        <PageHeader>
          <span className={classes.commentFormHeader}>Kommentar erstellen</span>
        </PageHeader>
        <CommentForm />
      </div>
    </FormWrapper>
  );
}
