import { resetCakeList } from "@/common/cakes";
import { GetCakesFilterFormData, getCakesFilterSchema } from "@/schemas/cake/getCakesFilterSchema";
import { cakeList$ } from "@/stores/cakesStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, useForm } from "react-hook-form";

/**
 * Custom hook for handling cake filtering and sorting.
 * 
 * Features:
 * - Provides form control via react-hook-form with Yup validation.
 * - Fetches cakes from the API using the provided filter data.
 * - Supports pagination with automatic page increment.
 * - Closes the bottom sheet after applying filters.
 *
 * @param {() => void} closeSheet - Function to dismiss the bottom sheet modal.
 * @returns {Object} An object containing:
 *  @property {Control<GetCakesFilterFormData>} control - react-hook-form control object for input binding.
 *  @property {() => void} onSubmit - Form submission handler that fetches cakes and closes the bottom sheet.
 */

const useCakeFilter = (
    closeSheet: () => void,
): {
    control: Control<GetCakesFilterFormData>;
    onSubmit: () => void;
} => {
    // Initialize react-hook-form with Yup resolver for validation
    const { control, handleSubmit } = useForm<GetCakesFilterFormData>({
        resolver: yupResolver(getCakesFilterSchema),
    });

    /**
     * Form submission handler.
     * Clear current cake list, fetches cakes with current form data, and closes the bottom sheet.
     */
    const onSubmit = handleSubmit(async (data) => {
        cakeList$.nameFilter.set(data.nameFilter);
        cakeList$.sort.set(data.sort);
        await resetCakeList();
        closeSheet();
    });

    return {
        control,
        onSubmit
    };
};

export default useCakeFilter;
