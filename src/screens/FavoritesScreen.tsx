import React from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { getAllMeals } from "../services/mealsApi";
import MealCard from "../components/MealCard";
import { styles } from "../theme/styles";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MealSummary } from "../models/meal";
import { useWindowDimensions } from "react-native";
import { breakpoints } from "../theme/global";
import { useTheme } from "../context/ThemeContext";
import Interactive from "../components/Interactive";

export default function FavoritesScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();

  const columns = width >= breakpoints.md ? 2 : 1;
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

  async function loadFavoriteMeals(ids: string[]) {
    setState({ status: "loading", items: [], message: "" });

    try {
      const data = await getAllMeals();

      const filtered = data.filter((meal: MealSummary) =>
        ids.includes(meal.idMeal),
      );

      setState({ status: "success", items: filtered, message: "" });
    } catch {
      setState({
        status: "error",
        items: [],
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  React.useEffect(() => {
    loadFavoriteIds()
      .then((ids) => {
        setFavoriteIds(ids);
        return loadFavoriteMeals(ids);
      })
      .finally(() => setFavoritesLoaded(true));
  }, []);

  function toggleFavorite(idMeal: string) {
    setFavoriteIds((current) => {
      const next = current.includes(idMeal)
        ? current.filter((id) => id !== idMeal)
        : [...current, idMeal];

      void saveFavoriteIds(next);

      loadFavoriteMeals(next);

      return next;
    });
  }

  const { colors } = useTheme();

  if (!favoritesLoaded || state.status === "loading") {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: "transparent" }]}
      >
        <ActivityIndicator />
        <Text style={{ color: colors.text }}>Caricamento...</Text>
      </SafeAreaView>
    );
  }

  if (state.status === "error") {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={{ color: colors.text }}>{state.message}</Text>
        <Interactive onPress={() => loadFavoriteMeals(favoriteIds)}>
          <Text style={{ color: colors.text }}>Retry</Text>
        </Interactive>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Interactive
        style={[
          styles.buttonBack,
          { borderColor: colors.inputBorder, backgroundColor: colors.card },
        ]}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        <Text style={[styles.buttonBackText, { color: colors.text }]}>
          Indietro
        </Text>
      </Interactive>

      <Text style={[styles.title, { color: colors.text }]}>Preferiti</Text>

      {state.items.length === 0 ? (
        <Text style={{ color: colors.text }}>Nessun preferito</Text>
      ) : (
        <FlatList
          data={state.items}
          renderItem={({ item }) => (
            <View style={columns === 1 ? { flex: 1 } : { width: "48%" }}>
              <MealCard
                meal={item}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
                onPress={() =>
                  navigation.navigate("details", { id: item.idMeal })
                }
              />
            </View>
          )}
          keyExtractor={(item) => item.idMeal}
          numColumns={columns}
          columnWrapperStyle={columns === 2 && styles.rowMeals}
          contentContainerStyle={columns === 2 && styles.listMeals}
        />
      )}
    </SafeAreaView>
  );
}
