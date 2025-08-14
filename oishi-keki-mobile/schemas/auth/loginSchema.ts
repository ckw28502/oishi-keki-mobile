import * as yup from "yup";

/**
 * Yup validation schema for login form.
 * 
 * Validates that:
 * - `username` is a required non-empty string.
 * - `password` is a required non-empty string.
 * 
 * Custom error messages are provided for both fields when empty.
 */
const loginSchema = yup.object({
    username: yup.string()
      .required("Nama pengguna wajib diisi!"),
    password: yup.string()
      .required("Kata sandi wajib diisi!")
});

// Infer login schema type
type LoginFormData = yup.InferType<typeof loginSchema>;

export {
  LoginFormData, loginSchema
};

