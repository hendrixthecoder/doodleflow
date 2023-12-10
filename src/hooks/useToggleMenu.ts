import { useRef, useState } from "react";

export const useToggleBrushModal = () => {
  const menuDialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    if (menuDialogRef.current) {
      const brushModal = menuDialogRef.current;
      brushModal.toggleAttribute("open");
      setIsOpen(!isOpen);
    }
  };

  return { menuDialogRef, toggleMenu, isOpen };
};
