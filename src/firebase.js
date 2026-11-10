import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  setDoc
} from "firebase/firestore";

// User's provided Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCp55D8KuEQms3cHAJdCQSiT4X49UWsQeM",
  authDomain: "portfilo-3e0b6.firebaseapp.com",
  projectId: "portfilo-3e0b6",
  storageBucket: "portfilo-3e0b6.firebasestorage.app",
  messagingSenderId: "256224029357",
  appId: "1:256224029357:web:2bdc9d36355a2d7e3d7424",
  measurementId: "G-LDMH15BDHD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    // Ignore analytics error in local dev
  }
}
export { analytics };

// Initialize Firestore
export const db = getFirestore(app);

// Firestore Collections matching portfilo-3e0b6 database
export const projectsCol = collection(db, "projects");
export const newProjectsCol = collection(db, "new_projects"); // Incoming requests from portfolio
export const worksCol = collection(db, "works");
export const todosCol = collection(db, "todos");
export const ratingsCol = collection(db, "ratings");
export const reviewsCol = ratingsCol; // Live ratings collection in portfilo-3e0b6
export const inquiriesCol = collection(db, "inquiries");
export const portfolioInfoDoc = doc(db, "portfolio_data", "info");

// --- PROJECTS (Projects Collection from Firebase) ---
export const addProject = async (projectData) => {
  const docRef = doc(projectsCol);
  const data = {
    id: docRef.id,
    title: projectData.title || projectData.name || "Untitled Project",
    category: projectData.category || "Video Editing",
    client: projectData.client || "",
    description: projectData.description || "",
    budget: Number(projectData.budget) || (parseFloat(String(projectData.budget).replace(/[^0-9.]/g, '')) || 0),
    currency: projectData.currency || "₹",
    payStatus: projectData.payStatus || "pending",
    status: projectData.status || "in_progress",
    videoUrl: projectData.videoUrl || "",
    thumbnailUrl: projectData.thumbnailUrl || "",
    deadline: projectData.deadline || "",
    deliverables: projectData.deliverables || "",
    featured: Boolean(projectData.featured),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, data);
  return docRef.id;
};

export const updateProject = async (id, updatedData) => {
  const docRef = doc(db, "projects", id);
  const data = { ...updatedData, updatedAt: serverTimestamp() };
  if (data.budget !== undefined) {
    data.budget = Number(data.budget) || (parseFloat(String(data.budget).replace(/[^0-9.]/g, '')) || 0);
  }
  return await updateDoc(docRef, data);
};

export const deleteProject = async (id) => {
  return await deleteDoc(doc(db, "projects", id));
};

// --- WORKS (Works & Pay Details) ---
export const addWork = async (workData) => {
  const docRef = doc(worksCol);
  const data = {
    id: docRef.id,
    title: workData.title || workData.name || "Untitled Work",
    client: workData.client || "",
    category: workData.category || "Video Editing",
    description: workData.description || workData.desc || "",
    payAmount: Number(workData.payAmount) || (parseFloat(String(workData.amount).replace(/[^0-9.]/g, '')) || 0),
    currency: workData.currency || "₹",
    payStatus: workData.payStatus || "pending",
    status: workData.status || "pending",
    hourlyRate: Number(workData.hourlyRate) || 0,
    hoursWorked: Number(workData.hoursWorked) || 0,
    time: workData.time || workData.deadline || "",
    deadline: workData.deadline || workData.time || "",
    webpageUrl: workData.webpageUrl || "https://portfilo-3e0b6.firebaseapp.com",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, data);
  return docRef.id;
};

export const updateWork = async (id, updatedData) => {
  const docRef = doc(db, "works", id);
  const data = { ...updatedData, updatedAt: serverTimestamp() };
  if (data.payAmount !== undefined) {
    data.payAmount = Number(data.payAmount) || (parseFloat(String(data.amount).replace(/[^0-9.]/g, '')) || 0);
  }
  return await updateDoc(docRef, data);
};

export const deleteWork = async (id) => {
  return await deleteDoc(doc(db, "works", id));
};

// --- TODOS (Task Lists) ---
export const addTodo = async (todoData) => {
  const docRef = doc(todosCol);
  const data = {
    id: docRef.id,
    title: todoData.title || "Untitled Task",
    description: todoData.description || "",
    completed: false,
    priority: todoData.priority || "medium",
    category: todoData.category || "Work",
    dueDate: todoData.dueDate || "",
    createdAt: serverTimestamp()
  };
  await setDoc(docRef, data);
  return docRef.id;
};

export const toggleTodo = async (id, currentStatus) => {
  const docRef = doc(db, "todos", id);
  return await updateDoc(docRef, {
    completed: !currentStatus,
    completedAt: !currentStatus ? serverTimestamp() : null
  });
};

export const deleteTodo = async (id) => {
  return await deleteDoc(doc(db, "todos", id));
};

// --- REVIEWS / RATINGS (From Webpage) ---
export const addReview = async (reviewData) => {
  const docRef = doc(ratingsCol);
  const data = {
    id: docRef.id,
    name: reviewData.name || reviewData.clientName || "Anonymous",
    feedback: reviewData.feedback || reviewData.text || reviewData.reviewText || "",
    text: reviewData.text || reviewData.feedback || reviewData.reviewText || "",
    rating: Number(reviewData.rating) || 5,
    category: reviewData.category || "editor",
    role: reviewData.role || "Verified Client",
    company: reviewData.company || "",
    date: reviewData.date || new Date().toISOString().split('T')[0],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, data);
  return docRef.id;
};

export const deleteReview = async (id) => {
  return await deleteDoc(doc(db, "ratings", id));
};

export const addRating = addReview;
export const deleteRating = deleteReview;

// --- INQUIRIES (Incoming client requests from webpage contact form) ---
export const deleteInquiry = async (id) => {
  return await deleteDoc(doc(db, "inquiries", id));
};

export const updateInquiryStatus = async (id, status) => {
  return await updateDoc(doc(db, "inquiries", id), {
    status,
    updatedAt: serverTimestamp()
  });
};

// --- NEW PROJECTS (Incoming project requests from portfolio form) ---
export const updateNewProjectStatus = async (id, status) => {
  return await updateDoc(doc(db, "new_projects", id), {
    status,
    updatedAt: serverTimestamp()
  });
};

export const deleteNewProject = async (id) => {
  return await deleteDoc(doc(db, "new_projects", id));
};
