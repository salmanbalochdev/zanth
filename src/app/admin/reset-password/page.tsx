"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  useEffect(() => {
    if (!url || !key) return;
    const client = createBrowserClient(url, key);
    client.auth.getUser().then(({ data, error }) => setReady(!error && !!data.user));
  }, [url, key]);
  async function reset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || !url || !key || busy) return;
    setBusy(true);
    const client = createBrowserClient(url, key);
    const { error } = await client.auth.updateUser({ password });
    setBusy(false);
    setMessage(error ? "Password update failed. Open a valid recovery link and try again." : "Password updated. You can now sign in.");
    if (!error) setPassword("");
  }
  return <section className="mx-auto max-w-md px-5 py-16">
    <h1 className="text-3xl font-bold">Choose a new password</h1>
    <p className="mt-3 text-sm text-slate-600">Open the recovery link sent to your authorized administrator email.</p>
    <form onSubmit={reset} className="mt-6 space-y-4">
      <label className="block">New password<input type="password" minLength={12} maxLength={128} required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border p-3"/></label>
      <button disabled={!ready || busy} className="rounded-lg bg-primary px-5 py-3 text-white disabled:opacity-50">{busy ? "Updating…" : "Update password"}</button>
    </form>
    {!ready && <p className="mt-4 text-sm text-slate-600">No valid authenticated recovery session is available.</p>}
    {message && <p role="status" className="mt-4">{message}</p>}
    <Link href="/admin/login" className="mt-6 inline-block text-sm font-semibold text-secondary">Return to login</Link>
  </section>;
}
