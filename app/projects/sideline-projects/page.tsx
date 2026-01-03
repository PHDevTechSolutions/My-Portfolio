"use client";

import React from "react";
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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WebsiteCardProps {
    title: string;
    description: string;
    tags: string[];
    image: string;
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
        title: "Cut and Break Diamond Products Incorporated",
        description:
            "Construction-focused company offering high-quality machines, tools, and equipment for cutting, drilling, and heavy-duty industrial applications.",
        tags: [
            "WordPress",
            "MySQL",
            "Elementor",
            "cPanel",
            "A2Hosting",
        ],
        image: "/website/cutandbreak.png", // update image to match the project
        develop: "Leroux Y Xchire",
        assign: "Leroux Y Xchire",
        links: {
            demo: "https://cutandbreak.com.ph/",
            github: "#", // WordPress project (no repo)
        },
    },
    {
        title: "Retropower Corporation",
        description:
            "Construction-focused company specializing in the sale of high-quality construction tools, equipment, and industrial solutions for professional and commercial use.",
        tags: [
            "WordPress",
            "MySQL",
            "Elementor",
            "cPanel",
            "A2 Hosting",
        ],
        image: "/website/retropower.png",
        develop: "Leroux Y Xchire",
        assign: "Leroux Y Xchire",
        links: {
            demo: "https://retropower.com.ph/",
            github: "#", // WordPress project (no repository)
        },
    },

    {
        title: "TerraFirma",
        description:
            "Empowering global decision-makers with deep insights and forward-looking analysis to transform complex change into strategic opportunity.",
        tags: [
            "React",
            "Node.js",
            "Shadcn",
            "TailwindCSS",
            "Next JS",
            "Vercel",
        ],
        image: "/website/terrafirma.png", // update if needed
        develop: "Leroux Y Xchire",
        assign: "Leroux Y Xchire",
        links: {
            demo: "https://terrafirma.vercel.app/home", // update with actual URL if different
            github: "https://github.com/PHDevTechSolutions/Terrafirma", // WordPress project (no repository)
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

function WebsiteCard({ title, description, tags, image, links, develop, assign, className }: WebsiteCardProps) {
    return (
        <motion.div variants={cardVariants} className={cn("w-full max-w-[400px]", className)}>
            <Card className="group relative h-full overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <motion.div
                        className="relative h-full w-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 400px) 100vw, 400px"
                            priority
                        />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {links?.demo && (
                            <motion.a
                                href={links.demo}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 backdrop-blur-md"
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
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg backdrop-blur-md"
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
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-secondary/50 px-2 py-0.5 text-xs font-normal hover:bg-secondary"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <Badge className="text-xs p-2 whitespace-nowrap">
                            Developed by: {develop}
                        </Badge>
                    </div>

                </div>
            </Card>
        </motion.div>
    );
}

export default function ProjectPage() {
    const shouldReduceMotion = useReducedMotion();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <nav className="w-full bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-6 py-3 flex justify-between items-center">
                    <div className="text-lg font-semibold text-foreground">
                        Leroux Y Xchire
                    </div>
                    <div className="flex space-x-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition"
                        >
                            Home
                        </Link>
                        <Link
                            href="/me/about"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition"
                        >
                            About
                        </Link>
                    </div>
                </div>
            </nav>
            <main
                className="relative min-h-screen overflow-hidden bg-background text-foreground"
                role="main"
                aria-label="About us"
            >
                {/* Example usage of ProjectCard with default project data */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={pageVariants}
                    className="flex flex-wrap justify-center gap-8 p-8"
                >
                    {defaultProjects.map((project, idx) => (
                        <WebsiteCard key={idx} {...project} />
                    ))}
                </motion.div>

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
