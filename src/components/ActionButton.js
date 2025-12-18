import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function ActionButton({ label, onPress, type = "primary", style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        type === "secondary" && styles.secondary,
        type === "danger" && styles.danger,
        style,
      ]}
      activeOpacity={0.9}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  label: {
    color: colors.surface,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
