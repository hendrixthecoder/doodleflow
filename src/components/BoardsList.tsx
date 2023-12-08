"use client";
import { BoardProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import { fetchBoards } from "@/lib/utils";
import { useStateContext } from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";

const Board = ({ id, name, showModal, setBoardToDelete, deleteBoardRef }: BoardProps) => {
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
  const { boards, setBoards } = useStateContext()
  const router = useRouter()

  useEffect(() => {
    const fetchUserBoards = async () => {
      const userId = sessionStorage.getItem("userId")
      if (!userId) return router.push("/login")
      const userBoards = await fetchBoards(userId)
      
      setBoards(userBoards)
    }

    fetchUserBoards()
  }, [])

  const deleteBoardRef = useRef<HTMLDialogElement>(null);
  const [boardToDelete, setBoardToDelete] = useState<string>("");

  return (
    <>
      {!boards.length && <h1>You current havely no boards.</h1>}
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
    </>
  );
};

export default BoardsList;
