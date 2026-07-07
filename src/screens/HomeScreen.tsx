import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { styles } from "../theme/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Interactive from "../components/Interactive";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const avatarUri =
    user?.avatarUri || `https://ui-avatars.com/api/?name=${user?.email}`;

  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Interactive
          accessibilityLabel="Apri profilo"
          onPress={() => navigation.navigate("profile")}
        >
          <Avatar uri={avatarUri} size={64} />
        </Interactive>
        <View>
          <Text style={[styles.welcome, { color: colors.text }]}>
            Benvenuto 👋
          </Text>
          <Text style={[styles.email, { color: colors.text }]}>
            {user?.name}
          </Text>
        </View>
        <Interactive
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 1,
          }}
          accessibilityLabel="Vai ai preferiti"
          onPress={() => navigation.navigate("favorites")}
        >
          <View
            style={{
              borderRadius: 100,
              borderWidth: 1,
              padding: 8,
              borderColor: colors.inputBorder,
              backgroundColor: colors.card,
            }}
          >
            <MaterialIcons name="favorite" size={24} color={colors.text} />
          </View>
        </Interactive>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Cosa vuoi fare?
        </Text>

        <Interactive
          style={[
            styles.buttonSecondary,
            { backgroundColor: colors.card, borderColor: colors.inputBorder },
          ]}
          onPress={() => navigation.navigate("meals")}
        >
          <Text style={[styles.buttonSecondaryText, { color: colors.text }]}>
            Vai ai piatti
          </Text>
        </Interactive>
      </View>
    </SafeAreaView>
  );
}
