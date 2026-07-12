import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import auth from "../firebase/auth";
import { getUser } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          setUser(currentUser);

          if (currentUser) {
            const userProfile = await getUser(currentUser.uid);
            setProfile(userProfile);
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error("Auth Error:", error);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}