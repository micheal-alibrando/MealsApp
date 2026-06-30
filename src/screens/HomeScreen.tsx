import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { styles } from "../style";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();

  const avatarUri = `https://ui-avatars.com/api/?name=${user?.email}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("profile")}>
          <Avatar uri={avatarUri} size={64} />
        </Pressable>
        <View>
          <Text style={styles.welcome}>Benvenuto 👋</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <Pressable
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 1,
          }}
          onPress={() => navigation.navigate("favorites")}
        >
          <View style={{ borderRadius: "100%", borderWidth: 1, padding: 8 }}>
            <MaterialIcons name="favorite" size={24} />
          </View>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Cosa vuoi fare?</Text>

        <Pressable
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("meals")}
        >
          <Text style={styles.buttonSecondaryText}>Vai ai piatti</Text>
        </Pressable>
      </View>
    </View>
  );
}
