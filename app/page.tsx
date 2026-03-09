import homeimg from "@/public/assets/images/homePage/homeimg.jpg";
import Image from "next/image";
import classes from "./page.module.css";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader>
        <span className={classes.homeScreenHeader}>Willkommen in meiner Katzenpension!</span>
      </PageHeader>

      <div className={classes.homescreen}>
        <div className={classes.imageContainer}>
          <Image src={homeimg} alt="Image from Owner with cat" height={500} />
        </div>
        <div className={classes.introductionContainer}>
          <p>Hallo! Ich bin Sonja Müller.</p>
          <br />
          <p>
            Als leidenschaftliche Katzenliebhaberin weiß ich aus eigener Erfahrung: Es ist gar nicht so einfach, sein geliebtes Haustier in fremde
            Hände zu geben. Genau deshalb habe ich meine Katzenpension ins Leben gerufen. Ein Ort, an dem sich Ihre Fellnase nicht nur sicher, sondern
            wie zu Hause fühlt.
          </p>
          <br />
          <p>
            In meiner Pension stehen individuelle Betreuung, viel Liebe und jede Menge Spielstunden an erster Stelle. Egal ob verspielter Abenteurer
            oder schüchterner Genießer, ich nehme mir die Zeit, auf die speziellen Bedürfnisse und Eigenheiten jedes Gastes einzugehen. Während Sie
            Ihren Urlaub genießen, sorge ich dafür, dass es Ihrer Katze an nichts fehlt.
          </p>
          <br />
          <p>
            Kommen Sie gerne vorbei und schauen Sie sich mein „Katzenreich“ persönlich an. Ich freue mich darauf, Sie und Ihre Samtpfote
            kennenzulernen!
          </p>
        </div>
      </div>
    </>
  );
}
