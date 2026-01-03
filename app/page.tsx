"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Code,
  Search,
  Smartphone,
  BarChart3,
  Palette,
  Rocket,
  Settings,
  Shield,
  Zap,
  ArrowUp,
  Facebook,
  MapPin,
  Phone,
  Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const socialLinks = [
  { icon: Github, href: "https://github.com/PHDevTechSolutions/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/liesther-roluna-378a522b5/", label: "LinkedIn" }
];

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Build modern, responsive websites with cutting-edge technologies and best practices.",
    features: ["React & Next.js", "TypeScript", "Wordpress", "Shopify", "Performance Optimized"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Create beautiful, intuitive interfaces that users love and convert.",
    features: ["User Research", "Wireframing", "Prototyping"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    features: ["Flutter", "Cross-Platform", "Performance Focused", "UI/UX Friendly"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Improve your search engine rankings and drive organic traffic.",
    features: ["Ranking Improvement", "Yoast SEO", "Indexing", "Backlinks", "Technical SEO"],
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Optimize your applications for speed, reliability, and scalability.",
    features: ["Code Splitting", "Caching", "CDN Integration"],
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Enterprise-grade security solutions to protect your data and users.",
    features: ["GitHub Security", "Vercel Deployment", "Access Control", "Data Protection", "CPanal", "Cloudflare", "WHM"],
  },
  {
    icon: Rocket,
    title: "System Development and Integration",
    description:
      "Designing and integrating complex systems that streamline business processes.",
    features: [
      "CRM Systems",
      "Inventory Management",
      "Ticketing Solutions",
      "Booking Platforms",
      "Workflow Automation",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Track, measure, and analyze your application performance metrics.",
    features: ["Custom Dashboards (ShadCN Recharts)", "Real-time Data", "Reports"],
  },
  {
    icon: Settings,
    title: "API Integration",
    description:
      "Connect with any third-party service through our flexible API.",
    features: ["RESTful APIs", "Webhooks", "Documentation"],
  },
];

const footerLinks = [
  {
    title: "Works",
    links: [
      { label: "Flow and Diagrams", href: "/works/flow-and-diagrams" },
      { label: "Methodology", href: "/works/methodology" },
    ],
  },
  {
    title: "Me",
    links: [
      { label: "Main", href: "/" },
      { label: "About Me", href: "/me/about" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Systems Development", href: "/projects/systems-development" },
      { label: "Website Development", href: "/projects/website-development" },
      { label: "Sideline Projects", href: "/projects/sideline-projects" },
    ],
  },
];

const socialLinksFooter = [
  { icon: Facebook, label: "Facebook", href: "#" },
];

const features = [
  {
    image: "/icons/next-js.png",

  },
  {
    image: "/icons/type-script.png",

  },
  {
    image: "/icons/react.webp",
  },
  {
    image: "/icons/shadcn.webp",
  },
  {
    image: "/icons/vercel.svg",
  },
  {
    image: "/icons/boostrap5.webp",
  },
  {
    image: "/icons/php.png",
  },
  {
    image: "/icons/mysql.jpg",
  },
  {
    image: "/icons/bulma.svg",
  },
  {
    image: "/icons/mongodb.png",
  },
  {
    image: "/icons/neon.png",
  },
  {
    image: "/icons/supabase.png",
  },
  {
    image: "/icons/firebase.png",
  },
  {
    image: "/icons/upstash.png",
  },
  {
    image: "/icons/flutter-mobile.webp",
  },
  {
    image: "/icons/shopify.png",
  },
  {
    image: "/icons/wordpress.png",
  },
  {
    image: "/icons/nitropack.png",
  },
  {
    image: "/icons/elementor.webp",
  },
  {
    image: "/icons/cloudflare.webp",
  },
  {
    image: "/icons/a2hosting.png",
  },
  {
    image: "/icons/godaddy.png",
  },
  {
    image: "/icons/wix-mobile.png",
  },
  {
    image: "/icons/canva.jpg",
  },
];

export default function HeroBlock() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("✅ Your message has been sent!");
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(`❌ ${error.message || "Failed to send message"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-neutral-100">
        {/* Dark grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* 🔗 TOP-RIGHT SOCIAL MENU */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="fixed top-4 right-4 z-20 flex flex-row gap-3 md:flex-col"
        >
          {socialLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              aria-label={item.label}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 text-neutral-200 shadow-lg transition-all hover:bg-white/15 hover:text-white"
            >
              <item.icon className="h-4 w-4 md:h-5 md:w-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col md:flex-row items-center justify-center px-4 text-center md:text-left gap-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="relative z-10 flex-shrink-0"
          >
            <div className="relative mx-auto h-[500px] w-[380px] md:h-[550px] md:w-[380px] overflow-hidden shadow-2xl rounded-2xl">
              {/* Background container with overlay */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Dark Leroux background - nasa ilalim */}
                <Image
                  src="/dark-leroux.png"
                  alt="Dark Leroux background"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>

              {/* Leroux profile photo - nasa ibabaw */}
              <Image
                src="/leroux-xchire.png"
                alt="Leroux profile photo"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-bold md:text-2xl text-cyan-300 leading-relaxed"
            >
              LIESTHER ROLUNA - ( Leroux Y Xchire )
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-4xl md:text-7xl font-extrabold tracking-tight"
            >
              Senior Full Stack Developer
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10 text-lg md:text-2xl text-neutral-200 leading-relaxed"
            >
              Let’s build modern, efficient systems and websites together —{" "}
              <strong className="uppercase text-cyan-300">hire me</strong> to
              bring your ideas to life!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="gap-2 bg-white text-black hover:bg-neutral-200"
                  >
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Get in Touch</DialogTitle>
                  </DialogHeader>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />

                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />

                    <Input
                      placeholder="+63 9xx xxx xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />

                    <Input
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />

                    <Input
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />

                    <Textarea
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />

                    <Button className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                </DialogContent>
              </Dialog>

              <Link href="/projects/systems-development">
                <Button
                  size="lg"
                  className="gap-2 border-white/20 text-white hover:bg-white/10"
                >
                  View Projects
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-neutral-950 text-neutral-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 justify-items-center">
            {features.map((feature, index) => {
              const filename = feature.image
                .split("/")
                .pop()
                ?.replace(/\.[^/.]+$/, "") ?? "";

              return (
                <Card
                  key={index}
                  className="group relative cursor-pointer border border-gray-300 bg-white p-4 w-full max-w-[96px] aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-500 hover:border-primary"
                >
                  <div className="relative h-14 w-14 mb-2">
                    <Image
                      src={feature.image}
                      alt={filename}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>

                  <Badge
                    className="absolute bottom-2 left-1/2 hidden max-w-[90%] -translate-x-1/2 whitespace-nowrap px-2 py-2 text-xs font-medium transition-all duration-300 group-hover:block uppercase"
                  >
                    {filename}
                  </Badge>
                </Card>
              );
            })}
          </div>
        </div>
      </section>


      {/* Skill Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-neutral-100">
        {/* Dark grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="mx-auto max-w-7xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <Badge className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-500">
              Core Competencies
            </Badge>
            <h2 className="mb-6 text-4xl font-bold leading-snug text-white md:text-5xl lg:text-6xl">
              Skills That Drive Results
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-neutral-400 leading-relaxed">
              A versatile set of technical skills and creative solutions designed to help you achieve your goals efficiently and effectively.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={itemVariants}>
                  <Card className="group relative h-full overflow-hidden border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl rounded-3xl">
                    {/* Gradient overlay */}
                    <motion.div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl`}
                    />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <motion.div transition={{ duration: 0.6 }} className="mb-5 flex items-center gap-3">
                        <Icon className="h-7 w-7" />
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                      </motion.div>

                      <p className="mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                          {service.features.map((feature, idx) => (
                            <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <div className="h-1 w-1 rounded-full bg-primary" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <footer
        aria-labelledby="footer-heading"
        className="relative w-full overflow-hidden border-t border-border bg-card/90 backdrop-blur-xl"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[160px]"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.05, 0.95] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-[hsl(var(--primary)_/_0.18)] blur-[200px]"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.18, 0.4, 0.18], rotate: [0, 25, 0] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 16, repeat: Infinity, ease: "linear" }
            }
          />
        </div>
        <h2 id="footer-heading" className="sr-only">
          Site footer
        </h2>
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="mb-4 inline-flex items-center gap-3"
              >
                <Card className="rounded-2xl border border-border/60 bg-card/80 px-3 py-1 text-xs uppercase tracking-[0.32em] text-muted-foreground shadow-[0_10px_30px_-20px_rgba(15,23,42,0.8)]">
                  PH-Devtech Solutions
                </Card>
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  Since 2023
                </Badge>
              </motion.div>
              <p className="mb-4 max-w-md text-sm text-muted-foreground">
                Let’s build modern, efficient systems and websites together.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                  <span>San Bartolome, Quirino Highway Novaliches Quezon City</span>
                </motion.div>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <span>0938-388-2697</span>
                </motion.div>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>sieghartleroux13@gmail.com</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              >
                <h4 className="mb-4 text-sm font-semibold text-foreground/90">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: linkIndex * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <motion.span
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : { x: 5, color: "hsl(var(--primary))" }
                          }
                          className="cursor-pointer"
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="my-10 h-px bg-border/70"
          />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-2"
            >
              {socialLinksFooter.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.6 + index * 0.05,
                  }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full border border-border/60 bg-white/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={social.label}
                  >
                    <motion.div
                      transition={{ duration: shouldReduceMotion ? 0.25 : 0.3 }}
                    >
                      <social.icon className="h-4 w-4" aria-hidden />
                    </motion.div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span>
                © {new Date().getFullYear()} PH-DEVTECH SOLUTIONS - Leroux Y Xchire ( Liesther Roluna ). All rights reserved.
              </span>
              <Badge variant="outline" className="text-xs">
                v1.0.0
              </Badge>
            </motion.div>

            {/* Scroll to Top */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-border/60"
                onClick={scrollToTop}
              >
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : { repeat: Infinity, duration: 1.5 }
                  }
                >
                  <ArrowUp className="h-4 w-4" aria-hidden />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
}
