import React from "react";
import { Text, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/styles";
import { useTheme } from "../context/ThemeContext";

export default function Loading() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.text} />
        <Text style={{ color: colors.text, marginTop: 12 }}>
          Caricamento...
        </Text>
      </View>
    </SafeAreaView>
  );
}
