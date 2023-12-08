"use client"

import { Board, ContextState, User } from "@/lib/types";
import { createContext, useContext, useState } from "react";


const StateContext = createContext<ContextState | null>(null)


export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [boards, setBoards] = useState<Board[] | []>([])

    const setLoggedUser = (userObject: User) => {
        const user = JSON.stringify(userObject)
        localStorage.setItem("user", user)
        setUser(userObject)
    }

    return (
        <StateContext.Provider value={{ setLoggedUser, user, boards, setBoards }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = (): ContextState => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }
    
  return context;
};

