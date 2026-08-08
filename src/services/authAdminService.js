import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { secondaryAuth } from "../firebase/auth";

/**
 * Creates a Firebase Authentication account
 * without affecting the currently logged-in admin.
 */
export async function createStudentAccount(
  loginEmail,
  temporaryPassword
) {
  const credential =
    await createUserWithEmailAndPassword(
      secondaryAuth,
      loginEmail,
      temporaryPassword
    );

  const user = credential.user;

  // Sign out only from the secondary auth instance.
  // The admin remains logged in on the main auth instance.
  await signOut(secondaryAuth);

  return user;
}