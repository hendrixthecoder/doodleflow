"use client";

import { Board, BrushProps, ContextState, User } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const StateContext = createContext<ContextState | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<Board[] | []>([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const [collaborators, setCollaborators] = useState<User[]>([])
  const [brush, setBrush] = useState<BrushProps>({
    lineWidth: 5,
    color: "#000000",
  });

  const setLoggedUser = (userObject: User) => {
    setUser(userObject);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <StateContext.Provider
      value={{
        setLoggedUser,
        user,
        boards,
        setBoards,
        brush,
        setBrush,
        isSideBarOpen,
        toggleSideBar,
        collaborators,
        setCollaborators,
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
