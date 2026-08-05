import {
  MONTHS,
  PAYMENT_STATUS_COLORS,
} from "../data/feeConstants";

/*
=========================================
Currency
=========================================
*/

export function formatCurrency(amount = 0) {
  return `₹${Number(amount).toLocaleString(
    "en-IN"
  )}`;
}

/*
=========================================
Current Month
=========================================
*/

export function getCurrentMonth() {
  return MONTHS[new Date().getMonth()];
}

/*
=========================================
Current Year
=========================================
*/

export function getCurrentYear() {
  return new Date().getFullYear();
}

/*
=========================================
Due Amount
=========================================
*/

export function calculateDueAmount(
  totalAmount,
  paidAmount
) {
  const total = Number(totalAmount || 0);

  const paid = Number(paidAmount || 0);

  return Math.max(total - paid, 0);
}

/*
=========================================
Status
=========================================
*/

export function calculateFeeStatus(
  totalAmount,
  paidAmount
) {
  const total = Number(totalAmount || 0);

  const paid = Number(paidAmount || 0);

  if (paid <= 0) {
    return "Pending";
  }

  if (paid >= total) {
    return "Paid";
  }

  return "Partial";
}

/*
=========================================
Status Badge
=========================================
*/

export function getStatusColor(status) {
  return (
    PAYMENT_STATUS_COLORS[status] ||
    "bg-slate-100 text-slate-700"
  );
}

/*
=========================================
Receipt Number
=========================================
*/

export function generateReceiptNumber() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `MN-${year}${month}${day}-${random}`;
}

/*
=========================================
Sort Fees
=========================================
*/

export function sortFees(fees = []) {
  return [...fees].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }

    return (
      MONTHS.indexOf(b.month) -
      MONTHS.indexOf(a.month)
    );
  });
}