import React from "react";
import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/styles";

export default function Error({
  error,
  onPress,
}: {
  error?: string;
  onPress: () => void;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{error}</Text>
      <Pressable style={styles.buttonPrimary} onPress={onPress}>
        <Text style={styles.buttonPrimaryText}>Riprova</Text>
      </Pressable>
    </SafeAreaView>
  );
}
