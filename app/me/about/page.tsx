"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import {
    Award,
    Globe,
    HeartHandshake,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    Facebook,
    MapPin,
    Phone,
    Mail,
    ArrowUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";

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

const stats = [
    { label: "Years Developing Systems & Websites", value: "7+" },
    { label: "Customer Satisfaction Rate", value: "90%" },
    { label: "ERP & Integration Projects", value: "15+" },
    { label: "Active Projects as CEO", value: "7" },
];

const values = [
    {
        title: "People-Oriented",
        description:
            "I value positive relationships, treating both employees and customers with respect and care.",
        icon: HeartHandshake,
    },
    {
        title: "Passionate Developer",
        description:
            "Focused on building clean, efficient systems and websites with attention to detail and quality.",
        icon: Sparkles,
    },
    {
        title: "Active & Engaged",
        description:
            "I actively participate in all tasks and team activities to help achieve shared goals.",
        icon: ShieldCheck,
    },
    {
        title: "Anime Enthusiast",
        description:
            "A fan of anime, which fuels my creativity and passion in both work and life.",
        icon: Globe,
    },
];

const milestones = [
    {
        year: "2016",
        title: "College Days",
        description:
            "Focused on system development, ERP integrations, and website development.",
    },
    {
        year: "2020",
        title: "RD Pawnshop Inc",
        description:
            "Focused on developing websites and systems using Laravel PHP.",
    },
    {
        year: "2023",
        title: "Ecoshift Corporation",
        description:
            "Started developing websites using WordPress and Shopify, worked as an SEO specialist, and began system development with PHP, MySQL, React, and Next.js.",
    },
    {
        year: "2026",
        title: "Disruptive Solutions Inc",
        description:
            "Continued developing full ERP systems using Next.js, React, Flutter, and other modern programming languages.",
    },
    {
        year: "2023 - Present",
        title: "PHDevtech Solutions (CEO)",
        description:
            "CEO of a sideline business focused on developing websites and systems.",
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

export default function AboutUsPage() {

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
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:28px_28px] z-0" />
                <motion.div
                    className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 md:gap-24 lg:px-0 lg:py-16"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section
                        className="grid gap-10 rounded-3xl border border-border/40 bg-background/60 p-10 backdrop-blur"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="about-hero-heading"
                    >
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-6">
                                <Badge className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur">
                                    <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                                    My Story
                                </Badge>
                                <div className="space-y-4">
                                    <motion.h1
                                        id="about-hero-heading"
                                        className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                                        aria-label="Crafting human experiences through motion and design"
                                    >
                                        Building innovative systems and websites with heart and precision
                                    </motion.h1>
                                    <p className="max-w-2xl text-lg text-foreground/70">
                                        From college system development to leading ERP projects and running my own company, I
                                        bring passion and dedication to crafting solutions that serve people and businesses alike.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-3 md:items-end">
                                <div className="rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur">
                                    <div className="flex items-center gap-4">
                                        <Target className="h-10 w-10 text-primary" aria-hidden="true" />
                                        <div className="space-y-1">
                                            <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">
                                                Purpose
                                            </p>
                                            <p className="text-sm text-foreground/70">
                                                Delivering quality digital solutions that empower teams and delight customers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.ul
                            role="list"
                            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {stats.map((stat) => (
                                <motion.li
                                    key={stat.label}
                                    className="group/item relative overflow-hidden rounded-2xl border border-border/30 bg-background/50 p-6 transition-all hover:border-border/60 hover:bg-background/70"
                                    variants={cardVariants}
                                    whileHover={{ y: -6 }}
                                    role="listitem"
                                    aria-label={`${stat.value} ${stat.label}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative space-y-2">
                                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-semibold tracking-tight text-foreground">
                                            {stat.value}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.section>

                    <motion.section
                        className="space-y-8"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="values-heading"
                    >
                        <div className="space-y-3">
                            <Badge className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur">
                                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                                About Me
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="values-heading"
                                    className="text-2xl font-semibold tracking-tight text-foreground"
                                >
                                    What Drives Me
                                </h2>
                                <p className="max-w-2xl text-foreground/70">
                                    I believe in respect, passion, and active engagement — all fueled by a love for anime and continuous learning.
                                </p>
                            </div>
                        </div>
                        <motion.ul
                            role="list"
                            className="grid gap-6 md:grid-cols-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                        >
                            {values.map((value) => (
                                <motion.li
                                    key={value.title}
                                    variants={cardVariants}
                                    className="group/item relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-background/60 p-6 shadow-lg shadow-black/5 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
                                    whileHover={{ y: -4 }}
                                    role="listitem"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-background/60">
                                            <value.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-medium text-foreground">{value.title}</h3>
                                    </div>
                                    <p className="relative text-sm text-foreground/70">{value.description}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.section>

                    <motion.section
                        className="space-y-8"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="journey-heading"
                    >
                        <div className="space-y-3">
                            <Badge className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur">
                                <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                                My Journey
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="journey-heading"
                                    className="text-2xl font-semibold tracking-tight text-foreground"
                                >
                                    Milestones that shaped my career
                                </h2>
                                <p className="max-w-2xl text-foreground/70">
                                    Years of experience developing systems, ERP integrations, websites, and leading projects that deliver real business value.
                                </p>
                            </div>
                        </div>

                        <motion.ul
                            role="list"
                            className="grid gap-6 md:grid-cols-3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                        >
                            {milestones.map((milestone, index) => (
                                <motion.li
                                    key={milestone.year}
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.5,
                                                ease: "easeOut",
                                                delay: index * 0.04,
                                            },
                                        },
                                    }}
                                    className="group/item relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-background/60 p-6 shadow-lg shadow-black/5 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
                                    role="listitem"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative space-y-2">
                                        <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                                            {milestone.year}
                                        </p>
                                        <h3 className="text-base font-medium text-foreground">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-sm text-foreground/70">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.section>
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
