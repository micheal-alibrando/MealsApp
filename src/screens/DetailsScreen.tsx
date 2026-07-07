import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Share,
  StyleSheet,
} from "react-native";
import { getMealById } from "../services/mealsApi";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Interactive from "../components/Interactive";
import { useTheme } from "../context/ThemeContext";

export default function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.id;

  const [meal, setMeal] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  async function fetchMeal() {
    try {
      const data = await getMealById(id);
      setMeal(data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchMeal();
  }, [id]);

  function getIngredients(meal: any) {
    const list = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        list.push(`${ingredient} - ${measure}`);
      }
    }

    return list;
  }

  const { colors } = useTheme();

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text style={{ color: colors.text }}>Caricamento...</Text>
      </SafeAreaView>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: colors.text }}>Meal non trovato</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View>
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
      </View>
      <ScrollView
        contentContainerStyle={localStyles.scrollContent}
        accessibilityLabel="Dettagli piatto"
      >
        <View style={[localStyles.imageCard, { backgroundColor: colors.card }]}>
          <Image
            source={{ uri: meal.strMealThumb }}
            style={styles.imageDetails}
          />

          <Interactive
            onPress={async () => {
              try {
                await Share.share({
                  title: meal.strMeal,
                  message: `${meal.strMeal}\n\n${meal.strInstructions?.slice(0, 200)}...\n\n${meal.strMealThumb}`,
                });
              } catch (e) {
                console.log(e);
              }
            }}
            accessibilityLabel="Condividi ricetta"
            style={[localStyles.shareButton, { backgroundColor: colors.card }]}
          >
            <MaterialIcons name="share" size={20} color={colors.text} />
          </Interactive>
        </View>

        <Text style={[styles.title, { color: colors.text, fontSize: 20 }]}>
          {meal.strMeal}
        </Text>
        <Text style={[styles.subtitle, { color: colors.inputBorder }]}>
          {" "}
          {meal.strArea} • {meal.strCategory}
        </Text>

        <Text style={[styles.sectionDetails, { color: colors.text }]}>
          Ingredienti
        </Text>
        {getIngredients(meal).map((item, index) => (
          <Text
            key={index}
            style={{ color: colors.text, marginVertical: 4 }}
            accessibilityLabel={`Ingrediente ${index + 1}`}
          >
            • {item}
          </Text>
        ))}

        <Text style={[styles.sectionDetails, { color: colors.text }]}>
          Istruzioni
        </Text>
        <Text style={{ color: colors.text, lineHeight: 20 }}>
          {meal.strInstructions}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  scrollContent: { paddingBottom: 40 },
  imageCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  shareButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
});
