import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const CLOUD_NAME = "dvqs0ptc";
const UPLOAD_PRESET = "manthan_notes";

/*
=====================================
Upload Homework
=====================================
Attachment is OPTIONAL
=====================================
*/

export async function uploadHomework(formData) {
  let attachmentUrl = "";
  let attachmentName = "";
  let attachmentPublicId = "";

  // Upload only if a file is selected
  if (formData.file) {
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

    attachmentUrl = result.secure_url;
    attachmentName = formData.file.name;
    attachmentPublicId = result.public_id;
  }

  await addDoc(collection(db, "homeworks"), {
    title: formData.title,
    class: formData.class,
    subject: formData.subject,
    chapter: formData.chapter,
    description: formData.description,

    dueDate: formData.dueDate,

    attachmentUrl,
    attachmentName,
    attachmentPublicId,

    createdAt: serverTimestamp(),
  });
}