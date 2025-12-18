import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import useAppStore from "../store/useAppStore";

export default function ProfileScreen() {
  const { user, logout, readinessScore, riskBadge } = useAppStore();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.subtitle}>Role: {user?.role}</Text>
        <Text style={styles.meta}>Readiness: {readinessScore}</Text>
        <Text style={styles.meta}>Risk badge: {riskBadge}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 20, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.subtext, marginTop: 4 },
  meta: { color: colors.text, marginTop: 6 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: colors.surface, fontWeight: "800" },
});
