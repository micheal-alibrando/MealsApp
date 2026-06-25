import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { styles } from "../style";
import { MaterialIcons } from "@expo/vector-icons";

export default function MealCard({
  meal,
  toggleFavorite,
  isFavorite,
}: {
  meal: any;
  toggleFavorite: Function;
  isFavorite: boolean;
}) {
  return (
    <View style={styles.mealCard}>
      <Pressable
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          alignSelf: "flex-end",
        }}
        onPress={() => toggleFavorite(meal.idMeal)}
      >
        {isFavorite ? (
          <MaterialIcons name="favorite" size={24} color="red" />
        ) : (
          <MaterialIcons name="favorite-outline" size={24} color="black" />
        )}
      </Pressable>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "100%",
          alignSelf: "center",
        }}
      />
      <View style={{ flex: 1, gap: 8 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {meal.strMeal}
        </Text>
        <Text style={styles.mealTag}>{meal.strArea}</Text>
      </View>
    </View>
  );
}
