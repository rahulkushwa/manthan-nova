import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GlassPanel from "../../../components/ui/GlassPanel";
import GlassInput from "../../../components/ui/GlassInput";
import Button from "../../../components/ui/Button";

import {
  PAYMENT_MODES,
} from "../../../data/feeConstants";

import {
  formatCurrency,
} from "../../../utils/feeUtils";

import {
  getFee,
  recordPayment,
} from "../../../services/feeService";

export default function RecordPayment() {
  const { id } = useParams();
    console.log("Fee ID:", id);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [fee, setFee] =
    useState(null);

  const [payment, setPayment] =
    useState({
      amount: "",
      paymentMode: "Cash",
      remarks: "",
    });

  useEffect(() => {
    async function loadFee() {
      try {
       console.log("Loading fee:", id);

        const data = await getFee(id);

        console.log("Fee Data:", data);

        if (!data) {
          alert("Fee record not found.");

          navigate("/admin/fees/manage");

          return;
        }

        setFee(data);
      }
      catch (err) {
        console.error("RecordPayment Error:", err);
        alert("Unable to load fee.");
      } 
      finally {
        setLoading(false);
      }
    }

    loadFee();
  }, [id, navigate]);

  const remainingAfterPayment =
    useMemo(() => {
      if (!fee) return 0;

      return (
        Number(fee.dueAmount) -
        Number(payment.amount || 0)
      );
    }, [fee, payment.amount]);

  function handleChange(e) {
    const { name, value } = e.target;

    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !payment.amount ||
      Number(payment.amount) <= 0
    ) {
      alert(
        "Enter payment amount."
      );

      return;
    }

    if (
      Number(payment.amount) >
      Number(fee.dueAmount)
    ) {
      alert(
        "Payment exceeds due amount."
      );

      return;
    }

    try {
      setSaving(true);

     await recordPayment(
  fee.id,
  payment
);

console.log("Payment saved");

console.log(
  "Going to:",
  `/admin/fees/receipt/${fee.id}`
);

alert("Payment recorded successfully.");

navigate(
  `/admin/fees/receipt/${fee.id}`,
  { replace: true }
);

return;
    } catch (err) {
      console.error(err);

      alert(
        "Unable to record payment."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <GlassPanel>

        <div className="py-20 text-center text-slate-500">

          Loading fee details...

        </div>

      </GlassPanel>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">

      {/* Header */}

      <GlassPanel>

  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>

      <h1 className="text-3xl font-black sm:text-4xl">

          Record Payment

        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">

  Add a new payment for this student's fee.

</p>

    </div>

    <div className="flex w-full items-center justify-center rounded-2xl bg-emerald-100 px-5 py-3 font-semibold text-emerald-700 sm:w-auto">

      Payment

    </div>

  </div>

</GlassPanel>

      {/* Student Details */}

      <GlassPanel>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>

            <p className="text-sm text-slate-500">

              Student

            </p>

            <h2 className="mt-2 text-2xl font-bold">

              {fee.studentName}

            </h2>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Class

            </p>

            <h2 className="mt-2 text-2xl font-bold">

              {fee.class}

            </h2>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Month

            </p>

            <h2 className="mt-2 text-xl font-bold">

              {fee.month} {fee.year}

            </h2>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Status

            </p>

            <h2 className="mt-2 text-xl font-bold">

              {fee.status}

            </h2>

          </div>

        </div>

      </GlassPanel>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <GlassPanel>

          <p className="text-slate-500">

            Total Fee

          </p>

          <h2 className="mt-3 text-3xl font-black">

            {formatCurrency(
              fee.totalAmount
            )}

          </h2>

        </GlassPanel>

        <GlassPanel>

          <p className="text-slate-500">

            Paid

          </p>

          <h2 className="mt-3 text-3xl font-black text-green-600">

            {formatCurrency(
              fee.paidAmount
            )}

          </h2>

        </GlassPanel>

        <GlassPanel>

          <p className="text-slate-500">

            Due

          </p>

          <h2 className="mt-3 text-3xl font-black text-red-600">

            {formatCurrency(
              fee.dueAmount
            )}

          </h2>

        </GlassPanel>

      </div>

      <GlassPanel>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >          
        <div>

            <label className="mb-2 block font-medium">

              Payment Amount

            </label>

            <GlassInput
              type="number"
              name="amount"
              value={payment.amount}
              onChange={handleChange}
              placeholder="Enter payment amount"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Payment Mode

            </label>

            <select
              name="paymentMode"
              value={payment.paymentMode}
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

              Remarks

            </label>

            <textarea
              rows={4}
              name="remarks"
              value={payment.remarks}
              onChange={handleChange}
              placeholder="Optional remarks..."
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600"
            />

          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

            <h3 className="text-xl font-bold">

              Payment Preview

            </h3>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div>

                <p className="text-sm text-slate-500">

                  Current Due

                </p>

                <h4 className="mt-2 text-2xl font-black text-red-600">

                  {formatCurrency(
                    fee.dueAmount
                  )}

                </h4>

              </div>

              <div>

                <p className="text-sm text-slate-500">

                  Payment

                </p>

                <h4 className="mt-2 text-2xl font-black text-green-600">

                  {formatCurrency(
                    payment.amount || 0
                  )}

                </h4>

              </div>

              <div>

                <p className="text-sm text-slate-500">

                  Remaining Due

                </p>

                <h4 className="mt-2 text-2xl font-black text-blue-600">

                  {formatCurrency(
                    Math.max(
                      remainingAfterPayment,
                      0
                    )
                  )}

                </h4>

              </div>

            </div>

          </div>

          <div className="pt-2">

  <Button
    type="submit"
    loading={saving}
    className="w-full sm:w-auto"
  >
    Record Payment
  </Button>

</div>

        </form>

      </GlassPanel>

    </div>
  );
}