/**
 * Data Transfer Object for login request payload.
 *
 * @interface LoginDTO
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
interface LoginDTO {
    username: string;
    password: string;
}

export default LoginDTO;
