import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function getUserRole(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data();
}