import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { useFees } from "../../../context/FeesContext";

import PageContainer from "../../../components/common/PageContainer";
import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import EmptyState from "../../../components/common/EmptyState";

import FeeStats from "../../../components/student/fees/FeeStats";
import FeeProgress from "../../../components/student/fees/FeeProgress";
import OutstandingCard from "../../../components/student/fees/OutstandingCard";
import FeeHistoryTable from "../../../components/student/fees/FeeHistoryTable";
import ReceiptModal from "../../../components/student/fees/ReceiptModal";

export default function Fees() {
  const { user } = useAuth();

  const { refreshStudentFees } =
    useFees();

  const [fees, setFees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedReceipt,
    setSelectedReceipt,
  ] = useState(null);

  useEffect(() => {
    async function loadFees() {
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

    loadFees();
  }, [user, refreshStudentFees]);

  const stats = useMemo(() => {
    const totalFees = fees.reduce(
      (sum, fee) =>
        sum + Number(fee.totalAmount),
      0
    );

    const totalPaid = fees.reduce(
      (sum, fee) =>
        sum + Number(fee.paidAmount),
      0
    );

    const totalDue = fees.reduce(
      (sum, fee) =>
        sum + Number(fee.dueAmount),
      0
    );

    const completion =
      totalFees > 0
        ? Math.round(
            (totalPaid /
              totalFees) *
              100
          )
        : 0;

    const pendingFees =
      fees.filter(
        (fee) =>
          fee.status !== "Paid"
      );

    const nextDueMonth =
      pendingFees.length > 0
        ? `${pendingFees[0].month} ${pendingFees[0].year}`
        : "-";

    return {
      totalFees,
      totalPaid,
      totalDue,
      completion,
      pendingFees,
      nextDueMonth,
    };
  }, [fees]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="My Fees"
        subtitle="Track your fee payments, dues and payment history."
      />

      {fees.length === 0 ? (
        <EmptyState
          title="No Fee Records"
          description="Your fee records will appear here once they are created."
        />
      ) : (
        <>
          <div className="space-y-8">
            <FeeStats
              stats={{
                totalFees:
                  stats.totalFees,
                totalPaid:
                  stats.totalPaid,
                totalDue:
                  stats.totalDue,
                completion:
                  stats.completion,
                nextDueMonth:
                  stats.nextDueMonth,
              }}
            />

            <div className="grid gap-8 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <FeeProgress
                  totalFees={
                    stats.totalFees
                  }
                  totalPaid={
                    stats.totalPaid
                  }
                  completion={
                    stats.completion
                  }
                />
              </div>

              <OutstandingCard
                totalDue={
                  stats.totalDue
                }
                nextDueMonth={
                  stats.nextDueMonth
                }
                pendingFees={
                  stats.pendingFees
                }
              />
            </div>

            <FeeHistoryTable
              fees={fees}
              onViewReceipt={
                setSelectedReceipt
              }
            />
          </div>

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