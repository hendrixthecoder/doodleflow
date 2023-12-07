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
  email: string,
  fullName: string,
  profilePic: string
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

export type ContextState = {
  setLoggedUser: (user: User) => void,
  user: User | null,
}

export type NewUser = {
  unparsedPassword?: string;
  unparsedConfpassword?: string;
  unparsedEmail?: string;
  unparsedFullName?: string;
  unparsedUsername?: string;
};

export interface LoginFormObject {
  email: string,
  password: string
}