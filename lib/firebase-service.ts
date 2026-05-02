import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  FirestoreError,
} from "firebase/firestore";
import { db } from "./firebase";

// Helper function to handle Firestore errors
function handleFirestoreError(error: any, operation: string): never {
  if (error instanceof FirestoreError || error.code) {
    switch (error.code) {
      case "permission-denied":
        throw new Error(
          `Firebase permission denied during ${operation}. Please check your Firestore rules and ensure you're authenticated.`
        );
      case "unauthenticated":
        throw new Error(
          `Authentication required for ${operation}. Please sign in.`
        );
      case "not-found":
        throw new Error(
          `Resource not found during ${operation}.`
        );
      default:
        throw new Error(`Firebase error during ${operation}: ${error.message || error.code}`);
    }
  }
  throw error;
}

export type ProjectType = "system" | "website" | "mobile";
export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
  id?: string;
  title: string;
  description: string;
  shortDescription?: string;
  tags: string[];
  images?: string[];
  image?: string; // legacy support
  develop: string;
  assign: string;
  type: ProjectType;
  status?: ProjectStatus;
  role?: string;
  client?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  technologies?: string[];
  keyFeatures?: string[];
  challenges?: string;
  results?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
    video?: string;
  };
  contributors?: {
    name: string;
    role: string;
    avatar?: string;
  }[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const PROJECTS_COLLECTION = "projects";

// Create a new project
export async function createProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<Project> {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...project,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      ...project,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    handleFirestoreError(error, "createProject");
  }
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    handleFirestoreError(error, "getAllProjects");
  }
}

// Get projects by type
export async function getProjectsByType(type: ProjectType): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.type === type);
}

// Get a single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, "getProjectById");
  }
}

// Update a project
export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id" | "createdAt">>
): Promise<void> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    handleFirestoreError(error, "updateProject");
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, "deleteProject");
  }
}

// Note: Image uploads now use Cloudinary instead of Firebase Storage
// See lib/cloudinary.ts for upload functions
