"use client";
import { BoardProps, BoardsListProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import { fetchBoards } from "@/lib/utils";
import { useStateContext } from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { toast, Toaster } from "react-hot-toast";

const Board = ({
  id,
  name,
  showModal,
  setBoardToDelete,
  deleteBoardRef,
}: BoardProps) => {
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
          src="/icons/delete.svg"
          width={17}
          height={17}
          alt="Delete icon"
          onClick={() => handleDeleteModal(id, deleteBoardRef)}
          className="absolute right-1 top-1 z-10 cursor-pointer"
        />
        <Link className="flex" href={`/boards/${id}`}>
          <Image src="/icons/doodle.svg" width={50} height={50} alt="Doodle" />
        </Link>
      </div>
    </div>
  );
};

const BoardsList = ({ showModal, closeModal }: BoardsListProps) => {
  const { boards, setBoards } = useStateContext();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserBoards = async () => {
      const userId = user?.uid;
      if (!userId) return router.push("/login");

      try {
        setIsLoading(true); 
        const userBoards = await fetchBoards(userId);
        setBoards(userBoards);
      } catch (error) {
        toast.error("Error fetching boards, try again!")

      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBoards();
  }, []);

  const deleteBoardRef = useRef<HTMLDialogElement>(null);
  const [boardToDelete, setBoardToDelete] = useState<string>("");
  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <p>Fetching boards</p>
        <AutorenewIcon
          className="animate-spin text-myPurple"
          fontSize="large"
        />
      </div>
    );
  }

  return (
    <>
      {!boards.length && <h1>You currently havely no boards.</h1>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <DeleteBoardModal
          boardToDelete={boardToDelete}
          dialogRef={deleteBoardRef}
          closeModal={closeModal}
        />

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
