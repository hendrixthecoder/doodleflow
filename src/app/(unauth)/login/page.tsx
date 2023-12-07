"use client";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { LoginFormObject, User } from "@/lib/types";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";
import { useStateContext } from "@/contexts/ContextProvider";
import { toast, Toaster } from 'react-hot-toast'
import { doc, getDoc } from "firebase/firestore";


const Page = () => {
  const { setLoggedUser, user } = useStateContext()
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()
  const [formBody, setFormBody] = useState<LoginFormObject>({
    email: "",
    password: "",
  });

  const { email, password } = formBody;

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(email, password) as UserCredential;
      sessionStorage.setItem("userId", user.uid)
      
      const userDocRef = doc(db, "users", user.uid)
      const userDocSnapshot = await getDoc(userDocRef)
      const userData = userDocSnapshot.data() as User
      toast.success("Logged in successfully!")
      
      setFormBody({ email: "", password: "" });
      setLoggedUser({ ...user, ...userData })

      router.push("/")

    } catch (error) {
      const firebaseError = error as FirebaseError
      console.log(firebaseError.message);
      
      toast.error("Invalid credentials!")
    }
  };

  return (
    <form action={handleLogin} className="flex flex-col gap-3 w-[90%] ">
      <div className="relative">
        <Image
          alt="Profile icon"
          src="/profile.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2"
          width="20"
          height="20"
        />
        <input
          value={email}
          onChange={(e) => setFormBody({ ...formBody, email: e.target.value })}
          type="email"
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="email"
          required
          placeholder="Email"
        />
      </div>
      <div className="relative">
        <Image
          alt="Padlock icon"
          src="/padlock.svg"
          className="absolute pointer-events-none top-1 sm:top-2 left-2"
          width="20"
          height="20"
        />
        <input
          onChange={(e) =>
            setFormBody({ ...formBody, password: e.target.value })
          }
          value={password}
          type="password"
          className="border rounded w-full auth-form text-xs sm:text-base placeholder:text-xs"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <Button
        type="submit"
        classes="mt-4"
        value="Login"
        color="white"
        bgColor="#7B61FF"
      />
      <p className="mx-auto text-[12px] mt-4">
        Not a member?{" "}
        <Link href="/register" className="text-[#186FF4] font-semibold">
          Register now
        </Link>
      </p>
      <Toaster />
    </form>
  );
};

export default Page;
