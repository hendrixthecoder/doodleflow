import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { NewUser, User } from "./types";

export const createUser = async (formData: FormData) => {
  const unparsedUsername = formData.get("username")?.toString();
  const unparsedPassword = formData.get("password")?.toString();
  const unparsedConfpassword = formData.get("confPassword")?.toString();
  const unparsedEmail = formData.get("email")?.toString();
  const unparsedFullName = formData.get("fullName")?.toString();

  if (unparsedPassword !== unparsedConfpassword)
    throw new Error("Password's don't match.");

  try {
    const { password, email, fullName, username } = parseInputFields({
      unparsedUsername,
      unparsedPassword,
      unparsedConfpassword,
      unparsedEmail,
      unparsedFullName,
    });

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      password,
      username,
      profilePic: "",
    });

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userFields = userSnap.data() as User;
    return { userId: user.uid, user: userFields }; //Return user information to use to set user state
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      const firebaseEror = error as FirebaseError;
      const errorMessage = firebaseEror.message;
      console.log(errorMessage);
      throw error;
    }
  }
};

const parseInputFields = (inputObject: NewUser) => {
  const {
    unparsedUsername,
    unparsedEmail,
    unparsedPassword,
    unparsedConfpassword,
    unparsedFullName,
  } = inputObject;
  if (
    !unparsedUsername ||
    !unparsedUsername ||
    !unparsedPassword ||
    !unparsedConfpassword ||
    !unparsedFullName ||
    !unparsedEmail
  ) {
    throw new Error("Invalid input field(s).");
  }

  return {
    username: unparsedUsername,
    email: unparsedEmail,
    password: unparsedPassword,
    confPassword: unparsedConfpassword,
    fullName: unparsedFullName,
  };
};
