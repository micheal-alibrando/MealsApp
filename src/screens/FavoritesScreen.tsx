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

      <Text style={[styles.title, { color: colors.text }]}>Preferiti</Text>

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
          <Interactive
            style={[
              styles.buttonPrimary,
              { backgroundColor: colors.tagBackground },
            ]}
            onPress={() => loadFavoriteMeals(favoriteIds)}
          >
            <Text style={[styles.buttonPrimaryText, { color: colors.tagText }]}>
              Riprova
            </Text>
          </Interactive>
        </View>
      ) : state.items.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.text }}>Nessun preferito</Text>
        </View>
      ) : (
        <FlatList
          data={state.items}
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
          contentContainerStyle={
            columns === 2 ? styles.listMeals : { paddingBottom: 16 }
          }
        />
      )}
    </SafeAreaView>
  );
}
