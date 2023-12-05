import React from "react";



export const closeModal = (dialogRef: React.RefObject<HTMLDialogElement>) => {
  if (dialogRef.current) {
    dialogRef.current.close()
  }
};

export const showModal = (dialogRef: React.RefObject<HTMLDialogElement>) => {
  
  if (dialogRef.current) {
    dialogRef.current.showModal();
  }
};
