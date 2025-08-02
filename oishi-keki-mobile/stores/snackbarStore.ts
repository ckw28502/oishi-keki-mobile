import { observable } from '@legendapp/state';

/**
 * Global observable state for managing Snackbar messages.
 *
 * This state can be accessed and modified from anywhere in the app
 * to show or hide a Snackbar notification.
 */
const snackbar$ = observable({
    message: ""
});

/**
 * Shows a Snackbar by setting the message.
 *
 * @param message - The text to be displayed in the Snackbar.
 */
const showSnackbar = (message: string) => {
    snackbar$.message.set(message);
};

/**
 * Hides the Snackbar by clearing the message.
 */
const hideSnackbar = () => {
    snackbar$.message.set("");
};

export {
    hideSnackbar, showSnackbar, snackbar$
};

