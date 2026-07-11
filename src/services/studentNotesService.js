import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

/* ---------------------- */
/* ADMIN - ALL NOTES */
/* ---------------------- */

export async function getAllNotes() {
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

/* ---------------------- */
/* STUDENT NOTES */
/* ---------------------- */

export async function getNotes(studentClass) {
  const q = query(
    collection(db, "notes"),
    where("class", "==", studentClass),
    orderBy("uploadedAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ---------------------- */

export async function getNote(id) {
  const snapshot = await getDoc(doc(db, "notes", id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateNote(id, data) {
  await updateDoc(doc(db, "notes", id), data);
}