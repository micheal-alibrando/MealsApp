import React from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { validateLogin } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { loadUser } from "../services/storage";
import { styles } from "../style";

export default function AuthScreen({ navigation }: { navigation: any }) {
  const { login } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  async function isLogged() {
    const data = await loadUser();
    if (data) {
      navigation.navigate("home");
      login({ email: data.replaceAll(`"`, "") });
    }
  }

  React.useEffect(() => {
    isLogged();
  }, []);

  function loginFunction() {
    setError(null);

    if (!email || !password) {
      setError("Inserisci email e password");
      return;
    }

    if (validateLogin(email, password)) {
      login({ email });
      navigation.navigate("home");
    } else {
      setError("Email o password non valide");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        }}
        style={styles.imageLogin}
      />

      <Text style={styles.titleLogin}>Meals App</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.buttonPrimary} onPress={loginFunction}>
          <Text style={styles.buttonPrimaryText}>Accedi</Text>
        </Pressable>
      </View>
    </View>
  );
}
