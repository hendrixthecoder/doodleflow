import { useRef } from "react"

export const useInviteModal = () => {
    const inviteModalRef = useRef<HTMLDialogElement>(null)
    const toggleModal = () => {
        const modal = inviteModalRef.current
        if (modal) {
            modal.hasAttribute("open")
                ? modal.close()
                : modal.showModal()
        }
    }

    return { inviteModalRef, toggleModal }
}