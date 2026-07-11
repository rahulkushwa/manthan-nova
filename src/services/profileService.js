import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function getProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}