import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import useAppStore from "../store/useAppStore";
import { campaigns } from "../data/campaigns";
import { api } from "../services/api";
import { askCoach } from "../services/gemini";

export default function CoachScreen() {
  const { tasks, toggleTask, readinessScore, updateReadiness } = useAppStore();
  const completion = Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100);
  const incomplete = tasks.find((t) => !t.completed);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { id: "m1", sender: "ai", text: "Hi, I’m your GO FIT 360° coach. Ask me anything about cardio-safety." },
  ]);

  const handleNextBestAction = () => {
    if (incomplete) {
      toggleTask(incomplete.id);
    }
  };

  const handleSyncCoach = async () => {
    const risk = await api.fetchRisk();
    updateReadiness(risk.readinessScore, risk.riskBadge);
  };

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, sender: "you", text: chatInput.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    const ai = await askCoach(userMsg.text);
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: ai.answer,
        next: ai.nextActions,
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>AI Coach Planner</Text>
        <Text style={styles.subtitle}>Readiness {readinessScore} • Completion {completion}%</Text>
        <View style={styles.badgeRow}>
          <Chip icon="flame-outline" label="Next best action" />
          <Chip icon="ribbon-outline" label="Streak builder" />
          <Chip icon="shield-checkmark-outline" label="Cardio-safe" />
        </View>
        <TouchableOpacity style={styles.sync} onPress={handleSyncCoach}>
          <Ionicons name="cloud-download-outline" size={16} color={colors.primary} />
          <Text style={styles.syncText}>Refresh coach recommendations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextAction} onPress={handleNextBestAction} disabled={!incomplete}>
          <Text style={styles.nextActionText}>
            {incomplete ? `Complete: ${incomplete.title}` : "All actions done"}
          </Text>
        </TouchableOpacity>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[styles.task, task.completed && styles.done]}
            onPress={() => toggleTask(task.id)}
          >
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskMeta}>{task.target}</Text>
            <Text style={[styles.status, task.completed && styles.statusDone]}>
              {task.completed ? "Completed" : "Tap to verify"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Strategic Campaigns</Text>
        {campaigns.map((campaign) => (
          <View key={campaign.id} style={styles.campaign}>
            <View>
              <Text style={styles.campaignTitle}>{campaign.title}</Text>
              <Text style={styles.campaignMeta}>{campaign.date} • {campaign.focus}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Behavioral hooks</Text>
        <Bullet text="3-30-300: 3 actions daily, 30-day streak, 300 active minutes/month." />
        <Bullet text="Chest pain ≠ chat: escalate fast, not later." />
        <Bullet text="90-day rule post-cathlab: keep secondary prevention tight." />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Gemini-style Coach Chat</Text>
        <View style={styles.chatBox}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.bubble, msg.sender === "ai" ? styles.aiBubble : styles.youBubble]}
            >
              <Text style={styles.bubbleSender}>{msg.sender === "ai" ? "Coach" : "You"}</Text>
              <Text style={styles.bubbleText}>{msg.text}</Text>
              {msg.next && (
                <View style={styles.nextActions}>
                  {msg.next.map((n) => (
                    <Text key={n} style={styles.nextText}>
                      • {n}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={styles.chatInputRow}>
          <TextInput
            style={styles.chatInput}
            placeholder="Ask about exercise, meds, diet, symptoms..."
            value={chatInput}
            onChangeText={setChatInput}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={18} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function Chip({ icon, label }) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={14} color={colors.primary} />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function Bullet({ text }) {
  return (
    <View style={styles.bullet}>
      <Ionicons name="ellipse" size={8} color={colors.primary} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontWeight: "800",
    fontSize: 18,
    color: colors.text,
  },
  subtitle: {
    color: colors.subtext,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#edf3fb",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  chipText: {
    color: colors.primary,
    fontWeight: "700",
  },
  task: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  done: {
    backgroundColor: "#f1f8f5",
  },
  taskTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  taskMeta: {
    color: colors.subtext,
  },
  status: {
    color: colors.warning,
    fontWeight: "700",
    marginTop: 4,
  },
  statusDone: {
    color: colors.success,
  },
  campaign: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  campaignTitle: {
    fontWeight: "700",
    color: colors.text,
  },
  campaignMeta: {
    color: colors.subtext,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  bulletText: {
    color: colors.text,
    flex: 1,
  },
  sync: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  syncText: {
    color: colors.primary,
    fontWeight: "700",
  },
  nextAction: {
    backgroundColor: "#edf3fb",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  nextActionText: {
    color: colors.primary,
    fontWeight: "700",
    textAlign: "center",
  },
  chatBox: {
    backgroundColor: "#f7f9fc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    gap: 8,
  },
  bubble: {
    padding: 10,
    borderRadius: 10,
  },
  aiBubble: {
    backgroundColor: "#edf3fb",
  },
  youBubble: {
    backgroundColor: "#e8f7f2",
    alignSelf: "flex-end",
  },
  bubbleSender: {
    fontWeight: "700",
    color: colors.text,
  },
  bubbleText: {
    color: colors.text,
  },
  nextActions: {
    marginTop: 6,
  },
  nextText: {
    color: colors.primary,
  },
  chatInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chatInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
  },
});
