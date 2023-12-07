"use client"
import { ButtonProps } from "@/lib/types";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useFormStatus } from "react-dom";

const montserrat = Montserrat({ subsets: ['latin']})

const Button = ({ value, bgColor, classes, color, icon, action, type, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      {...rest}
      disabled={pending}
      className={`${montserrat.className} ${classes} ${pending ? 'opacity-50' : ''} disabled:bg-[#8a7fc7] disabled:cursor-not-allowed  rounded flex justify-center gap-2 shadow-2xl p-2 text-[16px] font-medium uppercase`}
      onClick={action}
      type={type}
      style={{ backgroundColor: bgColor, color }}
    >
      {icon && <Image src={icon} width={20} height={20} alt="Plus icon" />}
      {value}
    </button>
  );
};

export default Button;
