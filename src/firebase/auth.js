import { getAuth } from "firebase/auth";
import app, { secondaryApp } from "./config";

// Main Authentication
const auth = getAuth(app);

// Secondary Authentication
export const secondaryAuth = getAuth(secondaryApp);

export default auth;