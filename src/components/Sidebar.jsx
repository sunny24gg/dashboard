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
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  projectsCount = 0,
  worksCount = 0,
  todosPendingCount = 0,
  reviewsCount = 0,
  inquiriesCount = 0
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'projects',
      label: 'Projects & Details',
      icon: Film,
      badge: projectsCount > 0 ? `${projectsCount} live` : null,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'works',
      label: 'Works & Pay Details',
      icon: Briefcase,
      badge: worksCount > 0 ? worksCount : null
    },
    {
      id: 'todos',
      label: 'To-Do Lists',
      icon: CheckSquare,
      badge: todosPendingCount > 0 ? `${todosPendingCount} pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'ratings',
      label: 'Webpage Ratings',
      icon: Star,
      badge: reviewsCount > 0 ? `${reviewsCount} live` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'inquiries',
      label: 'Webpage Inquiries',
      icon: MessageSquare,
      badge: inquiriesCount > 0 ? `${inquiriesCount} new` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    {
      id: 'pay',
      label: 'Pay & Financials',
      icon: DollarSign,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-slate-950/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Logo & Profile Header */}
      <div>
        <div className="p-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-white text-base tracking-tight leading-none">Sunny Admin</h1>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[11px] text-slate-300">sunnyportfilo</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-6 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/10 text-purple-300 border border-purple-500/30 shadow-md shadow-purple-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                      item.badgeColor ||
                      (isActive
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700/60')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Live Webpage Link */}
      <div className="p-4 border-t border-slate-800/60 space-y-2">
        <a
          href="https://sunnyportfilo.firebaseapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/50 border border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">sunnyportfilo.web.app</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 shrink-0" />
        </a>
      </div>
    </aside>
  );
}
