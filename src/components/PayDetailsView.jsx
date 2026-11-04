import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  CreditCard,
  ArrowUpRight,
  Briefcase
} from 'lucide-react';

export default function PayDetailsView({
  works,
  currency = '$',
  onUpdatePayStatus,
  onEditWork
}) {
  const totalPay = works.reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);
  const paidWorks = works.filter((w) => w.payStatus === 'paid');
  const paidAmount = paidWorks.reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);

  const pendingWorks = works.filter((w) => w.payStatus === 'pending');
  const pendingAmount = pendingWorks.reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);

  const partialWorks = works.filter((w) => w.payStatus === 'partial');
  const partialAmount = partialWorks.reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);

  const invoicedWorks = works.filter((w) => w.payStatus === 'invoiced');
  const invoicedAmount = invoicedWorks.reduce((sum, w) => sum + (Number(w.payAmount) || 0), 0);

  const totalHours = works.reduce((sum, w) => sum + (Number(w.hoursWorked) || 0), 0);
  const avgHourlyRate = works.filter((w) => Number(w.hourlyRate) > 0);
  const avgRate = avgHourlyRate.length > 0
    ? Math.round(avgHourlyRate.reduce((sum, w) => sum + Number(w.hourlyRate), 0) / avgHourlyRate.length)
    : 80;

  const paidPct = totalPay > 0 ? Math.round((paidAmount / totalPay) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 4 Financial Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Contract Value</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight">
            {currency}{totalPay.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">Across {works.length} projects</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Paid in Full</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-400 tracking-tight">
            {currency}{paidAmount.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-emerald-400 font-medium">{paidPct}% of total volume</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pending & Invoiced</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-amber-400 tracking-tight">
            {currency}{(pendingAmount + invoicedAmount + partialAmount).toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {pendingWorks.length + invoicedWorks.length + partialWorks.length} pending payments
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Hours Tracked</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-purple-300 tracking-tight">
            {totalHours} hrs
          </div>
          <div className="mt-2 text-xs text-slate-400">Avg rate: {currency}{avgRate}/hr</div>
        </div>
      </div>

      {/* Payment Progress Bar */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-semibold text-slate-300">Revenue Realization Ratio</span>
          <span className="font-bold text-white">{paidPct}% Completed</span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${paidPct}%` }}
            title={`Paid: ${currency}${paidAmount}`}
          ></div>
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${totalPay > 0 ? (invoicedAmount / totalPay) * 100 : 0}%` }}
            title={`Invoiced: ${currency}${invoicedAmount}`}
          ></div>
          <div
            className="bg-purple-500 h-full transition-all duration-500"
            style={{ width: `${totalPay > 0 ? (partialAmount / totalPay) * 100 : 0}%` }}
            title={`Partial: ${currency}${partialAmount}`}
          ></div>
          <div
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${totalPay > 0 ? (pendingAmount / totalPay) * 100 : 0}%` }}
            title={`Pending: ${currency}${pendingAmount}`}
          ></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Paid: {currency}{paidAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Invoiced: {currency}{invoicedAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>Partial: {currency}{partialAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Pending: {currency}{pendingAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Pay Details by Project Table */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm">Work Compensation & Payment Breakdown</h3>
            <p className="text-xs text-slate-400">Click payment status badge to quickly toggle or update</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Work / Client</th>
                <th className="py-3.5 px-4">Contract Amount</th>
                <th className="py-3.5 px-4">Rate & Hours</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Work Status</th>
                <th className="py-3.5 px-6 text-right">Quick Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {works.map((work) => {
                const sym = work.currency || currency;
                const payVal = Number(work.payAmount) || 0;
                return (
                  <tr key={work.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">{work.title}</div>
                      <div className="text-[11px] text-slate-400">{work.client || 'Direct Contract'}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-white text-sm">
                      {sym}{payVal.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {work.hourlyRate ? `${sym}${work.hourlyRate}/hr` : 'Fixed'}
                      {work.hoursWorked ? ` (${work.hoursWorked} hrs)` : ''}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          work.payStatus === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : work.payStatus === 'partial'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : work.payStatus === 'invoiced'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {work.payStatus || 'pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300 capitalize text-xs">
                        {work.status?.replace('_', ' ') || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {work.payStatus !== 'paid' && (
                          <button
                            onClick={() => onUpdatePayStatus(work.id, 'paid')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        {work.payStatus !== 'invoiced' && (
                          <button
                            onClick={() => onUpdatePayStatus(work.id, 'invoiced')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-[11px] font-semibold transition-colors"
                          >
                            Invoice
                          </button>
                        )}
                        <button
                          onClick={() => onEditWork(work)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                        >
                          Edit
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
    </div>
  );
}

