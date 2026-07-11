import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function getNotes() {
  const q = query(
    collection(db, "notes"),
    orderBy("uploadedAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}