"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Plus,
  Loader2,
  X,
  ExternalLink,
  Github,
  Link as LinkIcon,
  Youtube,
  Upload,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  ProjectType,
  ProjectStatus,
  createProject,
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

const initialFormData: ProjectFormData = {
  title: "",
  description: "",
  shortDescription: "",
  tags: "",
  images: [],
  type: "system",
  status: "completed",
  develop: "",
  assign: "",
  role: "",
  client: "",
  company: "",
  startDate: "",
  endDate: "",
  duration: "",
  technologies: "",
  keyFeatures: "",
  challenges: "",
  results: "",
  testimonialQuote: "",
  testimonialAuthor: "",
  testimonialRole: "",
  demoLink: "",
  githubLink: "",
  caseStudyLink: "",
  videoLink: "",
  contributors: [],
};

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Handle multiple image selection
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove image from preview
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload all images to Cloudinary
  const uploadAllImages = async (projectId: string): Promise<string[]> => {
    if (imageFiles.length === 0) return formData.images.filter(img => img.startsWith('http'));
    
    setUploadingImages(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const url = await uploadProjectImageToCloudinary(
          imageFiles[i], 
          `${projectId}/${i}`
        );
        uploadedUrls.push(url);
      }
      return [...formData.images.filter(img => img.startsWith('http')), ...uploadedUrls];
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const projectData: any = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        tags: tagsArray,
        images: [],
        image: "",
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
        ...(formData.contributors.length > 0 && {
          contributors: formData.contributors.filter(c => c.name.trim() !== ""),
        }),
      };

      if (formData.testimonialQuote) {
        projectData.testimonial = {
          quote: formData.testimonialQuote,
          author: formData.testimonialAuthor,
          role: formData.testimonialRole,
        };
      }

      const newProject = await createProject(projectData);

      if (newProject.id) {
        const allImages = await uploadAllImages(newProject.id);
        
        if (allImages.length > 0) {
          await updateProject(newProject.id, { 
            images: allImages,
            image: allImages[0],
          });
        }
      }

      toast.success("Project created successfully!");
      router.push("/admin/projects");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to save project";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="text-2xl font-bold">Create New Project</h1>
              <p className="text-sm text-muted-foreground">
                Add a new project to your portfolio
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
              Save Project
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
                    {/* Left Column */}
                    <motion.div variants={itemVariants} className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Project Title *</label>
                            <Input
                              placeholder="e.g., E-Commerce Platform"
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
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
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
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
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
                              placeholder="Brief summary for cards"
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
                              placeholder="Detailed project description..."
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
                            placeholder="e.g., 3 months"
                            value={formData.duration}
                            onChange={(e) =>
                              setFormData({ ...formData, duration: e.target.value })
                            }
                          />
                        </div>
                      </Card>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div variants={itemVariants} className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Team & Client</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Your Role</label>
                            <Input
                              placeholder="e.g., Lead Developer"
                              value={formData.role}
                              onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Client</label>
                            <Input
                              placeholder="Client name"
                              value={formData.client}
                              onChange={(e) =>
                                setFormData({ ...formData, client: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input
                              placeholder="Company name"
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
                              placeholder="Developer name"
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
                              placeholder="Assigned person"
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
                            <label className="text-sm font-medium">Tags * (comma-separated)</label>
                            <Input
                              placeholder="React, Node.js, Firebase..."
                              value={formData.tags}
                              onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Technologies (comma-separated)</label>
                            <Input
                              placeholder="React, Next.js, Tailwind CSS..."
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
                        <p className="text-sm text-muted-foreground">
                          Select multiple images. First image will be the main thumbnail.
                        </p>

                        {formData.images.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-3">
                              Image Preview ({formData.images.length} images)
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

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">One feature per line</label>
                          <Textarea
                            placeholder="User authentication system&#10;Payment integration&#10;Real-time notifications..."
                            value={formData.keyFeatures}
                            onChange={(e) =>
                              setFormData({ ...formData, keyFeatures: e.target.value })
                            }
                            rows={8}
                          />
                        </div>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Challenges & Solutions</h3>
                        <Textarea
                          placeholder="Describe challenges faced and how you solved them..."
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
                          placeholder="Describe the results, metrics, or impact..."
                          value={formData.results}
                          onChange={(e) =>
                            setFormData({ ...formData, results: e.target.value })
                          }
                          rows={6}
                        />
                      </Card>
                    </motion.div>
                  </div>

                  {/* Contributors Section */}
                  <motion.div variants={itemVariants}>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Contributors</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              contributors: [
                                ...formData.contributors,
                                { name: "", role: "" },
                              ],
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Contributor
                        </Button>
                      </div>

                      {formData.contributors.length === 0 ? (
                        <p className="text-muted-foreground text-sm">
                          No contributors added yet.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {formData.contributors.map((contributor, index) => (
                            <div
                              key={index}
                              className="flex gap-4 items-start p-4 border rounded-lg"
                            >
                              <div className="flex-1 grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Name</label>
                                  <Input
                                    placeholder="e.g., John Doe"
                                    value={contributor.name}
                                    onChange={(e) => {
                                      const newContributors = [...formData.contributors];
                                      newContributors[index].name = e.target.value;
                                      setFormData({ ...formData, contributors: newContributors });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Role</label>
                                  <Input
                                    placeholder="e.g., Frontend Developer"
                                    value={contributor.role}
                                    onChange={(e) => {
                                      const newContributors = [...formData.contributors];
                                      newContributors[index].role = e.target.value;
                                      setFormData({ ...formData, contributors: newContributors });
                                    }}
                                  />
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newContributors = formData.contributors.filter((_, i) => i !== index);
                                  setFormData({ ...formData, contributors: newContributors });
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Testimonial Tab */}
                <TabsContent value="testimonial" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="p-6 max-w-2xl">
                      <h3 className="text-lg font-semibold mb-4">Client Testimonial</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Testimonial Quote</label>
                          <Textarea
                            placeholder="What the client said about your work..."
                            value={formData.testimonialQuote}
                            onChange={(e) =>
                              setFormData({ ...formData, testimonialQuote: e.target.value })
                            }
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Author Name</label>
                            <Input
                              placeholder="e.g., John Smith"
                              value={formData.testimonialAuthor}
                              onChange={(e) =>
                                setFormData({ ...formData, testimonialAuthor: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Author Role</label>
                            <Input
                              placeholder="e.g., CEO, Tech Corp"
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

                {/* Links Tab */}
                <TabsContent value="links" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Demo Link
                          </label>
                          <Input
                            placeholder="https://demo.example.com"
                            value={formData.demoLink}
                            onChange={(e) =>
                              setFormData({ ...formData, demoLink: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            GitHub Link
                          </label>
                          <Input
                            placeholder="https://github.com/..."
                            value={formData.githubLink}
                            onChange={(e) =>
                              setFormData({ ...formData, githubLink: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Case Study Link
                          </label>
                          <Input
                            placeholder="https://..."
                            value={formData.caseStudyLink}
                            onChange={(e) =>
                              setFormData({ ...formData, caseStudyLink: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Youtube className="h-4 w-4" />
                            Video Demo Link
                          </label>
                          <Input
                            placeholder="https://youtube.com/..."
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
