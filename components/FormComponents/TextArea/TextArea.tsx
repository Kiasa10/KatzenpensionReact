import classes from "./textArea.module.css";
import Error from "../Error/Error";

interface TextAreaProps {
  name: string;
  label: string;
  defValue?: string;
  required?: boolean;
  isComment?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ name, label, defValue, required, isComment, error, onChange, onBlur }: TextAreaProps) {
  const textAreaClasses = [classes.formBorder, classes.formTextarea, isComment ? classes.commentTextAreaWidth : "", error ? classes.hasError : ""]
    .join(" ")
    .trim();
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        defaultValue={defValue}
        className={textAreaClasses}
        required={required}
        maxLength={500}
        minLength={3}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>
      {error && <Error error={error} />}
    </>
  );
}
