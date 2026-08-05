import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const feesRef = collection(db, "fees");

/*
=========================================
Helpers
=========================================
*/

function getStatus(totalAmount, paidAmount) {
  if (paidAmount <= 0) return "Pending";

  if (paidAmount >= totalAmount) return "Paid";

  return "Partial";
}

/*
=========================================
Create Fee
=========================================
*/

export async function createFee(data) {
  const totalAmount = Number(data.totalAmount);
  const paidAmount = Number(data.paidAmount || 0);
  const dueAmount = totalAmount - paidAmount;

  await addDoc(feesRef, {
    studentId: data.studentId,
    studentName: data.studentName,

    class: data.class,
    board: data.board || "",

    month: data.month,
    year: Number(data.year),

    totalAmount,
    paidAmount,
    dueAmount,

    status: getStatus(totalAmount, paidAmount),

    paymentMode: paidAmount > 0
      ? data.paymentMode
      : "",

    paymentDate:
      paidAmount > 0
        ? serverTimestamp()
        : null,

    receiptNo:
      data.receiptNo || "",

    remarks:
      data.remarks || "",

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  });
}

/*
=========================================
Get All Fees
=========================================
*/

export async function getFees() {
  const q = query(
    feesRef,
    orderBy("year", "desc"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/*
=========================================
Get Single Fee
=========================================
*/

export async function getFee(id) {
  const snapshot = await getDoc(
    doc(db, "fees", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/*
=========================================
Update Fee
=========================================
*/

export async function updateFee(id, data) {
  const totalAmount = Number(data.totalAmount);

  const paidAmount = Number(
    data.paidAmount || 0
  );

  const dueAmount =
    totalAmount - paidAmount;

  await updateDoc(
    doc(db, "fees", id),
    {
      studentId: data.studentId,
      studentName: data.studentName,

      class: data.class,
      board: data.board || "",

      month: data.month,
      year: Number(data.year),

      totalAmount,
      paidAmount,
      dueAmount,

      status: getStatus(
        totalAmount,
        paidAmount
      ),

      paymentMode:
        paidAmount > 0
          ? data.paymentMode
          : "",

      paymentDate:
        paidAmount > 0
          ? serverTimestamp()
          : null,

      receiptNo:
        data.receiptNo || "",

      remarks:
        data.remarks || "",

      updatedAt:
        serverTimestamp(),
    }
  );
}

/*
=========================================
Delete Fee
=========================================
*/

export async function deleteFee(id) {
  await deleteDoc(
    doc(db, "fees", id)
  );
}

/*
=========================================
Record Payment
=========================================
*/

export async function recordPayment(
  id,
  payment
) {
  const fee = await getFee(id);

  if (!fee) {
    throw new Error(
      "Fee record not found."
    );
  }

  const paidAmount =
    Number(fee.paidAmount) +
    Number(payment.amount);

  const dueAmount =
    Number(fee.totalAmount) -
    paidAmount;

  await updateDoc(
    doc(db, "fees", id),
    {
      paidAmount,

      dueAmount,

      status: getStatus(
        Number(fee.totalAmount),
        paidAmount
      ),

      paymentMode:
        payment.paymentMode,

      paymentDate:
        serverTimestamp(),

      remarks:
        payment.remarks ||
        fee.remarks,

      updatedAt:
        serverTimestamp(),
    }
  );
}

/*
=========================================
Student Fees
=========================================
*/

export async function getStudentFees(
  studentId
) {
  const q = query(
    feesRef,
    where(
      "studentId",
      "==",
      studentId
    ),
    orderBy("year", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/*
=========================================
Pending Fees
=========================================
*/

export async function getPendingFees() {
  const q = query(
    feesRef,
    where(
      "status",
      "in",
      ["Pending", "Partial"]
    )
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/*
=========================================
Paid Fees
=========================================
*/

export async function getPaidFees() {
  const q = query(
    feesRef,
    where(
      "status",
      "==",
      "Paid"
    )
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/*
=========================================
Fees By Class
=========================================
*/

export async function getFeesByClass(
  studentClass
) {
  const q = query(
    feesRef,
    where(
      "class",
      "==",
      String(studentClass)
    )
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}