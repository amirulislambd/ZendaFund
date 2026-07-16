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
  activeOnly?: boolean;
  status?: string;
};

export type GetCampaignsResponse = {
  campaigns: Campaign[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
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
export type Contribution = {
  id: string;

  campaign_id: string;
  campaign_title: string;

  Contribution_amount: number;

  paymentMethod?: "card" | "credits" | null;

  Supporter_name?: string;
  Supporter_email?: string;

  creator_name?: string;
  creator_email?: string;

  current_date: string;

  status: "pending" | "approved" | "rejected";
  message?: string;
  rejectionReason?: string;
};
export type GetMyContributionsResponse = {
  contributions: Contribution[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export interface Payment {
  _id: string;
  supporterEmail: string;
  credits: number;
  amountUsd: number;
  stripeSessionId: string;
  status: string;
  createdAt: string;
}

export interface SupporterStats {
  totalContributions: number;
  pendingContributions: number;
  totalAmountContributed: number;
  availableCredits: number;
}

export interface GetMyCampaignsResponse {
  success: boolean;
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface WithdrawalOverview {
  totalRaisedCredits: number;
  totalWithdrawnCredits: number;
  availableCredits: number;
  withdrawalAmount: number;
}

export interface CreatorDashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaisedCredits: number;
}

export interface CreatorDashboardResponse {
  stats: CreatorDashboardStats;
}

export interface Withdrawal {
  _id: string;
  creator_email: string;
  creator_name: string;

  withdrawal_credit: number;
  withdrawal_amount: number;

  payment_system: string;
  account_number: string;

  withdraw_date: string;

  status: "pending" | "approved";
}

export interface GetAdminWithdrawalsResponse {
  success: boolean;
  withdrawals: Withdrawal[];
}

interface Props {
  withdrawals: Withdrawal[];
}

export type GetUsersResponse = {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export interface Report {
  _id: string;
  campaign_id: string;
  campaign_title: string;
  reporter_name: string;
  reporter_email: string;
  reason: string;
  createdAt: string;
  campaign_status?: "active" | "suspended" | "deleted";
}

export type GetAdminReportsResponse = {
  success: boolean;
  data: Report[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export interface AdminCampaign extends Campaign {
  contributionsCount?: number;
  supportersCount?: number;
}

export type GetAdminCampaignsResponse = {
  success: boolean;
  data: AdminCampaign[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};