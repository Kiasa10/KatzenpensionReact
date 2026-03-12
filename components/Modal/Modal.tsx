"use client";
import Image from "next/image";
import classes from "./modal.module.css";
import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  imageUrl: string;
  alt: string;
  descriptionLong: string;
  additionalInfo: string | number;
  additionalInfoText: string;
  open: boolean;
  onClose: () => void;
}
const basePath = "/assets/images";

export default function Modal({ title, children, imageUrl, alt, descriptionLong, additionalInfo, additionalInfoText, open, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  //initial render = null, needs this for 2. render (not null -> document exists now)
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return createPortal(
    <dialog
      id="modal"
      className={classes.modal}
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className={classes.modalContentWrapper}>
        <div className={classes.imgContainer}>
          <Image src={`${basePath}${imageUrl}`} alt={alt} className={classes.modalImage} fill />
        </div>
        <div>
          <h2 className={classes.title}>{title}</h2>
          <span className={classes.additionalInfoSection}>
            {additionalInfoText} {additionalInfo}
          </span>
          <p className={classes.description}>{descriptionLong}</p>
          <div className={classes.modalControls}>{children}</div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
