import { SupporterStats } from "@/types";
import { ServerGet } from "../core/serverMutation";

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