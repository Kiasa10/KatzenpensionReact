import { Rooms as Room } from "@/app/lib/models/room";
import Card from "../Card";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card title={room.title} imageUrl={room.imageUrl} descriptionShort={room.descriptionShort} alt="Picture of room">
      <p>
        Preis pro Katze/Nacht: <span>{room.cost}</span>
      </p>
    </Card>
  );
}
