import classes from "./formControls.module.css";

interface FormControlProps {
  children: React.ReactNode;
}
export default function FormControls({ children }: FormControlProps) {
  return <div className={classes.formControls}>{children}</div>;
}
