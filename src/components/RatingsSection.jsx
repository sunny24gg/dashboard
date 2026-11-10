import React, { useState } from 'react';
import {
  Star,
  Plus,
  ShieldCheck,
  Calendar,
  Trash2,
  Quote,
  Globe,
  Tag,
  Building
} from 'lucide-react';

export default function RatingsSection({
  reviews = [],
  onOpenAddRating,
  onDeleteRating,
  searchTerm = ''
}) {
  const [scoreFilter, setScoreFilter] = useState('all');

  const validReviews = reviews.filter((r) => Number(r.rating) > 0);
  const totalCount = validReviews.length;
  const avgScore = totalCount > 0
    ? (validReviews.reduce((sum, r) => sum + Number(r.rating), 0) / totalCount).toFixed(1)
    : '5.0';

  // Distribution
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  validReviews.forEach((r) => {
    const rounded = Math.min(5, Math.max(1, Math.round(Number(r.rating))));
    counts[rounded] = (counts[rounded] || 0) + 1;
  });

  const filteredReviews = reviews.filter((r) => {
    const name = r.name || r.clientName || '';
    const text = r.feedback || r.text || r.reviewText || '';
    const category = r.category || '';
    const role = r.role || '';

    const matchesSearch =
      searchTerm === '' ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesScore =
      scoreFilter === 'all'
        ? true
        : Math.floor(Number(r.rating)) === Number(scoreFilter);

    return matchesSearch && matchesScore;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Average Score & Distribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
        {/* Left: Overall Webpage Rating Score */}
        <div className="flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-800/80 text-center">
          <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">
            Webpage Rating from Firebase
          </div>
          <div className="text-5xl font-black text-white tracking-tight flex items-baseline gap-1 my-2">
            <span>{avgScore}</span>
            <span className="text-2xl text-amber-400">★</span>
          </div>
          <div className="flex items-center gap-1 my-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i <= Math.round(Number(avgScore))
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-400 mt-2 font-medium">
            Based on {totalCount} verified review{totalCount === 1 ? '' : 's'} in <code className="text-amber-400 font-mono">ratings</code>
          </div>
        </div>

        {/* Center: Rating Distribution Bar chart */}
        <div className="space-y-2 flex flex-col justify-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Rating Distribution
          </div>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = counts[stars] || 0;
            const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-slate-400 font-medium shrink-0 flex items-center gap-1">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                </span>
                <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right text-slate-400 text-[11px] font-semibold shrink-0">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Webpage Origin & Add Action */}
        <div className="flex flex-col justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Globe className="w-4 h-4" />
              <span>Live Webpage Reviews</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reviews submitted by clients on your portfolio webpage sync directly here in real-time.
            </p>
            <div className="mt-2 text-[11px] text-slate-400">
              Source: <span className="text-slate-300 font-mono">portfilo-3e0b6.firebaseapp.com</span>
            </div>
          </div>

          <button
            onClick={onOpenAddRating}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review / Rating</span>
          </button>
        </div>
      </div>

      {/* Filter by star rating */}
      <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium ml-2">Filter by Score:</span>
          <button
            onClick={() => setScoreFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
              scoreFilter === 'all'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setScoreFilter(String(star))}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                scoreFilter === String(star)
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {star} Stars ({counts[star] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReviews.length === 0 ? (
          <div className="md:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-xs">
            <Star className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>No reviews found matching this filter.</p>
          </div>
        ) : (
          filteredReviews.map((r) => {
            const numScore = Number(r.rating) || 5;
            const name = r.name || r.clientName || 'Verified Client';
            const text = r.feedback || r.text || r.reviewText || '';
            const role = r.role || 'Verified Client';
            const category = r.category || 'Video Editing';
            const displayDate = r.createdAt?.seconds
              ? new Date(r.createdAt.seconds * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
              : r.date || 'Recent';

            return (
              <div
                key={r.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Client Name, Role, Rating Stars */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">
                          {name}
                        </h4>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{role}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded">
                          {category}
                        </span>
                        {r.company && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            <span>{r.company}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300">{numScore.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="relative pl-6 my-4">
                    <Quote className="w-4 h-4 text-slate-600 absolute left-0 top-0 rotate-180" />
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      "{text}"
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Metadata & Delete */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] text-slate-400">
                      {displayDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {r.id}
                    </span>
                    <button
                      onClick={() => onDeleteRating(r.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors ml-2"
                      title="Delete review from Firestore"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
