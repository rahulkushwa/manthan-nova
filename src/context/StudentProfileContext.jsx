import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getStudentProfile,
} from "../services/profileService";

const StudentProfileContext =
  createContext();

export function StudentProfileProvider({
  children,
}) {
  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const data =
          await getStudentProfile(
            user.uid
          );

        setProfile(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  async function refreshProfile() {
    if (!user) return;

    const data =
      await getStudentProfile(
        user.uid
      );

    setProfile(data);
  }

  return (
    <StudentProfileContext.Provider
      value={{
        profile,
        setProfile,
        refreshProfile,
        loading,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile() {
  return useContext(
    StudentProfileContext
  );
}