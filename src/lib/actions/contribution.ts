"use server";
import { GetMyContributionsResponse } from "@/types";
import { ServerGet, ServerMutation } from "../core/serverMutation";

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

export const GetMyContributions = async (
  params: {
    page?: number;
    limit?: number;
    status?: "pending" | "approved" | "rejected";
  } = {},
): Promise<GetMyContributionsResponse> => {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.status) query.set("status", params.status);

    const url = `contributions/my-contributions${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await ServerGet(url);
    return res as GetMyContributionsResponse;
  } catch (error) {
    console.error("Failed to get my contributions", error);
    throw error;
  }
};

export const ApproveContribution = async (id: string) => {
  try {
    return await ServerMutation(`contributions/${id}/approve`, {}, "PATCH");
  } catch (error) {
    console.error("Failed to approve contribution", error);
    return { status: 500, message: "Failed to approve" };
  }
};

export const RejectContribution = async (id: string) => {
  try {
    return await ServerMutation(`contributions/${id}/reject`, {}, "PATCH");
  } catch (error) {
    console.error("Failed to reject contribution", error);
    return { status: 500, message: "Failed to reject" };
  }
};