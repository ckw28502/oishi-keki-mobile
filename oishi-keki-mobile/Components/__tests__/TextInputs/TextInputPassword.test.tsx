import TextInputPassword from "@/Components/TextInputs/TextInputPassword";
import { act, fireEvent, render } from '@testing-library/react-native';
import React from "react";

describe("TextInputPassword", () => {
  test("renders password input with visibility toggle", async () => {
    // Arrange: Create mock callback functions for input events
    const onChangeText = jest.fn();
    const onBlur = jest.fn();

    // Render the TextInputPassword component with necessary props
    const { getByTestId } = render(
      <TextInputPassword 
        label="Password"
        style={{}}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value=""
        ref={React.createRef()}
        returnKeyType="done"
      />
    );

    // Act + Assert:

    // Get the password input element by testID
    const passwordInput = getByTestId("text-input-password");
    // Get the toggle icon element by testID
    const toggleIcon = getByTestId("toggle-password-icon");

    // Verify the password input is rendered
    expect(passwordInput).toBeTruthy();

    // Verify the toggle icon is rendered
    expect(toggleIcon).toBeTruthy();

    // Verify that the password text is initially hidden (secureTextEntry = true)
    expect(passwordInput.props.secureTextEntry).toBe(true);

    // Simulate user pressing the toggle icon to show the password
    await act(async () => {
      fireEvent.press(toggleIcon);
    });

    // Verify that the password text is now visible (secureTextEntry = false)
    expect(passwordInput.props.secureTextEntry).toBe(false);

    // Simulate user pressing the toggle icon again to hide the password
    await act(async () => {
      fireEvent.press(toggleIcon);
    });

    // Verify that the password text is hidden again (secureTextEntry = true)
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});
