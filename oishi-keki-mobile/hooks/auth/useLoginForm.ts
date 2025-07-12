import loginSchema from "@/schemas/auth/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { InferType } from "yup";

// Infer login schema type
type LoginFormData = InferType<typeof loginSchema>;

/**
 * Custom hook to manage login form state and validation using react-hook-form and Yup.
 * 
 * - Uses Yup schema (`loginSchema`) for validation via `yupResolver`.
 * - Provides `control` for form inputs, `errors` for validation errors, and `onSubmit` handler.
 * - Logs submitted form data to the console.
 * 
 * @returns {{
 *   control: Control<LoginFormData>;
 *   errors: FieldErrors<LoginFormData>;
 *   onSubmit: () => void;
 * }} Object containing control, errors, and onSubmit handler for the login form.
 */
const useLoginForm = (): {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    onSubmit: () => void;
} => {
  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return {
    control,
    errors,
    onSubmit
  };
};

export default useLoginForm;
