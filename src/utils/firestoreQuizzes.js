import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

// Save quiz
export const saveQuizToFirestore = async (uid, quiz) => {
  const quizRef = doc(db, "users", uid, "quizzes", quiz.id);
  await setDoc(quizRef, quiz);
};

// Subscribe to quizzes (Real-time)
export const subscribeToUserQuizzes = (uid, callback) => {
  const colRef = collection(db, "users", uid, "quizzes");

  // onSnapshot returns an unsubscribe function
  return onSnapshot(colRef, (snapshot) => {
    const quizzes = snapshot.docs.map((doc) => doc.data());
    callback(quizzes);
  });
};

// Delete quiz
export const deleteQuizFromFirestore = async (uid, quizId) => {
  const quizRef = doc(db, "users", uid, "quizzes", quizId);
  await deleteDoc(quizRef);
};
