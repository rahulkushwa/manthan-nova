import {
  collection,
  getCountFromServer,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

/* ======================================
   ADMIN DASHBOARD
====================================== */

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

  const students = studentSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    notes: notesCount.data().count,

    students: studentsCount.data().count,

    teachers: teachersCount.data().count,

    announcements:
      announcementsCount.data().count,

    activeStudents: students.filter(
      (student) =>
        student.status === "active"
    ).length,

    inactiveStudents: students.filter(
      (student) =>
        student.status === "inactive"
    ).length,

    recentNotes: notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),

    recentStudents: students,
  };
}

/* ======================================
   STUDENT DASHBOARD
====================================== */

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

  const notes = notesSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(
      (note) =>
        String(note.class) ===
        String(studentClass)
    );

  return {
    totalNotes: notes.length,

    recentNotes: notes.slice(0, 5),

    announcements:
      announcementSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
  };
}