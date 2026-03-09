import classes from "./fieldset.module.css";

interface FieldsetProps {
  children: React.ReactNode;
  legend: string;
}

export default function Fieldset({ children, legend }: FieldsetProps) {
  return (
    <fieldset className={classes.formFieldset}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
