import type { Metadata } from "next";
import { Montserrat, Montez } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import LogOutButton from "@/components/LogOutButton";


const montserrat = Montserrat({ subsets: ["latin"] });
const montez = Montez({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
          {children}
      </body>
    </html>
  );
}
