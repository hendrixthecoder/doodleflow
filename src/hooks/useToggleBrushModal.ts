import { useRef, useState } from "react";

export const useToggleBrushModal = () => {
  const brushModalRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleBrush = () => {
    if (brushModalRef.current) {
      const brushModal = brushModalRef.current;
      brushModal.toggleAttribute("open");
      setIsOpen(!isOpen)
    }
  };

  return { brushModalRef, toggleBrush, isOpen };
};
