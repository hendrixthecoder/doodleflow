"use client";
import Image from "next/image";
import Button from "../Button";
import { createUser } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const SignUpForm = () => {
  const { setLoggedUser } = useStateContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLoginForm = async (formData: FormData) => {
    try {
      const { user, userId } = await createUser(formData);
      toast.success("Account created successfully!");
      setLoggedUser({ ...user, id: userId });
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error signing up, try later.");
      }
    }
  };

  return (
    <form action={handleLoginForm} className="flex flex-col gap-3 w-[90%] ">
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/icons/profile.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="text"
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="fullName"
          placeholder="Full Name"
          required
        />
      </div>
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/icons/profile.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="text"
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="username"
          placeholder="Username"
          required
        />
      </div>
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/icons/email.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="email"
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="relative">
        <Image
          alt="Padlock icon"
          src="/icons/padlock.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type={showPassword ? "text" : "password"}
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="password"
          placeholder="Password"
          required
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-xs right-2 z-10 top-1 sm:top-2 text-[#6F6F6F]"
        >
          {showPassword ? (
            <VisibilityOffOutlinedIcon />
          ) : (
            <VisibilityOutlinedIcon />
          )}
        </div>
      </div>
      <div className="relative">
        <Image
          alt="Padlock icon"
          src="/icons/padlock.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2 "
          width="20"
          height="20"
        />
        <input
          type={showPassword ? "text" : "password"}
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="confPassword"
          placeholder="Confirm Password"
          required
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-xs right-2 z-10 top-1 sm:top-2 text-[#6F6F6F]"
        >
          {showPassword ? (
            <VisibilityOffOutlinedIcon />
          ) : (
            <VisibilityOutlinedIcon />
          )}
        </div>
      </div>
      <Button
        type="submit"
        classes="mt-4"
        value="Register"
        color="white"
        bgColor="#7B61FF"
      />
      <Toaster />
    </form>
  );
};

export default SignUpForm;
