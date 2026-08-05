import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getFees } from "../services/feeService";

const FeesContext =
  createContext(null);

export function FeesProvider({
  children,
}) {
  const [fees, setFees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshFees() {
    try {
      setLoading(true);

      const data = await getFees();

      setFees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshFees();
  }, []);

  return (
    <FeesContext.Provider
      value={{
        fees,
        loading,
        refreshFees,
        setFees,
      }}
    >
      {children}
    </FeesContext.Provider>
  );
}

export function useFees() {
  const context =
    useContext(FeesContext);

  if (!context) {
    throw new Error(
      "useFees must be used inside FeesProvider."
    );
  }

  return context;
}