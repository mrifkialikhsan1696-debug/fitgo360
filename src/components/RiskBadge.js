import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const badges = {
  Low: { bg: colors.success, text: "Low" },
  Moderate: { bg: colors.warning, text: "Moderate" },
  High: { bg: colors.danger, text: "High" },
};

export default function RiskBadge({ level }) {
  const badge = badges[level] || badges.Moderate;
  return (
    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
      <Text style={styles.text}>{badge.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: colors.surface,
    fontWeight: "700",
  },
});
