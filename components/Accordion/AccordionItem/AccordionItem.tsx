import { ReactNode } from "react";
import classes from "./accordionItem.module.css";

interface AccordionProps {
  handleClick: () => void;
  title: string;
  content: ReactNode;
  open: boolean;
}

export default function AccordionItem({ handleClick, title, content, open }: AccordionProps) {
  return (
    <li className={classes.titles} onClick={handleClick}>
      <div className={classes.title}>{title}</div>
      {open ? <div className={classes.content}>{content}</div> : ""}
    </li>
  );
}
