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