import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useAppStore from "../store/useAppStore";
import { colors } from "../theme/colors";

export default function MedicationScreen() {
  const { medications, markMedication } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication & Appointment</Text>
      {medications.map((med) => (
        <TouchableOpacity
          key={med.id}
          onPress={() => markMedication(med.id)}
          style={[styles.card, med.taken && styles.done]}
        >
          <View>
            <Text style={styles.medTitle}>{med.name}</Text>
            <Text style={styles.medMeta}>Schedule: {med.schedule}</Text>
          </View>
          <Text style={[styles.status, med.taken && styles.statusDone]}>
            {med.taken ? "Taken" : "Pending"}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.card}>
        <Text style={styles.medTitle}>Appointment</Text>
        <Text style={styles.medMeta}>Cardiologist visit: Monday, 10:00</Text>
        <Text style={styles.medMeta}>Agenda: med review + rehab program</Text>
      </View>
    </View>
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
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  done: {
    backgroundColor: "#f0f7f2",
  },
  medTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  medMeta: {
    color: colors.subtext,
  },
  status: {
    color: colors.warning,
    fontWeight: "700",
  },
  statusDone: {
    color: colors.success,
  },
});
