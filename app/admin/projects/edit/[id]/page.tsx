"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Loader2,
  X,
  ExternalLink,
  Github,
  Link as LinkIcon,
  Youtube,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Project,
  ProjectType,
  ProjectStatus,
  getProjectById,
  updateProject,
} from "@/lib/firebase-service";
import { uploadProjectImageToCloudinary } from "@/lib/cloudinary";

interface ProjectFormData {
  title: string;
  description: string;
  shortDescription: string;
  tags: string;
  images: string[];
  type: ProjectType;
  status: ProjectStatus;
  develop: string;
  assign: string;
  role: string;
  client: string;
  company: string;
  startDate: string;
  endDate: string;
  duration: string;
  technologies: string;
  keyFeatures: string;
  challenges: string;
  results: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  demoLink: string;
  githubLink: string;
  caseStudyLink: string;
  videoLink: string;
  contributors: { name: string; role: string; avatar?: string }[];
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const data = await getProjectById(projectId);
      if (data) {
        setProject(data);
        setFormData({
          title: data.title,
          description: data.description,
          shortDescription: data.shortDescription || "",
          tags: data.tags.join(", "),
          images: data.images || (data.image ? [data.image] : []),
          type: data.type,
          status: data.status || "completed",
          develop: data.develop,
          assign: data.assign,
          role: data.role || "",
          client: data.client || "",
          company: data.company || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          duration: data.duration || "",
          technologies: data.technologies?.join(", ") || "",
          keyFeatures: data.keyFeatures?.join("\n") || "",
          challenges: data.challenges || "",
          results: data.results || "",
          testimonialQuote: data.testimonial?.quote || "",
          testimonialAuthor: data.testimonial?.author || "",
          testimonialRole: data.testimonial?.role || "",
          demoLink: data.links?.demo || "",
          githubLink: data.links?.github || "",
          caseStudyLink: data.links?.caseStudy || "",
          videoLink: data.links?.video || "",
          contributors: data.contributors || [],
        });
      }
    } catch (error) {
      toast.error("Failed to load project");
      router.push("/admin/projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              images: [...prev.images, reader.result as string],
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAllImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return formData?.images.filter(img => img.startsWith('http')) || [];
    
    setUploadingImages(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const url = await uploadProjectImageToCloudinary(
          imageFiles[i], 
          `${projectId}/${Date.now()}_${i}`
        );
        uploadedUrls.push(url);
      }
      const existingUrls = formData?.images.filter(img => img.startsWith('http')) || [];
      return [...existingUrls, ...uploadedUrls];
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      
      const techArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);
      
      const featuresArray = formData.keyFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const allImages = await uploadAllImages();

      const projectData: any = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        tags: tagsArray,
        images: allImages,
        image: allImages[0] || "",
        type: formData.type,
        status: formData.status,
        develop: formData.develop,
        assign: formData.assign,
        role: formData.role,
        client: formData.client,
        company: formData.company,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: formData.duration,
        technologies: techArray,
        keyFeatures: featuresArray,
        challenges: formData.challenges,
        results: formData.results,
        links: {
          ...(formData.demoLink && { demo: formData.demoLink }),
          ...(formData.githubLink && { github: formData.githubLink }),
          ...(formData.caseStudyLink && { caseStudy: formData.caseStudyLink }),
          ...(formData.videoLink && { video: formData.videoLink }),
        },
      };

      if (formData.testimonialQuote) {
        projectData.testimonial = {
          quote: formData.testimonialQuote,
          author: formData.testimonialAuthor,
          role: formData.testimonialRole,
        };
      }

      await updateProject(projectId, projectData);
      toast.success("Project updated successfully!");
      router.push("/admin/projects");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update project";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/admin/projects")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Project</h1>
              <p className="text-sm text-muted-foreground">
                {formData.title}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/projects")}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || uploadingImages}
              className="gap-2"
            >
              {(isSubmitting || uploadingImages) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-7xl">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Project Title *</label>
                            <Input
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Type</label>
                              <Select
                                value={formData.type}
                                onValueChange={(value: ProjectType) =>
                                  setFormData({ ...formData, type: value })
                                }
                              >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="system">System</SelectItem>
                                  <SelectItem value="website">Website</SelectItem>
                                  <SelectItem value="mobile">Mobile</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Status</label>
                              <Select
                                value={formData.status}
                                onValueChange={(value: ProjectStatus) =>
                                  setFormData({ ...formData, status: value })
                                }
                              >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="planned">Planned</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Short Description *</label>
                            <Input
                              value={formData.shortDescription}
                              onChange={(e) =>
                                setFormData({ ...formData, shortDescription: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Full Description *</label>
                            <Textarea
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                              required
                              rows={6}
                            />
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                              type="date"
                              value={formData.startDate}
                              onChange={(e) =>
                                setFormData({ ...formData, startDate: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                              type="date"
                              value={formData.endDate}
                              onChange={(e) =>
                                setFormData({ ...formData, endDate: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">Duration</label>
                          <Input
                            value={formData.duration}
                            onChange={(e) =>
                              setFormData({ ...formData, duration: e.target.value })
                            }
                          />
                        </div>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Team & Client</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Your Role</label>
                            <Input
                              value={formData.role}
                              onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Client</label>
                            <Input
                              value={formData.client}
                              onChange={(e) =>
                                setFormData({ ...formData, client: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input
                              value={formData.company}
                              onChange={(e) =>
                                setFormData({ ...formData, company: e.target.value })
                              }
                            />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Developed By *</label>
                            <Input
                              value={formData.develop}
                              onChange={(e) =>
                                setFormData({ ...formData, develop: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Assigned To *</label>
                            <Input
                              value={formData.assign}
                              onChange={(e) =>
                                setFormData({ ...formData, assign: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Tags & Technologies</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Tags *</label>
                            <Input
                              value={formData.tags}
                              onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Technologies</label>
                            <Input
                              value={formData.technologies}
                              onChange={(e) =>
                                setFormData({ ...formData, technologies: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Project Images</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4 items-center">
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImagesChange}
                              className="cursor-pointer"
                            />
                          </div>
                          {(uploadingImages || isSubmitting) && (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          )}
                        </div>

                        {formData.images.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-3">
                              Images ({formData.images.length})
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                              {formData.images.map((img, index) => (
                                <div
                                  key={index}
                                  className="relative aspect-square rounded-lg overflow-hidden border group"
                                >
                                  <Image
                                    src={img}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                      Main
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Details, Testimonial, Links tabs similar to new page */}
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <Textarea
                          value={formData.keyFeatures}
                          onChange={(e) =>
                            setFormData({ ...formData, keyFeatures: e.target.value })
                          }
                          rows={8}
                        />
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Challenges & Solutions</h3>
                        <Textarea
                          value={formData.challenges}
                          onChange={(e) =>
                            setFormData({ ...formData, challenges: e.target.value })
                          }
                          rows={6}
                        />
                      </Card>
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Results & Impact</h3>
                        <Textarea
                          value={formData.results}
                          onChange={(e) =>
                            setFormData({ ...formData, results: e.target.value })
                          }
                          rows={6}
                        />
                      </Card>
                    </motion.div>
                  </div>
                </TabsContent>

                <TabsContent value="testimonial" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="p-6 max-w-2xl">
                      <h3 className="text-lg font-semibold mb-4">Client Testimonial</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Quote</label>
                          <Textarea
                            value={formData.testimonialQuote}
                            onChange={(e) =>
                              setFormData({ ...formData, testimonialQuote: e.target.value })
                            }
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Author</label>
                            <Input
                              value={formData.testimonialAuthor}
                              onChange={(e) =>
                                setFormData({ ...formData, testimonialAuthor: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <Input
                              value={formData.testimonialRole}
                              onChange={(e) =>
                                setFormData({ ...formData, testimonialRole: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="links" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" /> Demo
                          </label>
                          <Input
                            value={formData.demoLink}
                            onChange={(e) =>
                              setFormData({ ...formData, demoLink: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Github className="h-4 w-4" /> GitHub
                          </label>
                          <Input
                            value={formData.githubLink}
                            onChange={(e) =>
                              setFormData({ ...formData, githubLink: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" /> Case Study
                          </label>
                          <Input
                            value={formData.caseStudyLink}
                            onChange={(e) =>
                              setFormData({ ...formData, caseStudyLink: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Youtube className="h-4 w-4" /> Video
                          </label>
                          <Input
                            value={formData.videoLink}
                            onChange={(e) =>
                              setFormData({ ...formData, videoLink: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </form>
        </div>
      </main>
    </div>
  );
}
