/** Roda uma vez quando o servidor Next sobe (ver node_modules/next/dist/docs, instrumentation.md). */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { checarVariaveis } = await import("@/lib/env-check");
  checarVariaveis();
}
