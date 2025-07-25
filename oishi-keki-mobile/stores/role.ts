import Roles from "@/constants/enum/role";
import { JwtPayload } from "@/constants/types/types";
import { observable } from "@legendapp/state";
import { jwtDecode } from "jwt-decode";

/**
 * An observable representing the current user role.
 * 
 * It is updated by decoding a valid JWT token using `setRole`.
 */
const role$ = observable<Roles | null>(null);

/**
 * Sets the user role by decoding a JWT token.
 *
 * - If the token is null or invalid, role will be set to null.
 * - If the token is expired based on the `exp` field, role will be set to null.
 * - If valid, the role from the payload is cast and stored in the observable.
 *
 * @param {string | null} token - The JWT access token to decode.
 */
const setRole = async (token: string | null) => {
    if (!token) {
        // No token provided; reset the role
        role$.set(null);
        return;
    }

    // Decode the JWT payload
    const payload = jwtDecode<JwtPayload>(token);

    // Check for expiration
    if (payload.exp * 1000 < Date.now()) {
        role$.set(null);
        return;
    }

    // Set role from decoded payload
    role$.set(payload.role as Roles);
};

export {
    role$,
    setRole
};

