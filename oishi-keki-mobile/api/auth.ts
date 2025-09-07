import LoginDTO from "@/dto/auth/loginDTO";
import { getRefreshToken } from "@/utils/secureStore";
import axios, { AxiosResponse } from "axios";

/**
 * Default headers used for all Axios requests in this module.
 * 
 * - `Content-Type: application/json` ensures that request payloads
 *   are sent in JSON format and interpreted as such by the backend.
 */
const headers = {
  "Content-Type": "application/json"
};

/**
 * Preconfigured Axios instance for authentication-related API calls.
 *
 * This instance automatically applies:
 * - A `baseURL` pointing to the authentication service endpoint.
 * - Default `headers` (JSON content type).
 *
 * The `baseURL` is constructed from environment variables:
 * - `EXPO_PUBLIC_API_URL`: Base API domain or host.
 * - `EXPO_PUBLIC_API_VERSION`: API version segment (e.g., `v1`).
 * 
 * All requests made with this instance will be relative to the
 * `/auths` path of the given API version.
 */
const axiosInstance = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/${process.env.EXPO_PUBLIC_API_VERSION}/auths`,
    headers
});


/**
 * Sends a login request to the API.
 *
 * @param {LoginDTO} payload - The login data containing username and password.
 * @returns {Promise<import('axios').AxiosResponse>} A promise that resolves with the response from the API.
 */
const sendLoginRequest = async (payload: LoginDTO): Promise<import('axios').AxiosResponse> => {
  return await axiosInstance.post("/login", payload);
};

/**
 * Sends a refresh token request to the API.
 *
 * This function retrieves the stored refresh token from secure storage
 * and sends it in the `Authorization` header as a Bearer token.
 * It is typically called when the access token has expired and the API
 * returns a `401 Unauthorized` response.
 *
 * @async
 * @function
 * @returns {Promise<AxiosResponse>} A promise that resolves
 * with the Axios response containing the new access token (and optionally
 * a new refresh token, depending on the backend implementation).
 *
 */
const sendRefreshTokenRequest = async (): Promise<AxiosResponse> => {
  const token = await getRefreshToken();
  return await axiosInstance.post("/refresh", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers
    }
  });
};


export {
  sendLoginRequest,
  sendRefreshTokenRequest
};

