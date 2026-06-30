import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_KEY = "app:v1:favs";
export const USER_KEY = "app:v1:user";

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

export async function saveUser(email: string): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(email));
  } catch {}
}
