"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { AdminDashboard } from "@/components/admin/dashboard";

export default function AdminPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser({ email: data.user.email || "" });
    })();
  }, [supabase]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase não configurado no servidor.");
      return;
    }
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    const { data } = await supabase.auth.getUser();
    if (data.user) setUser({ email: data.user.email || "" });
    setLoading(false);
  }

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-center text-[1.125rem] text-[#7A8E9B] max-w-lg leading-relaxed">
          Defina{" "}
          <code className="text-[#003E51] text-sm">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code className="text-[#003E51] text-sm">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY</code>{" "}
          no painel da Vercel (Settings → Environment Variables) e faça um novo deploy.
        </p>
      </div>
    );
  }

  if (user) {
    return <AdminDashboard userEmail={user.email} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#003E51] flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <h1 className="text-[1.3rem] font-medium text-[#003E51]">Painel Administrativo</h1>
          <p className="text-[1.125rem] text-[#7A8E9B] mt-1">Dra. Janaína Drumond</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,62,81,0.06)] border border-[#003E51]/[0.04]">
          <div className="space-y-4">
            <div>
              <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#7A8E9B] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#7A8E9B] mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-[1.125rem] mt-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 px-6 py-3 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-[1.125rem] text-[#7A8E9B] mt-6">
          Acesso restrito a administradores.
        </p>
      </div>
    </div>
  );
}
