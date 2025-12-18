const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async login(payload) {
    await delay();
    return {
      token: "demo-token",
      profile: {
        id: "patient-1",
        role: payload?.role || "patient",
        name: payload?.name || "Alex",
      },
    };
  },

  async fetchRisk() {
    await delay();
    return {
      readinessScore: 78,
      riskBadge: "Moderate",
      rationale: ["Low sodium streak", "7-day adherence 82%"],
    };
  },

  async fetchNudges() {
    await delay();
    return [
      { id: "n-1", title: "3-30-300", message: "3 actions today: walk, meds, low sodium." },
      { id: "n-2", title: "Chest pain ≠ chat", message: "Know the signs. Use the panic button." },
    ];
  },

  async verifyAction(actionId, proof) {
    await delay();
    return {
      actionId,
      proof,
      status: "verified",
      timestamp: new Date().toISOString(),
    };
  },

  async escalate(payload) {
    await delay(500);
    return {
      status: "escalated",
      destination: "Nearest cathlab-capable facility",
      etaMinutes: 18,
      ...payload,
    };
  },

  async fetchFacilities() {
    await delay();
    return [
      { id: "f-1", name: "Jakarta Heart Center", capability: "Cathlab", distanceKm: 4.2 },
      { id: "f-2", name: "Cempaka General Hospital", capability: "Stabilization", distanceKm: 2.1 },
    ];
  },
};
