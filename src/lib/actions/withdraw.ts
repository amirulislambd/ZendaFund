import { ServerMutation } from "../core/serverMutation";

export const CreateWithdrawal = async (payload: {
  withdrawal_credit: number;
  withdrawal_amount: number;
  payment_system: string;
  account_number: string;
}) => {
  return await ServerMutation("creator/withdrawals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};