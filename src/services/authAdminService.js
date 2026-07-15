import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import auth from "../firebase/auth";

export async function createStudentAccount(
  email,
  password
) {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  return credential.user;
}
