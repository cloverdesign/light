"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminLoginProps = {
  checking: boolean;
  /** An error from loading the page after sign-in, e.g. storage not configured. */
  loadError?: string;
  onSignedIn: () => Promise<void>;
  title?: string;
  subtitle?: string;
};

export function AdminLogin({ checking, loadError = "", onSignedIn, title = "Welcome back.", subtitle = "Sign in to your Lighthouse workspace." }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setError] = useState("");
  const error = signInError || loadError;

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSigningIn(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || (response.status >= 500 ? "The server hit an error. Please try again in a moment." : "We couldn’t sign you in."));
      setPassword("");
      await onSignedIn();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t sign you in.");
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100svh-88px)] flex-col px-6">
      <section aria-labelledby="login-heading" className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-16 sm:py-24">
        <div className="mb-10 text-center">
          <h1 id="login-heading" className="text-[48px] leading-[1.05] sm:text-[56px]">{title}</h1>
          <p className="mx-auto mt-4 max-w-[280px] text-sm leading-6 text-deep-blue-400">{subtitle}</p>
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
          <Button type="submit" disabled={checking || signingIn} className="w-full gap-2 py-4 text-sm" variant="main">{signingIn ? "Signing in…" : checking ? "Checking session…" : "Sign in"}<ArrowRight aria-hidden="true" className="size-4" /></Button>
        </form>
      </section>
      <footer className="pb-7 text-center text-xs text-deep-blue-400">Lighthouse · Administration</footer>
    </main>
  );
}
