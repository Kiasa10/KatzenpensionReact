import classes from "./datePicker.module.css";
import Error from "../Error/Error";

interface DatePickerProps {
  name: string;
  label: string;
  min: string;
  max: string;
  error?: string;
  defValue?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker({ name, label, min, max, error, defValue, required, onChange, onBlur }: DatePickerProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="date"
        id={name}
        name={name}
        min={min}
        max={max}
        defaultValue={defValue}
        className={error ? `${classes.formBorder} ${classes.formInput} ${classes.hasError}` : `${classes.formBorder} ${classes.formInput}`}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <Error error={error} />}
    </>
  );
}
