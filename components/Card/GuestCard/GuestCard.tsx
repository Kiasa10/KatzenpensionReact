import Card from "../Card";
import { Guest } from "@/app/lib/models/regular-guest";

interface GuestCardProps {
  guest: Guest;
}

export default function GuestCard({ guest }: GuestCardProps) {
  return (
    <Card title={guest.name} imageUrl={guest.imageUrl} descriptionShort={guest.descriptionShort} alt="Picture of guest">
      <p>
        <span>{guest.age}</span> Jahre alt
      </p>
    </Card>
  );
}
