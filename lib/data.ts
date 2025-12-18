import { Role, RoleContent, RoleMenu, TeamMember } from "./types";

export const APP_META = {
  productName: "GO FIT 360°",
  teamName: "GO FIT 360° – CARDIOPREVENT LAB",
  judgeHook: "We didn’t add another AI chatbot. We removed the delay before lifesaving action.",
  tagline: "Emergency-first AI that turns health data into lifesaving action in 2 taps.",
  links: {
    hsilForm: "https://airtable.com/app06PiI7r4PVqBdt/pagFJFqJW3xFqnRFw/form",
    frontendDemo: "https://vercel.com/rifkis-projects-f82a9831/fitgo360",
  },
};

export const TEAM: TeamMember[] = [
  {
    name: "M. Rifki Al Ikhsan",
    role: "Medical & Public Health Lead",
    org: "PT Kilang Pertamina Internasional",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/m-rifki-al-ikhsan-02703295/" }],
    tags: ["Occupational Medicine", "Health systems", "CVD prevention", "Emergency readiness"],
  },
  {
    name: "Patih Rajahasta",
    role: "Business & Commercial Strategy",
    org: "PT Bio Farma (Persero)",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/patih-rajahasta-b97213147/" }],
    tags: ["Commercialization", "Partnerships", "Go-to-market"],
  },
  {
    name: "Andhika Nayaka Arya Wibowo",
    role: "Full Stack Engineer",
    org: "Universitas Indonesia",
    links: [{ label: "GitHub", url: "https://github.com/AndhikaNayakaAW/Fit-Go-360" }],
    tags: ["React Native", "Backend APIs", "Vercel/serverless"],
  },
  {
    name: "Muhammad Haikal Azfar Sulaiman",
    role: "Visual Health Communication",
    org: "PT Oneject Indonesia",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-haikal-azfar-sulaiman-038815285/" }],
    tags: ["Health promotion", "Clinical-tech storytelling", "Judge-ready visuals"],
  },
];

export const ROLES: RoleMenu[] = [
  { role: "patient", label: "Pasien & Keluarga", description: "2-tap emergency + personal risk nudges.", landingPath: "/role/patient", icon: "heartPulse" },
  { role: "nakes", label: "Nakes", description: "Triage quick view, referral routing, cathlab readiness.", landingPath: "/role/nakes", icon: "stethoscope" },
  { role: "policy", label: "Policy Brief", description: "Equity, governance, and scalable health-system playbook.", landingPath: "/role/policy", icon: "fileText" },
  { role: "provider", label: "Provider Lab/Clinic", description: "Inclusive diagnostics (troponin/CK-MB/BNP) + home sampling.", landingPath: "/role/provider", icon: "flask" },
  { role: "dinkes", label: "Dinkes", description: "Population impact, DALY logic, referral network harmonization.", landingPath: "/role/dinkes", icon: "building2" },
  { role: "hospital", label: "Rumah Sakit", description: "ER/cathlab integration + time-to-needle pathway.", landingPath: "/role/hospital", icon: "hospital" },
  { role: "employer", label: "Workplace/Employer", description: "MCU/DCU integration + emergency-first readiness for workers.", landingPath: "/role/employer", icon: "briefcase" },
  { role: "researcher", label: "Research", description: "Review→pilot→RCT roadmap + auditability.", landingPath: "/role/research", icon: "microscope" },
  { role: "judge", label: "Judge View", description: "One-screen: problem→gap→solution→readiness→impact.", landingPath: "/role/judge", icon: "award" },
];

const baseHero = {
  title: "GO FIT 360°",
  tagline: "Emergency-first AI that turns health data into lifesaving action in 2 taps.",
  oneLineHook: "TIME = MUSCLE — action beats chat in cardiac emergencies.",
};

export const CONTENT: Record<Role, RoleContent> = {
  patient: {
    role: "patient",
    hero: baseHero,
    sections: [
      { id: "how", title: "Cara kerja (simple)", bullets: ["Cek risiko (MCU/DCU/riwayat) → nudges personal", "Mode darurat: 2-Tap RED untuk aksi cepat", "Offline fallback untuk area 3T"] },
      { id: "emergency", title: "2-Tap RED (darurat)", bullets: ["Auto-call emergency contact / 119 (configurable)", "Share lokasi (online + fallback)", "Panduan stabilisasi singkat: chest pain, pingsan, sesak"] },
    ],
  },
  nakes: {
    role: "nakes",
    hero: baseHero,
    sections: [
      { id: "triage", title: "Triage cepat", bullets: ["Ringkasan gejala + faktor risiko", "Prioritas ACS vs non-ACS", "Saran rujukan sesuai kemampuan faskes"] },
      { id: "handoff", title: "Handoff rujukan", bullets: ["Template komunikasi rujukan", "Time-stamps untuk audit response time", "Checklist pre-hospital: O2/AED/monitoring"] },
    ],
  },
  policy: {
    role: "policy",
    hero: baseHero,
    sections: [
      { id: "gap", title: "Masalah kebijakan", bullets: ["Data kesehatan melimpah, eksekusi terlambat", "Inklusivitas akses lab & rujukan belum merata", "AI banyak berhenti di analisis, bukan aksi"] },
      { id: "governance", title: "Governance & equity", bullets: ["Icon-first UI (low literacy friendly)", "Offline fallback untuk 3T", "Audit trail untuk evaluasi sistem"] },
    ],
  },
  provider: {
    role: "provider",
    hero: baseHero,
    sections: [
      { id: "lab", title: "Inclusive diagnostics", bullets: ["Troponin / CK-MB / BNP: time-critical", "Home / on-site sampling untuk percepat turnaround", "Interoperability: hasil lab → decision → action"] },
    ],
  },
  dinkes: {
    role: "dinkes",
    hero: baseHero,
    sections: [
      { id: "impact", title: "Dampak populasi", bullets: ["Mengurangi delay rujukan", "Standardisasi alur triage & emergency call", "Siap pilot lintas wilayah (urban–3T)"] },
    ],
  },
  hospital: {
    role: "hospital",
    hero: baseHero,
    sections: [
      { id: "pathway", title: "Time-to-needle / time-to-cathlab", bullets: ["Pre-notification ke IGD", "Routing ke cathlab bila indikasi", "Log response time untuk perbaikan mutu"] },
    ],
  },
  employer: {
    role: "employer",
    hero: baseHero,
    sections: [
      { id: "workforce", title: "Workplace readiness", bullets: ["Integrasi MCU/DCU & risk nudges", "Emergency-first SOP (AED, oxygen, referral)", "Remote setting: medevac pathway"] },
    ],
  },
  researcher: {
    role: "researcher",
    hero: baseHero,
    sections: [
      { id: "roadmap", title: "Review → Pilot → RCT", bullets: ["Desain evaluasi: outcome, process metrics", "Bias & fairness checks", "Reproducible audit logs"] },
    ],
  },
  judge: {
    role: "judge",
    hero: baseHero,
    sections: [
      { id: "snapshot", title: "Judge snapshot", bullets: ["Problem: #1 killer + preventable, tapi terlambat bertindak", "Gap: chat-first AI informs; emergency-first AI saves", "Solution: 2-Tap RED + routing + offline fallback", "Readiness: working navigation + API; validation roadmap clear"] },
    ],
  },
};
