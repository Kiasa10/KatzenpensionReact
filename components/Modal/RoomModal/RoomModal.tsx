import ButtonLink from "@/components/ButtonLink/ButtonLink";
import Modal from "../Modal";

export default function RoomModal() {
  return (
    <Modal title="" imageUrl="" alt="" descriptionLong="" additionalInfo="" additionalInfoText="">
      <ButtonLink>Schließen</ButtonLink>
      <ButtonLink isLink href="/booking">
        Zimmer Buchen
      </ButtonLink>
    </Modal>
  );
}
