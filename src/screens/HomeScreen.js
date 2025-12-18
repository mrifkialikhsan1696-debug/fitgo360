import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ScoreCard from "../components/ScoreCard";
import { colors } from "../theme/colors";
import useAppStore from "../store/useAppStore";

export default function HomeScreen({ navigation }) {
  const { readinessScore, riskBadge, tasks, toggleTask, user, events, lastEmergency } = useAppStore();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#0F4C81", "#0d3c63"]} style={styles.hero}>
        <View style={styles.heroRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.heading}>{user?.name || "Patient"}</Text>
            <Text style={styles.sub}>Stay ahead with 3-30-300 and rapid escalation.</Text>
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1582719478266-9537b95e0b5b?auto=format&fit=crop&w=400&q=60" }}
            style={styles.heroImg}
          />
        </View>
        <ScoreCard score={readinessScore} badge={riskBadge} />
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick actions</Text>
        <View style={styles.quickRow}>
          <QuickPill icon="sparkles-outline" label="AI Coach" onPress={() => navigation.navigate("Coach")} />
          <QuickPill icon="fast-food-outline" label="Meal Scan" onPress={() => navigation.navigate("MealScan")} />
          <QuickPill icon="medkit" label="Emergency" type="danger" onPress={() => navigation.navigate("Emergency")} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today’s 3-30-300</Text>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[styles.task, task.completed && styles.taskDone]}
            onPress={() => toggleTask(task.id)}
          >
            <View>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskSubtitle}>{task.target}</Text>
            </View>
            <Text style={[styles.taskStatus, task.completed && styles.doneText]}>
              {task.completed ? "Done" : "Tap to verify"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Latest events</Text>
        {events.slice(-3).map((evt) => (
          <View key={evt.id} style={styles.eventRow}>
            <Text style={styles.eventTitle}>{evt.title}</Text>
            <Text style={styles.eventDesc}>{evt.description}</Text>
          </View>
        ))}
        {lastEmergency && (
          <View style={[styles.eventRow, styles.emergency]}>
            <Text style={styles.eventTitle}>Emergency</Text>
            <Text style={styles.eventDesc}>
              {lastEmergency.destination} • ETA {lastEmergency.etaMinutes} min
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function QuickPill({ label, onPress, type = "primary", icon }) {
  const background =
    type === "danger" ? colors.danger : type === "secondary" ? colors.secondary : colors.surface;
  const color = type === "primary" ? colors.primary : colors.surface;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.pill, { backgroundColor: background }]}>
      <Ionicons name={icon} size={20} color={type === "primary" ? colors.primary : colors.surface} />
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    padding: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  welcome: {
    color: "#c6d6eb",
    fontWeight: "700",
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  sub: {
    color: "#d7e6f7",
    marginTop: 4,
  },
  heroImg: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  pill: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillText: { fontWeight: "800" },
  task: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDone: {
    backgroundColor: "#f0f7f2",
  },
  taskTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  taskSubtitle: {
    color: colors.subtext,
  },
  taskStatus: {
    color: colors.subtext,
    fontWeight: "700",
  },
  doneText: {
    color: colors.success,
  },
  eventRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eventTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  eventDesc: {
    color: colors.subtext,
  },
  emergency: {
    backgroundColor: "#fff4f4",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.danger,
  },
});
