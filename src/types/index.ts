export interface Campaign {
  _id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  minimumContribution: number;
  raisedAmount: number;
  deadline: string;
  rewardInfo: string;
  imageUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  creatorEmail?: string;
  creatorName?: string;
  creatorImage?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "creator" | "supporter";
  credits: number;
  image?: string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  credits?: number;
  profilePic?: string;
}

export function getDashboardPath(role?: string) {
  const normalized = (role ?? "").toLowerCase();
  if (normalized === "admin") return "/dashboard/admin";
  if (normalized === "creator") return "/dashboard/creator";
  return "/dashboard/supporter";
}

export interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "supporter" | "creator";
  avatar?: FileList;
}

// --- Campaign Types ---

export const CAMPAIGN_CATEGORIES = [
  "Technology",
  "Art",
  "Community",
  "Health",
  "Sustainability",
  "Education",
] as const;

export type CampaignCategory = (typeof CAMPAIGN_CATEGORIES)[number];

export type CampaignStatus = "draft" | "pending" | "approved" | "rejected";

export interface CampaignFormData {
  campaign_title: string;
  campaign_story: string;
  category: CampaignCategory;
  funding_goal: number;
  minimum_contribution: number;
  deadline: string;
  reward_info: string;
  campaign_image_url: string;
}

export type CampaignQuery = {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
  topFunded?: boolean;
};

export type GetCampaignsResponse = {
  campaigns: Array<{
    id: string;
    title: string;
    coverImage: string;
    totalAmountRaised: number;
  }>;
  maxRaisedAmount?: number;
};

export type GetCampaignResponse = {
  campaign: Campaign;
};

export interface PurchaseCreditProps {
  user: {
    id: string;
    name: string;
    email: string;
    credits: number;
    role: string;
    image?: string;
  } | null;

  packages: readonly {
    id: string;
    credits: number;
    priceUsd: number;
  }[];
}