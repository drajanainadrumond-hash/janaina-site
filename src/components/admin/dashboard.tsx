"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchStats } from "@/utils/admin-api";
import {
  CalendarDays,
  PenLine,
  MessageSquareText,
  BookUser,
  Star,
  House,
  Bell,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { BlogManager } from "./blog-manager";
import { LeadsManager } from "./leads-manager";
import { DepoimentosManager } from "./depoimentos-manager";
import { ContactsManager } from "./contacts-manager";
import { AgendaManager } from "./agenda-manager";
import { FaqManager } from "./faq-manager";

import type { LucideIcon } from "lucide-react";

const ADMIN_ANIMATIONS = `
  @keyframes admin-fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes admin-scale-in {
    from { opacity: 0; transform: scale(0.92); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes admin-pulse-soft {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }
  @keyframes admin-bell-ring {
    0%, 100% { transform: rotate(0deg); }
    15% { transform: rotate(12deg); }
    30% { transform: rotate(-10deg); }
    45% { transform: rotate(6deg); }
    60% { transform: rotate(-4deg); }
    75% { transform: rotate(2deg); }
  }
  @keyframes admin-icon-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  @keyframes admin-slide-right {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(3px); }
  }
  @keyframes admin-count-pop {
    0% { transform: scale(0.5); opacity: 0; }
    60% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  .admin-fade-up { animation: admin-fade-up 0.5s ease both; }
  .admin-scale-in { animation: admin-scale-in 0.4s ease both; }
  .admin-bell-ring { animation: admin-bell-ring 1.5s ease-in-out infinite; }
  .admin-icon-float { animation: admin-icon-float 3s ease-in-out infinite; }
  .admin-arrow-slide { animation: admin-slide-right 1.5s ease-in-out infinite; }
  .admin-count-pop { animation: admin-count-pop 0.4s ease both; }
  .admin-pulse-soft:hover { animation: admin-pulse-soft 0.6s ease; }
  .admin-card { animation: admin-fade-up 0.5s ease both; }
  .admin-card:nth-child(1) { animation-delay: 0.05s; }
  .admin-card:nth-child(2) { animation-delay: 0.1s; }
  .admin-card:nth-child(3) { animation-delay: 0.15s; }
  .admin-card:nth-child(4) { animation-delay: 0.2s; }
  .admin-card:nth-child(5) { animation-delay: 0.25s; }
  .admin-nav-item { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
  .admin-nav-item:hover .admin-nav-icon { transform: translateY(-1px); }
  .admin-nav-icon { transition: transform 0.25s ease; }
`;

const TABS: { id: TabId; label: string; Icon: LucideIcon }[] = [
  { id: "home", label: "Início", Icon: House },
  { id: "agenda", label: "Agenda", Icon: CalendarDays },
  { id: "blog", label: "Blog", Icon: PenLine },
  { id: "leads", label: "Leads", Icon: MessageSquareText },
  { id: "contacts", label: "Contatos", Icon: BookUser },
  { id: "depoimentos", label: "Depoimentos", Icon: Star },
  { id: "faq", label: "FAQ", Icon: HelpCircle },
];

type TabId = "home" | "agenda" | "blog" | "leads" | "contacts" | "depoimentos" | "faq";

type Props = {
  userEmail: string;
  onLogout: () => void;
};

type Stats = {
  appointments: number;
  pendingAppointments: number;
  blogPosts: number;
  leads: number;
  contacts: number;
  depoimentos: number;
  faqs: number;
};

function DashboardHome({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const [stats, setStats] = useState<Stats>({ appointments: 0, pendingAppointments: 0, blogPosts: 0, leads: 0, contacts: 0, depoimentos: 0, faqs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setStats(await fetchStats());
      } catch {
        // mantém zeros em caso de erro
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards: { id: TabId; Icon: LucideIcon; title: string; desc: string; stat: string; alert?: string; accent: string; iconBg: string }[] = [
    {
      id: "agenda",
      Icon: CalendarDays,
      title: "Agenda",
      desc: "Gerencie consultas e horários disponíveis",
      stat: loading ? "—" : `${stats.appointments} consulta${stats.appointments !== 1 ? "s" : ""}`,
      alert: stats.pendingAppointments > 0 ? `${stats.pendingAppointments} pendente${stats.pendingAppointments !== 1 ? "s" : ""}` : undefined,
      accent: "from-[#003E51] to-[#00565B]",
      iconBg: "bg-[#003E51]",
    },
    {
      id: "blog",
      Icon: PenLine,
      title: "Blog",
      desc: "Escreva e publique artigos",
      stat: loading ? "—" : `${stats.blogPosts} post${stats.blogPosts !== 1 ? "s" : ""}`,
      accent: "from-[#00565B] to-[#0a6e75]",
      iconBg: "bg-[#00565B]",
    },
    {
      id: "leads",
      Icon: MessageSquareText,
      title: "Leads",
      desc: "Contatos recebidos pelo formulário",
      stat: loading ? "—" : `${stats.leads} lead${stats.leads !== 1 ? "s" : ""}`,
      accent: "from-[#0a6e75] to-[#00565B]",
      iconBg: "bg-[#0a6e75]",
    },
    {
      id: "contacts",
      Icon: BookUser,
      title: "Contatos",
      desc: "Telefones e emails dos pacientes",
      stat: loading ? "—" : `${stats.contacts} contato${stats.contacts !== 1 ? "s" : ""}`,
      accent: "from-[#003E51] to-[#0a6e75]",
      iconBg: "bg-[#003E51]",
    },
    {
      id: "depoimentos",
      Icon: Star,
      title: "Depoimentos",
      desc: "Avaliações e relatos de pacientes",
      stat: loading ? "—" : `${stats.depoimentos} depoimento${stats.depoimentos !== 1 ? "s" : ""}`,
      accent: "from-[#00565B] to-[#003E51]",
      iconBg: "bg-[#00565B]",
    },
    {
      id: "faq" as TabId,
      Icon: HelpCircle,
      title: "FAQ",
      desc: "Perguntas frequentes do site",
      stat: loading ? "—" : `${stats.faqs} pergunta${stats.faqs !== 1 ? "s" : ""}`,
      accent: "from-[#003E51] to-[#00565B]",
      iconBg: "bg-[#003E51]",
    },
  ];

  return (
    <div>
      <style>{ADMIN_ANIMATIONS}</style>

      {/* Welcome */}
      <div className="mb-8 admin-fade-up">
        <h2 className="text-[1.4rem] font-medium text-[#003E51]">
          Bem-vinda, Dra. Janaína
        </h2>
        <p className="text-[1.125rem] text-[#5A6B78] mt-1">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Alert banner */}
      {stats.pendingAppointments > 0 && (
        <button
          onClick={() => onNavigate("agenda")}
          className="admin-scale-in w-full mb-6 p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center gap-3.5 hover:bg-amber-100/70 transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Bell className="w-[18px] h-[18px] text-amber-600 admin-bell-ring" />
          </div>
          <div className="flex-1">
            <p className="text-[1.125rem] font-medium text-amber-800">
              {stats.pendingAppointments} agendamento{stats.pendingAppointments !== 1 ? "s" : ""} pendente{stats.pendingAppointments !== 1 ? "s" : ""}
            </p>
            <p className="text-[1.125rem] text-amber-600/80">Clique para revisar e confirmar</p>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 admin-arrow-slide" />
        </button>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="admin-card admin-pulse-soft group relative bg-white rounded-2xl border border-[#E6E5E2] p-5 text-left hover:shadow-[0_8px_30px_rgba(0,62,81,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            {/* Gradient accent top */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.accent} opacity-80`} />

            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:admin-icon-float`}>
                <card.Icon className="w-[18px] h-[18px] text-white admin-icon-float" strokeWidth={1.8} style={{ animationDelay: `${Math.random() * 2}s` }} />
              </div>
              {card.alert && (
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[1.125rem] uppercase font-medium border border-amber-200/60">
                  {card.alert}
                </span>
              )}
            </div>

            <h3 className="text-[1.125rem] font-medium text-[#003E51] mb-0.5 group-hover:text-[#00565B] transition-colors">
              {card.title}
            </h3>
            <p className="text-[1.125rem] text-[#5A6B78] mb-4 leading-relaxed">{card.desc}</p>

            <div className="flex items-center justify-between pt-3 border-t border-[#E6E5E2]/60">
              <span className="text-[1.125rem] font-medium text-[#003E51] admin-count-pop" style={{ animationDelay: "0.4s" }}>{card.stat}</span>
              <div className="w-7 h-7 rounded-full bg-[#003E51]/[0.04] flex items-center justify-center group-hover:bg-[#003E51] transition-all">
                <ArrowRight className="w-3.5 h-3.5 text-[#003E51]/40 group-hover:text-white transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick tip */}
      <div className="mt-8 p-4 bg-[#003E51]/[0.02] rounded-2xl border border-[#003E51]/[0.06] flex items-start gap-3 admin-fade-up" style={{ animationDelay: "0.35s" }}>
        <div className="w-8 h-8 rounded-lg bg-[#003E51]/[0.06] flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4 text-[#003E51]/50" />
        </div>
        <p className="text-[1.125rem] text-[#5A6B78] leading-relaxed">
          <span className="font-medium text-[#003E51]">Dica:</span> Use a aba <strong>Agenda</strong> para definir seus horários de atendimento.
          Os pacientes poderão agendar direto pelo site nos horários que você liberar.
        </p>
      </div>
    </div>
  );
}

export function AdminDashboard({ userEmail, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-[#003E51] text-white px-6 py-4">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/[0.08]">
              <span className="text-[1.125rem] font-semibold tracking-wider">JD</span>
            </div>
            <div>
              <span className="text-[1.125rem] font-medium block leading-tight">Painel Administrativo</span>
              <span className="text-[1.125rem] text-white/65">janainadrumond.com.br</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[1.125rem] text-white/65 hidden sm:block">{userEmail}</span>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[1.125rem] uppercase font-medium bg-white text-[#003E51] hover:bg-white/90 transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver site
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              <LogOut className="w-3 h-3" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-[#E6E5E2] sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,62,81,0.03)]">
        <div className="max-w-[1500px] mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-nav-item px-4 py-3.5 text-[1.125rem] font-medium border-b-[2.5px] whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? "border-[#003E51] text-[#003E51]"
                      : "border-transparent text-[#5A6B78] hover:text-[#003E51] hover:bg-[#f5f5f0]/50"
                  }`}
                >
                  <tab.Icon className={`admin-nav-icon w-4 h-4 ${isActive ? "text-[#003E51]" : "text-[#5A6B78]"}`} strokeWidth={isActive ? 2 : 1.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-[1500px] mx-auto px-6 py-8 flex-1 w-full">
        <style>{ADMIN_ANIMATIONS}</style>
        {activeTab === "home" && <DashboardHome onNavigate={setActiveTab} />}
        {activeTab === "agenda" && <AgendaManager />}
        {activeTab === "blog" && <BlogManager />}
        {activeTab === "leads" && <LeadsManager />}
        {activeTab === "contacts" && <ContactsManager />}
        {activeTab === "depoimentos" && <DepoimentosManager />}
        {activeTab === "faq" && <FaqManager />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E6E5E2] py-4 px-6">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <p className="text-[1.125rem] text-[#5A6B78]">Orbee Labs — Painel Administrativo</p>
          <Link href="/" className="flex items-center gap-1 text-[1.125rem] text-[#003E51]/40 hover:text-[#003E51] transition-colors">
            Ver site <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
