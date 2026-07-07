import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Share,
} from "react-native";
import { getMealById } from "../services/mealsApi";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Interactive from "../components/Interactive";
import { useTheme } from "../context/ThemeContext";
import { createDetailsScreenStyles, styles } from "../theme/styles";

export default function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.idMeal ?? route.params?.id;

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
  const localStyles = createDetailsScreenStyles(colors);

  if (loading) {
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

  if (!meal) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.text }}>Meal non trovato</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={localStyles.headerRow}>
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
        showsVerticalScrollIndicator={false}
      >
        <View style={localStyles.imageWrapper}>
          <Image
            source={{ uri: meal.strMealThumb }}
            style={localStyles.image}
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
            style={localStyles.shareButton}
          >
            <MaterialIcons name="share" size={20} color={colors.text} />
          </Interactive>
        </View>

        <View style={localStyles.titleBlock}>
          <Text style={localStyles.titleText}>{meal.strMeal}</Text>
          <View style={localStyles.subtitleRow}>
            <View style={localStyles.badge}>
              <Text style={localStyles.badgeText}>{meal.strArea}</Text>
            </View>
            <View style={localStyles.badge}>
              <Text style={localStyles.badgeText}>{meal.strCategory}</Text>
            </View>
          </View>
        </View>

        <View style={localStyles.sectionCard}>
          <Text style={localStyles.sectionTitle}>Ingredienti</Text>
          {getIngredients(meal).map((item, index) => (
            <View key={index} style={localStyles.ingredientRow}>
              <View style={localStyles.bullet} />
              <Text
                style={localStyles.ingredientText}
                accessibilityLabel={`Ingrediente ${index + 1}`}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={localStyles.sectionCard}>
          <Text style={localStyles.sectionTitle}>Istruzioni</Text>
          <Text style={localStyles.instructionText}>
            {meal.strInstructions}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
