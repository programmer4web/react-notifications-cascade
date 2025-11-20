import React, { useState } from 'react';
  import { Alert, Snackbar, Stack, Button, IconButton } from '@mui/material';
  import { Slide } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';

  // Unique ID generator for notifications
  const generateId = () => Math.floor(Math.random() * 1000000).toString();

  // Main Notifications Context
  export const NotificationsContext = React.createContext();

  // Notification types with their respective colors
  export const notificationTypes = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  // Slide transition component
  function SlideUpTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  // Component to display notifications
  const NotificationsContainer = ({ notifications, removeNotification }) => {
    return (
      <Stack
        spacing={1}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          maxWidth: '90%',
          width: 'auto',
        }}
      >
        {notifications.map(notification => (
          <Snackbar
            key={notification.id}
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={SlideUpTransition}
            sx={{
              position: 'relative',
              bottom: 'auto',
              right: 'auto'
            }}
          >
            <Alert
              severity={notification.type}
              variant="filled"
              sx={{ width: '100%', boxShadow: 3 }}
              action={
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* Action button (optional) */}
                  {notification.action && (
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => {
                        notification.action.onClick();
                        // Optionally auto-close after action
                        if (notification.action.closeOnClick !== false) {
                          removeNotification(notification.id);
                        }
                      }}
                      sx={{
                        whiteSpace: 'nowrap',
                        fontWeight: 'bold'
                      }}
                    >
                      {notification.action.text}
                    </Button>
                  )}

                  {/* Close button */}
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              }
            >
              {notification.message}
            </Alert>
          </Snackbar>
        ))}
      </Stack>
    );
  };

  // Provider component that makes notifications available to any child component
  export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    /**
     * Add a new notification
     * @param {string} message - The notification message
     * @param {string} type - Type of notification (success, error, warning, info)
     * @param {object} options - Optional configuration
     * @param {number} options.duration - Auto-dismiss duration in ms (default: 5000, use Infinity for no auto-dismiss)
     * @param {object} options.action - Optional action button { text: string, onClick: function, closeOnClick?: boolean }
     * @returns {string} The notification ID
     */
    const addNotification = (message, type = 'info', options = {}) => {
      const {
        duration = 5000,
        action = null,
      } = options;

      const newNotification = {
        id: generateId(),
        message,
        type,
        action,
        timestamp: new Date(),
      };

      setNotifications(prev => [...prev, newNotification]);

      // Automatically remove this notification after specified duration
      // unless duration is Infinity (for persistent notifications)
      if (duration !== Infinity && typeof duration === 'number') {
        setTimeout(() => {
          removeNotification(newNotification.id);
        }, duration);
      }

      return newNotification.id;
    };

    // Function to remove a notification by ID
    const removeNotification = (id) => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    // Helper functions for different notification types (backwards compatible)
    const showSuccess = (message, options) => addNotification(message, notificationTypes.success, options);
    const showError = (message, options) => addNotification(message, notificationTypes.error, options);
    const showWarning = (message, options) => addNotification(message, notificationTypes.warning, options);
    const showInfo = (message, options) => addNotification(message, notificationTypes.info, options);

    // Extended helper functions with action button support
    const showSuccessWithAction = (message, actionText, actionCallback, options = {}) => {
      return addNotification(message, notificationTypes.success, {
        ...options,
        action: { text: actionText, onClick: actionCallback, closeOnClick: options.closeOnClick }
      });
    };

    const showErrorWithAction = (message, actionText, actionCallback, options = {}) => {
      return addNotification(message, notificationTypes.error, {
        ...options,
        action: { text: actionText, onClick: actionCallback, closeOnClick: options.closeOnClick }
      });
    };

    const showWarningWithAction = (message, actionText, actionCallback, options = {}) => {
      return addNotification(message, notificationTypes.warning, {
        ...options,
        action: { text: actionText, onClick: actionCallback, closeOnClick: options.closeOnClick }
      });
    };

    const showInfoWithAction = (message, actionText, actionCallback, options = {}) => {
      return addNotification(message, notificationTypes.info, {
        ...options,
        action: { text: actionText, onClick: actionCallback, closeOnClick: options.closeOnClick }
      });
    };

    // Object with all notification functions to be provided through context
    const contextValue = {
      notifications,
      addNotification,
      removeNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      showSuccessWithAction,
      showErrorWithAction,
      showWarningWithAction,
      showInfoWithAction,
    };

    return (
      <NotificationsContext.Provider value={contextValue}>
        {children}
        <NotificationsContainer
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </NotificationsContext.Provider>
    );
  };

  // Custom hook to use notifications in any component
  export const useNotifications = () => {
    const context = React.useContext(NotificationsContext);
    if (!context) {
      throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
  };

  export default NotificationsProvider;