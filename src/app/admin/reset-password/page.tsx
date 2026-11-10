"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
export default function ResetPassword() {
  const [password,setPassword] = useState(""); const [message,setMessage] = useState("");
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) { setMessage("Password reset is not configured."); return; }
    const client = createBrowserClient(url,key);
    const { error } = await client.auth.updateUser({ password });
    setMessage(error ? "Unable to reset password. Open a valid recovery link and try again." : "Password updated. You can now sign in.");
  }
  return <section className="mx-auto max-w-md px-5 py-16"><h1 className="text-3xl font-bold">Choose a new password</h1><form onSubmit={reset} className="mt-6 space-y-4"><label className="block">New password<input type="password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-lg border p-3"/></label><button className="rounded-lg bg-primary px-5 py-3 text-white">Update password</button></form>{message && <p role="status" className="mt-4">{message}</p>}</section>;
}
