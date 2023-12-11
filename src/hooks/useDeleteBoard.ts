import { useRef, useState } from "react";

export const useDeleteBoard = () => {
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const toggleModal = () => {
    const modal = deleteModalRef.current;
    if (modal) {
      modal.hasAttribute("open") ? modal.close() : modal.showModal();
    }
  };

  return { deleteModalRef, toggleModal };
};
