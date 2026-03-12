import ButtonLink from "@/components/ButtonLink/ButtonLink";
import Modal from "../Modal";
import { Room } from "@/components/Card/CardGrid/CardGrid";

interface RoomModalProps extends Omit<Room, "descriptionShort"> {
  onClose: () => void;
  open: boolean;
}

export default function RoomModal({ title, imageUrl, descriptionLong, cost, onClose, open }: RoomModalProps) {
  return (
    <Modal
      title={title}
      imageUrl={imageUrl}
      alt="Raumfoto"
      descriptionLong={descriptionLong}
      additionalInfo={cost}
      additionalInfoText="Kosten pro Nacht/Katze:"
      open={open}
      onClose={onClose}
    >
      <ButtonLink onClick={onClose}>Schließen</ButtonLink>
      <ButtonLink isLink href="/booking">
        Zimmer Buchen
      </ButtonLink>
    </Modal>
  );
}
