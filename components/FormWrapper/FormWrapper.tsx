import classes from "./formWrapper.module.css";

interface FormWrapperProps {
  children: React.ReactNode;
}

export default function FormWrapper({ children }: FormWrapperProps) {
  return <div className={classes.formWrapper}>{children}</div>;
}
