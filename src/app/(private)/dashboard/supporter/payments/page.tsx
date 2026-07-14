import type { Metadata } from "next";
import { GetPayments } from "@/lib/actions/payment";
import PaymentHistoryTable from "@/components/dashboard/PaymentHistoryTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payment History | ZendaFund",
  description: "View your credit purchase history on ZendaFund.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PaymentHistoryPage() {
  const { payments = [] } = await GetPayments();

  return (
    <div className=" ">
      <PaymentHistoryTable payments={payments} />
    </div>
  );
}
