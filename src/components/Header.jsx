import React, { useState } from 'react';
import { Search, Plus, X, Menu } from 'lucide-react';

export default function Header({
  activeTab,
  searchTerm,
  setSearchTerm,
  currency,
  setCurrency,
  onOpenNewWork,
  onOpenNewProject,
  onOpenNewTodo,
  onOpenNewRating,
  isConnected,
  onMenuOpen
}) {
  const [showSearch, setShowSearch] = useState(false);

  const titles = {
    dashboard: 'Workspace Overview',
    projects:  'Projects & Details',
    works:     'Works & Pay Details',
    todos:     'To-Do Lists & Tasks',
    ratings:   'Webpage Ratings',
    inquiries: 'Video & Film Inquiries',
    pay:       'Pay & Financials'
  };

  const descriptions = {
    dashboard: 'Real-time sync · portfilo-3e0b6 Firebase',
    projects:  'Incoming requests & portfolio projects',
    works:     'Client contracts, pay amounts & deadlines',
    todos:     'Action items and task priorities',
    ratings:   'Client reviews from your portfolio page',
    inquiries: 'Incoming video editing, filmmaking & commercial production leads',
    pay:       'Financial breakdown of earnings & payments'
  };

  // Which add button to show per tab
  const addButton = {
    dashboard: { label: 'New Project', color: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-600/20', action: onOpenNewProject },
    projects:  { label: 'Add Project', color: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/25',  action: onOpenNewProject },
    works:     { label: 'Add Work',    color: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/25',         action: onOpenNewWork },
    todos:     { label: 'New Task',    color: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25',   action: onOpenNewTodo },
    ratings:   { label: 'Log Rating', color: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/25',      action: onOpenNewRating },
  };

  const btn = addButton[activeTab];

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl shrink-0 z-20">
      {/* Main row */}
      <div className="h-14 md:h-16 px-4 md:px-6 flex items-center justify-between gap-3">

        {/* Left: Hamburger (mobile) + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-base md:text-lg font-bold text-white tracking-tight truncate">
              {titles[activeTab] || 'Dashboard'}
            </h2>
            <p className="text-[10px] md:text-xs text-slate-400 truncate hidden sm:block">
              {descriptions[activeTab] || ''}
            </p>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Search — desktop always visible, mobile toggles */}
          <div className={`relative transition-all duration-200 ${showSearch ? 'w-44 sm:w-56' : 'w-0 sm:w-52 md:w-64 overflow-hidden sm:overflow-visible'}`}>
            <div className="hidden sm:block relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all placeholder:text-slate-500"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            {/* Mobile search expanded */}
            {showSearch && (
              <div className="sm:hidden relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:border-blue-500/60"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Search icon (mobile only) */}
          <button
            onClick={() => setShowSearch(s => !s)}
            className="sm:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          {/* Currency — hidden on small mobile */}
          <div className="hidden sm:flex items-center bg-slate-900/80 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-300">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="₹" className="bg-slate-900">₹ INR</option>
              <option value="$" className="bg-slate-900">$ USD</option>
              <option value="€" className="bg-slate-900">€ EUR</option>
              <option value="£" className="bg-slate-900">£ GBP</option>
            </select>
          </div>

          {/* Firebase live dot */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300 font-medium text-[11px]">Live</span>
          </div>

          {/* Contextual Add button */}
          {btn && (
            <button
              onClick={btn.action}
              className={`flex items-center gap-1.5 px-3 py-2 ${btn.color} text-white text-xs font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02] whitespace-nowrap`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{btn.label}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
