import { Guest } from "@/components/Card/CardGrid/CardGrid";
import Modal from "../Modal";
import ButtonLink from "@/components/ButtonLink/ButtonLink";

interface GuestModalProps extends Omit<Guest, "descriptionShort"> {
  onClose: () => void;
  open: boolean;
}

export default function GuestModal({ name, age, imageUrl, descriptionLong, onClose, open }: GuestModalProps) {
  return (
    <Modal
      title={name}
      imageUrl={imageUrl}
      alt="Katzenfoto"
      descriptionLong={descriptionLong}
      additionalInfo={age}
      additionalInfoText="Alter:"
      open={open}
      onClose={onClose}
    >
      <ButtonLink onClick={onClose}>Schließen</ButtonLink>
    </Modal>
  );
}
