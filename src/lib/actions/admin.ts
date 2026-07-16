"use server";

import { ServerDelete, ServerGet, ServerMutation } from "../core/serverMutation";

// ─── Users ────────────────────────────────────────────────────────────────────

export const DeleteUser = async (userId: string) => {
  try {
    const res = await ServerDelete(`admin/users/${userId}`);
    return res;
  } catch (error) {
    console.error("DeleteUser:", error);
    return { success: false, message: "Failed to delete user" };
  }
};

export const UpdateUserRole = async (
  userId: string,
  role: "admin" | "creator" | "supporter"
) => {
  try {
    const res = await ServerMutation(
      `admin/users/${userId}/role`,
      { role },
      "PATCH"
    );
    return res;
  } catch (error) {
    console.error("UpdateUserRole:", error);
    return { success: false, message: "Failed to update role" };
  }
};

// ─── Campaigns ────────────────────────────────────────────────────────────────

export const AdminDeleteCampaign = async (campaignId: string) => {
  try {
    const res = await ServerDelete(`admin/campaigns/${campaignId}`);
    return res;
  } catch (error) {
    console.error("AdminDeleteCampaign:", error);
    return { success: false, message: "Failed to delete campaign" };
  }
};

// ─── Reports ──────────────────────────────────────────────────────────────────

export const GetReports = async (page = 1, limit = 10) => {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const res = await ServerGet(`admin/reports?${query.toString()}`);
    return res;
  } catch (error) {
    console.error("GetReports:", error);
    return { success: false, data: [], pagination: { page: 1, totalPages: 1, total: 0 } };
  }
};

export const SuspendReportedCampaign = async (campaignId: string) => {
  try {
    const res = await ServerMutation(
      `admin/campaigns/${campaignId}/suspend`,
      {},
      "PATCH"
    );
    return res;
  } catch (error) {
    console.error("SuspendReportedCampaign:", error);
    return { success: false, message: "Failed to suspend campaign" };
  }
};

export const DeleteReportedCampaign = async (campaignId: string) => {
  try {
    const res = await ServerDelete(`admin/campaigns/${campaignId}`);
    return res;
  } catch (error) {
    console.error("DeleteReportedCampaign:", error);
    return { success: false, message: "Failed to delete campaign" };
  }
};
