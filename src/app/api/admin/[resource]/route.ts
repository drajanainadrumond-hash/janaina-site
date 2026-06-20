import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getResource, pickFields } from "@/lib/admin-resources";

type Ctx = { params: Promise<{ resource: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { resource } = await params;
  const cfg = getResource(resource);
  if (!cfg) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });

  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  let query = auth.service.from(cfg.table).select("*");
  for (const o of cfg.orders) {
    query = query.order(o.column, { ascending: o.ascending ?? true });
  }
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const { resource } = await params;
  const cfg = getResource(resource);
  if (!cfg) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });
  if (cfg.insertFields.length === 0) {
    return NextResponse.json({ error: "Criação não permitida" }, { status: 405 });
  }

  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = pickFields(body, cfg.insertFields);
  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ error: "Nenhum campo válido enviado" }, { status: 400 });
  }

  const { data, error } = await auth.service.from(cfg.table).insert(payload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
