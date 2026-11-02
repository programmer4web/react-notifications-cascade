# react-notifications-cascade

A sleek, animated notifications system built with React and Material UI that displays notifications in the bottom-right corner of the screen, animates them upward in a cascade style, and automatically removes them after 5 seconds by default (configurable per notification).

**[Live demo](https://components.evaficy.com/?path=/story/dynamic-components--notifications-cascade-demo)**

## What's New in Version 2.1

  1. **Multiple action buttons** - Pass an `actions` array to show several buttons on one notification
  2. **Action callbacks receive the notification ID** - `onClick(notificationId)`
  3. **Button variants** - Optional `variant: 'text' | 'outlined' | 'contained'` per action
  4. **TypeScript declarations now ship with the package**
  5. **100% backwards compatible** - All existing 2.0 and 1.x code continues to work unchanged

## Features

- 🚀 **Animated Transitions** - Smooth slide-up animation for incoming notifications
- ⏱️ **Auto-Dismissal** - Notifications disappear after 5 seconds by default; set any duration or keep them open
- 🎯 **Action Buttons** - One or more action buttons per notification
- 🎨 **Material UI Styling** - Attractive, modern design using Material UI components
- 🔄 **Four Notification Types** - Success, error, warning, and info variants
- 🌐 **Global Access** - Context API for easy access from any component
- ✖️ **Manual Dismissal** - Close notifications early with the built-in close button
- 🧩 **TypeScript Support** - Type declarations included

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

This package requires the following peer dependencies (React 16.8+, Material UI 5+):

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

### 3. Action Buttons

#### One action

```jsx
const { showErrorWithAction, showInfo } = useNotifications();

showErrorWithAction(
  'Email verification failed',
  'Resend Email',
  () => resendVerificationEmail()
);

// Same thing using options
showInfo('New version available', {
  action: { text: 'Reload', onClick: () => window.location.reload() }
});
```

#### Multiple actions (new in 2.1)

```jsx
const { showSuccess, showInfo } = useNotifications();

showSuccess('File moved to trash', {
  duration: 8000,
  actions: [
    { text: 'Undo', onClick: () => restoreFile() },
    { text: 'View Trash', onClick: () => openTrash() }
  ]
});

showInfo('Protect your account with two-factor authentication.', {
  duration: Infinity, // stays until the user acts or closes it
  actions: [
    { text: 'Set Up Now', variant: 'outlined', onClick: () => openSecuritySettings() },
    { text: 'Remind Me Later', onClick: () => snoozeReminder() },
    { text: "Don't Show Again", onClick: () => disableReminder() }
  ]
});
```

Every action closes the notification after its `onClick` runs. Set `closeOnClick: false` on an action to keep the notification open. `onClick` receives the notification ID, so you can close it later with `removeNotification(id)`:

```jsx
const { showWarning, removeNotification } = useNotifications();

showWarning('Unsaved changes', {
  duration: Infinity,
  actions: [
    {
      text: 'Save All',
      closeOnClick: false,
      onClick: async (id) => {
        await saveAll();
        removeNotification(id);
      }
    },
    { text: 'Discard', onClick: () => discardChanges() }
  ]
});
```

If you pass both `action` and `actions`, `action` is shown first.

### 4. Custom Duration

```jsx
showInfo('This dismisses after 10 seconds', { duration: 10000 });
showWarning('This stays until you close it', { duration: Infinity });
```

### 5. Demo Component (Optional)

The package includes a ready-to-use demo component for testing or showcasing purposes:

```jsx
import { NotificationsProvider, NotificationsDemo } from 'react-notifications-cascade';

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

A custom hook for accessing notification functions. It must be used inside a `NotificationsProvider`.

#### Returns

An object containing:

| Function | Description |
|---|---|
| `notifications` | Array of current notification objects |
| `addNotification(message, type?, options?)` | Add a notification of any type (`type` defaults to `'info'`). Returns its ID. |
| `removeNotification(id)` | Remove a notification by ID |
| `showSuccess(message, options?)` | Show a success notification. Returns its ID. |
| `showError(message, options?)` | Show an error notification. Returns its ID. |
| `showWarning(message, options?)` | Show a warning notification. Returns its ID. |
| `showInfo(message, options?)` | Show an info notification. Returns its ID. |
| `showSuccessWithAction(message, actionText, actionCallback, options?)` | Success notification with one action button. Returns its ID. |
| `showErrorWithAction(message, actionText, actionCallback, options?)` | Error notification with one action button. Returns its ID. |
| `showWarningWithAction(message, actionText, actionCallback, options?)` | Warning notification with one action button. Returns its ID. |
| `showInfoWithAction(message, actionText, actionCallback, options?)` | Info notification with one action button. Returns its ID. |

For the `*WithAction` helpers, `options` also accepts `closeOnClick` (default `true`) for that action.

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `duration` | `number` | `5000` | Auto-dismiss time in milliseconds. Use `Infinity` to keep the notification open until it is closed. |
| `action` | `Action` | `null` | A single action button |
| `actions` | `Action[]` | `null` | Several action buttons (new in 2.1) |

### Action

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `ReactNode` | | Button label |
| `onClick` | `(notificationId: string) => void` | | Called when the button is clicked |
| `closeOnClick` | `boolean` | `true` | Close the notification after the click |
| `variant` | `'text' \| 'outlined' \| 'contained'` | `'text'` | Material UI button variant |

## Notification Object Structure

Each notification has the following properties:

```typescript
{
  id: string;                 // Unique identifier
  message: ReactNode;         // Notification message
  type: string;               // 'success' | 'error' | 'warning' | 'info'
  action: Action | null;      // The single `action` option, as passed
  actions: Action[];          // All buttons shown (`action` first, then `actions`)
  timestamp: Date;            // When the notification was created
}
```

## Styling

The notifications use Material UI's `Alert` and `Snackbar` components, so they follow your Material UI theme (palette colors for each severity).

## Example

```jsx
import { useNotifications } from 'react-notifications-cascade';

function UserForm() {
  const { showSuccess, showErrorWithAction } = useNotifications();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to save user data
      await saveUserData(userData);
      showSuccess('User profile updated successfully!');
    } catch (error) {
      showErrorWithAction(`Failed to update profile: ${error.message}`, 'Retry', () => handleSubmit(e));
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

Type declarations ship with the package (`dist/index.d.ts`), including the `Notification`, `NotificationAction` and `NotificationOptions` types.

```typescript
import { useNotifications, NotificationAction } from 'react-notifications-cascade';
import { FC, FormEvent } from 'react';

const UserForm: FC = () => {
  const { showSuccess, showError } = useNotifications();

  const retry: NotificationAction = { text: 'Retry', onClick: () => console.log('retrying') };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // API call
      showSuccess('Success!');
    } catch (err) {
      showError(`Error: ${err instanceof Error ? err.message : String(err)}`, { actions: [retry] });
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

## Browser Support

react-notifications-cascade is compatible with all modern browsers and React 16.8 or higher (requires Hooks support).

## Changelog

- **2.1.0** - Multiple action buttons (`actions`), `onClick` receives the notification ID, per-action `variant`, TypeScript declarations included in the package, build tooling updated. Fully backwards compatible.
- **2.0.0** - Single action button support, configurable duration, `show*WithAction` helpers.
- **1.0.0** - Initial release.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
