import { StyleSheet } from "react-native";
import { borderRadius, colors, fontSizes, spacing } from "./global";

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
  chip: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignSelf: "flex-start",
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
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
  scrollContent: { paddingBottom: 40 },
  imageCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  shareButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },

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

export const createDetailsScreenStyles = (colors: {
  inputBorder: string;
  card: string;
  text: string;
  tagBackground: string;
  tagText: string;
}) =>
  StyleSheet.create({
    headerRow: { marginBottom: spacing.md },
    scrollContent: { paddingBottom: 40, paddingTop: 4 },
    imageWrapper: {
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.card,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
    },
    image: { width: "100%", height: 300 },
    shareButton: {
      position: "absolute",
      right: 12,
      top: 12,
      padding: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.card,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    titleBlock: { marginBottom: spacing.md },
    titleText: { fontSize: 24, marginBottom: spacing.sm, color: colors.text },
    subtitleRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    badge: {
      borderRadius: 999,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      backgroundColor: colors.tagBackground,
    },
    badgeText: {
      fontSize: fontSizes.sm,
      fontWeight: "600",
      color: colors.tagText,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: spacing.sm,
      color: colors.text,
    },
    ingredientRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: spacing.sm,
    },
    bullet: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.tagBackground,
      marginTop: 7,
      marginRight: 8,
    },
    ingredientText: {
      flex: 1,
      color: colors.text,
      lineHeight: 20,
    },
    instructionText: {
      color: colors.text,
      lineHeight: 23,
    },
  });
