import { ServerMutation } from "../core/serverMutation";

export const AddNewCampaign = async (data: object) => {
  try {
    const res = await ServerMutation("new/campaign", data);
    return res;
  } catch (error) {
    console.log("Failed to add new campaign", error);
  }
};
