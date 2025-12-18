import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import ActionButton from "../components/ActionButton";
import useAppStore from "../store/useAppStore";
import { analyzeMeal } from "../services/gemini";

export default function MealScanScreen() {
  const [result, setResult] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const { addEvent } = useAppStore();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) => setHasPermission(status === "granted"));
  }, []);

  const handleCapture = () => {
    if (!hasPermission) {
      Alert.alert("Camera needed", "Please allow camera access to capture your meal.");
      return;
    }
    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync({ quality: 0.7 })
        .then((photo) => {
          setImageUri(photo.uri);
          Alert.alert("Captured", "Meal photo ready for AI scan.");
        })
        .catch(() => Alert.alert("Capture failed", "Try again."));
    }
  };

  const handleAnalyze = async () => {
    const uri = imageUri || "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=60";
    const aiResult = await analyzeMeal(uri);
    setResult(aiResult);
    addEvent({
      type: "verify",
      title: "Meal scan",
      description: `${aiResult.verdict} • ${aiResult.calories} kcal`,
    });
    Alert.alert("AI analysis", "Gemini mock analysis completed.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Scan</Text>
      <Text style={styles.subtitle}>Capture a plate, then run Gemini-style AI nutrition scan.</Text>

      <View style={styles.preview}>
        {hasPermission ? (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={CameraType.back}
            ratio="16:9"
          />
        ) : (
          <Image
            source={{ uri: imageUri || "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=60" }}
            style={styles.image}
          />
        )}
        <View style={styles.overlay}>
          <Ionicons name="camera-outline" size={20} color={colors.surface} />
          <Text style={styles.overlayText}>Point camera at your plate</Text>
        </View>
      </View>

      <ActionButton label="Capture meal photo" onPress={handleCapture} />
      <ActionButton label="Analyze with AI (Gemini mock)" onPress={handleAnalyze} type="secondary" />
      {result && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>{result.verdict}</Text>
          <Text style={styles.resultText}>Dish: {result.name}</Text>
          <Text style={styles.resultText}>Calories: {result.calories}</Text>
          <Text style={styles.resultText}>Sodium: {result.sodium}</Text>
          <Text style={styles.resultText}>Fiber: {result.fiber}</Text>
          <Text style={styles.resultText}>Note: {result.recommendation}</Text>
        </View>
      )}
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
  },
  subtitle: {
    color: colors.subtext,
    marginBottom: 12,
  },
  preview: {
    height: 220,
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(15,76,129,0.8)",
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  overlayText: {
    color: colors.surface,
    fontWeight: "700",
  },
  result: {
    marginTop: 12,
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultTitle: {
    fontWeight: "800",
    color: colors.danger,
  },
  resultText: {
    color: colors.text,
    marginTop: 4,
  },
});
