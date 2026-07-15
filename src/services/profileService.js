import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const CLOUD_NAME = "dvqs0ptc";
const UPLOAD_PRESET = "manthan_notes";

export async function getStudentProfile(uid) {
  const q = query(
    collection(db, "students"),
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

export async function updateStudentProfile(
  id,
  data
) {
  await updateDoc(
    doc(db, "students", id),
    data
  );
}

/* ===========================
   Upload Profile Photo
=========================== */

export async function uploadProfilePhoto(
  file,
  studentId
) {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image.");
  }

  const result = await response.json();

  await updateDoc(
    doc(db, "students", studentId),
    {
      photoURL: result.secure_url,
    }
  );

  return result.secure_url;
}