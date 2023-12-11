"use client";
import { Board, User } from "@/lib/types";
import Image from "next/image";
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
import MenuDialog from "./dialogs/MenuDialog";
import InviteModal from "./modals/InviteModal";
import DeleteBoard from "./modals/DeleteBoard";
import Button from "./Button";
import { saveBoard } from "@/lib/utils";
import { socket } from "@/lib/tools";

const Board = ({ board }: { board: Board }) => {
  const {
    setLoggedUser,
    user,
    isSideBarOpen,
    toggleSideBar,
    collaborators,
    setCollaborators,
  } = useStateContext();
  const router = useRouter();

  const clear = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    socket.emit("clear")
  }

    const handleSave = async () => {
    try {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      if (!canvas) return;
      const boardData = canvas.toDataURL();

      await saveBoard(board.id, boardData);
      toast.success("Doodle saved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error saving board, try later.");
      }
    }
  };

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
        setLoggedUser({ ...userData, id: authUser.uid } as User);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const newUser = user;
    socket.emit("ready", newUser);

    socket.on("addNewUser", (user: User) => {
      setCollaborators((prevState) => {
        // Check if the user is already in the array
        const userExists = prevState.some((person) => person.id === user.id);

        // If not, add the new user to the array
        return userExists ? prevState : [...prevState, user];
      });
    });

    socket.on("removeUser", (newUser: User) => {
      setCollaborators((prevState) => {
        // Use filter to create a new array excluding the removed user
        const updatedCollaborators = prevState.filter(
          (person) => person.id !== newUser.id
        );

        return updatedCollaborators;
      });
    });

    //Send data of User leaving to server so they can be filtered out
    const handleBeforeUnload = () => {
      socket.emit("userLeft", newUser);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("addNewUser");
      socket.off("removeUser");
    };
  });

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
            {/* Mobile Menu*/}
            <MenuDialog board={board} />
            {/* Mobile Menu*/}

            {/* Large Menu */}
            <div className="flex gap-3">
              {board.userId === user.id && (
                <div className="max-sm:hidden">
                  <DeleteBoard board={board} />
                </div>
              )}
              <div className="max-sm:hidden">
                <InviteModal board={board} />
              </div>
              <div className="max-sm:hidden">
                <Button
                  color="red"
                  bgColor="white"
                  type="button"
                  value="Clear"
                  classes="border rounded text-xs"
                  action={clear}
                />
              </div>
              <div className="max-sm:hidden">
                <form action={handleSave}>
                  <Button
                    type="button"
                    classes="text-xs"
                    bgColor="#7B61FF"
                    color="white"
                    action={handleSave}
                    value="Save"
                  />
                </form>
              </div>
              {/* Large Menu */}
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
          <Canvas boardData={board.boardData} />
          <aside
            className={`fixed right-0 ${
              isSideBarOpen ? "w-[200px]" : "w-[55px]"
            } border shadow bottom-0 top-14 max-sm:hidden bg-white`}
          >
            <div
              className={`flex flex-col ${
                isSideBarOpen ? "" : "hidden"
              } gap-3 p-3`}
            >
              <div
                className="flex justify-between items-center rounded-md hover:border hover:bg-slate-100 cursor-pointer p-1 px-2"
                onClick={toggleSideBar}
              >
                <h2 className="font-bold">Online People</h2>
                <Image
                  width={10}
                  height={10}
                  alt="Arrow Right Icon"
                  src="/icons/arrow-right.svg"
                />
              </div>
              {collaborators.length >= 1 &&
                collaborators.map((collaborator) => (
                  <div
                    className="flex gap-3 items-center text-xs"
                    key={collaborator.id}
                  >
                    <Image
                      width={30}
                      height={10}
                      className="rounded-full"
                      src={collaborator.profilePic || "/icons/dummy.jpeg"}
                      alt="Profile Picture"
                    />
                    <span>{collaborator.fullName}</span>
                  </div>
                ))}
            </div>
            <div className="flex">
              <span
                onClick={toggleSideBar}
                className={`hover:bg-slate-100 ${
                  isSideBarOpen && "hidden"
                } rounded-md border text-[#9B9B9B] text-sm cursor-pointer p-1 px-2 transform rotate-90 mt-20 mr-4 -ml-8 whitespace-nowrap `}
              >
                Online People
              </span>
            </div>
          </aside>
          <Toaster />
        </>
      )}
    </>
  );
};

export default Board;
