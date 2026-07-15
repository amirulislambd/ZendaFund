import WithdrawalStats from "@/components/dashboard/creator/WithdrawalStats";
import { GetWithdrawalOverview } from "@/lib/api/withdraw";

const WithdrawalsPage = async () => {
  const overview = await GetWithdrawalOverview();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-(--foreground)">Withdrawals</h1>

        <p className="mt-2 text-(--muted)">
          Manage your earnings and submit withdrawal requests.
        </p>
      </div>

      <WithdrawalStats overview={overview} />

      {/* Next Step */}
      {/* Withdrawal Form */}
    </section>
  );
};

export default WithdrawalsPage;
