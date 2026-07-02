import { apiRequest } from "./client";

export async function getAllMeals() {
  return apiRequest("/filter.php?a=Italian");
}

export async function getMealById(id: string) {
  return apiRequest(`/lookup.php?i=${id}`);
}
