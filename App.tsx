import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MealsScreen from "./src/screens/MealsScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import * as Linking from "expo-linking";
import { FavoriteProvider } from "./src/context/FavoriteContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import ProfileScreen from "./src/screens/Profile";
import { SafeAreaProvider } from "react-native-safe-area-context";

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

function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="meals" component={MealsScreen} />
          <Stack.Screen name="details" component={DetailsScreen} />
          <Stack.Screen name="favorites" component={FavoritesScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="login" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoriteProvider>
          <ThemeProvider>
            <NavigationContainer linking={linking}>
              <AppNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </FavoriteProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
