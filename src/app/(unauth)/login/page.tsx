"use client"
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { submitLoginForm } from "@/lib/utils";

const Page = () => {
  
  return (
    <form action={submitLoginForm} className="flex flex-col gap-3 w-[70%] ">
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/profile.svg"
          className="absolute pointer-events-none top-2 left-2"
          width="20"
          height="20"
        />
        <input type="text" className="border rounded w-full auth-form" name="username" placeholder="Username" />
      </div>
      <div className="relative">
        <Image
          alt="Padlock icon"
          src="/padlock.svg"
          className="absolute pointer-events-none top-2 left-2"
          width="20"
          height="20"
        />
        <input type="password" className="border rounded w-full auth-form" name="password" placeholder="Password"/>
      </div>
      <Button type="submit" classes="mt-4" value="Login" color="white" bgColor="#7B61FF" />
      <p className="mx-auto text-[12px] mt-4">
        Not a member?{" "}
        <Link href="/register" className="text-[#186FF4] font-semibold">
          Register now
        </Link>
      </p>
    </form>
  );
};

export default Page;
