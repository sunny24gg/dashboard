import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Calendar,
  ExternalLink,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function WorksSection({
  works,
  currency = '$',
  onEditWork,
  onDeleteWork,
  onUpdatePayStatus,
  onOpenNewWork,
  searchTerm = ''
}) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [payFilter, setPayFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Filter works
  const filteredWorks = works.filter((w) => {
    const matchesSearch =
      searchTerm === '' ||
      w.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.deliverables?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    const matchesPay = payFilter === 'all' || w.payStatus === payFilter;

    return matchesSearch && matchesStatus && matchesPay;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'in_progress':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'active':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'pending':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'on_hold':
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getPayBadge = (payStatus) => {
    switch (payStatus) {
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'partial':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'invoiced':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'pending':
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Actions Bar */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium mr-1">Work:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Works ({works.length})</option>
              <option value="in_progress" className="bg-slate-900">In Progress</option>
              <option value="active" className="bg-slate-900">Active</option>
              <option value="completed" className="bg-slate-900">Completed</option>
              <option value="pending" className="bg-slate-900">Pending</option>
            </select>
          </div>

          {/* Pay Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400 font-medium mr-1">Pay:</span>
            <select
              value={payFilter}
              onChange={(e) => setPayFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Pay Statuses</option>
              <option value="paid" className="bg-slate-900">Paid in Full</option>
              <option value="pending" className="bg-slate-900">Pending Payment</option>
              <option value="partial" className="bg-slate-900">Partial / Milestone</option>
              <option value="invoiced" className="bg-slate-900">Invoiced</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle & Add Button */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grid Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Data Table
            </button>
          </div>

          <button
            onClick={onOpenNewWork}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Work</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredWorks.length === 0 && (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-4">
            <Briefcase className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Works Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
            {searchTerm
              ? `No works match "${searchTerm}". Try resetting your filters.`
              : 'Your works collection in Firestore is ready. Add your first project with pay details and webpage rating!'}
          </p>
          <button
            onClick={onOpenNewWork}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Work</span>
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && filteredWorks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWorks.map((work) => {
            const sym = work.currency || currency;
            const payVal = Number(work.payAmount) || 0;
            return (
              <div
                key={work.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top: Client & Status Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                          {work.category || 'General'}
                        </span>
                        {work.priority && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                              work.priority === 'urgent'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : work.priority === 'high'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {work.priority}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-white text-base mt-1 group-hover:text-blue-300 transition-colors">
                        {work.title}
                      </h3>
                      {work.client && (
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <span className="text-slate-400">Client:</span>
                          <span className="text-slate-300 font-medium">{work.client}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${getStatusBadge(
                          work.status
                        )}`}
                      >
                        {work.status?.replace('_', ' ') || 'Active'}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${getPayBadge(
                          work.payStatus
                        )}`}
                      >
                        {work.payStatus || 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {work.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {work.description}
                    </p>
                  )}

                  {/* Details of Pay Box */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 mb-4 grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 uppercase block">Contract Pay</span>
                      <span className="text-base font-bold text-white tracking-tight">
                        {sym}{payVal.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 uppercase block">Rate / Hour</span>
                      <span className="text-xs font-semibold text-slate-300">
                        {work.hourlyRate ? `${sym}${work.hourlyRate}/hr` : 'Fixed Fee'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 uppercase block">Hours Logged</span>
                      <span className="text-xs font-semibold text-slate-300">
                        {work.hoursWorked ? `${work.hoursWorked} hrs` : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables / Tech Stack Tags */}
                  {work.deliverables && (
                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1.5">
                        Deliverables
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {work.deliverables.split(',').map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-800/80 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rating from Webpage Display */}
                  {work.ratingFeedback && (
                    <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3 mb-4 flex items-start gap-2.5">
                      <div className="flex items-center text-amber-400 shrink-0 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-bold ml-1">{work.rating || 5}.0</span>
                      </div>
                      <p className="text-xs text-amber-200/80 italic line-clamp-2">
                        "{work.ratingFeedback}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 text-slate-400">
                    {work.deadline && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>Due: {work.deadline}</span>
                      </div>
                    )}
                    {work.webpageUrl && (
                      <a
                        href={work.webpageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Webpage</span>
                      </a>
                    )}
                  </div>

                  {/* Edit / Delete Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditWork(work)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit work & pay details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteWork(work.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 border border-rose-800/40 transition-colors"
                      title="Delete work from Firestore"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredWorks.length > 0 && (
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Project & Client</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Pay Amount</th>
                  <th className="py-3.5 px-4">Pay Status</th>
                  <th className="py-3.5 px-4">Webpage Rating</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredWorks.map((work) => {
                  const sym = work.currency || currency;
                  return (
                    <tr key={work.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{work.title}</div>
                        <div className="text-[11px] text-slate-400">{work.client || 'Internal'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{work.category || 'General'}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold capitalize ${getStatusBadge(
                            work.status
                          )}`}
                        >
                          {work.status?.replace('_', ' ') || 'Active'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {sym}{(Number(work.payAmount) || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getPayBadge(
                            work.payStatus
                          )}`}
                        >
                          {work.payStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{work.rating || 5}.0</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{work.deadline || 'No deadline'}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditWork(work)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteWork(work.id)}
                            className="p-1 rounded bg-rose-950/40 text-rose-300 hover:bg-rose-900"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

