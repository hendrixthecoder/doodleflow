import Button from "@/components/Button";
import Image from "next/image";

const page = () => {
  return (
    <form action="" className="flex flex-col gap-3 w-[70%] ">
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/profile.svg"
          className="absolute pointer-events-none top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="text"
          className="border rounded w-full auth-form"
          placeholder="Username"
        />
      </div>
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/email.svg"
          className="absolute pointer-events-none top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="email"
          className="border rounded w-full auth-form"
          placeholder="Email"
        />
      </div>
      <div className="relative">
        <Image
          alt="Padlock icon"
          src="/padlock.svg"
          className="absolute pointer-events-none top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="text"
          className="border rounded w-full auth-form"
          placeholder="Password"
        />
      </div>
      <div className="relative">
        <Image
          alt="Padlock icon"
          src="/padlock.svg"
          className="absolute pointer-events-none top-2 left-2"
          width="20"
          height="20"
        />
        <input
          type="text"
          className="border rounded w-full auth-form"
          placeholder="Confirm Password"
        />
      </div>
      <Button
        type="submit"
        classes="mt-4"
        value="Register"
        color="white"
        bgColor="#7B61FF"
      />
    </form>
  );
};

export default page;
