import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-[6rem] font-light text-teal leading-none tracking-[4px]">
        404
      </h1>
      <p className="text-lg text-[#4A5E6B] mt-4 mb-8">
        Página não encontrada.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm bg-teal text-white hover:bg-teal-mid transition-colors uppercase"
      >
        Voltar ao Início
      </Link>
    </section>
  );
}
