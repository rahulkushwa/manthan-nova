import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const announcementsRef = collection(db, "announcements");

export async function createAnnouncement(data) {
  await addDoc(announcementsRef, {
    title: data.title,
    message: data.message,
    targetClass: data.targetClass || "All",
    pinned: data.pinned || false,
    createdAt: serverTimestamp(),
  });
}

export async function updateAnnouncement(id, data) {
  await updateDoc(doc(db, "announcements", id), {
    title: data.title,
    message: data.message,
    targetClass: data.targetClass,
    pinned: data.pinned,
  });
}

export async function deleteAnnouncement(id) {
  await deleteDoc(doc(db, "announcements", id));
}

export async function getAnnouncements() {
  const q = query(
    announcementsRef,
    orderBy("pinned", "desc"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export function subscribeAnnouncements(callback) {
  const q = query(
    announcementsRef,
    orderBy("pinned", "desc"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}