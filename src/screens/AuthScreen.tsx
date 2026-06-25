import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { validateLogin } from "../services/auth";

export default function AuthScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function loginFunction() {
    if (validateLogin(email, password)) {
      navigation.navigate("Home");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={loginFunction}>
        <Text>Log In</Text>
      </Pressable>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
