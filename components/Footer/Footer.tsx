import classes from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerItem}>
        <span>
          Sonja Müller <br />
          Am Katzenweg 10 <br />
          6850 Dornbirn
        </span>
      </div>
      <div className={classes.footerItem}>
        <span>
          Kontakt: <br />
          Telefon: 0676/123 45 67 <br />
          E-Mail:{" "}
          <a className={classes.email} href="mailto:sonja.mueller@katzenpension.com">
            sonja.mueller@katzenpension.com
          </a>
        </span>
      </div>
    </footer>
  );
}
