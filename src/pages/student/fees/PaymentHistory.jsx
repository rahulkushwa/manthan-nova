import { useEffect, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { useFees } from "../../../context/FeesContext";

import PageContainer from "../../../components/common/PageContainer";
import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import EmptyState from "../../../components/common/EmptyState";

import FeeHistoryTable from "../../../components/student/fees/FeeHistoryTable";
import ReceiptModal from "../../../components/student/fees/ReceiptModal";

export default function PaymentHistory() {
  const { user } = useAuth();

  const { refreshStudentFees } = useFees();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedReceipt, setSelectedReceipt] =
    useState(null);

  useEffect(() => {
    async function loadHistory() {
      if (!user) return;

      try {
        setLoading(true);

        const data =
          await refreshStudentFees(
            user.uid
          );

        setFees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user, refreshStudentFees]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Payment History"
        subtitle="View all your fee payments and download receipts."
      />

      {fees.length === 0 ? (
        <EmptyState
          title="No Payment History"
          description="Your payment history will appear here after fee records are created."
        />
      ) : (
        <>
          <FeeHistoryTable
            fees={fees}
            onViewReceipt={
              setSelectedReceipt
            }
          />

          <ReceiptModal
            open={Boolean(
              selectedReceipt
            )}
            fee={selectedReceipt}
            onClose={() =>
              setSelectedReceipt(
                null
              )
            }
          />
        </>
      )}
    </PageContainer>
  );
}