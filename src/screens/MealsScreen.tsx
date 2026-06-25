import React from "react";
import {
  Pressable,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getAllMeals } from "../services/mealsApi";
import MealCard from "../components/MealCard";
import { styles } from "../style";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";

interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealsScreen() {
  const [state, setState] = React.useState<{
    status: "idle" | "loading" | "success" | "error";
    items: MealSummary[];
    message: string;
  }>({
    status: "idle",
    items: [],
    message: "",
  });
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = React.useState(false);

  async function loadMeals() {
    setState({ status: "loading", items: [], message: "" });
    try {
      const data = await getAllMeals();
      setState({ status: "success", items: data, message: "" });
    } catch {
      setState({
        status: "error",
        items: [],
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  React.useEffect(() => {
    loadMeals();
  }, []);

  function toggleFavorite(idMeal: string) {
    setFavoriteIds((current) => {
      const next = current.includes(idMeal)
        ? current.filter((id) => id !== idMeal)
        : [...current, idMeal];
      void saveFavoriteIds(next);
      return next;
    });
  }

  React.useEffect(() => {
    loadFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setFavoritesLoaded(true));
  }, []);

  if (!favoritesLoaded || state.status === "loading") {
    return (
      <View>
        <ActivityIndicator />
        <Text>Caricamento...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View>
        <Text>{state.message}</Text>
        <Pressable onPress={loadMeals}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piatti Italiani</Text>
      <FlatList
        data={state.items}
        renderItem={({ item }) => (
          <View style={{ width: "48%" }}>
            <MealCard
              meal={item}
              toggleFavorite={toggleFavorite}
              isFavorite={favoriteIds.includes(item.idMeal)}
            />
          </View>
        )}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.mealRow}
        contentContainerStyle={styles.mealList}
      />
    </View>
  );
}
