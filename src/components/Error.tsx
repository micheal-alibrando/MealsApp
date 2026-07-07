import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/styles";
import Interactive from "./Interactive";
import { useTheme } from "../context/ThemeContext";

export default function Error({
  error,
  onPress,
}: {
  error?: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ color: colors.text, textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Text>
        <Interactive
          style={[
            styles.buttonPrimary,
            { backgroundColor: colors.tagBackground },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.buttonPrimaryText, { color: colors.tagText }]}>
            Riprova
          </Text>
        </Interactive>
      </View>
    </SafeAreaView>
  );
}
