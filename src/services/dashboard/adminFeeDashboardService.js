import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/firestore";

/*
=========================================
Admin Fee Dashboard
=========================================
*/

export async function getAdminFeeDashboardStats() {
  const snapshot = await getDocs(
    collection(db, "fees")
  );

  const fees = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const totalFees = fees.length;

  const paidFees = fees.filter(
    (fee) => fee.status === "Paid"
  );

  const pendingFees = fees.filter(
    (fee) => fee.status === "Pending"
  );

  const totalCollected = paidFees.reduce(
    (sum, fee) => sum + Number(fee.amount || 0),
    0
  );

  const totalPending = pendingFees.reduce(
    (sum, fee) => sum + Number(fee.amount || 0),
    0
  );

  const recentPaymentsSnapshot = await getDocs(
    query(
      collection(db, "fees"),
      where("status", "==", "Paid"),
      orderBy("paymentDate", "desc"),
      limit(5)
    )
  );

  const recentPayments =
    recentPaymentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  return {
    totalFees,

    paidFees: paidFees.length,

    pendingFees: pendingFees.length,

    totalCollected,

    totalPending,

    collectionPercentage:
      totalFees === 0
        ? 0
        : Math.round(
            (paidFees.length / totalFees) * 100
          ),

    recentPayments,
  };
}