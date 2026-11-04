import React, { useState, useEffect } from 'react';
import { X, Film, DollarSign, Calendar, Link2, CheckCircle2, Video, Image, Tag, Building } from 'lucide-react';

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  projectToEdit = null,
  currency = '₹'
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Video Editing',
    client: '',
    budget: '',
    currency: currency,
    payStatus: 'pending',
    status: 'in_progress',
    videoUrl: '',
    thumbnailUrl: '',
    deadline: '',
    deliverables: '',
    description: '',
    featured: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || projectToEdit.name || '',
        category: projectToEdit.category || 'Video Editing',
        client: projectToEdit.client || '',
        budget: projectToEdit.budget ?? '',
        currency: projectToEdit.currency || currency,
        payStatus: projectToEdit.payStatus || 'pending',
        status: projectToEdit.status || 'in_progress',
        videoUrl: projectToEdit.videoUrl || '',
        thumbnailUrl: projectToEdit.thumbnailUrl || '',
        deadline: projectToEdit.deadline || '',
        deliverables: projectToEdit.deliverables || '',
        description: projectToEdit.description || '',
        featured: Boolean(projectToEdit.featured)
      });
    } else {
      setFormData({
        title: '',
        category: 'Video Editing',
        client: '',
        budget: '',
        currency: currency,
        payStatus: 'pending',
        status: 'in_progress',
        videoUrl: '',
        thumbnailUrl: '',
        deadline: '',
        deliverables: '',
        description: '',
        featured: false
      });
    }
  }, [projectToEdit, currency, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a project title.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(formData, projectToEdit?.id);
      onClose();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project to Firebase: ' + err.message);
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
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {projectToEdit ? 'Edit Project' : 'Add New Project'}
              </h3>
              <p className="text-xs text-slate-400">
                Saves directly to Firebase collection <code className="text-purple-400 font-mono">projects</code>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Project Basic Info */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>Project & Client Details</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Brand Video Edit"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red Bull / Local Studio"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                >
                  <option value="Video Editing">Video Editing</option>
                  <option value="Filmmaking & Directing">Filmmaking & Directing</option>
                  <option value="Commercial & Ads">Commercial & Ads</option>
                  <option value="Color Grading">Color Grading</option>
                  <option value="YouTube & Social Reels">YouTube & Social Reels</option>
                  <option value="Music Video">Music Video</option>
                  <option value="Short Film">Short Film</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="review">Review</option>
                    <option value="planning">Planning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Budget & Compensation */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Budget & Pay</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Budget / Pay Amount ({formData.currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                    {formData.currency}
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="15000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Pay Status
                </label>
                <select
                  value={formData.payStatus}
                  onChange={(e) => setFormData({ ...formData, payStatus: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="pending">⏳ Pending Payment</option>
                  <option value="partial">🌓 Partial / Advance Paid</option>
                  <option value="paid">✅ Paid in Full</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                >
                  <option value="₹">₹ (INR)</option>
                  <option value="$">$ (USD)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Links & Media */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>Media Links & Video Output</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Video URL (YouTube / Vimeo / Drive)
                </label>
                <div className="relative">
                  <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or Drive link"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Thumbnail / Poster Image URL
                </label>
                <div className="relative">
                  <Image className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://... image poster URL"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Deliverables & Tech Specs (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. 4K Master, 9:16 Vertical Reel, Color Grade, Premiere Pro"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Description & Scope
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of the creative direction, narrative pacing, client specifications..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                id="featCheck"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-0"
              />
              <label htmlFor="featCheck" className="text-xs text-slate-300 cursor-pointer">
                Feature on Homepage Showcase
              </label>
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
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving to Firebase...' : (projectToEdit ? 'Update Project' : 'Save Project to Firebase')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

