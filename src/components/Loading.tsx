import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/styles";
import { useTheme } from "../context/ThemeContext";

export default function Loading() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ActivityIndicator />
      <Text style={{ color: colors.text }}>Caricamento...</Text>
    </SafeAreaView>
  );
}
