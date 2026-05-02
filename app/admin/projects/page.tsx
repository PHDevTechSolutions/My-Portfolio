"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Project,
  getAllProjects,
  deleteProject,
} from "@/lib/firebase-service";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProjects();
      setProjects(data);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to fetch projects";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground">
              Manage your system and website development projects
            </p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-destructive/50 bg-destructive/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">Error Loading Projects</h3>
                <p className="text-sm text-destructive/80">{error}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={fetchProjects} variant="outline">
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="group overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    {(project.images?.length || project.image) ? (
                      <>
                        <Image
                          src={project.images?.[0] || project.image || ""}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {(project.images?.length || 0) > 1 && (
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            +{(project.images?.length || 1) - 1} more
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 mb-2">
                        <Badge
                          variant={
                            project.type === "system"
                              ? "default"
                              : project.type === "mobile"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {project.type === "system"
                            ? "System"
                            : project.type === "mobile"
                            ? "Mobile"
                            : "Website"}
                        </Badge>
                        {project.status && (
                          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                            {project.status}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      {project.client && (
                        <p className="text-sm text-white/80">{project.client}</p>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {project.shortDescription || project.description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.links?.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/admin/projects/edit/${project.id}`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => project.id && handleDelete(project.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && projects.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No projects yet. Create your first project!
            </p>
            <Link href="/admin/projects/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
