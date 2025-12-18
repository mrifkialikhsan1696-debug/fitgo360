"use client";
import { useMemo, useState } from "react";
import { useMockAuth, useRoles, useRoleContent } from "@/lib/hooks";
import type { Role } from "@/lib/apiClient";

export default function RoleSwitcher() {
  const { roles, loading: rolesLoading } = useRoles();
  const { meRole, loginAs, logout } = useMockAuth();
  const [selected, setSelected] = useState<Role | "">("");

  const activeRole = useMemo(() => (meRole ?? (selected || null)) as Role | null, [meRole, selected]);
  const { content, loading: contentLoading } = useRoleContent(activeRole);

  async function handleSelect(v: string) {
    const role = v as Role;
    setSelected(role);
    await loginAs(role); // demo: pilih role = login
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <select
          value={meRole ?? selected}
          onChange={(e) => handleSelect(e.target.value)}
          disabled={rolesLoading}
        >
          <option value="" disabled>Choose access…</option>
          {roles.map(r => (
            <option key={r.role} value={r.role}>
              {r.label}
            </option>
          ))}
        </select>

        {meRole && <button onClick={logout}>Logout</button>}
      </div>

      {contentLoading && <div>Loading role content…</div>}

      {content && (
        <div>
          <h2>{content.hero.title}</h2>
          <p><b>{content.hero.oneLineHook}</b></p>
          <p>{content.hero.tagline}</p>

          {content.sections.map(s => (
            <section key={s.id} style={{ marginTop: 12 }}>
              <h3>{s.title}</h3>
              <ul>
                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
