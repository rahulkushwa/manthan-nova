import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import {
  PDFDownloadLink,
} from "@react-pdf/renderer";

import Button from "../../../components/ui/Button";
import GlassPanel from "../../../components/ui/GlassPanel";
import ReceiptPreview from "../../../components/admin/fees/ReceiptPreview";

import {
  getFee,
} from "../../../services/feeService";

import FeeReceiptPDF from "../../../pdf/FeeReceiptPDF";

export default function FeeReceipt() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [fee, setFee] =
    useState(null);

  useEffect(() => {

    async function loadReceipt() {

      try {

        const data = await getFee(id);

        if (!data) {

          alert("Receipt not found.");

          navigate("/admin/fees/manage");

          return;

        }

        setFee(data);

      } catch (err) {

        console.error(err);

        alert("Unable to load receipt.");

      } finally {

        setLoading(false);

      }

    }

    loadReceipt();

  }, [id, navigate]);

  if (loading) {

    return (

      <GlassPanel>

        <div className="py-24 text-center text-slate-500">

          Loading Receipt...

        </div>

      </GlassPanel>

    );

  }

  if (!fee) return null;

  return (

    <div className="mx-auto max-w-6xl space-y-8">

      {/* Top Buttons */}

      <div className="flex items-center justify-between">

        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >

          <ArrowLeft
            size={18}
            className="mr-2"
          />

          Back

        </Button>

   

       <PDFDownloadLink
  document={<FeeReceiptPDF fee={fee} />}
  fileName={`Receipt-${fee.receiptNo || fee.id}.pdf`}
>
  {({ loading }) => (
    <Button>
      {loading ? "Preparing PDF..." : "Download PDF"}
    </Button>
  )}
</PDFDownloadLink>

      </div>
     <ReceiptPreview fee={fee} />

    </div>

  );

}