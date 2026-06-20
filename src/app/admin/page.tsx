"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AdminDashboard } from "@/components/admin/dashboard";

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setEmail(data.user.email || "");
      } else {
        // Defesa em profundidade: o proxy já protege /admin, mas se a sessão
        // expirar no cliente, volta para o login.
        router.replace("/admin/login");
      }
    })();
  }, [supabase, router]);

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  // Enquanto confirma a sessão no cliente, não pisca o dashboard.
  if (!email) return null;

  return <AdminDashboard userEmail={email} onLogout={handleLogout} />;
}
