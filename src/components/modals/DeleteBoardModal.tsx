import { ModalProps } from "@/lib/types";
import Button from "../Button";
import { useStateContext } from "@/contexts/ContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { deleteBoard } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const DeleteBoardModal = ({
  dialogRef,
  closeModal,
  boardToDelete,
}: ModalProps) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { setBoards } = useStateContext();

  const handleDelete = async () => {
    try {
      if (!user) return router.push("/login");
      await deleteBoard(boardToDelete, user.uid);
      setBoards((prevState) => prevState.filter(board => board.id !== boardToDelete))
      
      closeModal(dialogRef);
      toast.success("Board deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting board, try again later!");
      }
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="bg-white rounded-xl max-w-md w-[90%] md:w-[70%] p-5  "
      >
        <form
          action={handleDelete}
          className="flex flex-col gap-3 sm:px-10 w-[70%] mx-auto"
        >
          <p className="text-xs">
            Do you want to <span className="font-bold">delete</span> this board?
          </p>
          <div className="flex justify-between">
            <Button
              value="Yes"
              bgColor="#7B61FF"
              color="white"
              type="submit"
              classes="px-6 sm:px-8"
            />
            <Button
              value="Cancel"
              bgColor="white"
              color="#7B61FF"
              type="button"
              classes="border border-myPurple"
              action={() => closeModal(dialogRef)}
            />
          </div>
        </form>
      </dialog>
      <Toaster />
    </>
  );
};

export default DeleteBoardModal;
