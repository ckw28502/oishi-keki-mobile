import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Stores access and refresh tokens securely using expo-secure-store.
 *
 * @param {string}  accessToken - The access token to store.
 * @param {string} refreshToken - The refresh token to store.
 */
const saveTokens = async (accessToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK
  });

  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK
  });
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

export {
  getAccessToken,
  getRefreshToken,
  saveTokens
};

