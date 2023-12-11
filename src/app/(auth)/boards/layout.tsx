import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boards",
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
              <main className="flex flex-col h-[100svh] relative">
                {children}
            </main>
        </body>
    </html>
  );
}
