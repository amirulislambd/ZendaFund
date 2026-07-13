import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { ConfirmCreditPurchase } from "@/lib/actions/payment";

export const dynamic = "force-dynamic";

interface CreditSuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function CreditSuccessPage({
  searchParams,
}: CreditSuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Missing Stripe session id.");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect("/dashboard/supporter/credits");
  }

  if (session.status === "complete") {
    const meta = session.metadata;

    await ConfirmCreditPurchase({
      supporterEmail: meta?.supporterEmail ?? "",
      credits: Number(meta?.credits ?? 0),
      amountUsd: Number(meta?.amountUsd ?? 0),
      stripeSessionId: session.id,
    });

    return (
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-3xl border border-(--border) bg-(--surface) p-8 text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-(--foreground)">
            Payment Successful 🎉
          </h1>

          <p className="mt-3 text-(--muted)">
            Your credits have been added successfully.
          </p>

          <div className="mt-8 rounded-2xl bg-(--surface-muted) p-6">

            <div className="flex items-center justify-between border-b border-(--border) py-3">
              <span className="text-(--muted)">
                Credits Purchased
              </span>

              <span className="font-bold text-(--foreground)">
                {meta?.credits}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-(--border) py-3">
              <span className="text-(--muted)">
                Amount Paid
              </span>

              <span className="font-bold text-(--foreground)">
                ${meta?.amountUsd}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-(--muted)">
                Transaction ID
              </span>

              <span className="max-w-[170px] truncate text-xs">
                {session.id}
              </span>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/dashboard/supporter/credits"
              className="flex-1 rounded-xl border border-(--border) bg-(--surface-muted) py-3 font-semibold"
            >
              Buy More Credits
            </Link>

            <Link
              href="/dashboard/supporter/payments"
              className="flex-1 rounded-xl bg-(--accent) py-3 font-semibold text-white"
            >
              Payment History
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return null;
}