"use client";
import { ModalProps } from "@/lib/types";
import Button from "../Button";

const CreateBoardModal = ({ dialogRef, closeModal }: ModalProps) => {
  
  return (
    <dialog
      ref={dialogRef}
      className="bg-white rounded-xl max-w-md w-[90%] md:w-[70%] p-5 "
    >
      <form action="" className="flex flex-col gap-3 sm:px-10 w-[70%] mx-auto">
        <input
          type="text"
          className="border rounded"
          placeholder="Board Name"
        />
        <div className="flex justify-between">
          <Button
            value="Create"
            bgColor="#7B61FF"
            color="white"
            type="submit"
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

export default CreateBoardModal;
