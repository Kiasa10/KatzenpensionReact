import classes from "./buttonlink.module.css";
import { ReactNode } from "react";
import Link from "next/link";

interface BaseProps {
  children: ReactNode;
  onClick?: () => void;
}

interface ButtonProps extends BaseProps {
  isLink?: false;
  href?: never;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

interface LinkProps extends BaseProps {
  isLink: true;
  href: string;
}

type ButtonLinkProps = ButtonProps | LinkProps;

export default function ButtonLink(props: ButtonLinkProps) {
  if (props.isLink) {
    return (
      <Link className={classes.buttonlink} href={props.href} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }
  return (
    <button disabled={props.disabled} className={classes.buttonlink} type={props.type || "button"} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
