import PendingCampaignTable from "@/components/dashboard/admin/PendingCampaignTable";
import { GetCampaigns } from "@/lib/actions/campaign";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

const CampaignApprovalsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const response = await GetCampaigns({
    status: "pending",
    page: currentPage,
    limit: 10,
  });

  return (
    <PendingCampaignTable
      campaigns={response.campaigns}
      currentPage={response.pagination?.page ?? 1}
      totalPages={response.pagination?.pages ?? 1}
      totalCampaigns={response.pagination?.total ?? 0}
    />
  );
};

export default CampaignApprovalsPage;