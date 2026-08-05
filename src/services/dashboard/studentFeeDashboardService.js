import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase/firestore";

/*
=========================================
Student Fee Dashboard
=========================================
*/

export async function getStudentFeeDashboard(studentId) {
  const snapshot = await getDocs(
    query(
      collection(db, "fees"),
      where("studentId", "==", studentId)
    )
  );

  const fees = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const paidFees = fees.filter(
    (fee) => fee.status === "Paid"
  );

  const pendingFees = fees.filter(
    (fee) => fee.status === "Pending"
  );

  const totalPaid = paidFees.reduce(
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
      where("studentId", "==", studentId),
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

  const latestFee =
    fees.length > 0
      ? [...fees].sort((a, b) => {
          if (a.year !== b.year) {
            return b.year - a.year;
          }

          return 0;
        })[0]
      : null;

  return {
    totalFees: fees.length,

    paidFees: paidFees.length,

    pendingFees: pendingFees.length,

    totalPaid,

    totalPending,

    latestFee,

    recentPayments,
  };
}