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

  const categoryTag = meal?.strCategory?.trim();
  const tags = categoryTag ? [categoryTag] : [];

  return (
    <View
      style={[
        styles.cardMeals,
        { backgroundColor: colors.card, borderColor: colors.inputBorder },
      ]}
    >
      <Interactive
        style={styles.mealCardFavoriteButton}
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
          style={styles.mealCardImage}
        />

        <View style={styles.mealCardContent}>
          <Text style={[styles.mealCardTitle, { color: colors.text }]}>
            {meal.strMeal}
          </Text>
          <View style={styles.mealCardTagRow}>
            {tags.map((tag) => (
              <Text
                key={tag}
                style={[styles.chip, { backgroundColor: colors.tagBackground }]}
              >
                <Text style={[styles.chipText, { color: colors.tagText }]}>
                  {tag}
                </Text>
              </Text>
            ))}
          </View>
        </View>
      </Interactive>
    </View>
  );
}
