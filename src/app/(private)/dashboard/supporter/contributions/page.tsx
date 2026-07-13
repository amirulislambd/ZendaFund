import ContributionsView from "@/components/dashboard/supporter/Contributionsview";
import { GetMyContributions } from "@/lib/actions/contribution";

export const dynamic = "force-dynamic";

type ContributionPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Contributions | ZendaFund",
  description:
    "View all of your campaign contributions and supporter activity.",
};

export default async function ContributionPage({
  searchParams,
}: ContributionPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);

  const { contributions, pagination } = await GetMyContributions({
    page,
    limit: 10,
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Table */}
      <div className="mt-6">
        <ContributionsView
          contributions={contributions}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
