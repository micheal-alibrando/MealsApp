import React from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { getMealById } from "../services/mealsApi";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";

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

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text>Caricamento...</Text>
      </SafeAreaView>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Meal non trovato</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} />
          <Text style={styles.buttonBackText}>Indietro</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={styles.imageDetails}
        />

        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.subtitle}>
          {meal.strArea} • {meal.strCategory}
        </Text>

        <Text style={styles.section}>Ingredienti</Text>
        {getIngredients(meal).map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}

        <Text style={styles.section}>Istruzioni</Text>
        <Text>{meal.strInstructions}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
