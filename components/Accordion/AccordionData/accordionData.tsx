import Link from "next/link";
import { v4 as uuid } from "uuid";
import classes from "./accordionData.module.css";

export const faq = [
  {
    id: uuid(),
    item: "Welche Impfungen und Voraussetzungen muss meine Katze erfüllen?",
    content:
      "Um die Gesundheit aller Gäste zu schützen, ist ein gültiger Impfschutz gegen Katzenschnupfen und Katzenseuche Pflicht. Bei Freigängern wird zusätzlich eine Tollwut-Impfung verlangt. Zudem muss die Katze kurz vor dem Aufenthalt entwurmt und gegen Parasiten (Flöhe/Zecken) behandelt worden sein. Ein gültiger Impfpass muss beim Check-in abgegeben werden.",
  },
  {
    id: uuid(),
    item: "Mein Tier braucht Medikamente – ist das ein Problem?",
    content:
      "Nein. Ich bin darin geschult, Tabletten zu geben oder Spezialfutter zu verabreichen. Wichtig ist, dass die Medikamente in ausreichender Menge und mit einer genauen Dosierungsanleitung mitgegeben werden. Chronische Erkrankungen sollten unbedingt beim Erstgespräch geklärt werden.",
  },
  {
    id: uuid(),
    item: "Was passiert, wenn meine Katze krank wird?",
    content:
      "Meine Pension hat einen Notfallplan. Im Vertrag wird festgehalten, welcher Tierarzt im Notfall aufgesucht werden soll (entweder der Haustierarzt oder ein Partner-Tierarzt in der Nähe). Der Besitzer wird im Ernstfall natürlich sofort informiert.",
  },
  {
    id: uuid(),
    item: "Muss ich das eigene Futter mitbringen?",
    content:
      "Grundsätzlich empfehle ich, eigenes Futter mitzubringen, da eine abrupte Futterumstellung zusätzlichen Stress für den Magen bedeuten kann. Wenn ich das gewohnte Futter Ihrer Samptpfote füttere, bleibt zumindest dieser Teil des Alltags für sie beständig. Auf Wunsch biete ich jedoch auch ein hochwertiges Inklusiv-Futter an.",
  },
  {
    id: uuid(),
    item: "Wie wird die Katze untergebracht – Gruppe oder Einzelzimmer?",
    content: (
      <>
        Das kommt ganz auf Ihr Tier und Ihre Wünsche an. Ich biete Gruppenhaltung, welche nur für sozialisierte, kastrierte Katzen geeignet ist an.
        Der Vorteil hierbei ist, dass es mehr Platz, Spielmöglichkeiten und natürlich Kameraden gibt. Für Katzen, die eher schüchtern sind, keine
        Artgenossen mögen oder für Senioren bzw. Katzen mit speziellen Bedürfnissen ist ein Einzelzimmer ideal. Genauere Infos über die angebotenen
        Räumlichkeiten finden Sie unter dem Menüpunkt{" "}
        <Link href="/rooms" className={classes.faqLink}>
          Zimmer
        </Link>{" "}
        .
      </>
    ),
  },
];
