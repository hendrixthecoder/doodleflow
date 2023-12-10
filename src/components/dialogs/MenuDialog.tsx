import { Board } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useToggleBrushModal } from "@/hooks/useToggleMenu";
import Button from "../Button";
import { useStateContext } from "@/contexts/ContextProvider";
import { saveBoard } from "@/lib/utils";
import InviteModal from "../modals/InviteModal";

type MenuDialogProps = {
  board: Board;
};

const MenuDialog = ({ board }: MenuDialogProps) => {
  const { menuDialogRef, toggleMenu, isOpen } = useToggleBrushModal();
  const { user } = useStateContext();

  const handleShareBoard = () => {
    const boardLink = `${process.env.NEXT_PUBLIC_APP_URL}/boards/${board.id}`;

    if (!boardLink) return;

    navigator.clipboard
      .writeText(boardLink)
      .then(() => toast.success("Link copied successfully!"))
      .catch((error) =>
        toast.error("Unable to copy link to clipboard. Please try again.")
      );
  };

  const handleSave = async () => {
    try {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      if (!canvas) return;
      const boardData = canvas.toDataURL();

      await saveBoard(board.id, boardData);
      toast.success("Doodle saved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error saving board, try later.");
      }
    }
  };

  return (
    <div className="relative hidden max-sm:block">
      <button
        onClick={toggleMenu}
        className={`${isOpen ? "bg-myPurple" : ""} h-[55px] px-4`}
      >
        <MenuOpenIcon className={`${isOpen && "text-white"}`} />
      </button>
      <dialog
        ref={menuDialogRef}
        className=" border p-4 px-5 shadow-xl rounded-xl absolute -left-[10rem] top-16"
      >
        <div className="flex justify-between gap-5">
          {board.userId === user?.id && (
            <>
              <Button
                type="button"
                classes="border text-xs"
                bgColor="white"
                color="red"
                value="Delete"
              />
              <InviteModal board={board}/>
            </>
          )}
          <form action={handleSave}>
            <Button
              type="button"
              classes="text-xs"
              bgColor="#7B61FF"
              color="white"
              action={handleSave}
              value="Save"
            />
          </form>
        </div>
      </dialog>
      <Toaster/>
    </div>
  );
};

export default MenuDialog;
