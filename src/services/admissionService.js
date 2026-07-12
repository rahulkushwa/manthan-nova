import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

export async function submitAdmission(data) {
  await addDoc(
    collection(db, "admissionEnquiries"),
    {
      ...data,
      status: "Pending",
      createdAt: serverTimestamp(),
    }
  );
}