import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

type Props = PressableProps & {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function Interactive({
  children,
  style,
  hitSlop,
  accessibilityRole,
  accessible,
  ...rest
}: Props) {
  const defaultHitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

  return (
    <Pressable
      hitSlop={hitSlop ?? defaultHitSlop}
      accessibilityRole={accessibilityRole ?? "button"}
      accessible={accessible ?? true}
      // keep colors unchanged: only apply a subtle scale on press
      style={({ pressed }) => [
        style,
        pressed && { transform: [{ scale: 0.985 }] },
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
