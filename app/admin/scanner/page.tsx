"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/login-form";
import { GateScanner } from "@/components/admin/gate-scanner";

type Stats = { registered: number; checkedIn: number };

export default function ScannerPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setChecking(true);
    try {
      const response = await fetch("/api/admin/check-in", { cache: "no-store" });
      if (response.status === 401) { setStats(null); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t load the scanner.");
      setStats(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t load the scanner.");
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  if (!stats) return <AdminLogin checking={checking} loadError={error} onSignedIn={load} title="Gate scanner." subtitle="Sign in with the admin password to start checking tickets." dark />;
  return <GateScanner initialStats={stats} onUnauthorized={() => setStats(null)} />;
}
