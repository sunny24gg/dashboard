import React, { useState, useEffect } from 'react';
import {
  projectsCol,
  newProjectsCol,
  worksCol,
  todosCol,
  reviewsCol,
  inquiriesCol,
  portfolioInfoDoc,
  addProject,
  updateProject,
  deleteProject,
  addWork,
  updateWork,
  deleteWork,
  addTodo,
  toggleTodo,
  deleteTodo,
  addReview,
  deleteReview,
  deleteInquiry,
  updateInquiryStatus,
  updateNewProjectStatus,
  deleteNewProject
} from './firebase';
import { onSnapshot } from 'firebase/firestore';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import WorksSection from './components/WorksSection';
import WorkModal from './components/WorkModal';
import TodosSection from './components/TodosSection';
import RatingsSection from './components/RatingsSection';
import AddRatingModal from './components/AddRatingModal';
import InquiriesSection from './components/InquiriesSection';
import PayDetailsView from './components/PayDetailsView';

import {
  Briefcase,
  CheckSquare,
  Star,
  Film,
  ArrowRight,
  Plus,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Live Firebase data states
  const [projects, setProjects] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [works, setWorks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [portfolioInfo, setPortfolioInfo] = useState(null);

  const [currency, setCurrency] = useState('₹');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [workToEdit, setWorkToEdit] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // ═══════════════════════════════════════════════════════════════
  // Real-time Firestore Listeners — directly to sunnyportfilo DB
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    setIsLoading(true);

    // 1. Projects Collection
    const unsubProjects = onSnapshot(
      projectsCol,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
          const ta = a.createdAt?.seconds || 0;
          const tb = b.createdAt?.seconds || 0;
          return tb - ta;
        });
        setProjects(list);
        setIsLoading(false);
      },
      (err) => {
        console.warn('Projects listener:', err.message);
        setIsLoading(false);
      }
    );

    // 2. Works & Pay Details
    const unsubWorks = onSnapshot(
      worksCol,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setWorks(list);
      },
      (err) => console.warn('Works listener:', err.message)
    );

    // 3. To-Do Tasks
    const unsubTodos = onSnapshot(
      todosCol,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setTodos(list);
      },
      (err) => console.warn('Todos listener:', err.message)
    );

    // 4. Webpage Reviews & Ratings
    const unsubReviews = onSnapshot(
      reviewsCol,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
        setReviews(list);
      },
      (err) => console.warn('Reviews listener:', err.message)
    );

    // 5. Inquiries from Portfolio Contact Form
    const unsubInquiries = onSnapshot(
      inquiriesCol,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
        setInquiries(list);
      },
      (err) => console.warn('Inquiries listener:', err.message)
    );

    // 6. Portfolio Meta Info (stats, availability etc.)
    const unsubInfo = onSnapshot(
      portfolioInfoDoc,
      (docSnap) => {
        if (docSnap.exists()) setPortfolioInfo(docSnap.data());
      },
      (err) => console.warn('Portfolio info listener:', err.message)
    );

    // 7. New Projects — incoming requests from portfolio form (new_projects collection)
    const unsubNewProjects = onSnapshot(
      newProjectsCol,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0));
        setNewProjects(list);
      },
      (err) => console.warn('New projects listener:', err.message)
    );

    return () => {
      unsubProjects();
      unsubWorks();
      unsubTodos();
      unsubReviews();
      unsubInquiries();
      unsubInfo();
      unsubNewProjects();
    };
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // Project Handlers
  // ═══════════════════════════════════════════════════════════════
  const handleSaveProject = async (formData, projectId) => {
    if (projectId) {
      await updateProject(projectId, formData);
    } else {
      await addProject(formData);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project from sunnyportfilo Firestore?')) {
      await deleteProject(id);
    }
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  };

  const handleOpenNewProject = () => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  };

  // ═══════════════════════════════════════════════════════════════
  // Work Handlers
  // ═══════════════════════════════════════════════════════════════
  const handleSaveWork = async (formData, workId) => {
    if (workId) {
      await updateWork(workId, formData);
    } else {
      await addWork(formData);
    }
  };

  const handleDeleteWork = async (id) => {
    if (window.confirm('Delete this work entry from sunnyportfilo database?')) {
      await deleteWork(id);
    }
  };

  const handleUpdatePayStatus = async (id, newStatus) => {
    await updateWork(id, { payStatus: newStatus });
  };

  const handleEditWork = (work) => {
    setWorkToEdit(work);
    setIsWorkModalOpen(true);
  };

  const handleOpenNewWork = () => {
    setWorkToEdit(null);
    setIsWorkModalOpen(true);
  };

  const handleConvertInquiryToWork = (inquiry) => {
    setWorkToEdit({
      title: inquiry.projectType ? `${inquiry.projectType} for ${inquiry.name}` : `Project for ${inquiry.name}`,
      client: inquiry.name,
      description: inquiry.message,
      payAmount: inquiry.budget ? parseFloat(String(inquiry.budget).replace(/[^0-9.]/g, '')) || 0 : '',
      currency,
      status: 'pending',
      payStatus: 'pending'
    });
    setIsWorkModalOpen(true);
  };

  // ═══════════════════════════════════════════════════════════════
  // Todo Handlers
  // ═══════════════════════════════════════════════════════════════
  const handleAddTodo = async (todoData) => await addTodo(todoData);
  const handleToggleTodo = async (id, current) => await toggleTodo(id, current);
  const handleDeleteTodo = async (id) => await deleteTodo(id);

  // ═══════════════════════════════════════════════════════════════
  // Reviews / Ratings Handlers
  // ═══════════════════════════════════════════════════════════════
  const handleAddRating = async (ratingData) => await addReview(ratingData);
  const handleDeleteRating = async (id) => {
    if (window.confirm('Delete this webpage review from sunnyportfilo Firestore?')) {
      await deleteReview(id);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // Inquiry Handlers
  // ═══════════════════════════════════════════════════════════════
  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Delete this inquiry?')) await deleteInquiry(id);
  };
  const handleUpdateInquiryStatus = async (id, status) => await updateInquiryStatus(id, status);

  // ═══════════════════════════════════════════════════════════════
  // New Project Request Handlers
  // ═══════════════════════════════════════════════════════════════

  // Accept: mark accepted in new_projects → create work entry → go to Works tab
  const handleAcceptNewProject = async (req) => {
    try {
      // 1. Mark as accepted in new_projects
      await updateNewProjectStatus(req.id, 'accepted');

      // 2. Auto-create a work entry from the request data
      await addWork({
        title: req.service
          ? `${req.service} for ${req.clientName || 'Client'}`
          : `Project for ${req.clientName || 'Client'}`,
        client: req.clientName || '',
        description: [
          req.projectBrief ? `Brief: ${req.projectBrief}` : '',
          req.timeline     ? `Timeline: ${req.timeline}`   : '',
          req.source       ? `Source: ${req.source}`       : '',
          req.footageLink && req.footageLink !== 'None provided'
            ? `Footage: ${req.footageLink}` : ''
        ].filter(Boolean).join('\n'),
        category: req.service || 'Video Editing',
        payAmount: 0,
        currency,
        payStatus: 'pending',
        status: 'pending',
        deadline: '',
        webpageUrl: '',
        _fromNewProject: req.id  // reference back to the source request
      });

      // 3. Switch to Works & Pay tab
      setActiveTab('works');
    } catch (err) {
      console.error('Accept new project failed:', err);
      alert('Error accepting project: ' + err.message);
    }
  };

  const handleRejectNewProject  = async (id) => await updateNewProjectStatus(id, 'rejected');
  const handleReviewNewProject  = async (id) => await updateNewProjectStatus(id, 'in_review');
  const handleDeleteNewProjectReq = async (id) => {
    if (window.confirm('Delete this project request from Firebase?')) await deleteNewProject(id);
  };

  const pendingTodosCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectsCount={projects.length + newProjects.length}
        worksCount={works.length}
        todosPendingCount={pendingTodosCount}
        reviewsCount={reviews.length}
        inquiriesCount={inquiries.length}
      />

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currency={currency}
          setCurrency={setCurrency}
          onOpenNewWork={handleOpenNewWork}
          onOpenNewProject={handleOpenNewProject}
          onOpenNewTodo={() => setActiveTab('todos')}
          onOpenNewRating={() => setIsRatingModalOpen(true)}
          isConnected={true}
        />

        {/* ── Scrollable Content ── */}
        <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* ── DASHBOARD OVERVIEW ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <StatsCards
                projects={projects}
                works={works}
                todos={todos}
                reviews={reviews}
                portfolioInfo={portfolioInfo}
                currency={currency}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />

              {/* 3-column split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Projects Snapshot (left 2 cols) ── */}
                <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                          <Film className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">Projects & Details</h3>
                          <p className="text-xs text-slate-400">
                            Live from Firestore <code className="text-purple-400 font-mono">projects</code>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                      >
                        <span>View All ({projects.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/60">
                        <Film className="w-7 h-7 text-purple-400/40 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-slate-300">No Projects Yet</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Add video editing and filmmaking projects with budget, links & deliverables.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {projects.slice(0, 4).map((p) => (
                          <div
                            key={p.id}
                            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-xs truncate">{p.title}</span>
                                {p.client && (
                                  <span className="text-[10px] text-slate-400">• {p.client}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                                  {p.category || 'Video'}
                                </span>
                                {p.deadline && (
                                  <span className="text-[10px] text-slate-400">Due {p.deadline}</span>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-bold text-white text-xs">
                                {p.currency || currency}{(Number(p.budget) || 0).toLocaleString()}
                              </div>
                              <span
                                className={`inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                  p.payStatus === 'paid'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : p.payStatus === 'partial'
                                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}
                              >
                                {p.payStatus || 'pending'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Total project budgets:{' '}
                      <strong className="text-white">
                        {currency}{projects.reduce((s, p) => s + (Number(p.budget) || 0), 0).toLocaleString()}
                      </strong>
                    </span>
                    <button
                      onClick={handleOpenNewProject}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>
                </div>

                {/* ── Urgent Todos (right 1 col) ── */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">To-Do Lists</h3>
                          <p className="text-xs text-slate-400">{pendingTodosCount} pending</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('todos')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {todos.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/60">
                        <CheckSquare className="w-7 h-7 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-slate-300">No To-Dos Yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {todos.slice(0, 5).map((todo) => (
                          <div
                            key={todo.id}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
                          >
                            <button
                              onClick={() => handleToggleTodo(todo.id, todo.completed)}
                              className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors"
                            >
                              {todo.completed ? (
                                <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center">
                                  <span className="text-[10px] text-white">✓</span>
                                </div>
                              ) : (
                                <div className="w-4 h-4 rounded border border-slate-500"></div>
                              )}
                            </button>
                            <div className="min-w-0 flex-1">
                              <div className={`text-xs font-medium leading-tight ${todo.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                                {todo.title}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-semibold uppercase px-1.5 rounded ${
                                  todo.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300' :
                                  todo.priority === 'high' ? 'bg-amber-500/20 text-amber-300' :
                                  'bg-slate-800 text-slate-400'
                                }`}>{todo.priority}</span>
                                {todo.dueDate && <span className="text-[10px] text-slate-400">{todo.dueDate}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setActiveTab('todos')}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors"
                    >
                      Manage To-Do Checklist
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Works & Pay Snapshot ── */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Works & Pay Details</h3>
                      <p className="text-xs text-slate-400">
                        Firestore <code className="text-blue-400 font-mono">works</code> collection
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('works')} className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                    <span>Manage Works ({works.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {works.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/60">
                    <Briefcase className="w-7 h-7 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No Works Added Yet</p>
                    <p className="text-[11px] text-slate-400 mt-1">Track client contracts, pay amounts, hourly rates and deliverables.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {works.slice(0, 4).map((work) => (
                      <div key={work.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-white text-xs truncate block">{work.title}</span>
                          <span className="text-[10px] text-slate-400">{work.client || 'Direct Contract'}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-white text-xs">{work.currency || currency}{(Number(work.payAmount) || 0).toLocaleString()}</div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                            work.payStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                            'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>{work.payStatus || 'pending'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Total contract pay: <strong className="text-white">{currency}{works.reduce((s, w) => s + (Number(w.payAmount) || 0), 0).toLocaleString()}</strong>
                  </span>
                  <button onClick={handleOpenNewWork} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Work & Pay</span>
                  </button>
                </div>
              </div>

              {/* ── Live Ratings from Firebase ── */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Client Ratings from Webpage</h3>
                      <p className="text-xs text-slate-400">
                        Live from Firestore <code className="text-amber-400 font-mono">reviews</code>
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('ratings')} className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1">
                    <span>View All Reviews ({reviews.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {reviews.length === 0 ? (
                  <div className="p-6 text-center bg-slate-950/40 rounded-xl border border-slate-800/60 text-xs text-slate-400">
                    No reviews yet. Reviews submitted on your portfolio page will appear here automatically.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.slice(0, 2).map((r) => (
                      <div key={r.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white text-xs">{r.name || r.clientName}</span>
                          <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{Number(r.rating || 5).toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 italic">"{r.text || r.reviewText}"</p>
                        <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                          <span className="text-cyan-400 uppercase font-semibold">{r.category || 'Client'}</span>
                          <span>{r.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PROJECTS & DETAILS ── */}
          {activeTab === 'projects' && (
            <ProjectsSection
              projects={projects}
              newProjects={newProjects}
              currency={currency}
              onOpenNewProject={handleOpenNewProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onAcceptNewProject={handleAcceptNewProject}
              onRejectNewProject={handleRejectNewProject}
              onReviewNewProject={handleReviewNewProject}
              onDeleteNewProject={handleDeleteNewProjectReq}
              searchTerm={searchTerm}
            />
          )}

          {/* ── WORKS & PAY ── */}
          {activeTab === 'works' && (
            <WorksSection
              works={works}
              currency={currency}
              onEditWork={handleEditWork}
              onDeleteWork={handleDeleteWork}
              onUpdatePayStatus={handleUpdatePayStatus}
              onOpenNewWork={handleOpenNewWork}
              searchTerm={searchTerm}
            />
          )}

          {/* ── TO-DO LISTS ── */}
          {activeTab === 'todos' && (
            <TodosSection
              todos={todos}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
              works={works}
              searchTerm={searchTerm}
            />
          )}

          {/* ── WEBPAGE RATINGS ── */}
          {activeTab === 'ratings' && (
            <RatingsSection
              reviews={reviews}
              onOpenAddRating={() => setIsRatingModalOpen(true)}
              onDeleteRating={handleDeleteRating}
              searchTerm={searchTerm}
            />
          )}

          {/* ── WEBPAGE INQUIRIES ── */}
          {activeTab === 'inquiries' && (
            <InquiriesSection
              inquiries={inquiries}
              onDeleteInquiry={handleDeleteInquiry}
              onUpdateStatus={handleUpdateInquiryStatus}
              onConvertToWork={handleConvertInquiryToWork}
              searchTerm={searchTerm}
            />
          )}

          {/* ── FINANCIALS & PAY ── */}
          {activeTab === 'pay' && (
            <PayDetailsView
              works={works}
              currency={currency}
              onUpdatePayStatus={handleUpdatePayStatus}
              onEditWork={handleEditWork}
            />
          )}
        </main>
      </div>

      {/* ── Modals ── */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
        currency={currency}
      />

      <WorkModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        onSave={handleSaveWork}
        workToEdit={workToEdit}
        currency={currency}
      />

      <AddRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onAddRating={handleAddRating}
      />
    </div>
  );
}
