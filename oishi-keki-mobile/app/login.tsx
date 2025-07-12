import TextInputPassword from "@/Components/TextInputs/TextInputPassword";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text variant="displayLarge">MASUK</Text>
          </View>
    
          <View style={styles.inputContainer}>
            <TextInput 
              label="Nama pengguna"
              mode="outlined"
              style={styles.textInput}
            />
            <TextInputPassword
              label="Kata sandi"
              style={styles.textInput}
            />
            <Button
              mode="contained"
              style={styles.button}
            >Masuk</Button>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 10
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 64,
    fontWeight: "bold"
  },
  inputContainer: {
    flex: 4,
    alignItems: "center",
    gap: 50
  },
  textInput: {
    width: "80%"
  },
  button: {
    width: "60%"
  }
});

export default LoginScreen;