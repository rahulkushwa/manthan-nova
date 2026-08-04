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

/* =====================================
   ADMIN - ALL HOMEWORK
===================================== */

export async function getAllHomework() {
  const q = query(
    collection(db, "homeworks"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* =====================================
   STUDENT HOMEWORK
===================================== */

export async function getHomework(studentClass) {
  const q = query(
    collection(db, "homeworks"),
    where("class", "==", String(studentClass)),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* =====================================
   SINGLE HOMEWORK
===================================== */

export async function getHomeworkById(id) {
  const snapshot = await getDoc(
    doc(db, "homeworks", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/* =====================================
   UPDATE HOMEWORK
===================================== */

export async function updateHomework(
  id,
  data
) {
  await updateDoc(
    doc(db, "homeworks", id),
    {
      title: data.title,
      class: data.class,
      subject: data.subject,
      chapter: data.chapter,
      description: data.description,
      dueDate: data.dueDate,
    }
  );
}