import classes from "./formRow.module.css";

interface FormRowPropos {
  children: React.ReactNode;
}

export default function FormRow({ children }: FormRowPropos) {
  return <div className={classes.formRow}>{children}</div>;
}
