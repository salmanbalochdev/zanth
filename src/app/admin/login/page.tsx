import Link from "next/link";
import { login } from "./actions";
export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <section className="mx-auto max-w-md px-5 py-16">
    <h1 className="text-3xl font-bold text-slate-900">School administration</h1>
    <p className="mt-3 text-slate-600">Sign in with your authorized staff account.</p>
    {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">
      {error === "unauthorized" ? "This account does not have active administrator access." : "Sign-in failed. Check your credentials."}
    </p>}
    <form action={login} className="mt-8 space-y-5">
      <label className="block text-sm font-medium">Email
        <input type="email" name="email" autoComplete="username" required className="mt-2 w-full rounded-lg border border-slate-300 p-3" />
      </label>
      <label className="block text-sm font-medium">Password
        <input type="password" name="password" autoComplete="current-password" required className="mt-2 w-full rounded-lg border border-slate-300 p-3" />
      </label>
      <button type="submit" className="w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Sign in</button>
    </form>
    <Link href="/admin/forgot-password" className="mt-5 inline-block text-sm font-semibold text-secondary">Forgot password?</Link>
  </section>;
}
