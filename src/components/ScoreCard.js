import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const badgeColors = {
  Low: colors.success,
  Moderate: colors.warning,
  High: colors.danger,
};

export default function ScoreCard({ score, badge }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Readiness</Text>
        <View style={[styles.badge, { backgroundColor: badgeColors[badge] || colors.muted }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      </View>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.caption}>0 = needs support • 100 = ready to go</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: colors.surface,
    fontWeight: "700",
  },
  score: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.primary,
    marginTop: 8,
  },
  caption: {
    marginTop: 4,
    color: colors.subtext,
  },
});
