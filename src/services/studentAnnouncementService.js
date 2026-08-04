import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

/*
=========================================
Get Student Announcements (Realtime)
=========================================
Shows:
- Student's class
- "All" announcements
- Pinned announcements first
=========================================
*/

export function subscribeStudentAnnouncements(
  studentClass,
  callback
) {
  const q = query(
    collection(db, "announcements"),
    orderBy("pinned", "desc"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const announcements = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((announcement) => {
        const target =
          String(
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

    callback(announcements);
  });
}