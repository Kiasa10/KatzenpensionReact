import Accordion from "@/components/Accordion/Accordion";
import classes from "./page.module.css";
import PageHeader from "@/components/PageHeader/PageHeader";
import { faq } from "@/components/Accordion/AccordionData/accordionData";

export default function FAQ() {
  return (
    <>
      <PageHeader>FAQ</PageHeader>
      <p className={classes.faqDescription}>Hier finden Sie eine Auflistung über die am häufigsten gestellten Fragen</p>
      <Accordion itemList={faq} />
    </>
  );
}
