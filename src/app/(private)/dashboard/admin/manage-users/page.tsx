// import ManageUsersTable from "@/components/dashboard/admin/ManageUsersTable";
import { GetUsers } from "@/lib/api/usres";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function ManageUsersPge({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";

  const response = await GetUsers(page, 10, search);
  console.log(response);

  return (
    // <ManageUsersTable
    //   users={response.users}
    //   currentPage={response.pagination.currentPage}
    //   totalPages={response.pagination.totalPages}
    //   totalUsers={response.pagination.totalUsers}
    // />
    <div>ManageUsersPge</div>
  );
}
