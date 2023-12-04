import { ButtonProps } from "@/lib/types";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin']})

const Button = ({ value, bgColor, classes, color }: ButtonProps) => {
  return (
    <button
      className={`${montserrat.className} ${classes} shadow-2xl p-2 text-[16px] font-medium uppercase`}
      style={{ backgroundColor: bgColor, color }}
    >
      {value}
    </button>
  );
};

export default Button;
