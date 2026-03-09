import classes from "./burgerIcon.module.css";

interface BurgerIconProps {
  onClick: () => void;
}

export default function BurgerIcon({ onClick }: BurgerIconProps) {
  return (
    <div className={classes.hamburger} onClick={onClick}>
      <span className={classes.bar}></span>
      <span className={classes.bar}></span>
      <span className={classes.bar}></span>
    </div>
  );
}
