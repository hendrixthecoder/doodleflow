"use client";
import BoardsList from "@/components/BoardsList";
import Button from "@/components/Button";
import CreateBoardModal from "@/components/modals/CreateBoardModal";
import LogoutModal from "@/components/modals/LogoutModal";
import { auth, db } from "@/firebase";
import { montez } from "@/lib/fonts";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useStateContext } from "@/contexts/ContextProvider";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/lib/types";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { setLoggedUser, user } = useStateContext();
  const router = useRouter();

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

  const dialogRef = useRef<HTMLDialogElement>(null);
  const profileDialogRef = useRef<HTMLDialogElement>(null);

  const showModal = (dialogRef: React.RefObject<HTMLDialogElement>) => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = (dialogRef: React.RefObject<HTMLDialogElement>) => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      {user && (
        <main className="flex flex-col">
          <header className="border p-2 shadow flex items-center">
            <div className="grow flex justify-center">
              <p className={`${montez.className} text-[2rem]`}>DoodleFlow</p>
            </div>
            <div className="flex gap-4 items-center">
              <div
                className="border rounded-full p-2 cursor-pointer"
                onClick={() => showModal(profileDialogRef)}
              >
                <Image
                  src="/icons/logout.svg"
                  width={23}
                  height={23}
                  alt="Logout"
                />
              </div>
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
          <div className="p-[2rem] flex flex-col gap-10">
            {/* Modals */}
            <CreateBoardModal dialogRef={dialogRef} closeModal={closeModal} />
            <LogoutModal dialogRef={profileDialogRef} closeModal={closeModal} />
            <div>
              <Button
                classes="sm:px-10"
                icon="/icons/plus.svg"
                value="NEW BOARD"
                bgColor="#7B61FF"
                color="white"
                type="button"
                action={() => showModal(dialogRef)}
              />
            </div>

            <Suspense fallback="Loading...">
              <BoardsList showModal={showModal} closeModal={closeModal} />
            </Suspense>
          </div>
        </main>
      )}

      {/*Show a loading screen to transition from auth screen to login screen if not authenticated*/}
      {!user && <Loader />}
      <Toaster />
    </>
  );
}
