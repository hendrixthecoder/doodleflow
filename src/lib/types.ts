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

export type BoardProps = {
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
  setLoggedUser: (user: User) => void;
  user: User | null;
  boards: Board[] | [];
  setBoards: Dispatch<SetStateAction<Board[] | []>>;
  brush: BrushProps;
  setBrush: Dispatch<SetStateAction<BrushProps>>;
  boardData: BoardData;
  setBoardData: Dispatch<SetStateAction<BoardData>>;
};

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

export type Board = {
  id: string,
  name: string,
  userId: string
}

export type BoardsListProps = {
  showModal: (dialogRef: RefObject<HTMLDialogElement>) => void;
  closeModal: (dialogRef: RefObject<HTMLDialogElement>) => void;
}

export type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}

export type DrawLineProps = Draw & {
  color: string
  lineWidth: number
}

export type Point = {
  x: number,
  y: number
}

export interface BrushProps {
  lineWidth: number,
  color: string
}

export type BoardData = {
  prevPoint: Point | null,
  currentPoint: Point
}[]