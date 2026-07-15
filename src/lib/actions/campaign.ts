import type { Campaign, CampaignQuery, GetCampaignResponse } from "@/types";
import {
  ServerDelete,
  ServerGet,
  ServerMutation,
} from "../core/serverMutation";

export type GetCampaignsResponse = {
  campaigns: Campaign[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export const AddNewCampaign = async (data: object) => {
  try {
    const res = await ServerMutation("new/campaign", data);
    return res;
  } catch (error) {
    console.log("Failed to add new campaign", error);
    return { status: 500, message: "Failed to reach server" };
  }
};

// export const GetCampaigns = async (
//   params: CampaignQuery = {},
// ): Promise<GetCampaignsResponse> => {
//   try {
//     const query = new URLSearchParams();

//     if (params.q) query.set("q", params.q);
//     if (params.category) query.set("category", params.category);
//     if (params.page) query.set("page", String(params.page));
//     if (params.limit) query.set("limit", String(params.limit));
//     if (params.sort) query.set("sort", params.sort);

//     const url = `campaigns${query.toString() ? `?${query.toString()}` : ""}`;
//     const res = await ServerGet(url);
//     return res as GetCampaignsResponse;
//   } catch (error) {
//     console.error("Failed to get campaigns", error);
//     throw error;
//   }
// };

export const GetCampaigns = async (
  params: CampaignQuery = {},
): Promise<GetCampaignsResponse> => {
  try {
    const query = new URLSearchParams();

    if (params.q) query.set("q", params.q);
    if (params.category) query.set("category", params.category);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.sort) query.set("sort", params.sort);
    if (params.activeOnly) query.set("activeOnly", "true");
    if (params.status) {
      query.set("status", params.status);
    }

    const url = params.topFunded
      ? "campaigns/top-funded"
      : `campaigns${query.toString() ? `?${query.toString()}` : ""}`;

    const res = await ServerGet(url);
    return res as GetCampaignsResponse;
  } catch (error) {
    console.error("Failed to get campaigns", error);
    throw error;
  }
};
export const GetCampaign = async (id: string): Promise<GetCampaignResponse> => {
  try {
    const res = await ServerGet(`campaign/${id}`);
    return res as GetCampaignResponse;
  } catch (error) {
    console.error("Failed to get campaign", error);
    throw error;
  }
};
// update campaign by admin

export const UpdateCampaignStatus = async (
  campaignId: string,
  status: "approved" | "rejected",
  rejectionMessage?: string,
) => {
  try {
    const response = await ServerMutation(
      `admin/campaigns/${campaignId}/status`,
      { status, rejectionMessage },
      "PATCH",
    );

    if (response.status === 200) {
      return {
        status: 200,
        message: "Status updated successfully",
      };
    }

    return response;
  } catch (error) {
    console.error("Failed to update campaign status", error);
    throw error;
  }
};

export const RejectContribution = async (
  id: string,
  rejectionMessage: string,
) => {
  try {
    const response = await ServerMutation(
      `contributions/${id}/reject`,
      { rejectionMessage },
      "PATCH",
    );

    if (response.status === 200) {
      return {
        status: 200,
        message: "Contribution rejected successfully",
      };
    }

    return response;
  } catch (error) {
    console.error("Failed to reject contribution", error);
    throw error;
  }
};


// update campaign by creator
export const UpdateCampaign = async (id: string, data: object) => {
  try {
    const res = await ServerMutation(`campaigns/${id}`, data, "PATCH");
    return res;
  } catch (error) {
    console.error("Failed to update campaign", error);
    return { status: 500, message: "Failed to update campaign" };
  }
};

export const DeleteCampaign = async (id: string) => {
  const res = await ServerDelete(`creator/campaigns/${id}`);

  if (!res.ok) {
    throw new Error("Failed to delete campaign");
  }

  return await res.json();
};