import PendingCampaignTable from "@/components/dashboard/admin/PendingCampaignTable";
import { GetCampaigns } from "@/lib/actions/campaign";

const CampaignApprovalsPage = async () => {
  const response = await GetCampaigns({
    status: "pending",
    page: 1,
    limit: 10,
  });

  console.log(response);
  return (
    <div>
      <PendingCampaignTable campaigns={response.campaigns} />
    </div>
  );
};

export default CampaignApprovalsPage;
