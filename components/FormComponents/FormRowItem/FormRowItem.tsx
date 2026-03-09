import classes from "./formRowItem.module.css";

interface FormRowItemProps {
  children: React.ReactNode;
  fixedSize?: boolean;
}

export default function FormRowItem({ children, fixedSize }: FormRowItemProps) {
  return <div className={fixedSize ? `${classes.formRowItem} ${classes.fixedSize}` : classes.formRowItem}>{children}</div>;
}
