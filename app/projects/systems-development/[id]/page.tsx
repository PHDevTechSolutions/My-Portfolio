"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Youtube,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Maximize2,
  LayoutGrid,
  LayoutTemplate,
} from "lucide-react";
import { Project, getProjectById } from "@/lib/firebase-service";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"masonry" | "default">("masonry");

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

  // Compute images array early for useEffect dependency
  const images = project?.images?.length 
    ? project.images 
    : project?.image 
    ? [project.image] 
    : [];

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-4">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/projects/systems-development">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="w-full bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-white">
            Leroux Y Xchire
          </div>
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
              href="/projects/systems-development"
              className="px-4 py-2 text-sm font-bold bg-white text-black transform -skew-x-12"
            >
              <span className="transform skew-x-12 inline-block">Projects</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Link href="/projects/systems-development">
          <Button variant="ghost" className="gap-2 text-gray-400 hover:text-white hover:bg-white/5">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section with Masonry Images + Project Info Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Masonry Image Gallery */}
            <div className="space-y-4">
              {/* Layout Toggle */}
              <div className="flex justify-end gap-2 mb-2">
                <Button
                  variant={layoutMode === "masonry" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLayoutMode("masonry")}
                  className="gap-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Masonry
                </Button>
                <Button
                  variant={layoutMode === "default" ? "default" : "default"}
                  size="sm"
                  onClick={() => setLayoutMode("default")}
                  className="gap-2"
                >
                  <LayoutTemplate className="h-4 w-4" />
                  Default
                </Button>
              </div>

              {layoutMode === "masonry" && images.length > 0 ? (
                /* Masonry Grid Layout */
                <div className="columns-2 gap-3 space-y-3">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-none"
                      onClick={() => {
                        setActiveImageIndex(idx);
                        openLightbox();
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - ${idx + 1}`}
                        width={600}
                        height={idx % 3 === 0 ? 400 : idx % 3 === 1 ? 300 : 500}
                        className="w-full h-auto object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Default Layout (Single Image with Navigation) */
                <>
                  <Card className="relative aspect-video overflow-hidden group cursor-pointer" onClick={openLightbox}>
                    {images.length > 0 ? (
                      <>
                        <Image
                          src={images[activeImageIndex]}
                          alt={project.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="lg" className="gap-2">
                            <Maximize2 className="h-5 w-5" />
                            View Full
                          </Button>
                        </div>
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); prevImage(); }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-none transition"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); nextImage(); }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-none transition"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                              {activeImageIndex + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                  </Card>

                  {/* Thumbnail Grid for Default Mode */}
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-20 h-20 rounded-none overflow-hidden flex-shrink-0 border-2 transition ${
                            idx === activeImageIndex ? "border-primary" : "border-transparent"
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
                </>
              )}
            </div>

            {/* Right: Project Info */}
            <div className="space-y-6 lg:pl-4">
              <div>
                {/* Parallelogram Badges */}
                <div className="flex gap-3 mb-4">
                  <span
                    className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform -skew-x-12 ${
                      project.type === "system"
                        ? "bg-white text-black"
                        : project.type === "mobile"
                        ? "bg-red-500 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    <span className="transform skew-x-12 inline-block">
                      {project.type === "system"
                        ? "System"
                        : project.type === "mobile"
                        ? "Mobile"
                        : "Website"}
                    </span>
                  </span>
                  {project.status && (
                    <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform -skew-x-12 border border-white/30 text-white/80">
                      <span className="transform skew-x-12 inline-block">
                        {project.status}
                      </span>
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tight uppercase">{project.title}</h1>
                <p className="text-gray-400 text-md leading-relaxed">
                  {project.shortDescription || project.description}
                </p>
              </div>

              {/* Quick Info with Dark Cards */}
              <div className="grid grid-cols-2 gap-3">
                {project.client && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Client:</span>
                    <span className="font-medium text-white">{project.client}</span>
                  </div>
                )}
                {project.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Company:</span>
                    <span className="font-medium text-white">{project.company}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Role:</span>
                    <span className="font-medium text-white">{project.role}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-white">{project.duration}</span>
                  </div>
                )}
                {(project.startDate || project.endDate) && (
                  <div className="flex items-center gap-2 text-sm col-span-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Timeline:</span>
                    <span className="font-medium text-white">
                      {project.startDate && new Date(project.startDate).toLocaleDateString()}
                      {project.startDate && project.endDate && " - "}
                      {project.endDate && new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.links?.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 bg-white text-black hover:bg-gray-200">
                      <ExternalLink className="h-4 w-4" />
                      View Demo
                    </Button>
                  </a>
                )}
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 border-white/30 text-white hover:bg-white/10">
                      <Github className="h-4 w-4" />
                      View Code
                    </Button>
                  </a>
                )}
                {project.links?.caseStudy && (
                  <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                      <LinkIcon className="h-4 w-4" />
                      Case Study
                    </Button>
                  </a>
                )}
                {project.links?.video && (
                  <a href={project.links.video} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 border-red-500 text-red-500 hover:bg-red-500/10">
                      <Youtube className="h-4 w-4" />
                      Watch Video
                    </Button>
                  </a>
                )}
              </div>

              {/* Tags - Parallelogram Style */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 text-xs font-medium border border-white/20 text-gray-300 transform -skew-x-12"
                  >
                    <span className="transform skew-x-12 inline-block">{tag}</span>
                  </span>
                ))}
              </div>

              {/* Team Info - Parallelogram Style */}
              <div className="flex gap-2 flex-wrap">
                <span className="inline-block px-3 py-1.5 text-xs font-semibold bg-white text-black transform -skew-x-12">
                  <span className="transform skew-x-12 inline-block">
                    Dev: {project.develop}
                  </span>
                </span>
                <span className="inline-block px-3 py-1.5 text-xs font-semibold border border-white/30 text-white/80 transform -skew-x-12">
                  <span className="transform skew-x-12 inline-block">
                    Assign: {project.assign}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Detailed Info Tabs - Custom Dark Style */}
          <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Features' },
                ...(project.testimonial ? [{ id: 'testimonial', label: 'Testimonial' }] : []),
                { id: 'tech', label: 'Tech Stack' },
              ].map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    const el = document.getElementById(`tab-${tab.id}`);
                    if (el) {
                      document.querySelectorAll('.tab-content').forEach((c) => c.classList.add('hidden'));
                      el.classList.remove('hidden');
                      document.querySelectorAll('.tab-btn').forEach((b) => {
                        b.classList.remove('bg-white', 'text-black');
                        b.classList.add('bg-white/10', 'text-white/70');
                      });
                      document.getElementById(`btn-${tab.id}`)?.classList.remove('bg-white/10', 'text-white/70');
                      document.getElementById(`btn-${tab.id}`)?.classList.add('bg-white', 'text-black');
                    }
                  }}
                  id={`btn-${tab.id}`}
                  className={`tab-btn px-5 py-2.5 text-xs font-bold uppercase tracking-wider transform -skew-x-12 transition-all ${
                    idx === 0 
                      ? 'bg-white text-black' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span className="transform skew-x-12 inline-block">{tab.label}</span>
                </button>
              ))}
            </div>

            <div id="tab-overview" className="tab-content">
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-none p-6">
                  <h3 className="text-md font-semibold mb-4 text-white">Project Description</h3>
                  <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {project.description}
                  </p>
                </div>

              {(project.challenges || project.results) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.challenges && (
                    <div className="bg-white/5 border border-white/10 rounded-none p-6">
                      <h3 className="text-md font-semibold mb-4 text-white">Challenges & Solutions</h3>
                      <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}
                  {project.results && (
                    <div className="bg-white/5 border border-white/10 rounded-none p-6">
                      <h3 className="text-md font-semibold mb-4 text-white">Results & Impact</h3>
                      <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                        {project.results}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Contributors Section */}
              {project.contributors && project.contributors.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-none p-6">
                  <h3 className="text-md font-semibold mb-4 text-white">Contributors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.contributors.map((contributor, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 border border-white/10 rounded-sm bg-white/5"
                      >
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
                          {contributor.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{contributor.name}</p>
                          <p className="text-xs text-gray-400">{contributor.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </div>

            <div id="tab-features" className="tab-content hidden">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-md font-semibold mb-4 text-white">Key Features</h3>
                {project.keyFeatures && project.keyFeatures.length > 0 ? (
                  <ul className="space-y-3">
                    {project.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No features listed for this project.</p>
                )}
              </div>
            </div>

            {project.testimonial && (
              <div id="tab-testimonial" className="tab-content hidden">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-md font-semibold mb-4 text-white">Client Testimonial</h3>
                  <blockquote className="border-l-4 border-white/50 pl-4 italic text-lg text-gray-300 mb-4">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-2 text-white">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{project.testimonial.author}</span>
                    {project.testimonial.role && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{project.testimonial.role}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div id="tab-tech" className="tab-content hidden">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-md font-semibold mb-4 text-white">Technologies Used</h3>
                {project.technologies && project.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 text-sm bg-white/10 text-white/90 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No technologies listed for this project.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Main Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
            <Image
              src={images[activeImageIndex]}
              alt={project.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Press ESC to close • Use arrow keys to navigate
          </div>
        </div>
      )}
    </div>
  );
}
