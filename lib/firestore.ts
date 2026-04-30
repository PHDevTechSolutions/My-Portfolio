import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";

export interface ProjectData {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  develop: string;
  assign: string;
  demoUrl: string;
  githubUrl: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

const COLLECTIONS = {
  systemsDevelopment: "systems-development",
  websiteDevelopment: "website-development",
} as const;

export type ProjectCategory = keyof typeof COLLECTIONS;

export async function getProjects(category: ProjectCategory): Promise<ProjectData[]> {
  const db = getFirebaseDb();
  const colRef = collection(db, COLLECTIONS[category]);
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as ProjectData[];
}

export async function addProject(
  category: ProjectCategory,
  data: Omit<ProjectData, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const db = getFirebaseDb();
  const colRef = collection(db, COLLECTIONS[category]);
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(
  category: ProjectCategory,
  id: string,
  data: Partial<Omit<ProjectData, "id" | "createdAt">>
): Promise<void> {
  const db = getFirebaseDb();
  const docRef = doc(db, COLLECTIONS[category], id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(
  category: ProjectCategory,
  id: string
): Promise<void> {
  const db = getFirebaseDb();
  const docRef = doc(db, COLLECTIONS[category], id);
  await deleteDoc(docRef);
}

export { COLLECTIONS };
