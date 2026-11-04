import React from 'react';
import { Search, Plus } from 'lucide-react';

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
  isConnected
}) {
  const titles = {
    dashboard: 'Workspace Overview',
    projects: 'Projects & Details',
    works: 'Works & Pay Details',
    todos: 'To-Do Lists & Tasks',
    ratings: 'Webpage Ratings & Reviews',
    inquiries: 'Webpage Inquiries & Leads',
    pay: 'Pay & Financial Summary'
  };

  const descriptions = {
    dashboard: 'Real-time sync with sunnyportfilo Firestore database',
    projects: 'Video editing, filmmaking & commercial projects from Firebase projects collection',
    works: 'Client contracts, pay amounts, deadlines — saved in Firebase works collection',
    todos: 'Action items and task priorities — saved in Firebase todos collection',
    ratings: 'Client reviews submitted on your portfolio page — Firebase reviews collection',
    inquiries: 'Incoming contact form leads — Firebase inquiries collection',
    pay: 'Financial breakdown of earnings, payments and outstanding amounts'
  };

  return (
    <header className="h-20 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl px-8 flex items-center justify-between gap-6 shrink-0 z-20">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">{titles[activeTab] || 'Dashboard'}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{descriptions[activeTab] || ''}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, works, clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all placeholder:text-slate-400"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-300">
              ✕
            </button>
          )}
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
          <span className="text-[11px] text-slate-400 mr-2 font-medium">Currency:</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="₹" className="bg-slate-900">₹ INR</option>
            <option value="$" className="bg-slate-900">$ USD</option>
            <option value="€" className="bg-slate-900">€ EUR</option>
            <option value="£" className="bg-slate-900">£ GBP</option>
          </select>
        </div>

        {/* Firebase Live Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium text-[11px]">Firebase Live</span>
        </div>

        {/* Contextual Action Button */}
        {activeTab === 'dashboard' && (
          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        )}

        {activeTab === 'projects' && (
          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        )}

        {activeTab === 'works' && (
          <button
            onClick={onOpenNewWork}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Work & Pay</span>
          </button>
        )}

        {activeTab === 'todos' && (
          <button
            onClick={onOpenNewTodo}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        )}

        {activeTab === 'ratings' && (
          <button
            onClick={onOpenNewRating}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-600/25 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Log Rating</span>
          </button>
        )}
      </div>
    </header>
  );
}
