import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/firestore";

export async function getStudentDashboardStats(
  studentClass
) {
  const [
    notesSnapshot,
    homeworkSnapshot,
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
        collection(db, "homeworks"),
        where("class", "==", String(studentClass)),
        orderBy("createdAt", "desc")
      )
    ),

    getDocs(
      query(
        collection(db, "announcements"),
        orderBy("pinned", "desc"),
        orderBy("createdAt", "desc")
      )
    ),
  ]);

  /* ================= NOTES ================= */

  const notes = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  /* ================= HOMEWORK ================= */

  const homework = homeworkSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  /* ================= ANNOUNCEMENTS ================= */

  const announcements = announcementSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((announcement) => {
      const target = String(
        announcement.targetClass || ""
      ).trim();

      return (
        target === "All" ||
        target === "ALL" ||
        target === "all" ||
        target ===
          String(studentClass).trim()
      );
    });

  return {
    /* Notes */

    totalNotes: notes.length,

    recentNotes: notes.slice(0, 5),

    /* Homework */

    totalHomework: homework.length,

    recentHomework: homework.slice(0, 3),

    /* Announcements */

    announcements: announcements.slice(0, 5),
  };
}