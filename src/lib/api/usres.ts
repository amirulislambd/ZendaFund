import { GetUsersResponse } from "@/types";
import { ServerGet } from "../core/serverMutation";

export const GetUsers = async (
    page = 1,
    limit = 10,
    search = ""
  ): Promise<GetUsersResponse> => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
  
    return await ServerGet(
      `admin/users?${query.toString()}`
    );
  };

export const GetAllAdminCampaigns = async (page = 1, limit = 10, search = "") => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });
  return await ServerGet(`admin/campaigns?${query.toString()}`);
};

export const GetAdminReports = async (page = 1, limit = 10) => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  return await ServerGet(`admin/reports?${query.toString()}`);
};