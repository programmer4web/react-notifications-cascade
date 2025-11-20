import React from 'react';
  import { useNotifications } from '.';

  // Enhanced demo component showcasing all new features
  export const NotificationsDemo = () => {
    const {
      showSuccess,
      showError,
      showWarning,
      showInfo,
      showSuccessWithAction,
      showErrorWithAction,
      addNotification
    } = useNotifications();

    return (
      <div style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Enhanced Notifications Demo</h1>

        <h2>1. Basic Notifications (Backwards Compatible)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => showSuccess('This is a success message!')}
            style={buttonStyle('#4caf50')}
          >
            Show Success
          </button>

          <button
            onClick={() => showError('This is an error message!')}
            style={buttonStyle('#f44336')}
          >
            Show Error
          </button>

          <button
            onClick={() => showWarning('This is a warning message!')}
            style={buttonStyle('#ff9800')}
          >
            Show Warning
          </button>

          <button
            onClick={() => showInfo('This is an info message!')}
            style={buttonStyle('#2196f3')}
          >
            Show Info
          </button>
        </div>

        <h2>2. Notifications with Action Buttons (NEW)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => showErrorWithAction(
              'Email verification failed',
              'Resend Email',
              () => {
                console.log('Resending verification email...');
                showSuccess('Verification email sent!');
              }
            )}
            style={buttonStyle('#f44336')}
          >
            Show Error with Action Button
          </button>

          <button
            onClick={() => showSuccessWithAction(
              'Payment successful!',
              'View Receipt',
              () => {
                console.log('Opening receipt...');
                window.open('/receipt', '_blank');
              }
            )}
            style={buttonStyle('#4caf50')}
          >
            Show Success with Action Button
          </button>
        </div>

        <h2>3. Custom Duration Notifications (NEW)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => showInfo('This dismisses after 10 seconds', { duration: 10000 })}
            style={buttonStyle('#2196f3')}
          >
            10-Second Notification
          </button>

          <button
            onClick={() => showWarning('This stays until you close it', { duration: Infinity })}
            style={buttonStyle('#ff9800')}
          >
            Persistent Notification
          </button>

          <button
            onClick={() => showSuccess('Quick notification (2s)', { duration: 2000 })}
            style={buttonStyle('#4caf50')}
          >
            Quick 2-Second Notification
          </button>
        </div>

        <h2>4. Advanced: Combined Features (NEW)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => addNotification(
              'File upload in progress...',
              'info',
              {
                duration: Infinity, // Stays until closed
                action: {
                  text: 'Cancel Upload',
                  onClick: () => {
                    console.log('Upload cancelled');
                    showWarning('Upload cancelled');
                  },
                  closeOnClick: true // Auto-close when action is clicked
                }
              }
            )}
            style={buttonStyle('#9c27b0')}
          >
            Persistent with Cancellable Action
          </button>

          <button
            onClick={() => {
              showInfo('Processing your request...');
              setTimeout(() => {
                showSuccessWithAction(
                  'Process completed!',
                  'View Details',
                  () => console.log('Viewing details...'),
                  { duration: 10000 } // 10 seconds
                );
              }, 2000);
            }}
            style={buttonStyle('#9c27b0')}
          >
            Simulate Multi-Step Process
          </button>
        </div>
      </div>
    );
  };

  const buttonStyle = (color) => ({
    padding: '10px 15px',
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  });

  export default NotificationsDemo;