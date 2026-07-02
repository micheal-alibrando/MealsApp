import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/styles";

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
      <Text>Caricamento...</Text>
    </SafeAreaView>
  );
}
