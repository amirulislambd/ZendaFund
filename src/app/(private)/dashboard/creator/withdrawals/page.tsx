import WithdrawalForm from "@/components/dashboard/creator/WithdrawalForm";
import WithdrawalStats from "@/components/dashboard/creator/WithdrawalStats";
import { GetWithdrawalOverview } from "@/lib/api/withdraw";

const WithdrawalsPage = async () => {
  const overview = await GetWithdrawalOverview();

    console.log(overview);

  return (
    <section className="space-y-6">
      <WithdrawalStats overview={overview.stats} />

      <WithdrawalForm availableCredits={overview.availableCredits} />
    </section>
  );
};

export default WithdrawalsPage;
