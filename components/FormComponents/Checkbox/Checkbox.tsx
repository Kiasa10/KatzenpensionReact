import classes from "./checkbox.module.css";
import Error from "../Error/Error";

interface CheckboxProps {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defValue?: boolean;
  required?: boolean;
  error?: string;
}

export default function Checkbox({ label, name, defValue, required, error, onChange }: CheckboxProps) {
  return (
    <>
      <div className={error ? classes.hasError : classes.noError}>
        <input
          type="checkbox"
          className={classes.formCheckbox}
          id={name}
          name={name}
          required={required}
          defaultChecked={defValue}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <Error error={error} />}
    </>
  );
}
