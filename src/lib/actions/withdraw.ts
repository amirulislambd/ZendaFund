import { ServerMutation } from "../core/serverMutation";

export const CreateWithdrawal = async (payload: {
  withdrawal_credit: number;
  withdrawal_amount: number;
  payment_system: string;
  account_number: string;
}) => {
  return await ServerMutation("creator/withdrawals", payload, "POST");
};
export const ApproveWithdrawal = async (id: string) => {
  try {
    const res = await ServerMutation(
      `admin/withdrawals/${id}/approve`,
      {},
      "PATCH",
    );

    return res;
  } catch (error) {
    console.error("Failed to approve withdrawal", error);

    return {
      success: false,
      message: "Failed to approve withdrawal",
    };
  }
};