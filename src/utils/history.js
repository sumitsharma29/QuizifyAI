import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function saveHistory(uid, historyItem) {
  const ref = doc(collection(db, "users", uid, "history"));
  await setDoc(ref, historyItem);
}

export async function loadHistory(uid) {
  const ref = collection(db, "users", uid, "history");
  const snap = await getDocs(ref);
  return snap.docs.map((d) => d.data());
}
