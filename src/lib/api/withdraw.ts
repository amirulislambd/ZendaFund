import { ServerGet } from "../core/serverMutation";

export const GetWithdrawalOverview = async () => {
  try {
    const response = await ServerGet("creator/withdrawals/overview");

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetCreatorWithdrawals = async (
  status?: string,
  page = 1,
  limit = 10,
) => {
  const query = new URLSearchParams();

  if (status) {
    query.append("status", status);
  }

  query.append("page", String(page));
  query.append("limit", String(limit));

  return await ServerGet(`creator/withdrawals?${query.toString()}`);
};