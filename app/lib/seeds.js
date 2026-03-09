import dbConnect from "./mongodb.ts";
import Room from "./models/room.ts";
import RegularGuest from "./models/regular-guest.ts";
import Comment from "./models/comment.ts";
import Booking from "./models/booking.ts";
import mongoose from "mongoose";
import { error } from "console";
import fs from "node:fs/promises";
import path from "node:path";

async function seedRooms() {
  await dbConnect();
  await Room.deleteMany({})
    .then(() => console.log("Rooms deleted"))
    .catch((err) => console.log("Error deleting rooms", err));
  await Room.insertMany([
    {
      title: "Gemeinschaftsraum",
      cost: "10€",
      imageUrl: "/rooms/kiRoom4.jpg",
      descriptionShort:
        "Ein lebendiges Paradies für soziale Samtpfoten mit vielen Klettermöglichkeiten und Spielgefährten. Hier stehen gemeinsames Erkunden und tägliche Abenteuer an erster Stelle.",
      descriptionLong:
        "Unser Gemeinschaftsraum ist das Herzstück der Pension und ein wahres Paradies für soziale Abenteurer. Auf großzügiger Fläche finden die Gäste hier ein Labyrinth aus deckenhohen Kratzbäumen, versteckten Höhlen und gemütlichen Hängematten, die zum gemeinsamen Erkunden einladen. Die helle, freundliche Gestaltung sorgt dafür, dass sich aufgeschlossene Katzen sofort wohlfühlen und schnell Anschluss finden. Hier steht das soziale Miteinander im Vordergrund. Unter ständiger Aufsicht können die Samtpfoten mit Gleichgesinnten fangen spielen, gemeinsam die Aussichtspunkte erklimmen oder sich für ein Nickerchen in einer der kuscheligen Gruppen-Lounges zusammenrollen. Es ist der ideale Ort für vitale Katzen, die auch im Urlaub nicht auf Action und Gesellschaft verzichten möchten.",
      catsPossible: 10,
    },
    {
      title: "Einzelzimmer",
      cost: "15€",
      imageUrl: "/rooms/kiRoom2.jpg",
      descriptionShort:
        "Ein ruhiger Rückzugsort für schüchterne Gäste oder Senioren, die Entspannung suchen. In privater Atmosphäre kann Ihre Katze hier ganz in Ruhe ihr Schläfchen halten.",
      descriptionLong:
        "Das Einzelzimmer ist ein Ort der absoluten Ruhe und Geborgenheit, speziell konzipiert für unsere sensiblen Gäste oder Senioren. Fernab vom Trubel der Gruppe kann sich Ihre Katze hier in ihre eigene kleine Welt zurückziehen, die mit vertrauten Gerüchen und weichen Textilien eine beruhigende Wirkung entfaltet. Große Fenster sorgen für natürliches Licht, ohne dass sich das Tier beobachtet fühlen muss. In diesem privaten Rückzugsort erhält jeder Gast eine ganz individuelle Betreuung und besonders viele Streicheleinheiten, sofern dies gewünscht ist. Es ist die perfekte Wahl für Katzen, die zu Hause keine Artgenossen gewohnt sind oder die aufgrund ihres Alters ein erhöhtes Bedürfnis nach Schlaf und Beständigkeit haben. Hier kann Ihre Fellnase den Urlaub in ihrem ganz eigenen Tempo genießen.",
      catsPossible: 1,
    },
    {
      title: "Doppelzimmer",
      cost: "20€",
      imageUrl: "/rooms/kiRoom5.jpg",
      descriptionShort:
        "Die ideale Wahl für zwei Katzen aus demselben Haushalt, die auch im Urlaub unzertrennlich sind. Viel Platz zum gemeinsamen Kuscheln und Toben ist hier garantiert.",
      descriptionLong:
        "Unser Doppelzimmer wurde eigens für 'Best Buddies' oder Geschwisterpaare entworfen, die ein eingespieltes Team sind und auch auf Reisen unzertrennlich bleiben wollen. Der Raum bietet ausreichend Platz für zwei separate Futterstationen und zwei Katzentoiletten, verfügt aber gleichzeitig über großzügige Kuschelflächen, auf denen die beiden gemeinsam entspannen können. Die Einrichtung ist so gewählt, dass beide Tiere gleichzeitig ihre Lieblingsplätze finden. Durch die exklusive Belegung mit Tieren aus demselben Haushalt bleibt die vertraute Gruppendynamik erhalten, was den Trennungsschmerz von den Besitzern erheblich mindert. Ob gemeinsames Jagen nach Spielzeugmäusen oder synchrones Putzen am Nachmittag – in diesem Zimmer genießen Ihre Lieblinge den Luxus, ihre vertraute soziale Struktur auch in der Fremde beizubehalten.",
      catsPossible: 2,
    },
    {
      title: "Suite",
      cost: "25€",
      imageUrl: "/rooms/kiRoom3.jpg",
      descriptionShort:
        "Luxus pur auf großzügiger Fläche mit exklusiven Liegeplätzen und besonders viel Aufmerksamkeit. Ein wahrer Wohlfühlort für anspruchsvolle Genießer, die das Besondere lieben.",
      descriptionLong:
        "Die Suite repräsentiert die Extraklasse unserer Unterbringung und bietet ein Höchstmaß an Luxus und Platz. Mit exklusiven Design-Kratzmöbeln, einer Vielfalt an interaktivem Spielzeug und besonders hochwertigen Liegeplätzen aus Bio-Baumwolle ist dieser Raum für anspruchsvolle Genießer reserviert. Die Suite ist nicht nur räumlich größer, sondern auch akustisch besonders abgeschirmt, um maximale Exklusivität zu garantieren.",
      catsPossible: 3,
    },
    {
      title: "Seeblick",
      cost: "20€",
      imageUrl: "/rooms/kiRoom1.jpg",
      descriptionShort:
        "Dieses Zimmer bietet eine beruhigende Aussicht auf das Wasser und sorgt für eine entspannte Urlaubsstimmung. Perfekt für neugierige Beobachter, die gerne stundenlang am Fenster verweilen.",
      descriptionLong:
        "Das Zimmer 'Seeblick' besticht durch seine einzigartige Lage und die beruhigende Aussicht auf das glitzernde Wasser. Die Architektur des Raumes ist darauf ausgerichtet, die Natur nach innen zu holen; breite Fensterbänke, die mit weichen Kissen ausgestattet sind, laden dazu ein, stundenlang die Wasservögel und die Lichtreflexe auf der Oberfläche zu beobachten. Die gesamte Atmosphäre ist maritim angehaucht und strahlt eine tiefe Gelassenheit aus. Diese visuelle Stimulation ist besonders für neugierige Beobachter und 'Fenster-Katzen' eine wunderbare Beschäftigung, die den Geist anregt, ohne Stress zu verursachen. Die sanften Farben und die ruhige Umgebung machen dieses Zimmer zu einem Favoriten für Katzen, die gerne in Tagträumen versinken und dabei die Welt um sich herum ganz genau im Blick behalten möchten.",
      catsPossible: 4,
    },
    {
      title: "Bergpanorama",
      cost: "20€",
      imageUrl: "/rooms/kiRoom6.jpg",
      descriptionShort:
        "Ein helles Zimmer mit majestätischer Aussicht auf die Gipfel, das zum Träumen einlädt. Ein Logenplatz für Naturliebhaber, die gerne den Überblick behalten.",
      descriptionLong:
        "Im Zimmer 'Bergpanorama' erwartet unsere Gäste eine majestätische Aussicht auf die umliegenden Gipfel und eine besonders lichtdurchflutete Umgebung. Die vertikale Raumgestaltung mit verschiedenen Ebenen simuliert eine Berglandschaft und bietet den Katzen die Möglichkeit, instinktiv den höchsten Punkt im Raum zu besetzen. Von dort aus haben sie einen perfekten Logenplatz über das gesamte Zimmer und nach draußen in die Ferne. Diese erhöhten Aussichtspunkte fördern das Sicherheitsgefühl der Katze und laden zu kletterreichen Erkundungstouren ein. Das Design kombiniert rustikale Holzelemente mit modernem Komfort und schafft so eine alpine Wohlfühloase. Es ist das perfekte Quartier für abenteuerlustige Kletterkünstler, die gerne hoch hinaus wollen und die Weite der Natur schätzen.",
      catsPossible: 4,
    },
  ])
    .then(() => console.log("Room data inserted"))
    .catch((err) => console.log("Error inserting rooms", err));
}

