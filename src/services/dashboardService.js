import {
  collection,
  getCountFromServer,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

export async function getDashboardStats() {
  const notesCount = await getCountFromServer(
    collection(db, "notes")
  );

  let recentNotes = [];

  const q = query(
    collection(db, "notes"),
    orderBy("uploadedAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(q);

  recentNotes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    notes: notesCount.data().count,
    students: 0,
    teachers: 0,
    announcements: 0,
    recentNotes,
  };
}