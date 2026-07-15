import { GetMyCampaignsResponse } from "@/types";
import { ServerGet } from "../core/serverMutation";

export const GetMyCampaigns = async (
  page = 1,
  limit = 10
): Promise<GetMyCampaignsResponse> => {
  try {
    const res = await ServerGet(
      `creator/campaigns/my-campaigns?page=${page}&limit=${limit}`
    );

    return res;
  } catch (error) {
    console.error("GetMyCampaigns:", error);

    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
};