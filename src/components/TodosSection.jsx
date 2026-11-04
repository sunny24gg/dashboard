import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  Clock,
  Filter,
  Tag,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

export default function TodosSection({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  works = [],
  searchTerm = ''
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'urgent'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // New Todo State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Work');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newRelatedWorkId, setNewRelatedWorkId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setIsSubmitting(true);
      await onAddTodo({
        title: newTitle.trim(),
        category: newCategory,
        priority: newPriority,
        dueDate: newDueDate,
        relatedWorkId: newRelatedWorkId
      });
      setNewTitle('');
      setNewDueDate('');
    } catch (err) {
      console.error('Error adding todo:', err);
      alert('Failed to add todo: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      searchTerm === '' ||
      todo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filter === 'all'
        ? true
        : filter === 'pending'
        ? !todo.completed
        : filter === 'completed'
        ? todo.completed
        : filter === 'urgent'
        ? !todo.completed && (todo.priority === 'urgent' || todo.priority === 'high')
        : true;

    const matchesCategory = categoryFilter === 'all' || todo.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;
  const urgentCount = todos.filter((t) => !t.completed && (t.priority === 'urgent' || t.priority === 'high')).length;

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'medium':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'low':
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Todo Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Pending Tasks</div>
            <div className="text-2xl font-bold text-white mt-1">{pendingCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">High / Urgent Priority</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">{urgentCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Completed Tasks</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{completedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Quick Add Form */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4">
        <form onSubmit={handleCreateTodo} className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            required
            placeholder="What needs to get done next? (e.g. Deploy Sunny portfolio v2, send invoice...)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full md:flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="urgent">🔴 Urgent</option>
              <option value="high">🟠 High</option>
              <option value="medium">🔵 Medium</option>
              <option value="low">⚪ Low</option>
            </select>

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Work">Work</option>
              <option value="Billing">Billing & Pay</option>
              <option value="Client Call">Client Call</option>
              <option value="Deployment">Deployment</option>
              <option value="Marketing">Marketing</option>
              <option value="Review">Review</option>
            </select>

            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              title="Due date"
            />

            <button
              type="submit"
              disabled={isSubmitting || !newTitle.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filter === 'urgent'
                ? 'bg-rose-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Urgent ({urgentCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Work">Work</option>
            <option value="Billing">Billing & Pay</option>
            <option value="Client Call">Client Call</option>
            <option value="Deployment">Deployment</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTodos.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>No tasks found for this view.</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                todo.completed
                  ? 'bg-slate-950/40 border-slate-800/40 opacity-70'
                  : 'bg-slate-900/60 backdrop-blur-md border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => onToggleTodo(todo.id, todo.completed)}
                  className="shrink-0 text-slate-400 hover:text-indigo-400 transition-colors focus:outline-none"
                >
                  {todo.completed ? (
                    <div className="w-5 h-5 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-lg border-2 border-slate-600 hover:border-indigo-400 transition-colors"></div>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div
                    className={`text-xs font-semibold transition-all ${
                      todo.completed ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}
                  >
                    {todo.title}
                  </div>
                  {todo.description && (
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{todo.description}</p>
                  )}
                </div>
              </div>

              {/* Badges & Actions */}
              <div className="flex items-center gap-3 shrink-0 ml-4">
                {todo.category && (
                  <span className="text-[10px] bg-slate-800 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md hidden sm:inline-block">
                    {todo.category}
                  </span>
                )}

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase ${getPriorityStyle(
                    todo.priority
                  )}`}
                >
                  {todo.priority || 'medium'}
                </span>

                {todo.dueDate && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 hidden sm:flex">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{todo.dueDate}</span>
                  </div>
                )}

                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

