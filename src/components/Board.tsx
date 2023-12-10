"use client";
import { Board, User } from "@/lib/types";
import Image from "next/image";
import Button from "./Button";
import { useStateContext } from "@/contexts/ContextProvider";
import { auth, db } from "@/firebase";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Canvas from "./Canvas";
import Loader from "./Loader";
import BrushStateDialog from "./dialogs/BrushStateDialog";
import toast, { Toaster } from "react-hot-toast";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuDialog from "./dialogs/MenuDialog";

const Board = ({ board }: { board: Board }) => {
  const { setLoggedUser, user } = useStateContext();
  const router = useRouter();

  const handleShareBoard = () => {
    const boardLink = `${process.env.NEXT_PUBLIC_APP_URL}/boards/${board.id}`;
    if(!boardLink) return 
    navigator.clipboard.writeText(boardLink)
      .then(() => toast.success('Link copied successfully!'))
      .catch((error) => toast.error('Unable to copy link to clipboard. Please try again.'))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        // User is not authenticated, redirect to login
        router.push("/login");
      } else {
        // User is authenticated, fetch user data from Firestore
        const userRef = doc(db, "users", authUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        delete userData?.password;
        setLoggedUser(userData as User);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      {!user && <Loader />}

      {user && (
        <>
          <header className="border-b px-4 w-full justify-between flex shadow items-center">
            <div className="flex gap-3 items-center">
              <Link href="/">
                <Image
                  src="/icons/home.svg"
                  width={22}
                  height={18}
                  alt="Home button"
                />
              </Link>
              <div className="relative">
                <BrushStateDialog />
              </div>
            </div>
            <div className="">{board.name}</div>
            <MenuDialog board={board} />
            <div className="flex gap-3">
              <Button
                type="button"
                classes="border text-xs max-sm:hidden"
                bgColor="white"
                color="red"
                value="Delete"
              />
              <Button
                type="button"
                classes="text-xs max-sm:hidden"
                bgColor="#7B61FF"
                color="white"
                action={handleShareBoard}
                value="Share"
              />
              <div className="rounded-full overflow-hidden w-[40px]">
                <Image
                  alt="Profile picture"
                  className=""
                  width={40}
                  height={40}
                  src={user?.profilePic || "/icons/dummy.jpeg"}
                />
              </div>
            </div>
          </header>
          <Canvas />
          <Toaster />
        </>
      )}
    </>
  );
};

export default Board;
