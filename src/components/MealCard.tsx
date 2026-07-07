import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "../theme/styles";
import { MaterialIcons } from "@expo/vector-icons";
import Interactive from "./Interactive";
import { useTheme } from "../context/ThemeContext";

export default function MealCard({
  meal,
  toggleFavorite,
  isFavorite,
  onPress,
}: {
  meal: any;
  toggleFavorite: Function;
  isFavorite: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.cardMeals, { backgroundColor: colors.card }]}>
      <Interactive
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 1,
        }}
        accessibilityLabel={
          isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
        }
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(meal.idMeal);
        }}
      >
        {isFavorite ? (
          <MaterialIcons name="favorite" size={24} color="red" />
        ) : (
          <MaterialIcons
            name="favorite-outline"
            size={24}
            color={colors.text}
          />
        )}
      </Interactive>

      <Interactive onPress={onPress}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
          }}
        />

        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>
            {meal.strMeal}
          </Text>
          <Text
            style={[
              styles.tagMeals,
              { backgroundColor: colors.tagBackground, color: colors.tagText },
            ]}
          >
            {meal.strArea}
          </Text>
        </View>
      </Interactive>
    </View>
  );
}
