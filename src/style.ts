import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mealList: {
    gap: 16,
  },
  mealRow: {
    justifyContent: "space-between",
    gap: 16,
  },
  mealCard: {
    backgroundColor: "#f9faf9",
    borderRadius: 10,
    overflow: "hidden",
    padding: 24,
    gap: 16,
  },
  mealTag: {
    fontSize: 14,
    backgroundColor: "#8f0806",
    color: "white",
    fontWeight: "600",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
});
