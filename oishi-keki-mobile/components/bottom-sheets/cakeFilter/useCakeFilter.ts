import { sendGetCakesRequest } from "@/api/cake";
import { GetCakesFilterFormData, getCakesFilterSchema } from "@/schemas/cake/getCakesFilterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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
 * @returns {Object} Contains:
 *  - control: react-hook-form control object for input binding.
 *  - onSubmit: submit handler that fetches cakes and closes the sheet.
 *  - getCakes: function to fetch cakes with optional filter data.
 */
const useCakeFilter = (closeSheet: () => void) => {
    // Pagination state
    let page = 1;
    const limit = 5;

    // Initialize react-hook-form with Yup resolver for validation
    const { control, handleSubmit } = useForm<GetCakesFilterFormData>({
        resolver: yupResolver(getCakesFilterSchema),
    });

    /**
     * Fetch cakes from the API using the given filter data.
     * Automatically includes pagination parameters.
     * 
     * @param {GetCakesFilterFormData} data - Filter and sort data from the form.
     */
    const getCakes = async (data: GetCakesFilterFormData) => {
        const params = { page, limit, ...data };
        const cakes = await sendGetCakesRequest(params);
        page++; // Increment page for next request
        console.log(cakes); // Replace with state update if needed
    };

    /**
     * Form submission handler.
     * Resets the page to 1, fetches cakes with current form data, and closes the bottom sheet.
     */
    const onSubmit = handleSubmit(async (data) => {
        page = 1;
        await getCakes(data);
        closeSheet();
    });

    return {
        control,
        onSubmit,
        getCakes,
    };
};

export default useCakeFilter;
