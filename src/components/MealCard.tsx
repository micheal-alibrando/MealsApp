import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { styles } from "../theme/styles";
import { MaterialIcons } from "@expo/vector-icons";

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
  return (
    <View style={styles.cardMeals}>
      <Pressable
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 1,
        }}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(meal.idMeal);
        }}
      >
        {isFavorite ? (
          <MaterialIcons name="favorite" size={24} color="red" />
        ) : (
          <MaterialIcons name="favorite-outline" size={24} color="black" />
        )}
      </Pressable>

      <Pressable onPress={onPress}>
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
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {meal.strMeal}
          </Text>
          <Text style={styles.tagMeals}>{meal.strArea}</Text>
        </View>
      </Pressable>
    </View>
  );
}
