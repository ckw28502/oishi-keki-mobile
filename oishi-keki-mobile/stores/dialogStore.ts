import { observable } from '@legendapp/state';

/**
 * Global observable state for managing a confirmation or action dialog.
 *
 * This state can be accessed and modified from anywhere in the app
 * to display a dialog with a title, message, action button label,
 * and an associated asynchronous callback.
 *
 * Structure:
 * - `title`: The title text displayed at the top of the dialog.
 * - `message`: The body text providing additional details or context.
 * - `actionTitle`: The label text for the dialog's primary action button.
 * - `onAction`: An asynchronous function executed when the action
 *   button is pressed.
 */
const dialog$ = observable({
    title: "",
    message: "",
    actionTitle: "",
    onAction: async () => {}
});

/**
 * Displays a dialog by setting its title, message, action button label,
 * and action handler.
 *
 * The provided `onAction` callback will automatically hide the dialog
 * after it completes.
 *
 * @param title - The title text displayed at the top of the dialog.
 * @param message - The descriptive or confirmation message shown in the dialog.
 * @param actionTitle - The label for the primary action button.
 * @param onAction - An asynchronous function to execute when the primary
 * action button is pressed. After execution, the dialog will be hidden.
 *
 * );
 */
const showDialog = (
    title: string, 
    message: string,
    actionTitle: string,
    onAction: () => Promise<void>
) => {
    dialog$.set({ 
        title, 
        message, 
        actionTitle, 
        onAction: async () => {
            await onAction();
            hideDialog();
        } 
    });
};

/**
 * Hides the dialog by clearing its title.
 *
 * Typically called automatically after `onAction` completes,
 * but can also be called manually to dismiss the dialog.
 *
 */
const hideDialog = () => {
    dialog$.title.set("");
};

export {
    dialog$, hideDialog, showDialog
};

