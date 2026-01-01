import { doc, setDoc, getDocs, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

// Save a quiz attempt to Firestore
export const saveHistoryToFirestore = async (uid, history) => {
  const id = history.id || Date.now().toString();

  await setDoc(doc(db, "users", uid, "history", id), {
    ...history,
    id,
    timestamp: Date.now(),
  });
};

// Load user quiz history (sorted newest first)
export const loadUserHistory = async (uid) => {
  const q = query(
    collection(db, "users", uid, "history"),
    orderBy("timestamp", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

// Subscribe to history (Real-time)
export const subscribeToUserHistory = (uid, callback) => {
  const q = query(
    collection(db, "users", uid, "history"),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const history = snapshot.docs.map((doc) => doc.data());
    callback(history);
  });
};
