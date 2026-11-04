import React from 'react';
import { DollarSign, Film, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';

export default function StatsCards({
  projects = [],
  works = [],
  todos = [],
  reviews = [],
  portfolioInfo = null,
  currency = '₹',
  onNavigateTab
}) {
  // Pay calculations from works
  const totalPay = works.reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);
  const paidPay = works.filter((w) => w.payStatus === 'paid').reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);
  const pendingPay = totalPay - paidPay;
  const paidPct = totalPay > 0 ? Math.round((paidPay / totalPay) * 100) : 0;

  // Project budget totals
  const totalProjectBudget = projects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const inProgressProjects = projects.filter((p) => p.status === 'in_progress').length;

  // Todos
  const pendingTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const todosPct = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

  // Reviews / Ratings
  const validReviews = reviews.filter((r) => Number(r.rating) > 0);
  const avgRating = validReviews.length > 0
    ? (validReviews.reduce((s, r) => s + Number(r.rating), 0) / validReviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. Projects */}
      <div
        onClick={() => onNavigateTab('projects')}
        className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-950/40 transition-all duration-300 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Projects Portfolio</span>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Film className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">{projects.length}</span>
          <span className="text-xs text-slate-400">projects</span>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>{inProgressProjects} active</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completedProjects} done</span>
          </div>
        </div>
      </div>

      {/* 2. Total Pay */}
      <div
        onClick={() => onNavigateTab('pay')}
        className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/40 transition-all duration-300 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Works Total Pay</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">
            {currency}{totalPay.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3 h-3" />
            {paidPct}% paid
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Paid: {currency}{paidPay.toLocaleString()}
          </span>
          <span className="text-amber-400 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Due: {currency}{pendingPay.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 3. To-Do Tasks */}
      <div
        onClick={() => onNavigateTab('todos')}
        className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-950/40 transition-all duration-300 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">To-Do Lists</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">{pendingTodos}</span>
          <span className="text-xs text-slate-400">pending of {todos.length}</span>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-3 text-xs">
          <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${todosPct}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-indigo-400 shrink-0">{todosPct}%</span>
        </div>
      </div>

      {/* 4. Webpage Rating */}
      <div
        onClick={() => onNavigateTab('ratings')}
        className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-950/40 transition-all duration-300 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Webpage Rating</span>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">{avgRating}</span>
          <span className="text-base text-amber-400">★</span>
          <span className="text-xs text-slate-400">/ 5.0</span>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium">{reviews.length} live review{reviews.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
}
