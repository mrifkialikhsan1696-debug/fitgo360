export type Role =
  | "patient" | "nakes" | "policy" | "provider" | "dinkes"
  | "hospital" | "employer" | "researcher" | "judge";

type Envelope<T> = { ok: boolean; data: T; ts: string };

export type RoleMenu = {
  role: Role;
  label: string;
  description: string;
  landingPath: string;
  icon: string;
};

export type TeamMember = {
  name: string;
  role: string;
  org: string;
  links: { label: string; url: string }[];
  tags: string[];
};

export type RoleContent = {
  role: Role;
  hero: { title: string; tagline: string; oneLineHook: string };
  sections: { id: string; title: string; bullets: string[] }[];
};

const BASE =
  (process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ?? ""); 
// kalau FE & BE satu domain (Vercel rewrite), kosong aja.

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) }
  });
  const json = (await res.json()) as any;
  if (!res.ok || !json?.ok) throw new Error(json?.error?.message ?? `HTTP ${res.status}`);
  return json.data as T;
}

export const api = {
  meta: () => request<{ productName: string; teamName: string; judgeHook: string; tagline: string; links: any }>("/api/meta"),
  team: () => request<{ members: TeamMember[] }>("/api/team"),
  roles: () => request<{ roles: RoleMenu[] }>("/api/roles"),
  content: (role: Role) => request<RoleContent>(`/api/content/${role}`),
  mockLogin: (role: Role) => request<{ token: string; role: Role }>("/api/auth/mock-login", {
    method: "POST",
    body: JSON.stringify({ role })
  }),
  mockMe: (token: string) => request<{ user: { role: Role }; issuedAt?: number }>("/api/auth/mock-me", {
    headers: { Authorization: `Bearer ${token}` }
  })
};
