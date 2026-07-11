import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const CLOUD_NAME = "dvqs0ptc";
const UPLOAD_PRESET = "manthan_notes";

export async function uploadNote(formData) {
  const data = new FormData();

  data.append("file", formData.file);
  data.append("upload_preset", UPLOAD_PRESET);
  data.append("resource_type", "raw");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const result = await response.json();

  await addDoc(collection(db, "notes"), {
    title: formData.title,
    class: formData.class,
    subject: formData.subject,
    chapter: formData.chapter,
    description: formData.description,
    fileName: formData.file.name,
    pdfUrl: result.secure_url,
    publicId: result.public_id,
    uploadedAt: serverTimestamp(),
  });
}