"use server";
import nodemailer from "nodemailer"
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
  updateDoc,
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
    const newBoardRef = await addDoc(boardsCollection, {
      name: boardName,
      userId: userId,
      boardData: ''
    });

    const boardDoc = await getDoc(newBoardRef)

    return { ...boardDoc.data(), id: newBoardRef.id } as Board
    
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

    const board = boardSnapshot.data();
    return { ...board, id } as Board;

  } catch (error) {
    notFound();
  }
};


export const saveBoard = async (boardId: string, data: string) => {
  try {
    if (!boardId) throw new Error('Invalid request!')
    if(!data) throw new Error('Make changes before trying to save!')
    
    const boardCollection = collection(db, "boards")
    const boardRef = doc(boardCollection, boardId)
    const boardSnapshot = await getDoc(boardRef)

    if (!boardSnapshot.exists()) throw new Error('Board does not exist')
    await updateDoc(boardRef, { boardData: data })

  } catch (error) {
    throw error
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
    pass: process.env.NEXT_PUBLIC_MAIL_APP_PASSWORD,
  },
});

export const sendEmailTo = async (email: string, board: Board, sender: string) => {
  try {
    if (!email) throw new Error('Email field is required!')
    if(!sender) throw new Error('Invalid request!')
    
    const emailLink = `${process.env.NEXT_PUBLIC_APP_URL}/boards/${board.id}`;
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_ADDRESS

    const emailOptions = {
      from: fromEmail,
      to: email,
      subject: "Invitation to collaborate",
      text: `Greetings, you've been invited by ${sender} on Doodleflow to collaborate on a board. Please click this link to create an account if you do not have one ${process.env.NEXT_PUBLIC_APP_URL}. If you do click this to join in and collaborate: ${emailLink}`,
    };

    await transporter.sendMail(emailOptions)
    
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    
    throw error
  }
}
