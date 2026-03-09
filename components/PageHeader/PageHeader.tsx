import { ReactNode } from "react";
import classes from "./pageHeader.module.css";

interface PageHeaderProps {
  children: ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <header>
      <h1 className={classes.h1}>{children}</h1>
    </header>
  );
}
