import LoginDTO from "@/dto/auth/loginDTO";
import axiosInstance from "@/utils/axios";

const apiUrl = "/auth";

/**
 * Sends a login request to the API.
 *
 * @param {LoginDTO} payload - The login data containing username and password.
 * @returns {Promise<import('axios').AxiosResponse>} A promise that resolves with the response from the API.
 */
const sendLoginRequest = async (payload: LoginDTO): Promise<import('axios').AxiosResponse> => {
  return await axiosInstance.post(`${apiUrl}/login`, payload);
};

export {
    sendLoginRequest
};

