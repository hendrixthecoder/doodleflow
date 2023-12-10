import { useInviteModal } from "@/hooks/useInviteModal";
import Button from "../Button";
import { useState } from "react";
import { sendEmailTo } from "@/lib/utils";
import { Board } from "@/lib/types";
import { useStateContext } from "@/contexts/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const InviteModal = ({ board }: { board: Board }) => {
  const { inviteModalRef, toggleModal } = useInviteModal();
  const { user } = useStateContext();
  const [email, setEmail] = useState<string>("");

  const handleSendInvite = async () => {
    try {
      if (!user) return;
      const sender = user.fullName;
        await sendEmailTo(email, board, sender);
        setEmail("")
        toggleModal()
        toast.success("Invitation sent successfully!")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Error sending email, confirm email is valid and try later."
        );
      }
    }
  };

  return (
    <div className="flex ">
      <Button
        type="button"
        classes="text-xs"
        bgColor="#7B61FF"
        color="white"
        action={toggleModal}
        value="Share"
      />
      <dialog
        className="bg-white rounded-xl max-w-md w-[90%] md:w-[70%] p-5"
        ref={inviteModalRef}
      >
        <form
          action={handleSendInvite}
          className="flex flex-col gap-5 max-w-sm w-[80%] mx-auto"
        >
          <h3 className="text-sm">Invite your friend</h3>
          <input
            className="border rounded-md"
            type="text"
            placeholder="Enter the email of your friend"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              value="Send Invitation"
              color="white"
              bgColor="#7B61FF"
              classes="text-xs"
            />
            <Button
              type="button"
              value="Cancel"
              color="#7B61FF"
              bgColor="white"
              classes="text-xs border border-[#7B61FF]"
              action={toggleModal}
            />
          </div>
        </form>
      </dialog>
      <Toaster />
    </div>
  );
};

export default InviteModal;
