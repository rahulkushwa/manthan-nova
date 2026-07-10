import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import auth from "./auth";

export async function login(
  email,
  password
) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logout() {
  return await signOut(auth);
}