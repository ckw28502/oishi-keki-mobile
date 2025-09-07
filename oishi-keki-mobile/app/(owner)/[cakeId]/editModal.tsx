import CakeForm from "@/components/forms/CakeForm";
import useEditCake from "@/hooks/cake/useEditCake";
import { useLocalSearchParams } from "expo-router";
import { JSX } from "react";

/**
 * EditModal Component
 *
 * A modal screen for editing an existing cake.
 * 
 * Features:
 * - Retrieves the `cakeId` from the route params.
 * - Uses the `useEditCake` hook to handle API submission for updating the cake.
 * - Renders the `CakeForm` component pre-filled with the cake's data.
 *
 * @component
 * @returns {JSX.Element} The cake edit modal form.
 *
 */
const EditModal = (): JSX.Element => {
    // Get the cakeId from the current route params
    const { cakeId } = useLocalSearchParams<{ cakeId: string }>();

    // Hook for updating the cake via API
    const { editCake } = useEditCake(cakeId);

    // Render the form with the API call and a custom submit label
    return (
        <CakeForm
            cakeId={cakeId}
            apiCall={editCake}
            submitLabel="UBAH DATA KUE"
        />
    );
}

export default EditModal;
