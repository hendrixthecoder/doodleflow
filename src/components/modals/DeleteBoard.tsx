import { useDeleteBoard } from "@/hooks/useDeleteBoard";
import Button from "../Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/contexts/ContextProvider";
import { deleteBoard } from "@/lib/utils";
import toast from "react-hot-toast";
import { Board } from "@/lib/types";


const DeleteBoard = ({ board }: { board: Board }) => {
  const { deleteModalRef, toggleModal } = useDeleteBoard();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { setBoards } = useStateContext();

  const handleDelete = async () => {
    try {
      if (!user) return router.push("/login");
      await deleteBoard(board.id, user.uid);
      setBoards((prevState) =>
        prevState.filter((board) => board.id !== board.id)
      );

      toggleModal();
      router.push("/");
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
      <Button
        type="button"
        classes="border text-xs"
        bgColor="white"
        color="red"
        value="Delete"
        action={toggleModal}
      />
      <dialog
        ref={deleteModalRef}
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
              action={toggleModal}
            />
          </div>
        </form>
      </dialog>
    </>
  );
};

export default DeleteBoard;
