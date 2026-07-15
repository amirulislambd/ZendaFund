import { ServerGet } from "../core/serverMutation";

export const GetWithdrawalOverview = async () => {
    try {
      const response = await ServerGet(
        "creator/withdrawals/overview",
      );
  
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };