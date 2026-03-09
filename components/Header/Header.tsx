"use client";
import Link from "next/link";
import Navbar from "./Navbar/Navbar/Navbar";
import classes from "./header.module.css";
import logo from "@/app/icon0.svg";
import Image from "next/image";
import NavbarMobile from "./Navbar/NavbarMobile/NavbarMobile";
import BurgerIcon from "./Navbar/BurgerIcon/BurgerIcon";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWindowSize } from "react-use";

export default function Header() {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const { width } = useWindowSize();
  const pathname = usePathname();
  const displayWidth = width > 1000;

  useEffect(() => {
    setBurgerClicked(false);
  }, [pathname, displayWidth]);

  return (
    <>
      <header className={classes.mainHeader}>
        <Link className={classes.mainHeaderLink} href="/">
          <Image src={logo} alt="Brand logo" priority placeholder="empty" />
          Sonja&apos;s Katzenpension
        </Link>
        <BurgerIcon onClick={() => setBurgerClicked((prev) => !prev)} />
        <Navbar />
      </header>
      {burgerClicked && (
        <>
          <div className={classes.backdrop} onClick={() => setBurgerClicked(false)} />
          <NavbarMobile />
        </>
      )}
    </>
  );
}
