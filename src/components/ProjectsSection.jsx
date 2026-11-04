import React, { useState } from 'react';
import {
  Film,
  Plus,
  Video,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  DollarSign,
  Layers,
  Inbox,
  User,
  Clock,
  Briefcase,
  CheckCircle2,
  XCircle,
  Link2,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// ── Helpers ─────────────────────────────────────────────────────────────────
const statusBadge = (status) => {
  switch (status) {
    case 'completed':   return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'in_progress': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    case 'review':      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    default:            return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  }
};

const payBadge = (payStatus) => {
  switch (payStatus) {
    case 'paid':    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    case 'partial': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    default:        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  }
};

const newProjectStatusBadge = (status) => {
  switch (status) {
    case 'accepted':    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'rejected':    return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    case 'in_review':   return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    default:            return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  }
};

const fmtDate = (val) => {
  if (!val) return '—';
  if (val?.seconds) return new Date(val.seconds * 1000).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  return String(val);
};

// ── Incoming New Project Card ────────────────────────────────────────────────
function NewProjectCard({ req, onAccept, onReview, onReject, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const isNew = !req.status || req.status === 'new_project';

  return (
    <div className={`bg-slate-900/60 backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 ${
      isNew ? 'border-amber-500/40 shadow-sm shadow-amber-950/40' : 'border-slate-800/80'
    }`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Inbox className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{req.clientName || 'Unknown Client'}</p>
            <p className="text-[11px] text-slate-400 truncate">{req.service || 'Service not specified'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {isNew && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              NEW
            </span>
          )}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${newProjectStatusBadge(req.status)}`}>
            {req.status?.replace(/_/g, ' ') || 'New Request'}
          </span>
        </div>
      </div>

      {/* Key details */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {req.clientContact && (
          <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
            <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">Contact</p>
            <p className="text-xs text-slate-200 font-medium truncate">{req.clientContact}</p>
          </div>
        )}
        {req.timeline && (
          <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
            <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">Timeline</p>
            <p className="text-xs text-slate-200 font-medium">{req.timeline}</p>
          </div>
        )}
        {req.source && (
          <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
            <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">Source</p>
            <p className="text-xs text-slate-200 font-medium truncate">{req.source}</p>
          </div>
        )}
        <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
          <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">Submitted</p>
          <p className="text-xs text-slate-200 font-medium">{fmtDate(req.submittedAt || req.submittedAtDate)}</p>
        </div>
      </div>

      {/* Project Brief (expandable) */}
      {req.projectBrief && req.projectBrief !== '' && (
        <div className="mb-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors w-full text-left"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            <span className="font-medium">Project Brief</span>
          </button>
          {expanded && (
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-800/60 rounded-xl p-2.5">
              {req.projectBrief}
            </p>
          )}
        </div>
      )}

      {/* Footage link */}
      {req.footageLink && req.footageLink !== 'None provided' && (
        <a
          href={req.footageLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors mb-3"
        >
          <Link2 className="w-3 h-3" />
          <span className="truncate">{req.footageLink}</span>
          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
        </a>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800/60">
        <button
          onClick={() => onAccept(req)}
          disabled={req.status === 'accepted'}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-600/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Accept → Works
        </button>
        <button
          onClick={() => onReview(req.id)}
          disabled={req.status === 'in_review'}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-600/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          Review
        </button>
        <button
          onClick={() => onReject(req.id)}
          disabled={req.status === 'rejected'}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-600/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <XCircle className="w-3.5 h-3.5" />
          Decline
        </button>
        <button
          onClick={() => { if (window.confirm('Delete this request from Firebase?')) onDelete(req.id); }}
          className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
          title="Delete request"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProjectsSection({
  projects = [],
  newProjects = [],
  currency = '₹',
  onOpenNewProject,
  onEditProject,
  onDeleteProject,
  onAcceptNewProject,
  onRejectNewProject,
  onReviewNewProject,
  onDeleteNewProject,
  searchTerm = ''
}) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeView, setActiveView] = useState('requests'); // 'requests' | 'portfolio'

  const newCount = newProjects.filter(r => !r.status || r.status === 'new_project').length;

  const filteredProjects = projects.filter((p) => {
    const title = p.title || p.name || '';
    const client = p.client || '';
    const desc = p.description || '';
    const category = p.category || '';
    const deliverables = p.deliverables || '';
    const matchesSearch =
      searchTerm === '' ||
      [title, client, desc, category, deliverables].some(f =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredNewProjects = newProjects.filter((r) => {
    if (searchTerm === '') return true;
    return [r.clientName, r.clientContact, r.service, r.projectBrief, r.source]
      .filter(Boolean)
      .some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="space-y-6">

      {/* ── Tab Switcher ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveView('requests')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeView === 'requests'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
              : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          Incoming Requests
          {newCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full">
              {newCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveView('portfolio')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeView === 'portfolio'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm'
              : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Film className="w-4 h-4" />
          My Projects
          {projects.length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-600 text-white rounded-full">
              {projects.length}
            </span>
          )}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* INCOMING REQUESTS VIEW                                */}
      {/* ══════════════════════════════════════════════════════ */}
      {activeView === 'requests' && (
        <div className="space-y-5">
          {/* Header bar */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Inbox className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">New Project Requests</h3>
                <p className="text-[11px] text-slate-400">
                  From Firebase <code className="text-amber-400 font-mono">new_projects</code> collection · {newProjects.length} total
                </p>
              </div>
            </div>
            {newCount > 0 && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {newCount} awaiting review
              </span>
            )}
          </div>

          {filteredNewProjects.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
              <Inbox className="w-10 h-10 text-amber-400/30 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white mb-1">
                {searchTerm ? `No requests match "${searchTerm}"` : 'No Incoming Requests'}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When clients submit a project request from your portfolio site, it will appear here in real time from the <code className="text-amber-400 font-mono">new_projects</code> collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNewProjects.map((req) => (
                <NewProjectCard
                  key={req.id}
                  req={req}
                  onAccept={onAcceptNewProject}
                  onReview={onReviewNewProject}
                  onReject={onRejectNewProject}
                  onDelete={onDeleteNewProject}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/* MY PROJECTS / PORTFOLIO VIEW                          */}
      {/* ══════════════════════════════════════════════════════ */}
      {activeView === 'portfolio' && (
        <div className="space-y-5">
          {/* Top Bar with Filters & Action */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
                <Film className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-400 font-medium mr-1">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">All Categories ({projects.length})</option>
                  <option value="Video Editing" className="bg-slate-900">Video Editing</option>
                  <option value="Filmmaking & Directing" className="bg-slate-900">Filmmaking & Directing</option>
                  <option value="Commercial & Ads" className="bg-slate-900">Commercial & Ads</option>
                  <option value="Color Grading" className="bg-slate-900">Color Grading</option>
                  <option value="YouTube & Social Reels" className="bg-slate-900">YouTube & Reels</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 font-medium mr-1">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">All Statuses</option>
                  <option value="in_progress" className="bg-slate-900">In Progress</option>
                  <option value="completed" className="bg-slate-900">Completed</option>
                  <option value="review" className="bg-slate-900">Review</option>
                  <option value="planning" className="bg-slate-900">Planning</option>
                </select>
              </div>
            </div>

            <button
              onClick={onOpenNewProject}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-600/25 transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
              <Film className="w-10 h-10 text-purple-400/40 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white mb-1">
                {searchTerm ? `No projects match "${searchTerm}"` : 'No Projects in Firebase Yet'}
              </h3>
              <p className="max-w-sm mx-auto mb-5 text-[11px] text-slate-400">
                Add your completed or ongoing projects here. They sync to Firebase <code className="text-purple-400 font-mono">projects</code> collection in real time.
              </p>
              <button
                onClick={onOpenNewProject}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Project</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((p) => {
                const sym = p.currency || currency;
                const budgetVal = Number(p.budget) || 0;
                return (
                  <div
                    key={p.id}
                    className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Thumbnail */}
                      {p.thumbnailUrl && (
                        <div className="w-full h-36 rounded-xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-800/80 relative">
                          <img
                            src={p.thumbnailUrl}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => (e.target.style.display = 'none')}
                          />
                          {p.videoUrl && (
                            <a
                              href={p.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-colors"
                            >
                              <div className="w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg">
                                <Video className="w-5 h-5 ml-0.5" />
                              </div>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Tags & Status */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded">
                          {p.category || 'Video'}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusBadge(p.status)}`}>
                          {p.status?.replace('_', ' ') || 'In Progress'}
                        </span>
                      </div>

                      {/* Title & Client */}
                      <h3 className="font-bold text-white text-base leading-snug group-hover:text-purple-300 transition-colors">
                        {p.title}
                      </h3>
                      {p.client && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          Client: <span className="text-slate-300 font-medium">{p.client}</span>
                        </p>
                      )}

                      {/* Description */}
                      {p.description && (
                        <p className="text-xs text-slate-400 line-clamp-2 my-2.5 leading-relaxed">{p.description}</p>
                      )}

                      {/* Budget & Pay */}
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 my-3 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-semibold text-slate-400 block">Project Budget</span>
                          <span className="text-sm font-bold text-white">{sym}{budgetVal.toLocaleString()}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${payBadge(p.payStatus)}`}>
                          {p.payStatus || 'Pending'}
                        </span>
                      </div>

                      {/* Deliverables Tags */}
                      {p.deliverables && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {p.deliverables.split(',').map((tag, idx) => (
                            <span key={idx} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/50">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        {p.deadline && (
                          <div className="flex items-center gap-1 text-[11px]">
                            <Calendar className="w-3 h-3" />
                            <span>{p.deadline}</span>
                          </div>
                        )}
                        {p.videoUrl && (
                          <a
                            href={p.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors ml-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Watch</span>
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onEditProject(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
                          title="Delete project"
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
        </div>
      )}
    </div>
  );
}
