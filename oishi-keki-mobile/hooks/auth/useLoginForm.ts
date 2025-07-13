import { sendLoginRequest } from "@/api/auth";
import loginSchema from "@/schemas/auth/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { InferType } from "yup";

// Infer login schema type
type LoginFormData = InferType<typeof loginSchema>;

/**
 * Custom hook to manage login form state and validation using react-hook-form and Yup.
 * 
 * @param {(errorMessage: string) => void} onApiError - Callback to handle API error messages.
 * 
 * @returns {{
 *   control: Control<LoginFormData>;
 *   errors: FieldErrors<LoginFormData>;
 *   onSubmit: () => void;
 * }} Object containing control, errors, and onSubmit handler for the login form.
 * 
 * @example
 * const { control, errors, onSubmit } = useLoginForm((error) => setApiError(error));
 */
const useLoginForm = (onApiError: (errorMessage: string) => void): {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    onSubmit: () => void;
} => {
  // Initialize react-hook-form with Yup resolver for validation
  const { control, formState: { errors }, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  /**
   * Handles form submission.
   * Sends login request to API and calls onApiError callback if API returns error.
   */
  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await sendLoginRequest(data);
      console.log(result);
    } catch (err: any) {
      // Extract error message from API response and notify parent
      onApiError(err.response?.data?.message || "Unknown error occurred");
    }
  });

  return {
    control,
    errors,
    onSubmit
  };
};

export default useLoginForm;
