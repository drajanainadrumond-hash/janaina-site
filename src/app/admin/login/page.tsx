"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
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

    // Sessão criada nos cookies; o proxy agora libera /admin.
    // refresh() garante que o Server Component leia a nova sessão antes de navegar.
    router.replace("/admin");
    router.refresh();
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-center text-[1.125rem] text-[#5A6B78] max-w-lg leading-relaxed">
          Defina{" "}
          <code className="text-[#003E51] text-sm">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code className="text-[#003E51] text-sm">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY</code>{" "}
          no painel da Vercel (Settings → Environment Variables) e faça um novo deploy.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#003E51] flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <h1 className="text-[1.3rem] font-medium text-[#003E51]">Painel Administrativo</h1>
          <p className="text-[1.125rem] text-[#5A6B78] mt-1">Dra. Janaína Drumond</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,62,81,0.06)] border border-[#003E51]/[0.04]">
          <div className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Email</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Senha</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-destructive text-[1.125rem] mt-3" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 px-6 py-3 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-[1.125rem] text-[#5A6B78] mt-6">
          Acesso restrito a administradores.
        </p>
      </div>
    </div>
  );
}
