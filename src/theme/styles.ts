import { StyleSheet } from "react-native";
import {
  borderRadius,
  breakpoints,
  colors,
  fontSizes,
  spacing,
} from "./global";

export const styles = StyleSheet.create({
  // Global Style
  container: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
    marginBottom: spacing.md,
  },
  content: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  section: {
    marginTop: spacing.md,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  // Buttons
  buttonPrimary: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "white",
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: colors.background.black,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: fontSizes.md,
  },
  buttonBack: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonBackText: {
    fontSize: fontSizes.md,
    fontWeight: "semibold",
  },

  // Other elements
  input: {
    borderWidth: 1,
    borderColor: colors.white[800],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSizes.md,
    backgroundColor: colors.white[900],
  },
  form: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  // Status
  error: {
    color: colors.secondary,
    textAlign: "center",
  },

  // Home Screen
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  welcome: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  email: {
    color: colors.gray[900],
  },

  // Login Screen
  titleLogin: {
    fontSize: fontSizes.lg,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: spacing.md,
    color: colors.primary,
  },
  imageLogin: {
    width: "100%",
    height: 250,
    borderRadius: borderRadius.md,
  },

  // Meals Screen
  listMeals: {
    gap: spacing.md,
  },
  rowMeals: {
    justifyContent: "space-between",
    gap: spacing.md,
  },
  cardMeals: {
    backgroundColor: colors.white[900],
    borderRadius: borderRadius.sm,
    overflow: "hidden",
    padding: spacing.lg,
    gap: spacing.md,
  },
  tagMeals: {
    fontSize: fontSizes.sm,
    backgroundColor: colors.primary,
    color: colors.white[900],
    fontWeight: "600",
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },

  // Details Screen
  imageDetails: {
    width: "100%",
    height: 300,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  sectionDetails: {
    marginTop: spacing.md,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  buttonDetails: {
    alignSelf: "flex-start",
    paddingVertical: spacing.sm,
    backgroundColor: colors.white[900],
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
  },
  buttonTextDetails: { fontWeight: "600", fontSize: 16 },

  // Profile Screen
  boxProfile: {
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  logoutButton: {
    backgroundColor: colors.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: "center",
  },

  logoutButtonText: {
    color: "white",
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
});
