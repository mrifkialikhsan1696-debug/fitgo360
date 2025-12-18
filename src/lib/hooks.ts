import { useEffect, useState } from "react";
import { api, Role, RoleMenu, RoleContent, TeamMember } from "./apiClient";

export function useRoles() {
  const [roles, setRoles] = useState<RoleMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.roles()
      .then(r => setRoles(r.roles))
      .catch(e => setError(String(e.message || e)))
      .finally(() => setLoading(false));
  }, []);

  return { roles, loading, error };
}

export function useTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.team()
      .then(r => setMembers(r.members))
      .catch(e => setError(String(e.message || e)))
      .finally(() => setLoading(false));
  }, []);

  return { members, loading, error };
}

export function useRoleContent(role: Role | null) {
  const [content, setContent] = useState<RoleContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!role) return;
    setLoading(true);
    api.content(role)
      .then(setContent)
      .catch(e => setError(String(e.message || e)))
      .finally(() => setLoading(false));
  }, [role]);

  return { content, loading, error };
}

export function useMockAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("goFit360Token");
  });
  const [meRole, setMeRole] = useState<Role | null>(null);

  useEffect(() => {
    if (!token) { setMeRole(null); return; }
    api.mockMe(token).then(r => setMeRole(r.user.role)).catch(() => setMeRole(null));
  }, [token]);

  async function loginAs(role: Role) {
    const r = await api.mockLogin(role);
    localStorage.setItem("goFit360Token", r.token);
    setToken(r.token);
    setMeRole(r.role);
    return r;
  }

  function logout() {
    localStorage.removeItem("goFit360Token");
    setToken(null);
    setMeRole(null);
  }

  return { token, meRole, loginAs, logout };
}
