import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import CoachScreen from "../screens/CoachScreen";
import MealScanScreen from "../screens/MealScanScreen";
import MedicationScreen from "../screens/MedicationScreen";
import EmergencyScreen from "../screens/EmergencyScreen";
import LessonsScreen from "../screens/LessonsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LessonDetailScreen from "../screens/LessonDetailScreen";
import { colors } from "../theme/colors";
import useAppStore from "../store/useAppStore";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface },
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home-outline",
            Coach: "sparkles-outline",
            Emergency: "medkit-outline",
            Lessons: "book-outline",
            Profile: "person-circle-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{ tabBarLabel: "Emergency" }}
      />
      <Tab.Screen name="Lessons" component={LessonsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useAppStore();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="MealScan"
            component={MealScanScreen}
            options={{ title: "Meal Scan" }}
          />
          <Stack.Screen
            name="Medication"
            component={MedicationScreen}
            options={{ title: "Medication & Appointment" }}
          />
          <Stack.Screen
            name="LessonDetail"
            component={LessonDetailScreen}
            options={{ title: "Lesson" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
