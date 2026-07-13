"use server";
import { ServerMutation } from "../core/serverMutation";

export const ConfirmContribution = async (data: {
  campaign_id: string;
  campaign_title: string;
  Contribution_amount: number;

  Supporter_email: string;
  Supporter_name: string;

  creator_name: string;
  creator_email: string;

  current_date: string;
  status: string;

  paymentMethod: "card" | "credits";

  stripeSessionId?: string;
}) => {
  try {
    const res = await ServerMutation("contribution", data);
    return res;
  } catch (error) {
    console.error("Failed to confirm contribution", error);
    return { status: 500, message: "Failed to save contribution" };
  }
};

export const ContributeWithCredits = async (data: {
  campaign_id: string;
  campaign_title: string;

  Contribution_amount: number;

  Supporter_email: string;
  Supporter_name: string;

  creator_name: string;
  creator_email: string;

  current_date: string;

  status: string;

  paymentMethod: "credits";
}) => {
  try {
    return await ServerMutation("contribution", data);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to contribute using credits",
    };
  }
};
