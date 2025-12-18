import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleDailyReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "3-30-300 check-in",
      body: "Lengkapi 3 aksi hari ini dan jaga streak kamu.",
    },
    trigger: { hour: 7, minute: 0, repeats: true },
  });
}
