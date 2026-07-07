import React from "react";
import {
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
import Interactive from "../components/Interactive";
import { useTheme } from "../context/ThemeContext";

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

  const { colors } = useTheme();

  if (!favoritesLoaded) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.text} />
          <Text style={{ color: colors.text, marginTop: 12 }}>
            Caricamento...
          </Text>
        </View>
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

      <Text style={[styles.title, { color: colors.text }]}>
        Piatti Italiani
      </Text>

      <TextInput
        placeholder="Cerca un piatto..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: colors.inputBorder || "#ccc",
          borderRadius: 10,
          padding: 10,
          marginBottom: 12,
          backgroundColor: colors.input,
          color: colors.text,
        }}
      />

      {state.status === "loading" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.text} />
          <Text style={{ color: colors.text, marginTop: 12 }}>
            Caricamento...
          </Text>
        </View>
      ) : state.status === "error" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {state.message}
          </Text>
          <Interactive style={[styles.buttonPrimary]} onPress={loadMeals}>
            <Text style={styles.buttonPrimaryText}>Riprova</Text>
          </Interactive>
        </View>
      ) : filteredMeals.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.text }}>Nessun risultato</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMeals}
          renderItem={({ item }) => (
            <View
              style={
                columns === 1
                  ? { flex: 1, marginBottom: 12 }
                  : { width: "48%", marginBottom: 12 }
              }
            >
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
          contentContainerStyle={
            columns === 2 ? styles.listMeals : { paddingBottom: 16 }
          }
        />
      )}
    </SafeAreaView>
  );
}
