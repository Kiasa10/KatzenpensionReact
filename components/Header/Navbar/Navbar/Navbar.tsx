import classes from "./navbar.module.css";
import NavLink from "../NavLink/NavLink";

interface NavbarProps {
  isMobile?: boolean;
}

const routes = [
  { href: "/", text: "Home" },
  { href: "/rooms", text: "Zimmer" },
  { href: "/regular-guests", text: "Stammgäste" },
  { href: "/guestbook", text: "Gästebuch" },
  { href: "/booking", text: "Buchen" },
  { href: "/faq", text: "FAQ" },
];

export default function Navbar({ isMobile }: NavbarProps) {
  return (
    <nav className={isMobile ? "" : classes.toggleVisibility}>
      <menu className={isMobile ? classes.navbarMobileItems : classes.navbarItems}>
        {routes.map((route) => (
          <li key={route.href + route.text} className={classes.navbarItem}>
            <NavLink href={route.href}>{route.text}</NavLink>
          </li>
        ))}
      </menu>
    </nav>
  );
}
