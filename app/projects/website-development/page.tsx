"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import {
    ExternalLink,
    Github,
    Facebook,
    MapPin,
    Phone,
    Mail,
    ArrowUp,
    Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Project, getProjectsByType } from "@/lib/firebase-service";

interface WebsiteCardProps {
    id?: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    develop: string;
    assign: string;
    links?: {
        demo?: string;
        github?: string;
    };
    className?: string;
}

const pageVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.12,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const defaultProjects: WebsiteCardProps[] = [
    {
        title: "Ecoshift Corporation",
        description:
            "Online shop specializing in innovative lighting solutions. Browse and purchase quality lighting products for homes and businesses.",
        tags: [
            "Wordpress",
            "MySQL",
            "Elementor",
            "CPanel Godaddy",
        ],
        image: "/website/ecoshift.png",  // changed to ecoshift image
        develop: "Leroux Y Xchire",
        assign: "Leroux Y Xchire",
        links: {
            demo: "https://www.ecoshiftcorp.com/",
            github: "#",  // updated repo
        },
    },
    {
        title: "Disruptive Solutions Inc.",
        description:
            "Your Partner for Smart Solutions. With innovation at our core, we deliver premium, future-ready lighting solutions that brighten spaces, cut costs, and power smarter business.",
        tags: [
            "Wordpress",
            "MySQL",
            "Elementor",
            "CPanel A2Hosting",
        ],
        image: "/website/disruptive.png", // Add the correct image path here
        develop: "Leroux Y Xchire",
        assign: "Jason Pablo",
        links: {
            demo: "https://disruptivesolutionsinc.com/", // Replace with actual demo URL
            github: "#", // Replace with actual repo URL
        },
    },

    {
        title: "Value Acquisition Holdings",
        description:
            "A leading industrial holdings company managing construction, cement production, and industrial materials with strength, reliability, and scale.",
        tags: [
            "React",
            "Node.js",
            "Shadcn",
            "TailwindCSS",
            "Next JS",
            "Supabase",
            "MongoDB",
            "Vercel",
        ],
        image: "/website/vah.png", // Update with actual image path
        develop: "Leroux Y Xchire",
        assign: "Aries Balgos",
        links: {
            demo: "https://vah-industrial.vercel.app/", // Update with real demo URL
            github: "https://github.com/PHDevTechSolutions/VAH-Website", // Update with real repo URL
        },
    },

    {
        title: "Ecoshift Corporation ( Shopify )",
        description:
            "Your go-to shop for lighting solutions powered by Shopify.",
        tags: ["Shopify"],
        image: "/website/shopify.png", // Update with actual image path if needed
        develop: "Leroux Y Xchire",
        assign: "Leroux Y Xchire",
        links: {
            demo: "https://eshome.ph/", // Update with real demo URL
            github: "#", // Update with real repo URL if applicable
        },
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
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1BBoXkoDhz/" },
];

function WebsiteCard({ id, title, description, tags, image, links, develop, assign, className }: WebsiteCardProps) {
    return (
        <motion.div variants={cardVariants} className={cn("w-full max-w-[400px]", className)}>
            <Card className="group relative h-full overflow-hidden rounded-none border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10">
                <div className="relative aspect-video overflow-hidden">
                    <motion.div
                        className="relative h-full w-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 400px) 100vw, 400px"
                                priority
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-white/5">
                                <span className="text-gray-500 text-sm">No Image</span>
                            </div>
                        )}
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {links?.demo && (
                            <motion.a
                                href={links.demo}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex h-10 w-10 items-center justify-center bg-white text-black shadow-lg backdrop-blur-md"
                                title="View Demo"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </motion.a>
                        )}
                        {links?.github && (
                            <motion.a
                                href={links.github}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex h-10 w-10 items-center justify-center bg-white/20 text-white shadow-lg backdrop-blur-md"
                                title="View Code"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-5 w-5" />
                            </motion.a>
                        )}
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-gray-300">
                        {title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-400">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="inline-block px-2 py-0.5 text-xs font-normal border border-white/20 text-gray-300 transform -skew-x-12"
                            >
                                <span className="transform skew-x-12 inline-block">{tag}</span>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <span className="inline-block px-3 py-1.5 text-xs font-semibold bg-white text-black transform -skew-x-12">
                            <span className="transform skew-x-12 inline-block">Dev: {develop}</span>
                        </span>
                        <span className="inline-block px-3 py-1.5 text-xs font-semibold border border-white/30 text-white/80 transform -skew-x-12">
                            <span className="transform skew-x-12 inline-block">Assign: {assign}</span>
                        </span>
                    </div>
                    {/* View Info Button */}
                    <Link href={id ? `/projects/website-development/${id}` : '#'} className="block mt-4">
                        <Button className="w-full gap-2 bg-white text-black hover:bg-gray-200 rounded-none text-xs">
                            <ExternalLink className="h-4 w-4" />
                            View Info
                        </Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
}

export default function ProjectPage() {
    const shouldReduceMotion = useReducedMotion();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await getProjectsByType("website");
                // If no Firebase data, use defaultProjects as fallback
                if (data.length === 0) {
                    setProjects(defaultProjects as Project[]);
                } else {
                    setProjects(data);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Failed to load projects from database");
                // Fallback to defaultProjects on error
                setProjects(defaultProjects as Project[]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
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
                            href="/projects/website-development"
                            className="px-4 py-2 text-sm font-bold bg-white text-black transform -skew-x-12"
                        >
                            <span className="transform skew-x-12 inline-block">Projects</span>
                        </Link>
                    </div>
                </div>
            </nav>
            <main
                className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white"
                role="main"
                aria-label="Website Development Projects"
            >
                {/* Loading State */}
                {loading && (
                    <div className="flex h-96 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="flex h-96 items-center justify-center">
                        <p className="text-gray-400">{error} (Showing cached projects)</p>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={pageVariants}
                        className="flex flex-wrap justify-center gap-8 p-8"
                    >
                        {projects.map((project, idx) => (
                            <WebsiteCard key={project.id || idx} {...project} />
                        ))}
                    </motion.div>
                )}

                <footer
                    aria-labelledby="footer-heading"
                    className="relative w-full overflow-hidden border-t border-border bg-card/90 backdrop-blur-xl"
                >
                    {/* Background gradient div: lowest layer */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:28px_28px] z-0" />

                    {/* Blur and colored motion divs */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
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
                    <div
                        id="footer-heading"
                        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10"
                    >
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
            </main>
        </>
    );
}
