import { ReactNode } from "react";
import classes from "./card.module.css";
import Image from "next/image";

interface CardProps {
  title: string;
  children: ReactNode;
  imageUrl: string;
  alt: string;
  descriptionShort: string;
  onClick: () => void;
}

const basePath = "/assets/images";

export default function Card({ title, children, imageUrl, alt, descriptionShort, onClick }: CardProps) {
  return (
    <article className={classes.card} onClick={onClick}>
      <header className={classes.cardHeader}>
        <h3 className={classes.cardTitle}>{title}</h3>
        {children}
      </header>
      <div className={classes.imgContainer}>
        <Image src={`${basePath}${imageUrl}`} alt={alt} className={classes.cardImage} fill />
      </div>
      <p className={classes.cardDescription}>{descriptionShort}</p>
    </article>
  );
}
