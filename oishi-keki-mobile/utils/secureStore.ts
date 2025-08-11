import Roles from "@/constants/enum/role";
import { setRole } from "@/stores/role";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "com.oishikeki.accessToken";
const REFRESH_TOKEN_KEY = "com.oishikeki.refreshToken";

/**
 * Saves the access and refresh tokens securely using Expo SecureStore,
 * and updates the user role state based on the access token.
 *
 * This function ensures tokens are stored in a way that they remain available
 * even after the device is restarted, but are still protected by the system's
 * secure storage mechanism.
 *
 * @async
 * @function saveTokens
 * @param {string} accessToken - The JWT access token to store.
 * @param {string} refreshToken - The refresh token to store.
 * @returns {Promise<Roles | null>} - the current authenticated user's role (null if unauthenticated)
 */
const saveTokens = async (accessToken: string, refreshToken: string): Promise<Roles | null> => {
  // Store the access token securely in the device's keychain
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK // Accessible after first device unlock
  });

  // Store the refresh token securely in the device's keychain
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK
  });

  // Update the in-app role state using the access token
  return setRole(accessToken);
};

/**
 * Retrieves the access token from secure storage.
 *
 * @async
 * @function
 * @returns {Promise<string | null>} The stored access token, or null if not found.
 */
const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

/**
 * Retrieves the refresh token from secure storage.
 *
 * @async
 * @function
 * @returns {Promise<string | null>} The stored refresh token, or null if not found.
 */
const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

/**
 * Clears all stored authentication tokens from secure storage.
 *
 * This function deletes both the access token and refresh token
 * from Expo SecureStore, effectively logging the user out from
 * a persistent session perspective.
 *
 * @async
 * @function clearTokens
 * @returns {Promise<void>} Resolves when both tokens are removed.
 */
const clearTokens = async (): Promise<void> => {
  // Remove stored access token
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);

  // Remove stored refresh token
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

  // Clear the role
  setRole(null);
};

export {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens
};

