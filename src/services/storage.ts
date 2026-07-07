import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../context/AuthContext";

export const FAVORITES_KEY = "app:v1:favs";
export const USER_KEY = "app:v1:user";
export const THEME_KEY = "app:v1:theme";

export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export async function saveFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {}
}

export async function loadUser(): Promise<string | null> {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (!raw) return null;
    return raw;
  } catch {
    return null;
  }
}

export async function saveUser(user: User): Promise<void> {
  try {
    const safeUser: User = {
      email: user.email,
      name: user.name,
      avatarUri: user.avatarUri,
    };

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(safeUser));
  } catch {}
}

export async function loadTheme(): Promise<string | null> {
  try {
    const raw = await AsyncStorage.getItem(THEME_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveTheme(theme: string): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch {}
}
