import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MealsScreen from "./src/screens/MealsScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import * as Linking from "expo-linking";
import { FavoriteProvider } from "./src/context/FavoriteContext";
import { AuthProvider } from "./src/context/AuthContext";
import ProfileScreen from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "myapp://"],
  config: {
    screens: {
      Home: "home",
      Meals: "meals",
      Details: "details/:id",
      Favorites: "favorites",
      Profile: "profile",
    },
  },
};

export default function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="login" component={AuthScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="meals" component={MealsScreen} />
            <Stack.Screen name="details" component={DetailsScreen} />
            <Stack.Screen name="favorites" component={FavoritesScreen} />
            <Stack.Screen name="profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteProvider>
    </AuthProvider>
  );
}
