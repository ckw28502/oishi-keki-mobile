import { showDialog } from "@/stores/dialogStore";
import { router } from "expo-router";

/**
 * Shows a confirmation dialog before closing the modal.
 * 
 * The dialog asks the user if they are sure they want to exit the form.
 * If confirmed, it navigates back using Expo Router.
 * 
 */
const closeModal = () => {
    showDialog(
        "Keluar dari formulir",
        "Apakah Anda yakin?",
        "Keluar",
        async () => {
            router.back();
        }
    );
}

export { closeModal };

