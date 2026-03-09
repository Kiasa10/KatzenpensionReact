import notFoundImg from "@/public/assets/images/pageNotFound/pageNotFound.png";
import Image from "next/image";
import classes from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={classes.notFound}>
      <h2>Sorry, wir konnten diese Seite nicht finden!</h2>
      <Image className={classes.notFoundImage} src={notFoundImg} alt="Page not Found Image" width={400} />
    </div>
  );
}
