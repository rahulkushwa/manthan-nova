import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase/firestore";

export async function getStudentDashboardStats(
  studentClass
) {
  const [
    notesSnapshot,
    announcementSnapshot,
  ] = await Promise.all([
    getDocs(
      query(
        collection(db, "notes"),
        where("class", "==", String(studentClass)),
        orderBy("uploadedAt", "desc")
      )
    ),

    getDocs(
      query(
        collection(db, "announcements"),
        orderBy("createdAt", "desc"),
        limit(5)
      )
    ),
  ]);

  const notes = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const announcements =
    announcementSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  return {
    totalNotes: notes.length,

    recentNotes: notes.slice(0, 5),

    announcements,
  };
}