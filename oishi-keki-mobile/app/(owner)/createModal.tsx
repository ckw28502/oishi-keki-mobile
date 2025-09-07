import CakeForm from "@/components/forms/CakeForm";
import useCreateCake from "@/hooks/cake/useCreateCake";
import { JSX } from "react";

/**
 * CreateModal Component
 *
 * A modal screen for creating a new cake.
 * 
 * Features:
 * - Uses the `useCreateCake` hook to handle API submission for adding a new cake.
 * - Renders the `CakeForm` component with empty initial values.
 * - Displays a submit button labeled "TAMBAH KUE".
 *
 * @component
 * @returns {JSX.Element} The cake creation modal form.
 *
 * @example
 * <CreateModal />
 */
const CreateModal = (): JSX.Element => {
    // Hook for creating a new cake via API
    const { createCake } = useCreateCake();

    // Render the form with the API call and custom submit label
    return (
        <CakeForm
            apiCall={createCake}
            submitLabel="TAMBAH KUE"
        />
    );
}

export default CreateModal;
