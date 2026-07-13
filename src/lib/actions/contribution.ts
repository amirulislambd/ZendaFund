import { ServerMutation } from "../core/serverMutation";

export const Contribution = async (data: object) => {
    try {
        const res = await ServerMutation("contribution", data);
        return res;
    } catch (error) {
        console.log("Failed to add new contribution", error);
        return { status: 500, message: "Failed to reach server" };
    }
};