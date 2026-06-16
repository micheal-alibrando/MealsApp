const API_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function apiRequest(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }
  return response.json()
}
