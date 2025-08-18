import CreateCakeDTO from "@/dto/cake/createCakeDTO";
import { CakeFormData, cakeSchema } from "@/schemas/cake/cakeSchema";
import { showSnackbar } from "@/stores/snackbarStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, useForm } from "react-hook-form";

/**
 * Custom hook to manage the cake form state and validation
 * using `react-hook-form` with Yup schema validation.
 *
 * Responsibilities:
 * - Initializes form state with validation schema (`cakeSchema`).
 * - Handles submission via the provided `apiCall` function.
 * - Displays an error message using the global snackbar store if API fails.
 *
 * @param apiCall - Function to call the backend API to create a cake.
 *
 * @returns {{
 *   control: Control<CakeFormData>;
 *   errors: FieldErrors<CakeFormData>;
 *   onSubmit: () => Promise<void>;
 * }} Object containing:
 * - `control`: react-hook-form control object to bind inputs.
 * - `errors`: validation errors keyed by field name.
 * - `onSubmit`: handler function to trigger validation + API call.
 *
 * @example
 * const { control, errors, onSubmit } = useCakeForm(createCakeApi);
 *
 * <Controller
 *   name="name"
 *   control={control}
 *   render={({ field }) => <TextInput {...field} />}
 * />
 * <Button onPress={onSubmit}>Submit</Button>
 */
const useCakeForm = (
  apiCall: (reqBody: CreateCakeDTO) => Promise<void>
): {
  control: Control<CakeFormData>;
  errors: FieldErrors<CakeFormData>;
  onSubmit: () => Promise<void>;
} => {
  // Initialize react-hook-form with Yup resolver for validation
  const { control, formState: { errors }, handleSubmit } = useForm<CakeFormData>({
    resolver: yupResolver(cakeSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await apiCall(data);
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Kesalahan tidak diketahui. Silakan coba lagi nanti.");
    }
  });

  return {
    control,
    errors,
    onSubmit
  };
};

export default useCakeForm;
