import React from 'react';
import { useNotifications } from './index.d';

// Example usage component
export const NotificationsDemo = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications();

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Notifications Demo</h1>
      <p>Click the buttons below to see different types of notifications:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button 
          onClick={() => showSuccess('This is a success message!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Success
        </button>
        
        <button 
          onClick={() => showError('This is an error message!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Error
        </button>
        
        <button 
          onClick={() => showWarning('This is a warning message!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Warning
        </button>
        
        <button 
          onClick={() => showInfo('This is an info message!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Info
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Advanced Demo</h2>
        <button
          onClick={() => {
            showInfo('Processing your request...');
            setTimeout(() => {
              showSuccess('Operation completed successfully!');
            }, 2000);
          }}
          style={{
            padding: '10px 15px',
            backgroundColor: '#9c27b0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Simulate Process Flow
        </button>
      </div>
    </div>
  );
};

// Example App component that wraps demo with provider
export const DemoApp = () => {
  // Note: In a real application, you'd import NotificationsProvider
  // But for this demo file we assume it's available in scope
  const NotificationsProvider = require('./index.d').default;
  
  return (
    <NotificationsProvider>
      <NotificationsDemo />
    </NotificationsProvider>
  );
};

export default NotificationsDemo;