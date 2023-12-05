"use client";
import BoardsList from "@/components/BoardsList";
import Button from "@/components/Button";
import CreateBoardModal from "@/components/modals/CreateBoardModal";
import LogoutModal from "@/components/modals/LogoutModal";
import { montez } from "@/lib/fonts";
import Image from "next/image";
import { Suspense, useRef } from "react";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const profileDialogRef = useRef<HTMLDialogElement>(null);

  const showModal = (dialogRef: React.RefObject<HTMLDialogElement>) => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = (dialogRef: React.RefObject<HTMLDialogElement>) => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <main className="flex flex-col">
      <header className="border p-2 shadow flex items-center">
        <div className="grow flex justify-center">
          <p className={`${montez.className} text-[2rem]`}>DoodleFlow</p>
        </div>
        <div className="flex gap-4">
          <div
            className="border rounded-full p-1 cursor-pointer"
            onClick={() => showModal(profileDialogRef)}
          >
            <Image src="/logout.svg" width={23} height={23} alt="Logout" />
          </div>
          <div className="border rounded-full p-1">
            <Image
              src="/logout.svg"
              className=""
              width={23}
              height={23}
              alt="Logout"
            />
          </div>
        </div>
      </header>
      <div className="p-[2rem] flex flex-col gap-10">
        {/* Modals */}
        <CreateBoardModal dialogRef={dialogRef} closeModal={closeModal} />
        <LogoutModal dialogRef={profileDialogRef} closeModal={closeModal} />
        <div>
          <Button
            classes="px-10"
            icon="/plus.svg"
            value="NEW BOARD"
            bgColor="#7B61FF"
            color="white"
            type="button"
            action={() => showModal(dialogRef)}
          />
        </div>

        <Suspense fallback="Loading...">
          <BoardsList showModal={showModal} closeModal={closeModal} />
        </Suspense>
      </div>
    </main>
  );
}
