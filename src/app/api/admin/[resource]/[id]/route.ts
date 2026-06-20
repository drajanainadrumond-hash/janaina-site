import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getResource, pickFields } from "@/lib/admin-resources";

type Ctx = { params: Promise<{ resource: string; id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { resource, id } = await params;
  const cfg = getResource(resource);
  if (!cfg) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });
  if (cfg.updateFields.length === 0) {
    return NextResponse.json({ error: "Edição não permitida" }, { status: 405 });
  }

  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = pickFields(body, cfg.updateFields);
  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ error: "Nenhum campo válido enviado" }, { status: 400 });
  }
  if (cfg.setUpdatedAt) payload.updated_at = new Date().toISOString();

  const { data, error } = await auth.service
    .from(cfg.table)
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { resource, id } = await params;
  const cfg = getResource(resource);
  if (!cfg) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });
  if (!cfg.allowDelete) {
    return NextResponse.json({ error: "Exclusão não permitida" }, { status: 405 });
  }

  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { error } = await auth.service.from(cfg.table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
