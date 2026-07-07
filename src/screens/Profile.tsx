import React from "react";
import { View, Text } from "react-native";
import ThemeSwitch from "../components/ThemeSwitch";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Interactive from "../components/Interactive";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const avatarUri =
    user?.avatarUri || `https://ui-avatars.com/api/?name=${user?.email}`;

  function handleLogout() {
    logout();
    navigation.navigate("login");
  }

  const { theme, toggleTheme, colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Interactive
        style={[
          styles.buttonBack,
          { borderColor: colors.inputBorder, backgroundColor: colors.card },
        ]}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        <Text style={[styles.buttonBackText, { color: colors.text }]}>
          Indietro
        </Text>
      </Interactive>

      <View style={styles.boxProfile}>
        <Avatar uri={avatarUri} size={80} />
        <Text style={[styles.title, { color: colors.text }]}>Profilo</Text>
        <Text style={[styles.email, { color: colors.text }]}>{user?.name}</Text>
      </View>
      <View style={{ alignItems: "flex-start", marginTop: 12 }}>
        <ThemeSwitch />
      </View>

      <Interactive
        style={[
          styles.buttonPrimary,
          { backgroundColor: colors.tagBackground, alignSelf: "stretch" },
        ]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonPrimaryText, { color: colors.tagText }]}>
          Logout
        </Text>
      </Interactive>
    </SafeAreaView>
  );
}
