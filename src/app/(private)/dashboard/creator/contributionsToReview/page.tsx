import PendingContributionsTable from "@/components/dashboard/creator/PendingContributionsTable";
import { GetMyContributions } from "@/lib/actions/contribution";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function ContributionsToReviewPage({
  searchParams,
}: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);

  const response = await GetMyContributions({
    page: currentPage,
    status: "pending",
    limit: 10,
  });
  console.log(response);

  return (
    <section className="space-y-6">
    
      <PendingContributionsTable
        contributions={response.contributions}
        pagination={response.pagination}
      />
    </section>
  );
}
