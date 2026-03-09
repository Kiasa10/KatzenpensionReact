import classes from "./displayList.module.css";

interface DisplayListProps {
  itemList: string[];
}

export default function DisplayList({ itemList }: DisplayListProps) {
  return (
    <ul className={classes.displayList}>
      {itemList.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
