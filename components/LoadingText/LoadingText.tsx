import classes from "./loadingText.module.css";

interface LoadingTextProps {
  text: string;
}

export default function LoadingText({ text }: LoadingTextProps) {
  return <p className={classes.loadingText}>{text}</p>;
}
