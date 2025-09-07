import { sendEditCakeRequest } from "@/api/cake";
import { getCakes } from "@/common/cakes";
import CakeFormDTO from "@/dto/cake/cakeFormDTO";
import { clearCakes } from "@/stores/cakesStore";
import { router } from "expo-router";

/**
 * Custom hook for editing a cake.
 *
 * Handles:
 * - Sending the edit request to the backend
 * - Resetting the local cake list store
 * - Refetching cakes to reflect updated data
 * - Navigating back after successful update
 *
 * @param {string} cakeId - The ID of the cake to edit
 *
 * @returns {{
 *   editCake: (data: CakeFormDTO) => Promise<void>;
 * }} Object containing the editCake function
 *
 * @example
 * const { editCake } = useEditCake(cakeId);
 * await editCake({ name: "New Cake Name", price: 20000 });
 */
const useEditCake = (cakeId: string): {
    editCake: (data: CakeFormDTO) => Promise<void>;
} => {
    const editCake = async (data: CakeFormDTO) => {
        // Send API request to update cake
        await sendEditCakeRequest(cakeId, data);

        // Clear local cake store to reset pagination / list
        clearCakes();

        // Refetch updated cakes from server
        await getCakes();

        // Close the modal / navigate back
        router.back();
    };

    return { editCake };
};

export default useEditCake;
