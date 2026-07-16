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