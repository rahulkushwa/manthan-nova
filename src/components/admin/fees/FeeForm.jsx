// FeeForm.jsx (Part 1)

// Continue in next message. Do NOT close the component yet.

import { useEffect, useMemo, useState } from "react";

import GlassPanel from "../../ui/GlassPanel";
import GlassInput from "../../ui/GlassInput";
import Button from "../../ui/Button";

import {
  MONTHS,
  YEARS,
  PAYMENT_MODES,
  DEFAULT_FEE,
} from "../../../data/feeConstants";

import {
  calculateDueAmount,
  calculateFeeStatus,
  generateReceiptNumber,
  formatCurrency,
} from "../../../utils/feeUtils";

import {
  createFee,
  updateFee,
} from "../../../services/feeService";

export default function FeeForm({
  student,
  initialData = null,
  isEdit = false,
}) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(DEFAULT_FEE);

useEffect(() => {
  if (initialData) {
    setForm({
      month: initialData.month,
      year: initialData.year,
      totalAmount:
        initialData.totalAmount,
      paidAmount:
        initialData.paidAmount,
      paymentMode:
        initialData.paymentMode,
      remarks:
        initialData.remarks || "",
      receiptNo:
        initialData.receiptNo || "",
    });

    return;
  }

  setForm((prev) => ({
    ...prev,
    receiptNo:
      generateReceiptNumber(),
  }));
}, [initialData]);

  const dueAmount = useMemo(() => {
    return calculateDueAmount(
      form.totalAmount,
      form.paidAmount
    );
  }, [
    form.totalAmount,
    form.paidAmount,
  ]);

  const status = useMemo(() => {
    return calculateFeeStatus(
      form.totalAmount,
      form.paidAmount
    );
  }, [
    form.totalAmount,
    form.paidAmount,
  ]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!student) {
      alert("Select a student.");

      return;
    }

    if (!form.totalAmount) {
      alert(
        "Enter total fee amount."
      );

      return;
    }

    if (
      Number(form.paidAmount) >
      Number(form.totalAmount)
    ) {
      alert(
        "Paid amount cannot exceed total amount."
      );

      return;
    }

    try {
      setLoading(true);

      const payload = {
        studentId: student.id,
        studentName:
          student.name,

        class: student.class,

        board:
          student.board || "",

        month: form.month,

        year: form.year,

        totalAmount:
          form.totalAmount,

        paidAmount:
          form.paidAmount || 0,

        paymentMode:
          form.paymentMode,

        receiptNo:
          form.receiptNo,

        remarks:
          form.remarks,
      };

if (isEdit) {
  await updateFee(
    initialData.id,
    payload
  );
} else {
  await createFee(payload);
}

     alert(
  isEdit
    ? "Fee updated successfully."
    : "Fee added successfully."
);

      setForm({
        ...DEFAULT_FEE,
        receiptNo:
          generateReceiptNumber(),
      });

    } catch (err) {

      console.error(err);

      alert(
        "Unable to save fee."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <GlassPanel>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div>

          <h2 className="text-3xl font-bold">

            Fee Details

          </h2>

          <p className="mt-2 text-slate-500">

            Enter payment information.

          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">

              Month

            </label>

            <select
              name="month"
              value={form.month}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3"
            >

              {MONTHS.map((month) => (

                <option
                  key={month}
                  value={month}
                >

                  {month}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Year

            </label>

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3"
            >

              {YEARS.map((year) => (

                <option
                  key={year}
                  value={year}
                >

                  {year}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Total Fee

            </label>

            <GlassInput
              type="number"
              name="totalAmount"
              value={
                form.totalAmount
              }
              onChange={
                handleChange
              }
              placeholder="0"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Amount Paid

            </label>

            <GlassInput
              type="number"
              name="paidAmount"
              value={
                form.paidAmount
              }
              onChange={
                handleChange
              }
              placeholder="0"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Due Amount

            </label>

            <GlassInput
              value={formatCurrency(
                dueAmount
              )}
              readOnly
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Status

            </label>

            <GlassInput
              value={status}
              readOnly
            />

          </div>
          <div>

            <label className="mb-2 block font-medium">

              Payment Mode

            </label>

            <select
              name="paymentMode"
              value={form.paymentMode}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3"
            >

              {PAYMENT_MODES.map((mode) => (

                <option
                  key={mode}
                  value={mode}
                >

                  {mode}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Receipt No.

            </label>

            <GlassInput
              name="receiptNo"
              value={form.receiptNo}
              onChange={handleChange}
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Remarks

          </label>

          <textarea
            rows={5}
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Optional remarks..."
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600"
          />

        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

          <h3 className="text-xl font-bold">

            Payment Summary

          </h3>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-white p-4 shadow-sm">

              <p className="text-sm text-slate-500">

                Total Fee

              </p>

              <h4 className="mt-2 text-2xl font-black">

                {formatCurrency(
                  form.totalAmount
                )}

              </h4>

            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">

              <p className="text-sm text-slate-500">

                Paid

              </p>

              <h4 className="mt-2 text-2xl font-black text-green-600">

                {formatCurrency(
                  form.paidAmount
                )}

              </h4>

            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">

              <p className="text-sm text-slate-500">

                Due

              </p>

              <h4 className="mt-2 text-2xl font-black text-red-600">

                {formatCurrency(
                  dueAmount
                )}

              </h4>

            </div>

          </div>

        </div>

<div className="flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

  <div className="text-center sm:text-left">

    <p className="text-sm text-slate-500">
      Fee Status
    </p>

    <h3
      className={`mt-2 text-2xl font-black ${
        status === "Paid"
          ? "text-green-600"
          : status === "Partial"
          ? "text-orange-500"
          : "text-red-500"
      }`}
    >
      {status}
    </h3>

  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
  >
    {loading
      ? "Saving..."
      : isEdit
      ? "Update Fee"
      : "Save Fee"}
  </button>

</div>

      </form>

    </GlassPanel>
  );
}