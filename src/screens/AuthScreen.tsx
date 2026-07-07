import React from "react";
import { View, Text, TextInput, Image } from "react-native";
import { validateLogin } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { loadUser } from "../services/storage";
import { styles } from "../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Interactive from "../components/Interactive";
import { useTheme } from "../context/ThemeContext";

export default function AuthScreen({ navigation }: { navigation: any }) {
  const { login } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  async function isLogged() {
    const data = await loadUser();
    if (data) {
      navigation.navigate("home");
      login(JSON.parse(data));
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

    const user = validateLogin(email, password);

    if (user) {
      login(user);
      navigation.replace("home");
    } else {
      setError("Email o password non valide");
    }
  }

  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        }}
        style={styles.imageLogin}
      />

      <Text style={[styles.titleLogin, { color: colors.text }]}>Meals App</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            {
              backgroundColor: colors.input,
              borderColor: colors.inputBorder,
              color: colors.text,
            },
          ]}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: colors.input,
              borderColor: colors.inputBorder,
              color: colors.text,
            },
          ]}
          placeholderTextColor="#999"
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Interactive style={[styles.buttonPrimary]} onPress={loginFunction}>
          <Text style={styles.buttonPrimaryText}>Accedi</Text>
        </Interactive>
      </View>
    </SafeAreaView>
  );
}
