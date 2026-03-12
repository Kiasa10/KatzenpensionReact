"use client";
import Card from "../Card";
import GuestModal from "@/components/Modal/GuestModal/GuestModal";
import { Guest } from "../CardGrid/CardGrid";
import { useState } from "react";

export default function GuestCard({ name, age, imageUrl, descriptionShort, descriptionLong }: Guest) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <GuestModal name={name} age={age} imageUrl={imageUrl} descriptionLong={descriptionLong} onClose={() => setIsOpen(false)} open={isOpen} />
      <Card title={name} imageUrl={imageUrl} descriptionShort={descriptionShort} alt="Picture of guest" onClick={() => setIsOpen(true)}>
        <p>
          <span>{age}</span> Jahre alt
        </p>
      </Card>
    </>
  );
}
