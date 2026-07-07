import React from "react";
import { View, StyleSheet } from "react-native";
import Interactive from "./Interactive";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === "dark";

  return (
    <Interactive
      onPress={toggleTheme}
      accessibilityLabel={isDark ? "Imposta tema chiaro" : "Imposta tema scuro"}
      style={[styles.container, { backgroundColor: isDark ? "#444" : "#ddd" }]}
    >
      <View style={styles.iconLeft}>
        <MaterialIcons
          name="wb-sunny"
          size={18}
          color={isDark ? "#999" : "#f5d76e"}
        />
      </View>

      <View style={styles.iconRight}>
        <MaterialIcons
          name="nights-stay"
          size={18}
          color={isDark ? "#9ad0ff" : "#666"}
        />
      </View>

      <View
        style={[
          styles.knob,
          {
            left: isDark ? 36 : 6,
            backgroundColor: colors.card,
          },
        ]}
      >
        <MaterialIcons
          name={isDark ? "nights-stay" : "wb-sunny"}
          size={18}
          color={colors.text}
        />
      </View>
    </Interactive>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 40,
    borderRadius: 22,
    padding: 6,
    justifyContent: "center",
  },
  iconLeft: {
    position: "absolute",
    left: 8,
  },
  iconRight: {
    position: "absolute",
    right: 8,
  },
  knob: {
    position: "absolute",
    top: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
