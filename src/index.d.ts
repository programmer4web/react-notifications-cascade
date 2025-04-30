// index.d.ts
import { ReactNode, FC } from 'react';

export interface NotificationTypes {
  success: string;
  error: string;
  warning: string;
  info: string;
}

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

export interface NotificationsProviderProps {
  children: ReactNode;
}

export const notificationTypes: NotificationTypes;
export const NotificationsContext: React.Context<NotificationsContextValue | undefined>;
export const NotificationsProvider: FC<NotificationsProviderProps>;
export function useNotifications(): NotificationsContextValue;

// Demo component
export const NotificationsDemo: FC;

// Default export
export default NotificationsProvider;