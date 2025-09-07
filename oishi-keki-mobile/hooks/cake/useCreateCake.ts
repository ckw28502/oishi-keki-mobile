import { sendCreateCakeRequest } from "@/api/cake";
import { getCakes } from "@/common/cakes";
import CakeFormDTO from "@/dto/cake/cakeFormDTO";
import { clearCakes } from "@/stores/cakesStore";
import { router } from "expo-router";

/**
 * Custom hook to handle creating a new cake.
 * 
 * Handles:
 *  - Sending the creation request to the backend.
 *  - Clearing the cake list store after creation (so it can be refetched fresh).
 *  - Navigating back to the previous screen after successful creation.
 *
 * @returns {Object} An object containing the `createCake` function.
 */
const useCreateCake = (): {
    createCake: (data: CakeFormDTO) => Promise<void>;
} => {
    
    /**
     * Sends a request to create a new cake.
     * Clears the local cake list and navigates back after success.
     *
     * @async
     * @param {CakeFormDTO} data - The data for the new cake.
     */
    const createCake = async (data: CakeFormDTO) => {
        await sendCreateCakeRequest(data); // Call API
        clearCakes(); // Clear local cake store
        await getCakes();
        router.back(); // Navigate back
    }

    return {
        createCake
    };
}

export default useCreateCake;
