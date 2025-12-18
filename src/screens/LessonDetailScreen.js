import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function LessonDetailScreen({ route }) {
  const { lesson } = route.params || {};
  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lesson not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Real-world case</Text>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.hook}>{lesson.hook}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Timeline</Text>
        <Text style={styles.value}>{lesson.timeline}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Takeaway</Text>
        <Text style={styles.takeaway}>{lesson.takeaway}</Text>
        {lesson.details && (
          <View style={styles.details}>
            {lesson.details.map((d, idx) => (
              <Text key={idx} style={styles.detailItem}>
                • {d}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    gap: 10,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#edf3fb",
    color: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  hook: {
    color: colors.subtext,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.subtext,
    fontWeight: "700",
    marginBottom: 6,
  },
  value: {
    color: colors.text,
    fontSize: 16,
  },
  takeaway: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  details: {
    marginTop: 8,
    gap: 4,
  },
  detailItem: {
    color: colors.text,
  },
});
