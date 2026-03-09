import classes from "./comment.module.css";
import Image from "next/image";

interface CommentProps {
  comment: {
    date: Date;
    headline: string;
    author: string;
    content: string;
    imageSrc?: string;
  };
}

export default function Comment(props: CommentProps) {
  const { date, headline, author, content, imageSrc } = props.comment;
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(newDate);
  return (
    <article className={classes.comment}>
      {imageSrc && (
        <div className={classes.commentImageContainer}>
          <Image src={imageSrc} alt="Bild eines Kommentares" className={classes.commentImage} fill />
        </div>
      )}
      <h3 className={classes.commentTitle}>{headline}</h3>
      <div className={classes.commentCreation}>
        <p className={classes.commentAuthAndTime}>
          <span>{author}</span> am <time>{formattedDate}</time>
        </p>
      </div>
      <p className={classes.commentText}>{content}</p>
    </article>
  );
}
