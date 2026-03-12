"use client";

import { Room } from "../CardGrid/CardGrid";
import Card from "../Card";
import { useState } from "react";
import RoomModal from "@/components/Modal/RoomModal/RoomModal";

export default function RoomCard({ title, imageUrl, descriptionShort, cost, descriptionLong }: Room) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <RoomModal open={isOpen} title={title} imageUrl={imageUrl} descriptionLong={descriptionLong} cost={cost} onClose={() => setIsOpen(false)} />
      <Card title={title} imageUrl={imageUrl} descriptionShort={descriptionShort} alt="Picture of room" onClick={handleClick}>
        <p>
          Preis pro Katze/Nacht: <span>{cost}</span>
        </p>
      </Card>
    </>
  );
}
