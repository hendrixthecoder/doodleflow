import { ModalProps } from "@/lib/types";
import Button from "../Button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useStateContext } from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const LogoutModal = ({ dialogRef, closeModal }: ModalProps) => {
  const router = useRouter()
  const { setLoggedUser } = useStateContext();
  const handleLogOut = () => {
    toast.success("Logged out successfully!")
    signOut(auth);
    setLoggedUser({ email: "", fullName: "", profilePic: "", username: "" });
    sessionStorage.removeItem("userId");
    router.push("/login")
  };

  return (
    <dialog
      ref={dialogRef}
      className="bg-white rounded-xl max-w-md w-[90%] md:w-[70%] p-5"
    >
      <form action="" className="flex flex-col gap-3 px-4 sm:px-10">
        <p className="text-xs text-center">
          Do you want to <span className="font-bold">Logout</span> from
          doodleflow?
        </p>
        <div className="flex gap-5 justify-center">
          <Button
            value="Yes"
            bgColor="#7B61FF"
            color="white"
            type="button"
            classes="px-5 sm:px-10"
            action={handleLogOut}
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
      <Toaster/>
    </dialog>
  );
};

export default LogoutModal;
