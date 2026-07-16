import ManageUsersTable from "@/components/dashboard/admin/ManageUsersTable";
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

  let users = [];
  let currentPage = 1;
  let totalPages = 1;
  let totalUsers = 0;

  try {
    const response = await GetUsers(page, 10, search);
    if (response?.data) {
      users = response.data;
      currentPage = response.pagination?.page ?? 1;
      totalPages = response.pagination?.totalPages ?? 1;
      totalUsers = response.pagination?.total ?? 0;
    }
  } catch (err) {
    console.error("ManageUsersPge:", err);
  }

  return (
    <ManageUsersTable
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      totalUsers={totalUsers}
    />
  );
}
