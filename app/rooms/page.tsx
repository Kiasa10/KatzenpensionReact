import PageHeader from "@/components/PageHeader/PageHeader";
import CardGrid from "@/components/Card/CardGrid/CardGrid";
import LoadingText from "@/components/LoadingText/LoadingText";
import { getRooms } from "@/app/lib/data/rooms";
import { Suspense } from "react";

async function RoomsGrid() {
  const receivedRooms = await getRooms();

  const rooms = receivedRooms.map((entry) => {
    const room = {
      title: entry.title,
      cost: entry.cost,
      imageUrl: entry.imageUrl,
      descriptionShort: entry.descriptionShort,
      descriptionLong: entry.descriptionLong,
    };
    return room;
  });
  return <CardGrid data={rooms} />;
}

export default function Rooms() {
  return (
    <>
      <PageHeader>Zimmer</PageHeader>
      <Suspense fallback={<LoadingText text="Lade Räume..." />}>
        <RoomsGrid />
      </Suspense>
    </>
  );
}
