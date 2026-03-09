"use client";

import classes from "./accordion.module.css";
import AccordionItem from "./AccordionItem/AccordionItem";
import { useState } from "react";

interface AccordionData {
  id: string;
  item: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  itemList: AccordionData[];
}

export default function Accordion({ itemList }: AccordionProps) {
  const [itemClicked, setItemClicked] = useState<string | null>(null);

  function handleItemClick(itemID: string) {
    if (itemID === itemClicked) {
      setItemClicked(null);
    } else {
      setItemClicked(itemID);
    }
  }

  return (
    <ul className={classes.faqList}>
      {itemList.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.item}
          content={item.content}
          handleClick={() => handleItemClick(item.id)}
          open={itemClicked === item.id}
        />
      ))}
    </ul>
  );
}
