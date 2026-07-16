import { ServerGet } from "../core/serverMutation";

export type Testimonial = {
    supporterName: string;
    supporterImage?: string | null;
    campaignId: string;
    campaignTitle: string;
    campaignImage?: string | null;
    contributionAmount: number;
  };
  
  export type GetTestimonialsResponse = {
    testimonials: Testimonial[];
  };
  
  export const GetTestimonials = async (limit = 10): Promise<GetTestimonialsResponse> => {
    try {
      const res = await ServerGet(`testimonials?limit=${limit}`);
      return res as GetTestimonialsResponse;
    } catch (error) {
      console.error("Failed to get testimonials", error);
      return { testimonials: [] };
    }
  };

  export type PlatformStats = {
    totalRaised: number;
    totalCampaignsFunded: number;
    totalSupporters: number;
    totalContributions: number;
  };
  
  export const GetPlatformStats = async (): Promise<PlatformStats> => {
    try {
      const res = await ServerGet("platform/stats");
      return res as PlatformStats;
    } catch (error) {
      console.error("Failed to get platform stats", error);
      return {
        totalRaised: 0,
        totalCampaignsFunded: 0,
        totalSupporters: 0,
        totalContributions: 0,
      };
    }
  };