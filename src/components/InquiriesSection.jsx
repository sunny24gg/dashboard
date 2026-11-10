import React, { useState } from 'react';
import {
  Video,
  Film,
  Mail,
  Calendar,
  Clock,
  Trash2,
  CheckCircle,
  Briefcase,
  DollarSign,
  User,
  Phone,
  Clapperboard,
  Sparkles,
  Tag,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function InquiriesSection({
  inquiries = [],
  onDeleteInquiry,
  onUpdateStatus,
  onConvertToWork,
  searchTerm = ''
}) {
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = inquiries.filter((inq) => {
    const name = inq.clientName || inq.name || '';
    const email = inq.email || '';
    const message = inq.details || inq.message || inq.projectBrief || '';
    const project = inq.projectType || inq.service || '';

    const matchesSearch =
      searchTerm === '' ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === 'all' ||
      project.toLowerCase().includes(typeFilter.toLowerCase());

    return matchesSearch && matchesType;
  });

  const getProjectTypeBadge = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('youtube') || t.includes('long-form')) {
      return 'bg-red-500/15 text-red-300 border-red-500/30';
    }
    if (t.includes('film') || t.includes('cinema') || t.includes('directing')) {
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    }
    if (t.includes('commercial') || t.includes('ad')) {
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
    if (t.includes('color') || t.includes('grading')) {
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    }
    if (t.includes('reel') || t.includes('short') || t.includes('tiktok')) {
      return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
    }
    return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
  };

  const getStatusBadge = (status = 'new') => {
    switch (status.toLowerCase()) {
      case 'replied':
      case 'accepted':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'in_review':
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'contacted':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'new':
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  const formatDate = (inq) => {
    if (inq.submittedAt?.seconds) {
      return new Date(inq.submittedAt.seconds * 1000).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    }
    return inq.date || inq.submittedAtDate || 'Recent inquiry';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600/30 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Clapperboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Video & Filmmaking Inquiries</h3>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 rounded-full border border-cyan-500/30">
                Production Leads
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Client requests submitted through your portfolio contact form stored in <code className="text-cyan-400 font-mono">inquiries</code>
            </p>
          </div>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 font-medium">Filter:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Video Formats ({inquiries.length})</option>
              <option value="youtube" className="bg-slate-900">YouTube Long-Form</option>
              <option value="short" className="bg-slate-900">Shorts & Reels</option>
              <option value="film" className="bg-slate-900">Filmmaking & Cinema</option>
              <option value="commercial" className="bg-slate-900">Commercial & Ads</option>
              <option value="color" className="bg-slate-900">Color Grading</option>
            </select>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl whitespace-nowrap">
            {inquiries.length} Total Leads
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          <Video className="w-10 h-10 text-cyan-500/30 mx-auto mb-3" />
          <p className="text-base font-bold text-white">No Video Production Inquiries Found</p>
          <p className="mt-1.5 max-w-md mx-auto text-slate-400 leading-relaxed">
            When creators, brands, or directors reach out for video editing, YouTube content, commercial edits, or filmmaking direction, their project details will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((inq) => {
            const clientName = inq.clientName || inq.name || 'Anonymous Client';
            const projectType = inq.projectType || inq.service || 'Video Production Project';
            const brief = inq.details || inq.message || inq.projectBrief || '';
            const status = inq.status || 'new';

            return (
              <div
                key={inq.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-slate-700/90 rounded-2xl p-5 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
              >
                {/* Left: Client & Project Info */}
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {clientName}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {inq.source || 'Portfolio Contact Form'}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ml-auto lg:ml-2 ${getStatusBadge(status)}`}>
                      {status}
                    </span>

                    {/* Project Type Badge */}
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${getProjectTypeBadge(projectType)}`}>
                      <Film className="w-3 h-3" />
                      <span>{projectType}</span>
                    </span>
                  </div>

                  {/* Production Specs: Timeline, Budget, Phone, Email */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                    {inq.email && (
                      <a
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/60"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{inq.email}</span>
                      </a>
                    )}
                    {inq.phone && inq.phone !== 'Not provided' && (
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-300 transition-colors bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/60"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{inq.phone}</span>
                      </a>
                    )}
                    {inq.timeline && (
                      <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/60 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Turnaround: <strong className="text-white font-medium">{inq.timeline}</strong></span>
                      </div>
                    )}
                    {inq.budget && (
                      <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/60 text-emerald-300">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Budget: <strong className="text-emerald-200 font-medium">{inq.budget}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Creative Brief / Footage Request */}
                  {brief && (
                    <div className="mt-2 text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/70">
                      <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Video Project Brief & Scope</span>
                      </div>
                      <p className="whitespace-pre-wrap">{brief}</p>
                    </div>
                  )}

                  {/* Submission Timestamp */}
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>Inquiry received on {formatDate(inq)}</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex lg:flex-col items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/60">
                  {onConvertToWork && (
                    <button
                      onClick={() => onConvertToWork(inq)}
                      className="flex-1 lg:w-full px-3.5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-950 hover:scale-[1.02]"
                      title="Convert this client inquiry into a tracked Work & Pay contract"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Convert to Work</span>
                    </button>
                  )}

                  {onUpdateStatus && status !== 'replied' && (
                    <button
                      onClick={() => onUpdateStatus(inq.id, 'replied')}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
                      title="Mark inquiry as replied"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">Mark Replied</span>
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteInquiry(inq.id)}
                    className="p-2 rounded-xl bg-rose-950/40 text-rose-300 hover:bg-rose-900 border border-rose-800/40 transition-colors"
                    title="Delete inquiry from Firebase"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
