import { ServerMutation } from "../core/serverMutation";

export const ConfirmCreditPurchase = async (data: {
  supporterEmail: string | null;
  credits: number;
  amountUsd: number;
  stripeSessionId: string;
}) => {
  try {
    const res = await ServerMutation("payments/confirm", data);
    return res;
  } catch (error) {
    console.error("Failed to confirm credit purchase", error);
    return { status: 500, message: "Failed to save payment" };
  }
};