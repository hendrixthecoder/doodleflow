import { Metadata } from "next";
import { Montez } from "next/font/google";

const montez = Montez({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "DoodleFlow",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <main
          className={` h-screen w-full flex justify-center place-items-center`}
        >
          <div className="border border-myPurple w-[70%] h-[70%] max-w-xl rounded-2xl flex flex-col place-items-center">
            <div className="flex flex-col gap-10 h-full justify-center items-center w-[70%] ">
              <p className={`${montez.className} text-[2rem]`}>DoodleFlow</p>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
