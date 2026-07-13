import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { ConfirmCreditPurchase } from '@/lib/actions/payment'


export const dynamic = 'force-dynamic'

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  if (session.status === 'open') {
    return redirect('/dashboard/supporter/purchase-credit')
  }

  if (session.status === 'complete') {
    const customerEmail = session.customer_details?.email ?? null
    const credits = Number(session.metadata?.credits ?? 0)
    const amountUsd = (session.amount_total ?? 0) / 100

    // Stripe থেকে পাওয়া info + আমাদের site এর user info একসাথে backend এ পাঠাচ্ছি
    await ConfirmCreditPurchase({
      supporterEmail: customerEmail,
      credits,
      amountUsd,
      stripeSessionId: session.id,
    })

    return (
      <section className="mx-auto max-w-lg py-20 text-center">
        <h1 className="text-2xl font-bold text-(--foreground)">Payment successful!</h1>
        <p className="mt-2 text-(--muted)">
          We appreciate your support! {credits.toLocaleString()} credits have been added to your
          account. A confirmation email has been sent to {customerEmail}.
        </p>
      </section>
    )
  }

  return null
}