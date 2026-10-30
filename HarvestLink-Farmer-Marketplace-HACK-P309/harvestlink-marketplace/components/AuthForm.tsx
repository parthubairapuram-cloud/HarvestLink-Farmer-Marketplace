"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "farmer" | "buyer";

export default function AuthForm({ mode, initialRole = "buyer" }: { mode: "login" | "register"; initialRole?: Role }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [farmName, setFarmName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, location, farmName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to continue");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto card p-8">
      <p className="text-xs uppercase tracking-[.2em] text-[#1f6b4a] font-bold">{mode === "login" ? "Welcome back" : "Join the harvest"}</p>
      <h1 className="text-3xl font-black mt-2">{mode === "login" ? "Log in to HarvestLink" : "Create your account"}</h1>
      <p className="muted text-sm mt-2">{mode === "login" ? "Continue to your farm or buyer workspace." : "Choose how you want to use the marketplace."}</p>
      <form onSubmit={submit} className="space-y-4 mt-7">
        <div>
          <label className="text-sm font-bold block mb-2">{mode === "login" ? "Log in as" : "I am joining as"}</label>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setRole("buyer")} aria-pressed={role === "buyer"} className={`p-3 rounded-xl border font-bold ${role === "buyer" ? "border-[#1f6b4a] bg-[#edf5ed] text-[#1f6b4a]" : "border-[#e1e8df]"}`}>Buyer</button>
            <button type="button" onClick={() => setRole("farmer")} aria-pressed={role === "farmer"} className={`p-3 rounded-xl border font-bold ${role === "farmer" ? "border-[#1f6b4a] bg-[#edf5ed] text-[#1f6b4a]" : "border-[#e1e8df]"}`}>Farmer</button>
          </div>
        </div>
        {mode === "register" && <>
          <input required className="field" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          {role === "farmer" && <input required className="field" placeholder="Farm / business name" value={farmName} onChange={e => setFarmName(e.target.value)} />}
          <input className="field" placeholder="Your city / district" value={location} onChange={e => setLocation(e.target.value)} />
        </>}
        <input required type="email" className="field" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <input required minLength={mode === "register" ? 8 : undefined} type="password" className="field" placeholder={mode === "register" ? "Password (at least 8 characters)" : "Password"} value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">{busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}</button>
      </form>
      <p className="text-sm muted mt-5 text-center">{mode === "login" ? "New to HarvestLink?" : "Already have an account?"} <a className="text-[#1f6b4a] font-bold" href={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "Create account" : "Log in"}</a></p>
    </div>
  );
}
