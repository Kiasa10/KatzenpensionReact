"use client";

import { useEffect, useState } from "react";
import classes from "./imagePicker.module.css";
import Image from "next/image";
import Error from "../Error/Error";

interface ImagePickerProps {
  label: string;
  name: string;
  error?: string;
  onChange?: (file: File | undefined) => void;
}

export default function ImagePicker({ label, name, error, onChange }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setPickedImage(null);
    }
  }, [error]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      if (onChange) onChange(undefined);
    } else {
      if (onChange) onChange(file);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={error ? `${classes.pickerWrapper} ${classes.hasError}` : classes.pickerWrapper}>
        <div className={classes.picker}>
          <label htmlFor={name} className={classes.customFileUpload}>
            {label}
          </label>
          <input type="file" id={name} name={name} accept=".jpg, .jpeg, .png, .webp" className={classes.upload} onChange={handleImageChange} />
        </div>
        {pickedImage && (
          <div className={classes.preview}>
            {pickedImage && <Image src={pickedImage} alt="Vorschau Ihres Fotos" fill className={classes.customImage} />}
          </div>
        )}
      </div>
      {error && <Error error={error} />}
    </>
  );
}
