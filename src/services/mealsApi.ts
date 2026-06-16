import { apiRequest } from './client'

export async function getAllMeals() {
  return apiRequest('/search.php?s=')
}

export async function getMealById(id: string) {
  return apiRequest(`/lookup.php?i=${id}`)
}
