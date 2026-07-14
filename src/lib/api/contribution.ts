import { ServerGet } from "../core/serverMutation";
export const GetPendingContributions = async (
  page = 1,
  limit = 10
) => {
  try {
    const res = await ServerGet (
      `/creator/contributions/pending?page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch pending contributions");
    }

    return await res.json();
  } catch (error) {
    console.error("GetPendingContributions:", error);

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