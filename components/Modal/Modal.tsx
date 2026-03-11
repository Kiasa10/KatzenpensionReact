import Image from "next/image";
import classes from "./modal.module.css";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  imageUrl: string;
  alt: string;
  descriptionLong: string;
  additionalInfo: string;
  additionalInfoText: string;
}
const basePath = "/assets/images";

export default function Modal({ title, children, imageUrl, alt, descriptionLong, additionalInfo, additionalInfoText }: ModalProps) {
  return (
    <dialog>
      <div className={classes.imgContainer}>
        <Image src={`${basePath}${imageUrl}`} alt={alt} className={classes.cardImage} fill />
      </div>
      <div>
        <h2>{title}</h2>
        <span>
          {additionalInfo} {additionalInfoText}
        </span>
        <p>{descriptionLong}</p>
        <form method="dialog">{children}</form>
      </div>
    </dialog>
  );
}
