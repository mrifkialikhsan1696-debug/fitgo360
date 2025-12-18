import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { triggerPanic, verifySymptoms, fetchEscalationOptions } from "../services/escalation";
import useAppStore from "../store/useAppStore";

export default function EmergencyScreen() {
  const { lastEmergency, lastSymptomCheck } = useAppStore();
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchEscalationOptions().then(setFacilities);
  }, []);

  const handlePanic = async () => {
    await triggerPanic("Chest pain panic button pressed");
    Alert.alert("Emergency", "Escalation and routing in progress.");
  };

  const handleSymptomCheck = async () => {
    await verifySymptoms(["chest pain", "nausea"]);
    Alert.alert("Check-in", "Symptoms logged. Reassess in 10 minutes; panic if worse.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency (Chest pain ≠ chat)</Text>
      <View style={styles.banner}>
        <View style={styles.bannerRow}>
          <Ionicons name="warning-outline" size={20} color={colors.danger} />
          <Text style={styles.bannerText}>Chest pain, cold sweat, nausea? Escalate, don’t chat.</Text>
        </View>
        <Text style={styles.bannerText}>If in doubt, hit panic and head to cathlab-capable care.</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.danger]} onPress={handlePanic}>
        <Text style={styles.buttonText}>Panic Button</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={handleSymptomCheck}>
        <Text style={styles.buttonText}>Symptom Check</Text>
      </TouchableOpacity>

      {lastEmergency && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last escalation</Text>
          <Text style={styles.cardText}>{lastEmergency.destination}</Text>
          <Text style={styles.cardText}>ETA: {lastEmergency.etaMinutes} minutes</Text>
        </View>
      )}

      {lastSymptomCheck && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last symptom check</Text>
          <Text style={styles.cardText}>{lastSymptomCheck.symptoms.join(", ")}</Text>
          <Text style={styles.cardText}>
            Logged at {new Date(lastSymptomCheck.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nearest capable facilities</Text>
        {facilities.map((facility) => (
          <View key={facility.id} style={styles.facility}>
            <Text style={styles.facilityTitle}>{facility.name}</Text>
            <Text style={styles.facilityMeta}>
              {facility.capability} • {facility.distanceKm} km
            </Text>
          </View>
        ))}
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
  banner: {
    backgroundColor: "#fff6e6",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  bannerRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 4,
  },
  bannerText: {
    color: colors.text,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  danger: { backgroundColor: colors.danger },
  secondary: { backgroundColor: colors.secondary },
  buttonText: { color: colors.surface, fontWeight: "800" },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  cardText: { color: colors.subtext },
  facility: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  facilityTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  facilityMeta: { color: colors.subtext },
});
