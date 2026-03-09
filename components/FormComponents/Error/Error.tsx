import classes from "./error.module.css";

interface ErrorProps {
  error: string;
}
export default function Error({ error }: ErrorProps) {
  return <p className={classes.errorMessage}>{error}</p>;
}
