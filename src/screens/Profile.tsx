import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const avatarUri = `https://ui-avatars.com/api/?name=${user?.email}`;

  function handleLogout() {
    logout();
    navigation.navigate("login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} />
        <Text style={styles.buttonBackText}>Indietro</Text>
      </Pressable>

      <View style={styles.boxProfile}>
        <Avatar uri={avatarUri} size={80} />
        <Text style={styles.title}>Profilo</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Pressable style={styles.buttonPrimary} onPress={handleLogout}>
        <Text style={styles.buttonPrimaryText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
