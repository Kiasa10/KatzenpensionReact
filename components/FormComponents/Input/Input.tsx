import classes from "./input.module.css";
import Error from "../Error/Error";

interface InputProps {
  label: string;
  type: "text" | "email";
  name: string;
  required?: boolean;
  defValue?: string;
  error?: string;
  isComment?: boolean;
  isShortInput?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ label, type, name, required, defValue, onChange, onBlur, error, isComment, isShortInput }: InputProps) {
  let inputSize = 30;

  if (isComment) {
    inputSize = 20;
  }
  let max = 50;
  let min = 3;
  if (isShortInput) {
    max = 10;
    min = 1;
  }
  if (type === "email") {
    min = 5;
  }
  let styles = `${classes.formBorder} ${classes.formInput}`;
  if (isComment) {
    styles = styles + ` ${classes.formCommentInput}`;
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className={error ? `${styles} ${classes.hasError}` : `${styles}`}
        defaultValue={defValue}
        required={required}
        maxLength={max}
        minLength={min}
        onChange={onChange}
        onBlur={onBlur}
        size={inputSize}
      />
      {error && <Error error={error} />}
    </>
  );
}
