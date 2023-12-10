"use client";

import { Board, BoardData, BrushProps, ContextState, User } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const StateContext = createContext<ContextState | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<Board[] | []>([]);
  const [boardData, setBoardData] = useState<BoardData>([]);
  const [brush, setBrush] = useState<BrushProps>({
    lineWidth: 5,
    color: "#000000",
  });

  const setLoggedUser = (userObject: User) => {
    const user = JSON.stringify(userObject);
    localStorage.setItem("user", user);
    setUser(userObject);
  };

  return (
    <StateContext.Provider
      value={{
        setLoggedUser,
        user,
        boards,
        setBoards,
        brush,
        setBrush,
        boardData,
        setBoardData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): ContextState => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }

  return context;
};
