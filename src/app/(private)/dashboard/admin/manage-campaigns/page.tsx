import { GetUsers } from "@/lib/api/usres";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

const ManageCampaignPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";

  const response = await GetUsers(page, 10, search);
  console.log(response);

  return (
    <div>
      <h1>Manage Campaign</h1>
    </div>
  );
};

export default ManageCampaignPage;
