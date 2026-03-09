import dbConnect from "@/app/lib/mongodb";
import Room, { Rooms } from "@/app/lib/models/room";

export async function getRooms() {
  await dbConnect();
  const result = await Room.find<Rooms>({});

  const rooms = result.map((doc) => {
    const room = JSON.parse(JSON.stringify(doc)) as Rooms;
    return room;
  });
  return rooms;
}
