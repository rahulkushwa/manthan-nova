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

  const notesSnapshot = await getDocs(
    query(
      collection(db, "notes"),
      orderBy("uploadedAt", "desc"),
      limit(5)
    )
  );

  const studentSnapshot = await getDocs(
    query(
      collection(db, "students"),
      orderBy("createdAt", "desc"),
      limit(5)
    )
  );

  return {
    notes: notesCount.data().count,
    students: studentsCount.data().count,
    teachers: teachersCount.data().count,
    announcements: announcementsCount.data().count,

    recentNotes: notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),

    recentStudents: studentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  };
}