import { DefaultTheme } from "react-native-paper";
import colors from "./colors";

/**
 * Custom theme configuration for React Native Paper.
 * 
 * - Extends the default theme from `react-native-paper`.
 * - Merges custom colors defined in `./colors`.
 * - Allows overriding default color values globally across all Paper components.
 * 
 * @see https://callstack.github.io/react-native-paper/docs/guides/theming/
 */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors, // Override or extend default colors
  },
};

export default theme;
