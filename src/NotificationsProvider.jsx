import React, { useState, useEffect } from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';
import { Slide } from '@mui/material';

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

// Provider component that makes notifications available to any child component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: generateId(),
      message,
      type,
      timestamp: new Date(),
    };

    setNotifications(prev => [...prev, newNotification]);

    // Automatically remove this notification after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
    
    return newNotification.id;
  };

  // Function to remove a notification by ID
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Helper functions for different notification types
  const showSuccess = (message) => addNotification(message, notificationTypes.success);
  const showError = (message) => addNotification(message, notificationTypes.error);
  const showWarning = (message) => addNotification(message, notificationTypes.warning);
  const showInfo = (message) => addNotification(message, notificationTypes.info);

  // Object with all notification functions to be provided through context
  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
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
            onClose={() => removeNotification(notification.id)}
            sx={{ width: '100%', boxShadow: 3 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
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