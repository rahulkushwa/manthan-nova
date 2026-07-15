import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

export async function getUser(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/*
-----------------------------------------
Find user by email
-----------------------------------------
*/

export async function findUserByEmail(email) {
  const snapshot = await getDocs(
    collection(db, "users")
  );

  const user = snapshot.docs.find((doc) => {
    const data = doc.data();

    return (
      data.email?.toLowerCase() ===
      email.toLowerCase()
    );
  });

  if (!user) {
    return null;
  }

  return {
    uid: user.id,
    ...user.data(),
  };
}