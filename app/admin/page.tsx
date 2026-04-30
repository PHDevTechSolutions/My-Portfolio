"use client";

import React, { useState, useEffect, useCallback } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  type ProjectData,
  type ProjectCategory,
} from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, X } from "lucide-react";

interface ProjectFormData {
  title: string;
  description: string;
  tags: string;
  image: string;
  develop: string;
  assign: string;
  demoUrl: string;
  githubUrl: string;
}

const emptyForm: ProjectFormData = {
  title: "",
  description: "",
  tags: "",
  image: "",
  develop: "",
  assign: "",
  demoUrl: "",
  githubUrl: "",
};

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      toast.success("Logged in successfully");
      onLogin();
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage projects</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function ProjectForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  isEditing,
  loading,
}: {
  form: ProjectFormData;
  setForm: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
  loading: boolean;
}) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{isEditing ? "Edit Project" : "Add New Project"}</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Project Title" />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} placeholder="/projects/example.png" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Project description..." rows={3} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Tags (comma separated)</Label>
          <Input value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="React, Next.js, TailwindCSS" />
        </div>
        <div className="space-y-2">
          <Label>Developed By</Label>
          <Input value={form.develop} onChange={(e) => setForm((p) => ({ ...p, develop: e.target.value }))} placeholder="Developer name" />
        </div>
        <div className="space-y-2">
          <Label>Assigned To</Label>
          <Input value={form.assign} onChange={(e) => setForm((p) => ({ ...p, assign: e.target.value }))} placeholder="Assignee name" />
        </div>
        <div className="space-y-2">
          <Label>Demo URL</Label>
          <Input value={form.demoUrl} onChange={(e) => setForm((p) => ({ ...p, demoUrl: e.target.value }))} placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label>GitHub URL</Label>
          <Input value={form.githubUrl} onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update Project" : "Add Project"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
}

function ProjectManager({ category, label }: { category: ProjectCategory; label: string }) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormData>(emptyForm);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects(category);
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (project: ProjectData) => {
    setEditingId(project.id ?? null);
    setForm({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      image: project.image,
      develop: project.develop,
      assign: project.assign,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(category, id);
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: form.image.trim(),
      develop: form.develop.trim(),
      assign: form.assign.trim(),
      demoUrl: form.demoUrl.trim(),
      githubUrl: form.githubUrl.trim(),
    };
    try {
      if (editingId) {
        await updateProject(category, editingId, projectData);
        toast.success("Project updated");
      } else {
        await addProject(category, projectData);
        toast.success("Project added");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchProjects();
    } catch {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{label}</h2>
        <Button onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setForm(emptyForm);
            setEditingId(null);
          }}
          isEditing={!!editingId}
          loading={saving}
        />
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      ) : projects.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No projects yet. Click &quot;Add Project&quot; to create one.
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge className="text-xs">Dev: {project.develop}</Badge>
                    <Badge variant="outline" className="text-xs">Assign: {project.assign}</Badge>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id!)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<ProjectCategory>("systemsDevelopment");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (u) => {
      setUser(u);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={() => {}} />;
  }

  const handleLogout = async () => {
    await signOut(getFirebaseAuth());
    toast.success("Logged out");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-card/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">Project Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "systemsDevelopment" ? "default" : "outline"}
            onClick={() => setActiveTab("systemsDevelopment")}
          >
            Systems Development
          </Button>
          <Button
            variant={activeTab === "websiteDevelopment" ? "default" : "outline"}
            onClick={() => setActiveTab("websiteDevelopment")}
          >
            Website Development
          </Button>
        </div>

        {activeTab === "systemsDevelopment" && (
          <ProjectManager category="systemsDevelopment" label="Systems Development Projects" />
        )}
        {activeTab === "websiteDevelopment" && (
          <ProjectManager category="websiteDevelopment" label="Website Development Projects" />
        )}
      </div>
    </div>
  );
}
