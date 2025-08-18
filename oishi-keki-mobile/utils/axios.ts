import { sendRefreshTokenRequest } from "@/api/auth";
import axios from "axios";
import { router } from "expo-router";
import { clearTokens, getAccessToken, saveTokens } from "./secureStore";

const axiosInstance = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/${process.env.EXPO_PUBLIC_API_VERSION}`,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const result = await sendRefreshTokenRequest();
                const { accessToken, refreshToken } = result.data;
                await saveTokens(accessToken, refreshToken);
                return axiosInstance(originalRequest);
            } catch (error: any) {
                await clearTokens();
                router.replace("/(login)");
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;