import { sendLoginRequest } from "@/api/auth";
import loginSchema from "@/schemas/auth/loginSchema";
import { showSnackbar } from "@/stores/snackbarStore";
import { saveTokens } from "@/utils/secureStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { InferType } from "yup";

// Infer login schema type
type LoginFormData = InferType<typeof loginSchema>;

/**
 * Custom hook to manage login form state and validation using react-hook-form and Yup.
 * 
 * @returns {{
 *   control: Control<LoginFormData>;
 *   errors: FieldErrors<LoginFormData>;
 *   onSubmit: () => void;
 * }} Object containing control, errors, and onSubmit handler for the login form.
 * 
 * @example
 * const { control, errors, onSubmit } = useLoginForm();
 */
const useLoginForm = (): {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    onSubmit: () => void;
} => {
  // Initialize react-hook-form with Yup resolver for validation
  const { control, formState: { errors }, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  /**
   * Handles form submission for the login form.
   * 
   * - Sends login credentials to the backend via `sendLoginRequest`.
   * - On success, extracts and saves the access and refresh tokens using `saveTokens`.
   * - On failure, extracts the error message (if available) and invokes the `showSnackbar` callback to display it.
   * 
   * @async
   * @function
   */
  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await sendLoginRequest(data);
      const { accessToken, refreshToken } = result.data;
      await saveTokens(accessToken, refreshToken);

    } catch (err: any) {
      // Extract error message from API response and notify parent
      showSnackbar(err.response?.data?.message || "Unknown error occurred");
    }
  });


  return {
    control,
    errors,
    onSubmit
  };
};

export default useLoginForm;
