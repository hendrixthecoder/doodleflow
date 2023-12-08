"use client";
import { ModalProps } from "@/lib/types";
import Button from "../Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { createBoard } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useStateContext } from "@/contexts/ContextProvider";
import { useState } from "react";

const CreateBoardModal = ({ dialogRef, closeModal }: ModalProps) => {
  const [user] = useAuthState(auth)
  const [boardInput, setBoardInput] = useState<string>()
  const { boards, setBoards } = useStateContext()

  const handleCreate = async (formData: FormData) => {
    try {
      const newBoard = await createBoard(formData)
      setBoardInput("")
      setBoards([newBoard, ...boards])
      closeModal(dialogRef)
      toast.success("Board created successfully!")

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error creating board!")
      }
    }
  }
  
  return (
    <dialog
      ref={dialogRef}
      className="bg-white rounded-xl max-w-md w-[90%] md:w-[70%] p-5 "
    >
      <form action={handleCreate} className="flex flex-col gap-3 sm:px-10 w-[70%] mx-auto">
        <input
          type="text"
          name="name"
          className="border rounded"
          value={boardInput}
          onChange={(e) => setBoardInput(e.target.value)}
          
          placeholder="Board Name"
        />
        <input type="hidden" name="userId" value={user?.uid} />
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
