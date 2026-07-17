
import { ServerGet, ServerMutation } from "../core/serverMutation";

export interface NotificationPayload {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: NotificationPayload[];
}

/**
 * Get Notifications
 */
export const GetNotifications =
  async (): Promise<NotificationsResponse> => {
    return await ServerGet("notifications");
  };

/**
 * Mark Notification As Read
 */
export const MarkNotificationRead = async (
  id: string
) => {
  return await ServerMutation(
    `notifications/${id}/read`,
    {
      method: "PATCH",
    }
  );
};

/**
 * Delete Notification
 */
export const DeleteNotification = async (
  id: string
) => {
  return await ServerMutation(
    `notifications/${id}`,
    {
      method: "DELETE",
    }
  );
};