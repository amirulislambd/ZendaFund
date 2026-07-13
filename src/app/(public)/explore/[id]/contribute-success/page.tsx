import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import { ConfirmContribution } from '@/lib/actions/contribution'
import { GetCampaign } from '@/lib/actions/campaign'

export const dynamic = 'force-dynamic'

interface ContributeSuccessPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ session_id?: string }>
}

export default async function ContributeSuccessPage({
  params,
  searchParams,
}: ContributeSuccessPageProps) {
  const { id } = await params
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if (session.status === 'open') {
    return redirect(`/explore/${id}`)
  }

  if (session.status === 'complete') {
    const meta = session.metadata

    await ConfirmContribution({
      campaign_id: meta?.campaignId ?? id,
      campaign_title: meta?.campaignTitle ?? '',
      Contribution_amount: Number(meta?.amount ?? 0),
      Supporter_email: meta?.supporterEmail ?? '',
      Supporter_name: meta?.supporterName ?? '',
      creator_name: meta?.creatorName ?? '',
      creator_email: meta?.creatorEmail ?? '',
      current_date: new Date().toISOString(),
      status: 'pending',
      stripeSessionId: session.id,
    })

    let campaignImage: string | undefined
    try {
      const { campaign } = await GetCampaign(id)
      campaignImage = campaign?.imageUrl
    } catch {
      campaignImage = undefined
    }

    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-(--border) bg-(--surface) p-8 text-center">
          {campaignImage ? (
            <div className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-2xl ring-4 ring-green-500/10">
              <img
                src={campaignImage}
                alt={meta?.campaignTitle ?? 'Campaign'}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <svg
                className="h-7 w-7 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <h1 className="mb-1.5 text-2xl font-semibold text-(--foreground)">
            Thank you for contributing
          </h1>
          <p className="mb-6 text-sm text-(--muted)">
            Your support means a lot to this campaign.
          </p>

          <div className="rounded-xl bg-(--surface-muted) p-5 text-left">
            <div className="mb-3 flex items-center justify-between border-b border-(--border) pb-3">
              <span className="text-xs text-(--muted)">Amount</span>
              <span className="text-xl font-semibold text-(--foreground)">
                {meta?.amount} credits
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-(--muted)">Campaign</span>
              <span className="max-w-[220px] text-right text-xs font-medium text-(--foreground)">
                {meta?.campaignTitle}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-(--muted)">Status</span>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                Pending approval
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-(--muted)">Transaction ID</span>
              <span className="max-w-[220px] truncate text-right text-[11px] font-mono text-(--muted)">
                {session.id}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-(--muted)">
            The creator will review this contribution. You'll see it reflected once approved.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/explore/${id}`}
              className="flex-1 rounded-xl border border-(--border) bg-(--surface-muted) py-2.5 text-sm font-semibold text-(--foreground) transition-colors hover:border-(--accent)"
            >
              View campaign
            </Link>
            <Link
              href="/dashboard/supporter/my-contributions"
              className="flex-1 rounded-xl bg-(--accent) py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              My contributions
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return null
}