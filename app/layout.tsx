import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const montserratFont = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonja's Katzenpension",
  description: "Die Unterkunft für deine Katze!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="apple-mobile-web-app-title" content="Katzenpension" />
      </head>
      <body className={montserratFont.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
