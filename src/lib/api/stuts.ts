import { CreatorDashboardResponse, SupporterStats } from "@/types";
import { ServerGet } from "../core/serverMutation";

// get supporter stats
export const GetSupporterStats = async (): Promise<SupporterStats> => {
  try {
    const res = await ServerGet("supporter/stats");
    return res as SupporterStats;
  } catch (error) {
    console.error("Failed to fetch supporter stats", error);
    return {
      totalContributions: 0,
      pendingContributions: 0,
      totalAmountContributed: 0,
      availableCredits: 0,
    };
  }
};

// get creator dashboard overview
export const GetCreatorDashboardOverview =
  async (): Promise<CreatorDashboardResponse> => {
    try {
      const res = await ServerGet("creator/dashboard-overview");

      return res as CreatorDashboardResponse;
    } catch (error) {
      console.error("Failed to fetch creator dashboard overview", error);

      return {
        stats: {
          totalCampaigns: 0,
          activeCampaigns: 0,
          totalRaisedCredits: 0,
        },
      };
    }
  };