async function seedGuests() {
  await dbConnect();
  await RegularGuest.deleteMany({})
    .then(() => console.log("Regular-guests deleted"))
    .catch((err) => console.log("Error deleting regular-guests", err));
  await RegularGuest.insertMany([
    {
      name: "Piki",
      age: 18,
      imageUrl: "/regularGuests/Piki.jpeg",
      descriptionShort: "Piki ist eine gemütliche, ruhige Katze. Sie liebt es in der Sonne zu baden und genießt die Wärme.",
      descriptionLong:
        "Piki ist eine sehr ruhige Zeitgenossin, die am liebsten draußen auf dem warmen Boden in der Sonne schlummert. Sie war früher eine begnadete Jägerin und hat zum Entsetzen ihrer Besitzerin eine lebendige Elster mit ins Wohnzimmer gebracht. Heute ist Piki viel ruhiger geworden und verlässt kaum noch den eigenen Garten. Wenn sie nicht draußen ist, liegt sie vermutlich in einem kuscheligen Bett und träumt von fremden Vogelarten.",
    },
    {
      name: "Kiara",
      age: 15,
      imageUrl: "/regularGuests/Kiara.jpeg",
      descriptionShort:
        "Ein echter Wirbelwind ist unsere Kiara! Sie will alles sehen und überall dabei sein, während sie von ihrem Tag und ihren Erlebnissen erzählt.",
      descriptionLong:
        "Kiara ist die Gefährtin von Cleo und ist das komplette Gegenteil von ihr. Kiara ist ein halbes Jahr älter, was man niemals erahnen würde. Sie ist ein kleiner Wirbelwind, der überall dabei sein und helfen muss. Ihr Lieblingsspielzeug sind kleine Bälle, die sie durch die ganze Wohnung jagd und manchmal sogar apportiert. Abseits von der ganzen Action schlummert sie gerne auf oder neben ihrer Besitzerin oder auf der Bodenheizung. Kiara erzählt gerne viel und man kann ganze Unterhaltungen mit ihr führen. Sie ist eine sehr schlaue und brave Katze, die genau versteht, was man gerade von ihr will und es dann auch meistens macht.",
    },
    {
      name: "Cleo",
      age: 15,
      imageUrl: "/regularGuests/Cleo.jpeg",
      descriptionShort:
        "Unser verschmuster Frechdachs. Sobald man sitzt, springt Cleo auf den Schoß und will gestreichelt werden. Sie kann wie ein Motorboot schnurren.",
      descriptionLong:
        "Unsere Cleo hat ein sehr gutmütiges und gemütliches Wesen, manchmal sind wir uns nicht sicher, ob sie überhaupt weiß, dass sie Krallen oder Zähne hat. Sie ist wie alle 3-Färbigen Katzen etwas eigenartig und kann sehr gesprächig sein. Cleo kuschelt für ihr Leben gerne und liegt am liebsten auf dem Schoß ihres Besitzers, was ihr manchmal so gut gefällt, dass sie vor lauter Schnurren zu sabbern anfängt. Leider hat sie zwei chronische Krankheiten, weshalb sie zweimal täglich Medikamente benötigt, die sie aber sehr brav annimmt. Cleo ist übrigends die Gefährtin von Kiara und ein halbes Jahr jünger.",
    },
    {
      name: "Mona",
      age: 9,
      imageUrl: "/regularGuests/Mona.jpg",
      descriptionShort:
        "Ob Mona hier ist oder nicht - man weiß es nie. Sie versteckt sich gerne und ist für sich. Wenn man sie dann doch entdeckt, schätzt sie ausgiebige Streicheleinheiten.",
      descriptionLong:
        "Über Mona kann man nicht soviel erzählen, denn sie ist eine sehr zurückgezogene Katze, die ihre Ruhe liebt. Sie mag Trubel garnicht und vermeidet ihn so gut es geht. Sie isst alles, was sie finden kann, deswegen muss man bei ihr aufpassen, dass sie nicht zuviel isst. Mona ist eine sehr stille Katze, die von Besuchern oft übersehen wird, da sie sich gut verstecken kann. Wenn man Mona entdeckt, schätzt sie Streicheleinheiten allerdings sehr. Mona ist die Gefährtin von Gizmo",
    },
    {
      name: "Gizmo",
      age: 12,
      imageUrl: "/regularGuests/Gizmo.jpg",
      descriptionShort:
        "Der einzige Kater im Bunde. Er ist gesprächig und weiß was er will, was er auch sehr deutlich zeigt. Aber aufgepasst: Gizmo schreckt nich davor zurück, auch mal die Krallen auszufahren wenn etwas nicht nach seinem Willen läuft.",
      descriptionLong:
        "Gizmo - unser einziger Kater. Er ist laut, er ist frech, er ist da! Achtung: Gizmo kann eine Kratzbürste sein, wenn etwas nicht nach seinem Willen läuft. Er schreckt nicht davor zurück, zu kratzen oder zu beißen. Manchmal hat er dann aber auch gute Laune und ist dann sehr aufdringlich und weicht einem nicht von der Seite - ob man das nun will oder nicht. Er ist der Gefährte von Mona.",
    },
  ])
    .then(() => console.log("Regular-guests inserted"))
    .catch((err) => console.log("Error inserting regular-guests", err));
}

async function clearBookings() {
  await dbConnect();
  await Booking.deleteMany({})
    .then(() => console.log("Bookings deleted"))
    .catch((err) => console.log("Error deleting bookings", error));
}

async function clearComments() {
  await dbConnect();
  const currentDate = new Date();
  await Comment.deleteMany({})
    .then(() => console.log("Comments deleted"))
    .catch((err) => console.log("Error deleting comments", err));
  await Comment.insertOne({
    date: currentDate,
    headline: "Toller Aufenthalt!",
    author: "Kiara",
    content: "Mein Zimmer war gut ausgestattet und Sonja war sehr lieb und hat viel mit mir gespielt!",
  })
    .then(() => console.log("Comment inserted"))
    .catch((err) => console.log("Error inserting comment", err));
}

async function deleteImages() {
  const directory = "../../public/userImages";
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      await fs.unlink(filePath);
    }
    console.log(`Images from ${directory} deleted`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Directory not found");
    } else {
      console.log("Error deleting files", err);
    }
  }
}

async function seedDB() {
  await seedRooms();
  await seedGuests();
  await clearBookings();
  await clearComments();
  await deleteImages();
}

seedDB().then(() => mongoose.connection.close());
