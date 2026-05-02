"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Building2,
  User,
  Clock,
  Star,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Maximize2,
} from "lucide-react";
import { Project, getProjectById } from "@/lib/firebase-service";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await getProjectById(id);
      setProject(data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (!project?.images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % project.images!.length);
  };

  const prevImage = () => {
    if (!project?.images?.length) return;
    setActiveImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
  };

  const openLightbox = () => {
    if (images.length > 0) setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const images = project?.images?.length 
    ? project.images 
    : project?.image 
    ? [project.image] 
    : [];

  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <p className="text-white">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="w-full bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <Link
            href="/projects/website-development"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors transform -skew-x-12"
          >
            <span className="transform skew-x-12 inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </span>
          </Link>
          <div className="flex space-x-2 items-center">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors transform -skew-x-12"
            >
              <span className="transform skew-x-12 inline-block">Home</span>
            </Link>
            <Link
              href="/me/about"
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors transform -skew-x-12"
            >
              <span className="transform skew-x-12 inline-block">About</span>
            </Link>
            <Link
              href="/projects/website-development"
              className="px-4 py-2 text-sm font-bold bg-white text-black transform -skew-x-12"
            >
              <span className="transform skew-x-12 inline-block">Projects</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block px-3 py-1 text-xs font-medium border border-white/20 text-gray-300 transform -skew-x-12"
              >
                <span className="transform skew-x-12 inline-block">{tag}</span>
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            {project.shortDescription || project.description}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative aspect-video overflow-hidden border border-white/10"
              >
                <Image
                  src={images[activeImageIndex]}
                  alt={`${project.title} - Image ${activeImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-2 hover:bg-black/80 transition"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-2 hover:bg-black/80 transition"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </>
                )}
                <button
                  onClick={openLightbox}
                  className="absolute top-4 right-4 bg-black/60 p-2 hover:bg-black/80 transition"
                >
                  <Maximize2 className="h-5 w-5 text-white" />
                </button>
              </motion.div>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 flex-shrink-0 overflow-hidden border-2 transition ${
                      idx === activeImageIndex ? "border-white" : "border-white/20"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-6"
            >
              <h2 className="text-xl font-semibold mb-4">About This Project</h2>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {(project as any).fullDescription || project.description}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <Card className="bg-white/5 border-white/10 p-6 rounded-none">
              <h3 className="text-lg text-white font-semibold mb-4">Project Info</h3>
              <div className="space-y-4">
                {project.client && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Client</p>
                      <p className="text-white">{project.client}</p>
                    </div>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Role</p>
                      <p className="text-white">{project.role}</p>
                    </div>
                  </div>
                )}
                {project.develop && (
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Developer</p>
                      <p className="text-white">{project.develop}</p>
                    </div>
                  </div>
                )}
                {project.assign && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Assigned To</p>
                      <p className="text-white">{project.assign}</p>
                    </div>
                  </div>
                )}
                {(project.startDate || project.endDate) && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Timeline</p>
                      <p className="text-white">
                        {project.startDate} - {project.endDate || "Ongoing"}
                      </p>
                    </div>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white">{project.duration}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-6 bg-white/10" />

              {/* Links */}
              <div className="space-y-3">
                {project.links?.demo && project.links.demo !== "#" && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 transition"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-medium">View Live Site</span>
                  </a>
                )}
                {project.links?.github && project.links.github !== "#" && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white hover:bg-white/10 transition"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Source Code</span>
                  </a>
                )}
              </div>
            </Card>

            {/* Key Features */}
            {(project as any).features && ((project as any).features as string[]).length > 0 && (
              <Card className="bg-white/5 border-white/10 p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {((project as any).features as string[]).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-400">
                      <span className="text-white mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Technologies */}
            {(project as any).technologies && ((project as any).technologies as string[]).length > 0 && (
              <Card className="bg-white/5 border-white/10 p-6 rounded-none">
                <h3 className="text-lg font-semibold text-white mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {((project as any).technologies as string[]).map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Contributors */}
            {(project as any).contributors && ((project as any).contributors as any[]).length > 0 && (
              <Card className="bg-white/5 border-white/10 p-6 rounded-none">
                <h3 className="text-lg font-semibold text-white mb-4">Contributors</h3>
                <div className="space-y-2">
                  {((project as any).contributors as any[]).map((contributor: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-white">{contributor.name}</span>
                      <span className="text-sm text-gray-400">{contributor.role}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 transition"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImageIndex]}
              alt={`${project.title} - Fullscreen`}
              fill
              className="object-contain"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2">
              <span className="text-white text-sm">
                {activeImageIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
