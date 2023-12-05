"use client";
import { Board } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";
import DeleteBoardModal from "./modals/DeleteBoardModal";

const Board = ({ id, name, showModal, setBoardToDelete, deleteBoardRef }: Board) => {
  const handleDeleteModal = (
    id: string,
    dialogRef: RefObject<HTMLDialogElement>
  ) => {
    setBoardToDelete(id);
    showModal(dialogRef);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs">{name}</span>
      <div className="border rounded p-2 relative h-32 flex justify-center">
        <Image
          src="/delete.svg"
          width={17}
          height={17}
          alt="Delete icon"
          onClick={() => handleDeleteModal(name, deleteBoardRef)}
          className="absolute right-1 top-1 z-10 cursor-pointer"
        />
        <Link className="flex" href={`/boards/${id}`}>
          <Image src="/doodle.svg" width={50} height={50} alt="Doodle" />
        </Link>
      </div>
    </div>
  );
};

const BoardsList = ({
  showModal,
  closeModal,
}: {
  showModal: (dialogRef: RefObject<HTMLDialogElement>) => void;
  closeModal: (dialogRef: RefObject<HTMLDialogElement>) => void;
}) => {
  const boards = [
    {
      id: "qewrf24",
      name: "Cats and Dogs",
    },
    {
      id: "qewrf243",
      name: "Cats and Monkeys",
    },
    {
      id: "qewrf249",
      name: "Fishes and Dogs",
    },
    {
      id: "qewrf2943",
      name: "Snakes and Monkeys",
    },
  ];

  const deleteBoardRef = useRef<HTMLDialogElement>(null);
  const [boardToDelete, setBoardToDelete] = useState<string>("");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <DeleteBoardModal boardToDelete={boardToDelete} dialogRef={deleteBoardRef} closeModal={closeModal} />

      {boards.map((board) => (
        <Board
          key={board.id}
          id={board.id}
          name={board.name}
          showModal={showModal}
          setBoardToDelete={setBoardToDelete}
          deleteBoardRef={deleteBoardRef}
        />
      ))}
    </div>
  );
};

export default BoardsList;
