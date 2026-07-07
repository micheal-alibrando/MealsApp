import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Avatar({
  uri,
  size = 48,
}: {
  uri: string;
  size?: number;
}) {
  const [failed, setFailed] = React.useState(false);
  const radius = size / 2;

  const { colors } = useTheme();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: colors.card,
      }}
    >
      {failed ? (
        <Text
          style={{ textAlign: "center", lineHeight: size, color: colors.text }}
        >
          ?
        </Text>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          onError={() => setFailed(true)}
          accessibilityLabel="Avatar utente"
        />
      )}
    </View>
  );
}
