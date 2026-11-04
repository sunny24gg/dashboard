import React from 'react';
import {
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  Trash2,
  CheckCircle,
  AlertCircle,
  Briefcase,
  DollarSign,
  User
} from 'lucide-react';

export default function InquiriesSection({
  inquiries = [],
  onDeleteInquiry,
  onUpdateStatus,
  onConvertToWork,
  searchTerm = ''
}) {
  const filtered = inquiries.filter((inq) => {
    const name = inq.name || '';
    const email = inq.email || '';
    const message = inq.message || '';
    const project = inq.projectType || '';

    return (
      searchTerm === '' ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-base">Webpage Inquiries & Client Leads</h3>
          <p className="text-xs text-slate-400">
            Messages sent through your portfolio contact form stored in <code className="text-cyan-400 font-mono">inquiries</code>
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl">
          {inquiries.length} Total Messages
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No Webpage Inquiries Found</p>
          <p className="mt-1 max-w-sm mx-auto">
            When potential clients submit work requests or messages on sunnyportfilo, they will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white text-sm">{inq.name}</span>
                  {inq.email && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" />
                      {inq.email}
                    </span>
                  )}
                  {inq.status && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                        inq.status === 'replied'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inq.status}
                    </span>
                  )}
                </div>

                {inq.projectType && (
                  <div className="mt-1 text-xs text-blue-400 font-medium">
                    Project Type: {inq.projectType} {inq.budget ? `• Budget: ${inq.budget}` : ''}
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  "{inq.message}"
                </p>

                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{inq.date || 'Recent inquiry'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onConvertToWork && (
                  <button
                    onClick={() => onConvertToWork(inq)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Create Work</span>
                  </button>
                )}

                <button
                  onClick={() => onDeleteInquiry(inq.id)}
                  className="p-2 rounded-xl bg-rose-950/40 text-rose-300 hover:bg-rose-900 border border-rose-800/40 transition-colors"
                  title="Delete inquiry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

