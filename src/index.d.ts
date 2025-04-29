import { ReactNode, FC } from 'react';

export interface NotificationType {
  success: string;
  error: string;
  warning: string;
  info: string;
}

export const notificationTypes: NotificationType;

export interface Notification {
  id: string;
  message: string;
  type: string;
  timestamp: Date;
}

export interface NotificationsContextValue {
  notifications: Notification[];
  addNotification: (message: string, type?: string) => string;
  removeNotification: (id: string) => void;
  showSuccess: (message: string) => string;
  showError: (message: string) => string;
  showWarning: (message: string) => string;
  showInfo: (message: string) => string;
}

export const NotificationsContext: React.Context<NotificationsContextValue>;

export interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: FC<NotificationsProviderProps>;

export function useNotifications(): NotificationsContextValue;

export default NotificationsProvider;