import { ReactNode } from "react";
import classes from "./pageError.module.css";

interface PageErrorProps {
  header: string;
  text: string;
  children?: ReactNode;
}

export default function PageError({ header, text, children }: PageErrorProps) {
  return (
    <div className={classes.error}>
      <h2>{header}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}
