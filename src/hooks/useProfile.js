import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getStudentProfile } from "../services/profileService";

export default function useProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getStudentProfile(user.uid);
        setProfile(data);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  return {
    profile,
    loading,
    setProfile,
  };
}