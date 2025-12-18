import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import ActionButton from "../components/ActionButton";
import { colors } from "../theme/colors";
import useAppStore from "../store/useAppStore";

export default function AuthScreen() {
  const { loginAsPatient } = useAppStore();
  const [name, setName] = useState("Alex");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GO FIT 360°</Text>
      <Text style={styles.subtitle}>CardioPrevent Lab</Text>

      <Image
        source={{ uri: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60" }}
        style={styles.hero}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" />
        <Text style={styles.helper}>Default role: patient (mobile-first)</Text>
        <ActionButton label="Continue as Patient" onPress={() => loginAsPatient({ name })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
  },
  subtitle: {
    color: colors.subtext,
    marginBottom: 24,
  },
  hero: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontWeight: "700",
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: colors.surface,
  },
  helper: {
    color: colors.subtext,
  },
});
