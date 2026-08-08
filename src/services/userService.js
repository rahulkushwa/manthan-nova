import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

/**
 * Get a user by Firebase Authentication UID
 */
export async function getUser(uid) {
  const snapshot = await getDoc(
    doc(db, "users", uid)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/**
 * Create or update a user profile
 *
 * The document ID is the Firebase Authentication UID.
 */
export async function createUserProfile(
  uid,
  userData
) {
  await setDoc(
    doc(db, "users", uid),
    {
      uid,
      ...userData,
    },
    {
      merge: true,
    }
  );
}

/**
 * Find a user by email
 */
export async function findUserByEmail(email) {
  const snapshot = await getDocs(
    collection(db, "users")
  );

  const user = snapshot.docs.find(
    (docSnapshot) => {
      const data = docSnapshot.data();

      return (
        data.email?.toLowerCase() ===
        email.toLowerCase()
      );
    }
  );

  if (!user) {
    return null;
  }

  return {
    uid: user.id,
    ...user.data(),
  };
}