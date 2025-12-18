import { create } from "zustand";

const defaultTasks = [
  { id: "steps", title: "7k steps", target: "7,000", type: "activity", completed: false },
  { id: "meal", title: "Low-sodium meal", target: "<2g Na", type: "meal", completed: false },
  { id: "sleep", title: "Sleep 7-8h", target: "7-8 hours", type: "sleep", completed: false },
  { id: "meds", title: "Take morning meds", target: "On time", type: "meds", completed: false },
];

const defaultMeds = [
  { id: "aspirin", name: "Aspirin 80mg", schedule: "08:00", taken: false },
  { id: "bb", name: "Beta blocker", schedule: "20:00", taken: false },
];

const defaultLessons = {
  streakDays: 3,
  completed: ["case-geriatri"],
};

const defaultEvents = [
  {
    id: "evt-1",
    type: "nudge",
    title: "3-30-300 reminder",
    description: "Log 3 actions today to keep your streak alive.",
    createdAt: new Date().toISOString(),
  },
];

const useAppStore = create((set, get) => ({
  user: null,
  readinessScore: 74,
  riskBadge: "Moderate",
  tasks: defaultTasks,
  medications: defaultMeds,
  lessons: defaultLessons,
  events: defaultEvents,
  lastEmergency: null,
  lastSymptomCheck: null,
  loginAsPatient: (profile) =>
    set({
      user: {
        id: "patient-1",
        role: "patient",
        name: profile?.name || "Alex",
        location: profile?.location || "Jakarta",
      },
    }),
  logout: () =>
    set({
      user: null,
      tasks: defaultTasks,
      medications: defaultMeds,
      readinessScore: 74,
      riskBadge: "Moderate",
    }),
  toggleTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })),
  markMedication: (medId) =>
    set((state) => {
      const updatedMeds = state.medications.map((med) =>
        med.id === medId ? { ...med, taken: !med.taken } : med
      );
      const medStatus = updatedMeds.find((m) => m.id === medId)?.taken ? "taken" : "missed";
      return {
        medications: updatedMeds,
        events: [
          ...state.events,
          {
            id: `evt-${Date.now()}`,
            type: "verify",
            title: "Medication check-in",
            description: `${medId} marked as ${medStatus}`,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }),
  logSymptomCheck: (symptoms) =>
    set((state) => ({
      lastSymptomCheck: { symptoms, createdAt: new Date().toISOString() },
      events: [
        ...state.events,
        {
          id: `evt-${Date.now()}`,
          type: "verify",
          title: "Symptom check",
          description: `Symptoms: ${symptoms.join(", ")}`,
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateReadiness: (score, badge) =>
    set({
      readinessScore: score,
      riskBadge: badge || get().riskBadge,
    }),
  addEvent: (payload) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          id: payload.id || `evt-${Date.now()}`,
          createdAt: payload.createdAt || new Date().toISOString(),
          ...payload,
        },
      ],
    })),
  recordEmergency: (details) =>
    set((state) => ({
      lastEmergency: { ...details, createdAt: new Date().toISOString() },
      events: [
        ...state.events,
        {
          id: `evt-${Date.now()}`,
          type: "escalate",
          title: "Emergency triggered",
          description: details?.notes || "Panic button pressed",
          createdAt: new Date().toISOString(),
        },
      ],
    })),
}));

export default useAppStore;
