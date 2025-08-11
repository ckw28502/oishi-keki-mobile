import Roles from "@/constants/enum/role";
import { JwtPayload } from "@/constants/types/jwtPayload";
import { observable } from "@legendapp/state";
import { jwtDecode } from "jwt-decode";

/**
 * An observable representing the current user role.
 * 
 * It is updated by decoding a valid JWT token using `setRole`.
 */
const role$ = observable<Roles | null>(null);

/**
 * Sets the current user role by decoding a JWT access token.
 *
 * - If the token is `null` or empty, the role will be reset to `null`.
 * - If the token is expired (based on the `exp` field in seconds), the role will be reset to `null`.
 * - If valid, the `role` field from the token payload will be cast to `Roles` and stored in the `role$` observable.
 *
 * @async
 * @function setRole
 * @param {string | null} token - The JWT access token to decode.
 * @returns {Promise<Roles | null>} The decoded role or `null` if invalid/expired.
 */
const setRole = async (token: string | null): Promise<Roles | null> => {
    if (!token) {
        // No token provided → reset the role
        role$.set(null);
        return null;
    }

    // Decode the JWT payload without verifying the signature (client-side decoding)
    const payload = jwtDecode<JwtPayload>(token);

    // Check for expiration (JWT exp is in seconds → convert to ms)
    if (payload.exp * 1000 < Date.now()) {
        role$.set(null);
        return null;
    }

    // Extract and set the role from the decoded payload
    const role = payload.role as Roles;
    role$.set(role);

    return role;
};

export {
    role$,
    setRole
};

