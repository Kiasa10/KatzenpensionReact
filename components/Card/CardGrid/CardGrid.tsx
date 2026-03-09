import classes from "./cardGrid.module.css";
import { Guest } from "@/app/lib/models/regular-guest";
import { Rooms as Room } from "@/app/lib/models/room";
import GuestCard from "../GuestCard/GuestCard";
import RoomCard from "../RoomCard/RoomCard";

interface CardGridProps {
  data: Guest[] | Room[];
}
export default function CardGrid({ data }: CardGridProps) {
  return (
    <div className={classes.cards}>
      {data.map((entry) => {
        if ("age" in entry) {
          return <GuestCard key={entry._id} guest={entry} />;
        }
        return <RoomCard key={entry._id} room={entry} />;
      })}
    </div>
  );
}
