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
  const {
    temporaryPassword,
    ...studentData
  } = student;

  await addDoc(
    collection(db, "students"),
    {
      ...studentData,
      firstLogin: true,
      createdAt: serverTimestamp(),
    }
  );
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
  const snapshot = await getDoc(
    doc(db, "students", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateStudent(
  id,
  data
) {
  const {
    temporaryPassword,
    ...studentData
  } = data;

  await updateDoc(
    doc(db, "students", id),
    studentData
  );
}

export async function deleteStudent(id) {
  // Get student before deleting
  const studentRef = doc(db, "students", id);
  const studentSnapshot = await getDoc(studentRef);

  if (!studentSnapshot.exists()) {
    throw new Error("Student not found.");
  }

  const studentData = studentSnapshot.data();
  const uid = studentData.uid;

  // Delete users/{uid}
  if (uid) {
    await deleteDoc(
      doc(db, "users", uid)
    );
  }

  // Delete students/{studentId}
  await deleteDoc(studentRef);
}