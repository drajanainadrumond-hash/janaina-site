import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/** Contadores do painel inicial — antes liam direto do browser com a chave anon. */
export async function GET() {
  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const sb = auth.service;
  const today = new Date().toISOString().split("T")[0];

  const count = (q: PromiseLike<{ count: number | null }>) => q.then((r) => r.count ?? 0);

  const [appointments, pendingAppointments, blogPosts, leads, contacts, depoimentos, faqs] =
    await Promise.all([
      count(sb.from("appointments").select("id", { count: "exact", head: true }).gte("date", today)),
      count(sb.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending")),
      count(sb.from("blog_posts").select("id", { count: "exact", head: true })),
      count(sb.from("leads").select("id", { count: "exact", head: true })),
      count(sb.from("contacts").select("id", { count: "exact", head: true })),
      count(sb.from("depoimentos").select("id", { count: "exact", head: true })),
      count(sb.from("faqs").select("id", { count: "exact", head: true })),
    ]);

  return NextResponse.json({
    data: { appointments, pendingAppointments, blogPosts, leads, contacts, depoimentos, faqs },
  });
}
