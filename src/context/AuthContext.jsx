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
import { getStudentProfile } from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          try {
            setUser(currentUser);

            if (currentUser) {
              const firestoreUser =
                await getUser(currentUser.uid);

              if (
                firestoreUser?.role ===
                "student"
              ) {
                const student =
                  await getStudentProfile(
                    currentUser.uid
                  );

                setProfile(student);
              } else {
                setProfile(firestoreUser);
              }
            } else {
              setProfile(null);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
      );

    return unsubscribe;
  }, []);

  async function refreshProfile() {
    if (!user) return;

    const firestoreUser =
      await getUser(user.uid);

    if (
      firestoreUser?.role ===
      "student"
    ) {
      const student =
        await getStudentProfile(user.uid);

      setProfile(student);
    } else {
      setProfile(firestoreUser);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        logout,
        refreshProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}