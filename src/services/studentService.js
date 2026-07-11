import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

export async function addStudent(student) {
  await addDoc(collection(db, "students"), {
    ...student,
    createdAt: serverTimestamp(),
  });
}

export async function getStudents() {
  const q = query(
    collection(db, "students"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getStudent(id) {
  const snapshot = await getDoc(doc(db, "students", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateStudent(id, data) {
  await updateDoc(doc(db, "students", id), data);
}

export async function deleteStudent(id) {
  await deleteDoc(doc(db, "students", id));
}