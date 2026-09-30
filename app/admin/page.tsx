"use client";

import { useCallback, useEffect, useState } from "react";
import Dashboard from "@/components/admin/dashboard";
import { AdminLogin } from "@/components/admin/login-form";
import type { Submission } from "@/lib/submissions";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (response.status === 401) { setAuthenticated(false); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t load submissions.");
      setSubmissions(result.submissions);
      setAuthenticated(true);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t load submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function logout() {
    const response = await fetch("/api/admin/login", { method: "DELETE" });
    if (!response.ok) throw new Error("Sign out failed");
    setAuthenticated(false);
    setSubmissions([]);
  }

  if (!authenticated) return <AdminLogin checking={loading} loadError={error} onSignedIn={load} />;

  return <Dashboard submissions={submissions} loading={loading} error={error} onRefresh={() => void load()} onSignOut={logout} />;
}
