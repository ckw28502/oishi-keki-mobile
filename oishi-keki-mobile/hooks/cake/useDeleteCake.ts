import { sendDeleteCakeRequest } from "@/api/cake";
import { deleteCake } from "@/stores/cakesStore";
import { showDialog } from "@/stores/dialogStore";
import { showSnackbar } from "@/stores/snackbarStore";

/**
 * Custom hook to handle deleting a cake with confirmation dialog.
 *
 * Shows a confirmation dialog, calls the delete API on confirm,
 * updates the local cake store, and displays error messages via snackbar.
 *
 * @param {string} cakeId - ID of the cake to delete
 * @param {string} cakeName - Name of the cake to show in the confirmation dialog
 *
 * @returns {{
 *   showDeleteConfirmationDialog: () => void
 * }} Object containing a function to trigger the delete confirmation dialog.
 */
const useDeleteCake = (cakeId: string, cakeName: string): {
    showDeleteConfirmationDialog: () => void
} => {
    const showDeleteConfirmationDialog = () => {
        showDialog(
            "Hapus Kue",
            `Apakah Anda yakin ingin menghapus ${cakeName}?`,
            "Hapus",
            async () => {
                try {
                    // Call backend to delete cake
                    await sendDeleteCakeRequest(cakeId);

                    // Remove cake from local store
                    deleteCake(cakeId);
                } catch (error: any) {
                    showSnackbar(
                        error.response?.data?.message ||
                        "Kesalahan tidak diketahui. Silakan coba lagi nanti."
                    );
                }
            }
        );
    }

    return { showDeleteConfirmationDialog };
}

export default useDeleteCake;
