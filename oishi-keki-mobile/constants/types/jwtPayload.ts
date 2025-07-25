/**
 * Represents the payload structure of a decoded JWT token.
 *
 * This structure should match the payload issued by the backend.
 */
type JwtPayload = {
  /**
   * The user's role as assigned by the backend.
   * Example: "OWNER", "EMPLOYEE"
   */
  role: string;

  /**
   * Expiration time of the token in seconds since Unix epoch.
   * Should be compared using `exp * 1000` to match JavaScript timestamps.
   */
  exp: number;
};

export type { JwtPayload };

