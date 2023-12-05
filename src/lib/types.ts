import { Dispatch, RefObject, SetStateAction } from "react";

export type ButtonProps = {
  value: string;
  bgColor: string;
  classes?: string;
  color: string;
  icon?: string;
  action?: () => void;
  type: "button" | "submit" | "reset" | undefined;
};

export type User = {
    username: string,
    password: string
}

export type Board = {
  id: string;
  name: string;
  showModal: (dialogRef: RefObject<HTMLDialogElement>) => void;
  setBoardToDelete: Dispatch<SetStateAction<string>>;
  deleteBoardRef: RefObject<HTMLDialogElement>;
};

export type ModalProps = {
  dialogRef: RefObject<HTMLDialogElement>,
  closeModal: (dialogRef: RefObject<HTMLDialogElement>) => void
  boardToDelete?: string
};
