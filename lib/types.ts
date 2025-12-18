export type Role =
  | "patient"
  | "nakes"
  | "policy"
  | "provider"
  | "dinkes"
  | "hospital"
  | "employer"
  | "researcher"
  | "judge";

export type TeamMember = {
  name: string;
  role: string;
  org: string;
  links: { label: string; url: string }[];
  tags: string[];
};

export type RoleMenu = {
  role: Role;
  label: string;
  description: string;
  landingPath: string; // FE route you can map to
  icon: string; // keep as string for FE icon mapping
};

export type RoleContent = {
  role: Role;
  hero: {
    title: string;
    tagline: string;
    oneLineHook: string;
  };
  sections: Array<{
    id: string;
    title: string;
    bullets: string[];
    ctas?: Array<{ label: string; action: string }>;
  }>;
};
