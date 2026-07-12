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
  const [
    notesCount,
    studentsCount,
    teachersCount,
    announcementsCount,
  ] = await Promise.all([
    getCountFromServer(collection(db, "notes")),
    getCountFromServer(collection(db, "students")),
    getCountFromServer(collection(db, "teachers")),
    getCountFromServer(collection(db, "announcements")),
  ]);

  const notesQuery = query(
    collection(db, "notes"),
    orderBy("uploadedAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(notesQuery);

  const recentNotes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    notes: notesCount.data().count,
    students: studentsCount.data().count,
    teachers: teachersCount.data().count,
    announcements: announcementsCount.data().count,
    recentNotes,
  };
}