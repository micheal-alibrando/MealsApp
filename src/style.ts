import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Global Style
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
    marginBottom: 12,
  },
  content: {
    marginTop: 40,
    gap: 20,
  },
  section: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  // Buttons
  buttonPrimary: {
    marginTop: 10,
    backgroundColor: "#b00020",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonBack: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonBackText: {
    fontSize: 16,
    fontWeight: "semibold",
  },

  // Other elements
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  form: {
    padding: 24,
    gap: 16,
  },

  // Status
  error: {
    color: "#b00020",
    textAlign: "center",
  },

  // Home Screen
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "gray",
  },

  // Login Screen
  titleLogin: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: "#b00020",
  },
  imageLogin: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },

  // Meals Screen
  listMeals: {
    gap: 16,
  },
  rowMeals: {
    justifyContent: "space-between",
    gap: 16,
  },
  cardMeals: {
    backgroundColor: "#f9faf9",
    borderRadius: 10,
    overflow: "hidden",
    padding: 24,
    gap: 16,
  },
  tagMeals: {
    fontSize: 14,
    backgroundColor: "#8f0806",
    color: "white",
    fontWeight: "600",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },

  // Details Screen
  imageDetails: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionDetails: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  buttonDetails: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  buttonTextDetails: { fontWeight: "600", fontSize: 16 },

  // Profile Screen
  boxProfile: {
    alignItems: "center",
    gap: 12,
    marginTop: 40,
  },
  logoutButton: {
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
