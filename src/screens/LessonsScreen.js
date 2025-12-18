import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { lessons } from "../data/lessons";
import LessonCard from "../components/LessonCard";

export default function LessonsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lessons Learned Library</Text>
      <Text style={styles.subtitle}>Reels-style anonymized cases with real takeaways.</Text>
      <View style={styles.timeline}>
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => navigation.navigate("LessonDetail", { lesson })}
            activeOpacity={0.85}
          >
            <LessonCard lesson={lesson} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    color: colors.subtext,
    marginBottom: 12,
  },
  timeline: {
    gap: 10,
  },
});
