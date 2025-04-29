# react-notifications-cascade

A sleek, animated notifications system built with React and Material UI that displays notifications in the bottom-right corner of the screen, animates them upward in a cascade style, and automatically removes them after 5 seconds.

![Notifications Demo](https://via.placeholder.com/600x300)

## Features

- 🚀 **Animated Transitions** - Smooth slide-up animation for incoming notifications
- ⏱️ **Auto-Dismissal** - Notifications automatically disappear after 5 seconds
- 🎨 **Material UI Styling** - Attractive, modern design using Material UI components
- 🔄 **Four Notification Types** - Success, error, warning, and info variants
- 🌐 **Global Access** - Context API for easy access from any component
- ✖️ **Manual Dismissal** - Close notifications early with the built-in close button
- 🧩 **Highly Customizable** - Easy to extend and modify

## Installation

```bash
# Using npm
npm install react-notifications-cascade

# Using yarn
yarn add react-notifications-cascade

# Using pnpm
pnpm add react-notifications-cascade
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
# Using npm
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled

# Using yarn
yarn add react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled

# Using pnpm
pnpm add react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Usage

### 1. Wrap Your App with the Provider

In your root component (typically App.js), wrap your application with the `NotificationsProvider`:

```jsx
import { NotificationsProvider } from 'react-notifications-cascade';

function App() {
  return (
    <NotificationsProvider>
      {/* Your app components */}
    </NotificationsProvider>
  );
}

export default App;
```

### 2. Use Notifications in Any Component

Use the `useNotifications` hook to access notification functions:

```jsx
import { useNotifications } from 'react-notifications-cascade';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications();

  const handleSaveSuccess = () => {
    showSuccess('Data saved successfully!');
  };

  const handleApiError = () => {
    showError('Failed to connect to the server. Please try again.');
  };

  return (
    <div>
      <button onClick={handleSaveSuccess}>Save Data</button>
      <button onClick={handleApiError}>Simulate Error</button>
      <button onClick={() => showWarning('Battery is low!')}>Show Warning</button>
      <button onClick={() => showInfo('New updates available')}>Show Info</button>
    </div>
  );
}
```

### 3. Demo Component (Optional)

The package includes a ready-to-use demo component for testing or showcasing purposes:

```jsx
import { NotificationsProvider } from 'react-notifications-cascade';
import { NotificationsDemo } from 'react-notifications-cascade/demo';

function App() {
  return (
    <NotificationsProvider>
      <NotificationsDemo />
      {/* Your other app components */}
    </NotificationsProvider>
  );
}
```

## API Reference

### NotificationsProvider

The main provider component that makes notifications available throughout your app.

#### Props

- `children` - React nodes to be wrapped by the provider

### useNotifications Hook

A custom hook for accessing notification functions.

#### Returns

An object containing:

- `notifications` - Array of current notification objects
- `addNotification(message, type)` - Add a custom notification
- `removeNotification(id)` - Remove a notification by ID
- `showSuccess(message)` - Show a success notification
- `showError(message)` - Show an error notification
- `showWarning(message)` - Show a warning notification
- `showInfo(message)` - Show an info notification

## Notification Object Structure

Each notification has the following properties:

```typescript
{
  id: string;            // Unique identifier
  message: string;       // Notification message
  type: string;          // 'success' | 'error' | 'warning' | 'info'
  timestamp: Date;       // When the notification was created
}
```

## Customization

### Changing Duration

To change the auto-dismissal duration, modify the timeout value in the `addNotification` function:

```jsx
// Change from 5000ms (5 seconds) to your desired duration
setTimeout(() => {
  removeNotification(newNotification.id);
}, 5000); // ← Modify this value
```

### Styling

The notifications use Material UI's `Alert` and `Snackbar` components. You can customize their appearance by modifying the `sx` prop in the `NotificationsContainer` component.

## Example

```jsx
import { useNotifications } from 'react-notifications-cascade';

function UserForm() {
  const { showSuccess, showError } = useNotifications();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to save user data
      await saveUserData(userData);
      showSuccess('User profile updated successfully!');
    } catch (error) {
      showError(`Failed to update profile: ${error.message}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Update Profile</button>
    </form>
  );
}
```

## TypeScript Support

This package includes TypeScript declarations for improved developer experience.

```typescript
// Example TypeScript usage
import { useNotifications } from 'react-notifications-cascade';
import { FC, FormEvent } from 'react';

interface UserData {
  name: string;
  email: string;
}

const UserForm: FC = () => {
  const { showSuccess, showError } = useNotifications();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // API call
      showSuccess('Success!');
    } catch (err) {
      showError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

## Browser Support

react-notifications-cascade is compatible with all modern browsers and React 16.8 or higher (requires Hooks support).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request