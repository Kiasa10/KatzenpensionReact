import getRegularGuests from "@/app/lib/data/regular-guests";
import PageHeader from "@/components/PageHeader/PageHeader";
import LoadingText from "@/components/LoadingText/LoadingText";
import CardGrid from "@/components/Card/CardGrid/CardGrid";

import { Suspense } from "react";

async function Guests() {
  const receivedGuests = await getRegularGuests();
  const guests = receivedGuests.map((entry) => {
    const guest = {
      name: entry.name,
      age: entry.age,
      imageUrl: entry.imageUrl,
      descriptionShort: entry.descriptionShort,
      descriptionLong: entry.descriptionLong,
    };
    return guest;
  });

  return <CardGrid data={guests} />;
}

export default function RegularGuests() {
  return (
    <>
      <PageHeader>Stammgäste</PageHeader>
      <Suspense fallback={<LoadingText text="Lade Stammgäste..." />}>
        <Guests />
      </Suspense>
    </>
  );
}
