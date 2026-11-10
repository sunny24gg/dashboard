import React from 'react';
import {
  LayoutDashboard,
  Film,
  Briefcase,
  CheckSquare,
  DollarSign,
  Star,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  projectsCount = 0,
  worksCount = 0,
  todosPendingCount = 0,
  reviewsCount = 0,
  inquiriesCount = 0,
  isOpen = false,
  onClose
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    {
      id: 'projects', label: 'Projects & Details', icon: Film,
      badge: projectsCount > 0 ? `${projectsCount} live` : null,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    { id: 'works', label: 'Works & Pay Details', icon: Briefcase, badge: worksCount > 0 ? worksCount : null },
    {
      id: 'todos', label: 'To-Do Lists', icon: CheckSquare,
      badge: todosPendingCount > 0 ? `${todosPendingCount} pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'ratings', label: 'Webpage Ratings', icon: Star,
      badge: reviewsCount > 0 ? `${reviewsCount} live` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'inquiries', label: 'Video Inquiries', icon: MessageSquare,
      badge: inquiriesCount > 0 ? `${inquiriesCount} new` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    { id: 'pay', label: 'Pay & Financials', icon: DollarSign, badge: null }
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    onClose?.(); // close drawer on mobile after tap
  };

  const sidebarContent = (
    <aside className="w-64 h-full bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-white text-sm tracking-tight leading-none">Sunny Admin</h1>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/30">LIVE</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-300">portfilo-3e0b6</span>
              </p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-3 py-5 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">Workspace</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/10 text-purple-300 border border-purple-500/30 shadow-md shadow-purple-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="text-[13px]">{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${
                    item.badgeColor || (isActive
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700/60')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom: Portfolio Link */}
      <div className="p-4 border-t border-slate-800/60">
        <a
          href="https://portfilo-3e0b6.firebaseapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/50 border border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">portfilo-3e0b6.web.app</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden lg:flex h-full shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile: slide-over drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer panel */}
          <div className="relative z-10 h-full animate-[slideInLeft_0.2s_ease-out]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
