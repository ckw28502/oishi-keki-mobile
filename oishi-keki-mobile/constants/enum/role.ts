/**
 * Enum representing user roles within the application.
 *
 * These roles are expected to match the values provided in the backend JWT payload.
 */
enum Roles {
  /** Role for the business owner */
  Owner = "OWNER",

  /** Role for an employee user */
  Employee = "EMPLOYEE",
}

export default Roles;
