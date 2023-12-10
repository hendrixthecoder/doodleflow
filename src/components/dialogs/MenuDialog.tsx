import { Board } from "@/lib/types";
import toast from "react-hot-toast";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useToggleBrushModal } from "@/hooks/useToggleMenu";
import Button from "../Button";

const MenuDialog = ({ board }: { board: Board }) => {
  const { menuDialogRef, toggleMenu, isOpen } = useToggleBrushModal();

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
        className=" border p-4 px-5 shadow-xl rounded-xl absolute -left-[8rem] top-16"
      >
        <div className="flex justify-between gap-5">
          <Button
            type="button"
            classes="border text-xs"
            bgColor="white"
            color="red"
            value="Delete"
          />
          <Button
            type="button"
            classes="text-xs"
            bgColor="#7B61FF"
            color="white"
            action={handleShareBoard}
            value="Share"
          />
        </div>
      </dialog>
    </div>
  );
};

export default MenuDialog;
