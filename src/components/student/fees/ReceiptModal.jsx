import {
  X,
  Download,
  Receipt,
} from "lucide-react";

import {
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";

import FeeReceiptPDF from "../../../pdf/FeeReceiptPDF";

export default function ReceiptModal({
  open,
  fee,
  onClose,
}) {
  if (!open || !fee) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">

              <Receipt size={24} />

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Fee Receipt

              </h2>

              <p className="text-sm text-slate-500">

                {fee.studentName}

              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <PDFDownloadLink
              document={
                <FeeReceiptPDF
                  fee={fee}
                />
              }
              fileName={`Receipt-${fee.receiptNo || fee.id}.pdf`}
            >
              {({ loading }) => (
                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">

                  <Download size={18} />

                  {loading
                    ? "Preparing..."
                    : "Download"}

                </button>
              )}
            </PDFDownloadLink>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
            >

              <X size={20} />

            </button>

          </div>

        </div>

        {/* PDF */}

        <div className="flex-1 bg-slate-100">

          <PDFViewer
            width="100%"
            height="100%"
          >
            <FeeReceiptPDF
              fee={fee}
            />
          </PDFViewer>

        </div>

      </div>
    </div>
  );
}