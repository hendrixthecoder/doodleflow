import { ModalProps } from "@/lib/types";
import Button from "../Button";

const DeleteBoardModal = ({
  dialogRef,
  closeModal,
  boardToDelete,
}: ModalProps) => {
  return (
    <dialog
      ref={dialogRef}
      className="bg-white rounded-xl max-w-md w-[90%] md:w-[70%] p-5  "
    >
      <form
        action=""
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
  );
};

export default DeleteBoardModal;
