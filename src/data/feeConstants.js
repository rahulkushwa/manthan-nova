export const FEE_STATUS = [
  "Pending",
  "Partial",
  "Paid",
];

export const PAYMENT_MODES = [
  "Cash",
  "UPI",
  "Bank Transfer",
  "Cheque",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const YEARS = Array.from(
  { length: 15 },
  (_, index) =>
    new Date().getFullYear() - 5 + index
);

export const DEFAULT_FEE = {
  month: MONTHS[new Date().getMonth()],
  year: new Date().getFullYear(),

  totalAmount: "",
  paidAmount: "",

  paymentMode: "Cash",

  remarks: "",

  receiptNo: "",
};

export const PAYMENT_STATUS_COLORS = {
  Pending:
    "bg-red-100 text-red-700",

  Partial:
    "bg-amber-100 text-amber-700",

  Paid:
    "bg-green-100 text-green-700",
};

export const PAYMENT_MODE_COLORS = {
  Cash:
    "bg-green-100 text-green-700",

  UPI:
    "bg-blue-100 text-blue-700",

  "Bank Transfer":
    "bg-purple-100 text-purple-700",

  Cheque:
    "bg-orange-100 text-orange-700",
};