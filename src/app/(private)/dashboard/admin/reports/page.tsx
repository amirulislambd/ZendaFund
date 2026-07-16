import ReportsTable from "@/components/dashboard/admin/ReportsTable";
import { GetAdminReports } from "@/lib/api/usres";
import { Report } from "@/types";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ReportPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  let reports: Report[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let totalReports = 0;

  try {
    const response = await GetAdminReports(page, 10);
    if (response?.data) {
      reports = response.data;
      currentPage = response.pagination?.page ?? 1;
      totalPages = response.pagination?.totalPages ?? 1;
      totalReports = response.pagination?.total ?? 0;
    }
  } catch (err) {
    console.error("ReportPage:", err);
  }

  return (
    <ReportsTable
      reports={reports}
      currentPage={currentPage}
      totalPages={totalPages}
      totalReports={totalReports}
    />
  );
}