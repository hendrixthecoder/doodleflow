"use server";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Board, NewUser, User } from "./types";
import { notFound } from "next/navigation";

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

export const fetchBoards = async (userId: string) => {
  const boardQuery = query(
    collection(db, "boards"),
    where("userId", "==", userId)
  );
  const boardsSnapshot = await getDocs(boardQuery);

  const boards = boardsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Board[];

  return boards;
};

export const createBoard = async (formData: FormData) => {
  try {
    const { boardName, userId } = parseBoardFields(formData);
    // Get the Firestore collection reference for "boards"
    const boardsCollection = collection(db, "boards");

    // Add a new document to the "boards" collection
    const newBoardDoc = await addDoc(boardsCollection, {
      name: boardName,
      userId: userId,
    });

    // You can return the ID of the newly created board if needed
    return { id: newBoardDoc.id, name: boardName } as Board;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};

const parseBoardFields = (formData: FormData) => {
  const boardName = formData.get("name");
  const userId = formData.get("userId");

  if (!boardName || !userId) throw new Error("Board name is required!");
  return { boardName, userId };
};

export const fetchBoard = async (id: string) => {
  try {
    if (!id) throw new Error("Invalid board id!");

    const boardRef = doc(db, "boards", id);
    const boardSnapshot = await getDoc(boardRef);

    if (!boardSnapshot.exists()) throw new Error("Board not found!");
    const boardData = boardSnapshot.data();
    return { ...boardData, id } as Board;

  } catch (error) {
    notFound();
  }
};
