import LoginScreen from "@/app/login";
import { JSX } from "react";

/**
 * The entry screen for the application.
 * 
 * Renders the LoginScreen when user is unauthenticated.
 * This acts as the main route for the app (e.g., "/").
 * 
 * @returns {JSX.Element} The login screen component.
 */
export default function Index(): JSX.Element {
  return LoginScreen();
}
