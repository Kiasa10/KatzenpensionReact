"use client";
import PageError from "@/components/PageError/PageError";

export default function Error() {
  return (
    <PageError header="Ein Fehler ist aufgetreten!" text="Buchung konnte nicht erstellt werden.">
      <p>Bitte stellen Sie sicher, dass Sie alle Pflichtfelder ausgefüllt haben und versuchen Sie es noch einmal.</p>
    </PageError>
  );
}
