import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Só /admin precisa de renovação de sessão. As rotas /api públicas não usam
    // sessão (calendário usa service role), então sair daqui reduz latência.
    "/admin/:path*",
  ],
};
