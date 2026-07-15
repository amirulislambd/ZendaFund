import WithdrawalRequestsTable from "@/components/dashboard/admin/WithdrawalRequestsTable";
import { GetAdminWithdrawals } from "@/lib/api/withdraw";

const WithdrawalRequestsPage = async () => {
  const response = await GetAdminWithdrawals();

  console.log(response);

  return (
    <div>
      <h1 className="text-2xl font-bold">Withdrawal Requests</h1>

      <WithdrawalRequestsTable withdrawals={response.withdrawals} />
    </div>
  );
};

export default WithdrawalRequestsPage;
