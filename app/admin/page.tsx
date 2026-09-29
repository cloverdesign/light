"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Dashboard from "@/components/admin/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Submission } from "@/lib/submissions";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
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

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setSigningIn(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t sign you in.");
      setPassword("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t sign you in.");
      setLoading(false);
    } finally {
      setSigningIn(false);
    }
  }

  async function logout() {
    const response = await fetch("/api/admin/login", { method: "DELETE" });
    if (!response.ok) throw new Error("Sign out failed");
    setAuthenticated(false);
    setSubmissions([]);
  }

  if (!authenticated) return (
    <main className="flex min-h-[calc(100svh-88px)] flex-col px-6">
      <section aria-labelledby="login-heading" className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-16 sm:py-24">
        <div className="mb-10 text-center">
          <h1 id="login-heading" className="text-[48px] leading-[1.05] sm:text-[56px]">Welcome back.</h1>
          <p className="mx-auto mt-4 max-w-[280px] text-sm leading-6 text-deep-blue-400">Sign in to your Lighthouse workspace.</p>
        </div>
        <form onSubmit={login} className="grid gap-6" aria-busy={signingIn}>
          <div>
            <label htmlFor="admin-password" className="mb-2.5 block text-sm font-medium">Password</label>
            <div className="relative">
              <Input id="admin-password" icon="lock-keyhole" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="pr-14 font-normal focus-within:border-aero-500 focus-within:ring-2 focus-within:ring-aero-100" aria-invalid={Boolean(error)} aria-describedby={error ? "login-error" : undefined} />
              <Button type="button" variant="ghost" size="xs" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-deep-blue-400 hover:text-deep-blue-600 focus-visible:ring-aero-500" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </div>
          {error && <p id="login-error" role="alert" className="rounded-lg bg-orange-100 px-4 py-3 text-sm leading-6 text-orange-900">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full gap-2 py-4 text-sm" variant="main">{signingIn ? "Signing in…" : loading ? "Checking session…" : "Sign in"}<ArrowRight aria-hidden="true" className="size-4" /></Button>
        </form>
      </section>
      <footer className="pb-7 text-center text-xs text-deep-blue-400">Lighthouse · Administration</footer>
    </main>
  );

  return <Dashboard submissions={submissions} loading={loading} error={error} onRefresh={() => void load()} onSignOut={logout} />;
}
