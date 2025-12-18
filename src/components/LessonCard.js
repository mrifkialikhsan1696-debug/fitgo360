import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function LessonCard({ lesson }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.hook}>{lesson.hook}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>Timeline: {lesson.timeline}</Text>
        <Text style={styles.metaHighlight}>Takeaway: {lesson.takeaway}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  hook: {
    marginTop: 6,
    color: colors.subtext,
  },
  metaRow: {
    marginTop: 10,
    gap: 6,
  },
  meta: {
    color: colors.text,
  },
  metaHighlight: {
    color: colors.primary,
    fontWeight: "700",
  },
});
