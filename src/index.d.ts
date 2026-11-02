// index.d.ts
import { ReactNode, FC, Context } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationTypes {
  success: 'success';
  error: 'error';
  warning: 'warning';
  info: 'info';
}

export interface NotificationAction {
  /** Button label */
  text: ReactNode;
  /** Called with the notification ID when the button is clicked */
  onClick: (notificationId: string) => void;
  /** Close the notification after the click (default: true) */
  closeOnClick?: boolean;
  /** Material UI Button variant (default: 'text') */
  variant?: 'text' | 'outlined' | 'contained';
}

export interface NotificationOptions {
  /** Auto-dismiss time in ms (default: 5000). Use Infinity to keep it open until closed. */
  duration?: number;
  /** Single action button (v2.0 style) */
  action?: NotificationAction | null;
  /** Multiple action buttons, shown after `action` if both are given */
  actions?: NotificationAction[] | null;
}

export interface WithActionOptions extends Omit<NotificationOptions, 'action'> {
  /** Close the notification after the action click (default: true) */
  closeOnClick?: boolean;
}

export interface Notification {
  id: string;
  message: ReactNode;
  type: NotificationType | string;
  /** The single `action` option as passed, or null */
  action: NotificationAction | null;
  /** All action buttons shown on the notification (`action` first, then `actions`) */
  actions: NotificationAction[];
  timestamp: Date;
}

export type ShowFn = (message: ReactNode, options?: NotificationOptions) => string;

export type ShowWithActionFn = (
  message: ReactNode,
  actionText: ReactNode,
  actionCallback: (notificationId: string) => void,
  options?: WithActionOptions
) => string;

export interface NotificationsContextValue {
  notifications: Notification[];
  addNotification: (message: ReactNode, type?: NotificationType | string, options?: NotificationOptions) => string;
  removeNotification: (id: string) => void;
  showSuccess: ShowFn;
  showError: ShowFn;
  showWarning: ShowFn;
  showInfo: ShowFn;
  showSuccessWithAction: ShowWithActionFn;
  showErrorWithAction: ShowWithActionFn;
  showWarningWithAction: ShowWithActionFn;
  showInfoWithAction: ShowWithActionFn;
}

export interface NotificationsProviderProps {
  children?: ReactNode;
}

export const notificationTypes: NotificationTypes;
export const NotificationsContext: Context<NotificationsContextValue | undefined>;
export const NotificationsProvider: FC<NotificationsProviderProps>;
export function useNotifications(): NotificationsContextValue;

// Demo component
export const NotificationsDemo: FC;

// Default export
export default NotificationsProvider;
