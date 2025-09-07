import { sendGetCakeByIdRequest } from "@/api/cake";
import CakeFormDTO from "@/dto/cake/cakeFormDTO";
import { CakeFormData, cakeSchema } from "@/schemas/cake/cakeSchema";
import { showSnackbar } from "@/stores/snackbarStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, useForm } from "react-hook-form";

/**
 * useCakeForm Hook
 *
 * Custom hook to manage the **create/edit cake form** state using `react-hook-form` and Yup validation.
 *
 * Features:
 * - Initializes form with empty values (for create) or fetched values (for edit, using `cakeId`).
 * - Validates inputs with `cakeSchema`.
 * - Submits form data through the provided `apiCall` function.
 * - Displays snackbar errors if submission fails.
 *
 * @param apiCall - Function that calls the backend API (create or update a cake).
 * @param cakeId - Optional cake ID for edit mode. If provided, pre-fills form values by fetching cake data.
 *
 * @returns {{
 *   control: Control<CakeFormData>;
 *   errors: FieldErrors<CakeFormData>;
 *   onSubmit: () => Promise<void>;
 * }}
 * - `control`: Control object to bind React Hook Form inputs.
 * - `errors`: Validation errors keyed by field name.
 * - `onSubmit`: Form submit handler that validates and triggers the API call.
 *
 * @example
 * const { control, errors, onSubmit } = useCakeForm(createCakeApi, cakeId);
 *
 * <Controller
 *   name="name"
 *   control={control}
 *   render={({ field }) => <TextInput {...field} />}
 * />
 * <HelperText type="error">{errors.name?.message}</HelperText>
 * <Button onPress={onSubmit}>Save</Button>
 */
const useCakeForm = (
  apiCall: (reqBody: CakeFormDTO) => Promise<void>,
  cakeId?: string | null
): {
  control: Control<CakeFormData>;
  errors: FieldErrors<CakeFormData>;
  onSubmit: () => Promise<void>;
} => {
  // Initialize react-hook-form with Yup validation
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CakeFormData>({
    resolver: yupResolver(cakeSchema),

    // Async default values: empty for create, fetch cake data for edit
    defaultValues: async () => {
      if (!cakeId) {
        return { name: "", price: 0 };
      }

      const cake = await sendGetCakeByIdRequest(cakeId);
      return {
        name: cake.name,
        price: cake.price,
      };
    },
  });

  // Submit handler with API call + global error handling
  const onSubmit = handleSubmit(async (data) => {
    try {
      await apiCall(data);
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message ||
          "Kesalahan tidak diketahui. Silakan coba lagi nanti."
      );
    }
  });

  return {
    control,
    errors,
    onSubmit,
  };
};

export default useCakeForm;
