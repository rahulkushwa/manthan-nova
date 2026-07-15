import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useStudentProfile } from "./StudentProfileContext";

import { getStudentDashboardStats } from "../services/dashboard/studentDashboardService";

const StudentDashboardContext = createContext();

export function StudentDashboardProvider({
  children,
}) {
  const {
    profile,
  } = useStudentProfile();

  const [dashboard, setDashboard] = useState({
    totalNotes: 0,
    recentNotes: [],
    announcements: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const refreshDashboard = useCallback(async () => {
    if (!profile?.class) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getStudentDashboardStats(
          profile.class
        );

      setDashboard(data);

      setError(null);

    } catch (err) {

      console.error(err);

      setError(err);

    } finally {

      setLoading(false);

    }

  }, [profile]);

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  return (
    <StudentDashboardContext.Provider
      value={{
        dashboard,
        loading,
        error,
        refreshDashboard,
      }}
    >
      {children}
    </StudentDashboardContext.Provider>
  );
}

export function useStudentDashboard() {
  return useContext(
    StudentDashboardContext
  );
}