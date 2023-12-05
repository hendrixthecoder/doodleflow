import { ModalProps } from "@/lib/types";
import Button from "../Button";

const LogoutModal = ({ dialogRef, closeModal }: ModalProps) => {
  return (
    <dialog
      ref={dialogRef}
      className="bg-white rounded-xl max-w-md w-[70%] p-5"
    >
      <form action="" className="flex flex-col gap-3 px-4 sm:px-10">
        <p className="text-xs text-center">
          Do you want to <span className="font-bold">Logout</span> from
          doodleflow?
        </p>
        <div className="flex gap-5 justify-center">
          <Button
            value="Yes"
            bgColor="#7B61FF"
            color="white"
            type="submit"
            classes="px-5 sm:px-10"
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

export default LogoutModal;
