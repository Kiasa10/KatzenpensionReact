import classes from "./dropdown.module.css";
import Error from "../Error/Error";

interface DropdownProps {
  label: string;
  name: string;
  required?: boolean;
  defValue?: string | number;
  error?: string;
  isRoom?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: {
    id: string;
    value: string;
    label: string | number;
  }[];
}

export default function Dropdown({ label, name, required, defValue, data, error, isRoom, onBlur, onChange }: DropdownProps) {
  let styles = `${classes.formBorder} ${classes.formDropdown}`;
  if (isRoom) {
    styles = styles + ` ${classes.isRoom}`;
  }
  if (isRoom && error) {
    styles = styles + ` ${classes.isRoom} ${classes.hasError}`;
  }
  if (error) {
    styles = styles + ` ${classes.hasError}`;
  }
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className={styles} required={required} onBlur={onBlur} onChange={onChange} defaultValue={defValue ?? ""}>
        <option value="" disabled>
          Bitte wählen
        </option>
        {data.map((e) => (
          <option key={e.id} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>
      {error && <Error error={error} />}
    </>
  );
}
