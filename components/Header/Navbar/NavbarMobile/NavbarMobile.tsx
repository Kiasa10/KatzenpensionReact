import classes from "./navbarMobile.module.css";
import Navbar from "../Navbar/Navbar";

export default function NavbarMobile() {
  return (
    <div className={classes.mobileView}>
      <Navbar isMobile />
    </div>
  );
}
