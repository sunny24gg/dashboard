import React, { useState, useEffect } from 'react';
import { X, DollarSign, Briefcase, Calendar, Link2, Star, CheckCircle, Tag } from 'lucide-react';

export default function WorkModal({
  isOpen,
  onClose,
  onSave,
  workToEdit = null,
  currency = '$'
}) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Video Editing',
    status: 'in_progress',
    priority: 'medium',
    payAmount: '',
    currency: currency,
    payStatus: 'pending',
    hourlyRate: '',
    hoursWorked: '',
    deadline: '',
    deliverables: '',
    webpageUrl: '',
    description: '',
    rating: 5,
    ratingFeedback: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (workToEdit) {
      setFormData({
        title: workToEdit.title || '',
        client: workToEdit.client || '',
        category: workToEdit.category || 'Video Editing',
        status: workToEdit.status || 'in_progress',
        priority: workToEdit.priority || 'medium',
        payAmount: workToEdit.payAmount ?? '',
        currency: workToEdit.currency || currency,
        payStatus: workToEdit.payStatus || 'pending',
        hourlyRate: workToEdit.hourlyRate ?? '',
        hoursWorked: workToEdit.hoursWorked ?? '',
        deadline: workToEdit.deadline || '',
        deliverables: workToEdit.deliverables || '',
        webpageUrl: workToEdit.webpageUrl || '',
        description: workToEdit.description || '',
        rating: workToEdit.rating ?? 5,
        ratingFeedback: workToEdit.ratingFeedback || ''
      });
    } else {
      setFormData({
        title: '',
        client: '',
        category: 'Video Editing',
        status: 'in_progress',
        priority: 'medium',
        payAmount: '',
        currency: currency,
        payStatus: 'pending',
        hourlyRate: '',
        hoursWorked: '',
        deadline: '',
        deliverables: '',
        webpageUrl: '',
        description: '',
        rating: 5,
        ratingFeedback: ''
      });
    }
  }, [workToEdit, currency, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a work title.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(formData, workToEdit?.id);
      onClose();
    } catch (err) {
      console.error('Error saving work:', err);
      alert('Failed to save work details: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {workToEdit ? 'Edit Work & Pay Details' : 'Add New Work Entry'}
              </h3>
              <p className="text-xs text-slate-400">
                Firestore collection: <code className="text-blue-400 font-mono">works</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Work Basics */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Project & Client Information</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Work / Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full-Stack E-Commerce Platform"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Client / Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp / Alex Smith"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Video Editing">Video Editing</option>
                  <option value="Filmmaking & Directing">Filmmaking & Directing</option>
                  <option value="Commercial & Brand Ads">Commercial & Brand Ads</option>
                  <option value="Color Grading & DI">Color Grading & DI</option>
                  <option value="YouTube Long-Form">YouTube Long-Form</option>
                  <option value="Shorts, Reels & TikTok">Shorts, Reels & TikTok</option>
                  <option value="Music Video Production">Music Video Production</option>
                  <option value="Sound Design & Audio Mix">Sound Design & Audio Mix</option>
                  <option value="VFX & Motion Graphics">VFX & Motion Graphics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Work Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Details of Pay */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Details of Pay & Financials</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contract Pay Amount ({formData.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                    {formData.currency}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="2500"
                    value={formData.payAmount}
                    onChange={(e) => setFormData({ ...formData, payAmount: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Payment Status
                </label>
                <select
                  value={formData.payStatus}
                  onChange={(e) => setFormData({ ...formData, payStatus: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="partial">🌓 Partial / Milestone</option>
                  <option value="invoiced">🧾 Invoiced</option>
                  <option value="paid">✅ Paid in Full</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Currency Symbol
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="$">$ (USD)</option>
                  <option value="₹">₹ (INR)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Hourly Rate (Optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 75"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Hours Logged (Optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 35"
                  value={formData.hoursWorked}
                  onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Due / Target Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Webpage & Deliverables */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Video Link, Deliverables & Production Scope</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Video URL / Drive / Showcase Link
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=... or Vimeo / Google Drive"
                  value={formData.webpageUrl}
                  onChange={(e) => setFormData({ ...formData, webpageUrl: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Key Video Deliverables
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4K Master Export, 3x 9:16 Reels, Color Grade LUTs, XML"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Edit Notes, Shot List & Brief
              </label>
              <textarea
                rows={2}
                placeholder="Pacing requirements, aspect ratios, audio tracks, style reference links..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Section 4: Rating & Feedback */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Client Rating from Webpage</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Rating (1 - 5 Stars)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5.0 / 5.0)</option>
                  <option value={4.8}>⭐⭐⭐⭐½ (4.8 / 5.0)</option>
                  <option value={4.5}>⭐⭐⭐⭐½ (4.5 / 5.0)</option>
                  <option value={4}>⭐⭐⭐⭐ (4.0 / 5.0)</option>
                  <option value={3}>⭐⭐⭐ (3.0 / 5.0)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Feedback / Review Quote
                </label>
                <input
                  type="text"
                  placeholder="e.g. Great quality work, fast turnaround!"
                  value={formData.ratingFeedback}
                  onChange={(e) => setFormData({ ...formData, ratingFeedback: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Saving to Firestore...</span>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{workToEdit ? 'Update Work & Pay' : 'Save Work to Firestore'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

