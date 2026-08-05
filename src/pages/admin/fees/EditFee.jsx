import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GlassPanel from "../../../components/ui/GlassPanel";
import FeeForm from "../../../components/admin/fees/FeeForm";

import { getFee } from "../../../services/feeService";

export default function EditFee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [fee, setFee] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadFee() {
      try {
        const data = await getFee(id);

        if (!data) {
          alert("Fee record not found.");

          navigate("/admin/fees/manage");

          return;
        }

        setFee(data);
      } catch (err) {
        console.error(err);

        alert("Unable to load fee.");
      } finally {
        setLoading(false);
      }
    }

    loadFee();
  }, [id, navigate]);

  if (loading) {
    return (
      <GlassPanel>

        <div className="py-20 text-center text-slate-500">

          Loading fee details...

        </div>

      </GlassPanel>
    );
  }

  if (!fee) {
    return null;
  }

  return (
    <div className="space-y-8">

      <GlassPanel>

        <h1 className="text-4xl font-black">

          Edit Fee

        </h1>

        <p className="mt-2 text-slate-500">

          Update the selected student's fee record.

        </p>

      </GlassPanel>

      <GlassPanel>

        <div className="grid gap-6 md:grid-cols-2">

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

        </div>

      </GlassPanel>

      <FeeForm
        student={{
          id: fee.studentId,
          name: fee.studentName,
          class: fee.class,
          board: fee.board,
        }}
        initialData={fee}
        isEdit
      />

    </div>
  );
}