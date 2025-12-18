export function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
