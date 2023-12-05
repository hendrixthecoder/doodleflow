"use client";
import { showModal } from "@/lib/utils";
import Image from "next/image";
import { RefObject, useRef } from "react";

const LogOutButton = ({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
}) => {
  return (
    <div
      className="border rounded-full p-1 cursor-pointer"
      onClick={() => showModal(dialogRef)}
    >
      <Image src="/logout.svg" width={23} height={23} alt="Logout" />
    </div>
  );
};

export default LogOutButton;
