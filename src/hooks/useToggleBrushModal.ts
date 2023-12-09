import { useRef } from "react";

export const useToggleBrushModal = () => {
  const brushModalRef = useRef<HTMLDialogElement>(null);

  const toggleBrush = () => {
    if (brushModalRef.current) {
      const brushModal = brushModalRef.current;
      brushModal.toggleAttribute("open");
    }
  };

  return { brushModalRef, toggleBrush };
};
