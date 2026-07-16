import ManageCampaignsTable from "@/components/dashboard/admin/ManageCampaignsTable";
import { GetAllAdminCampaigns } from "@/lib/api/usres";
import { AdminCampaign } from "@/types";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function ManageCampaignPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  let campaigns: AdminCampaign[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let totalCampaigns = 0;

  try {
    const response = await GetAllAdminCampaigns(page, 10, search);
    if (response?.data) {
      campaigns = response.data;
      currentPage = response.pagination?.page ?? 1;
      totalPages = response.pagination?.totalPages ?? 1;
      totalCampaigns = response.pagination?.total ?? 0;
    }
  } catch (err) {
    console.error("ManageCampaignPage:", err);
  }

  return (
    <ManageCampaignsTable
      campaigns={campaigns}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCampaigns={totalCampaigns}
    />
  );
}
