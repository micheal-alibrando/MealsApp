import React from "react";
import {
  Pressable,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { getAllMeals } from "../services/mealsApi";
import MealCard from "../components/MealCard";
import { styles } from "../theme/styles";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MealSummary } from "../models/meal";
import { useWindowDimensions } from "react-native";
import { breakpoints } from "../theme/global";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function MealsScreen({ navigation }: { navigation: any }) {
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

  const [search, setSearch] = React.useState("");

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

  const filteredMeals = state.items.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase()),
  );

  if (!favoritesLoaded || state.status === "loading") {
    return <Loading />;
  }

  if (state.status === "error") {
    return <Error error={state.message} onPress={loadMeals} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} />
        <Text style={styles.buttonBackText}>Indietro</Text>
      </Pressable>

      <Text style={styles.title}>Piatti Italiani</Text>

      <TextInput
        placeholder="Cerca un piatto..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <FlatList
        data={filteredMeals}
        renderItem={({ item }) => (
          <View style={columns === 1 ? { flex: 1 } : { width: "48%" }}>
            <MealCard
              meal={item}
              toggleFavorite={toggleFavorite}
              isFavorite={favoriteIds.includes(item.idMeal)}
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
        ListEmptyComponent={<Text>Nessun risultato</Text>}
      />
    </SafeAreaView>
  );
}
