import classes from "./cardGrid.module.css";
//import { Guest } from "@/app/lib/models/regular-guest";
//import { Rooms as Room } from "@/app/lib/models/room";
import GuestCard from "../GuestCard/GuestCard";
import RoomCard from "../RoomCard/RoomCard";

export interface Guest {
  name: string;
  age: number;
  imageUrl: string;
  descriptionShort: string;
  descriptionLong: string;
}

export interface Room {
  title: string;
  cost: string;
  imageUrl: string;
  descriptionShort: string;
  descriptionLong: string;
}

interface CardGridProps {
  data: Guest[] | Room[];
}
export default function CardGrid({ data }: CardGridProps) {
  return (
    <div className={classes.cards}>
      {data.map((entry) => {
        if ("age" in entry) {
          return <GuestCard key={entry.imageUrl + entry.name} {...entry} />;
        }
        return <RoomCard key={entry.imageUrl + entry.title} {...entry} />;
      })}
    </div>
  );
}
