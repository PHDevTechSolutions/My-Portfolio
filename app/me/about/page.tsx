"use client";

import Image from "next/image";
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
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ArrowUp,
    Code,
    Database,
    Smartphone,
    Layout,
    Server,
    Cloud,
    Terminal,
    Quote,
    FileCheck,
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
            { label: "Mobile Apps", href: "/projects/sideline-projects" },
        ],
    },
];

const techStack = [
    { name: "React / Next.js", icon: Code, category: "Frontend" },
    { name: "Node.js / Express", icon: Server, category: "Backend" },
    { name: "Flutter / React Native", icon: Smartphone, category: "Mobile" },
    { name: "PostgreSQL / MongoDB", icon: Database, category: "Database" },
    { name: "Supabase / Firebase", icon: Cloud, category: "Cloud" },
    { name: "TailwindCSS / Shadcn", icon: Layout, category: "UI/UX" },
    { name: "Docker / AWS", icon: Terminal, category: "DevOps" },
];

const certifications = [
    { name: "AWS Certified Solutions Architect", year: "2024" },
    { name: "Google Cloud Professional", year: "2023" },
    { name: "MongoDB Certified Developer", year: "2022" },
];

const testimonials = [
    {
        quote: "Leroux delivered an exceptional ERP system that transformed our operations. His technical skills and dedication are outstanding.",
        author: "Aarron Espiritu",
        role: "Fullstack Developer - ESPIRON",
    },
    {
        quote: "Working with PHDevtech Solutions was a game-changer. Professional, responsive, and delivered beyond expectations.",
        author: "Mark Louies De Castro",
        role: "Fullstack Developer - Engiconnect",
    },
];

const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/PHDevTechSolutions" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1BBoXkoDhz/" },
    { icon: Mail, label: "Email", href: "mailto:sieghartleroux13@gmail.com" },
];

const socialLinksFooter = [
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1BBoXkoDhz/" },
];

export default function AboutUsPage() {

    const shouldReduceMotion = useReducedMotion();

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
                            className="px-4 py-2 text-sm font-bold bg-white text-black transform -skew-x-12"
                        >
                            <span className="transform skew-x-12 inline-block">About</span>
                        </Link>
                    </div>
                </div>
            </nav>
            <main
                className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white"
                role="main"
                aria-label="About us"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] z-0" />
                <motion.div
                    className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 md:gap-24 lg:px-0 lg:py-16"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section
                        className="grid gap-10 border border-white/10 bg-white/5 p-10 backdrop-blur"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="about-hero-heading"
                    >
                        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-6 flex-1">
                                <Badge className="inline-flex items-center gap-2 border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur transform -skew-x-12">
                                    <span className="transform skew-x-12 inline-flex items-center gap-2">
                                        <Users className="h-4 w-4 text-white" aria-hidden="true" />
                                        My Story
                                    </span>
                                </Badge>
                                <div className="space-y-4">
                                    <motion.h1
                                        id="about-hero-heading"
                                        className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
                                        aria-label="Crafting human experiences through motion and design"
                                    >
                                        Building innovative systems and websites with heart and precision
                                    </motion.h1>
                                    <p className="max-w-2xl text-lg text-gray-400">
                                        From college system development to leading ERP projects and running my own company, I
                                        bring passion and dedication to crafting solutions that serve people and businesses alike.
                                    </p>
                                </div>
                                {/* Social Links */}
                                <div className="flex gap-3 pt-2">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                            {/* Profile Image */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden border-2 border-white/20">
                                    <Image
                                        src="/leroux-xchire.png"
                                        alt="Leroux Y Xchire"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 192px, 224px"
                                        priority
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">CEO & Lead Developer</p>
                                    <p className="text-xs text-gray-500">PHDevtech Solutions</p>
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
                                    className="group/item relative overflow-hidden border border-white/10 bg-white/5 p-6 transition-all hover:border-white/30 hover:bg-white/10"
                                    variants={cardVariants}
                                    whileHover={{ y: -6 }}
                                    role="listitem"
                                    aria-label={`${stat.value} ${stat.label}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative space-y-2">
                                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-semibold tracking-tight text-white">
                                            {stat.value}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.section>

                    {/* Tech Stack Section */}
                    <motion.section
                        className="space-y-8"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="tech-stack-heading"
                    >
                        <div className="space-y-3">
                            <Badge className="inline-flex items-center gap-2 border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur transform -skew-x-12">
                                <span className="transform skew-x-12 inline-flex items-center gap-2">
                                    <Code className="h-4 w-4 text-white" aria-hidden="true" />
                                    Tech Stack
                                </span>
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="tech-stack-heading"
                                    className="text-2xl font-semibold tracking-tight text-white"
                                >
                                    Technologies I Work With
                                </h2>
                                <p className="max-w-2xl text-gray-400">
                                    Full-stack development with modern technologies for web, mobile, and cloud solutions.
                                </p>
                            </div>
                        </div>
                        <motion.ul
                            role="list"
                            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                        >
                            {techStack.map((tech) => (
                                <motion.li
                                    key={tech.name}
                                    variants={cardVariants}
                                    className="group/item relative flex items-center gap-4 overflow-hidden border border-white/10 bg-white/5 p-4 transition-all hover:border-white/30 hover:bg-white/10"
                                    whileHover={{ y: -4 }}
                                    role="listitem"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5">
                                        <tech.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{tech.name}</p>
                                        <p className="text-xs text-gray-400">{tech.category}</p>
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
                            <Badge className="inline-flex items-center gap-2 border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur transform -skew-x-12">
                                <span className="transform skew-x-12 inline-flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
                                    About Me
                                </span>
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="values-heading"
                                    className="text-2xl font-semibold tracking-tight text-white"
                                >
                                    What Drives Me
                                </h2>
                                <p className="max-w-2xl text-gray-400">
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
                                    className="group/item relative flex flex-col gap-4 overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
                                    whileHover={{ y: -4 }}
                                    role="listitem"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5">
                                            <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base font-medium text-white">{value.title}</h3>
                                    </div>
                                    <p className="relative text-sm text-gray-400">{value.description}</p>
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
                            <Badge className="inline-flex items-center gap-2 border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur transform -skew-x-12">
                                <span className="transform skew-x-12 inline-flex items-center gap-2">
                                    <Target className="h-4 w-4 text-white" aria-hidden="true" />
                                    My Journey
                                </span>
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="journey-heading"
                                    className="text-2xl font-semibold tracking-tight text-white"
                                >
                                    Milestones that shaped my career
                                </h2>
                                <p className="max-w-2xl text-gray-400">
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
                                    className="group/item relative flex flex-col gap-3 overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
                                    role="listitem"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative space-y-2">
                                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                                            {milestone.year}
                                        </p>
                                        <h3 className="text-base font-medium text-white">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.section>

                    {/* Testimonials Section */}
                    <motion.section
                        className="space-y-8"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="testimonials-heading"
                    >
                        <div className="space-y-3">
                            <Badge className="inline-flex items-center gap-2 border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur transform -skew-x-12">
                                <span className="transform skew-x-12 inline-flex items-center gap-2">
                                    <Quote className="h-4 w-4 text-white" aria-hidden="true" />
                                    Testimonials
                                </span>
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="testimonials-heading"
                                    className="text-2xl font-semibold tracking-tight text-white"
                                >
                                    What Clients Say
                                </h2>
                                <p className="max-w-2xl text-gray-400">
                                    Feedback from clients and colleagues I've had the pleasure of working with.
                                </p>
                            </div>
                        </div>
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.5,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                    className="group/item relative overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                                    <div className="relative space-y-4">
                                        <Quote className="h-8 w-8 text-white/20" aria-hidden="true" />
                                        <p className="text-gray-300 italic leading-relaxed">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="pt-2 border-t border-white/10">
                                            <p className="text-white font-medium">{testimonial.author}</p>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* Certifications Section */}
                    <motion.section
                        className="space-y-8"
                        variants={cardVariants}
                        role="article"
                        aria-labelledby="certifications-heading"
                    >
                        <div className="space-y-3">
                            <Badge className="inline-flex items-center gap-2 border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur transform -skew-x-12">
                                <span className="transform skew-x-12 inline-flex items-center gap-2">
                                    <FileCheck className="h-4 w-4 text-white" aria-hidden="true" />
                                    Certifications
                                </span>
                            </Badge>
                            <div className="space-y-2">
                                <h2
                                    id="certifications-heading"
                                    className="text-2xl font-semibold tracking-tight text-white"
                                >
                                    Professional Certifications
                                </h2>
                                <p className="max-w-2xl text-gray-400">
                                    Continuous learning and industry-recognized credentials.
                                </p>
                            </div>
                        </div>
                        <motion.ul
                            role="list"
                            className="grid gap-4 sm:grid-cols-3"
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
                            {certifications.map((cert, index) => (
                                <motion.li
                                    key={cert.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.5,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                    className="group/item relative flex items-center gap-4 overflow-hidden border border-white/10 bg-white/5 p-4 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
                                    role="listitem"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 flex-shrink-0">
                                        <Award className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{cert.name}</p>
                                        <p className="text-xs text-gray-500">{cert.year}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.section>
                </motion.div>

                <footer
                    aria-labelledby="footer-heading"
                    className="relative w-full overflow-hidden border-t border-white/10 bg-[#0a0a0a]"
                >
                    {/* Background gradient div: lowest layer */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] z-0" />

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
                                    <Card className="border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.32em] text-gray-400 rounded-none">
                                        PH-Devtech Solutions
                                    </Card>
                                    <Badge
                                        variant="outline"
                                        className="text-xs text-gray-400 border-white/20 rounded-none"
                                    >
                                        Since 2023
                                    </Badge>
                                </motion.div>
                                <p className="mb-4 max-w-md text-sm text-gray-400">
                                    Let's build modern, efficient systems and websites together.
                                </p>

                                {/* Contact Info */}
                                <div className="space-y-2 text-sm text-gray-400">
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
                                    <h4 className="mb-4 text-sm font-semibold text-white/90">
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
                                                    className="text-sm text-gray-400 transition-colors hover:text-white"
                                                >
                                                    <motion.span
                                                        whileHover={
                                                            shouldReduceMotion
                                                                ? undefined
                                                                : { x: 5 }
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
                            className="my-10 h-px bg-white/10"
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
                                            className="h-9 w-9 border border-white/20 bg-white/5 text-gray-400 transition-colors hover:bg-white hover:text-black rounded-none"
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
                                className="flex items-center gap-2 text-sm text-gray-400"
                            >
                                <span>
                                    © {new Date().getFullYear()} PH-DEVTECH SOLUTIONS - Leroux Y Xchire ( Liesther Roluna ). All rights reserved.
                                </span>
                                <Badge variant="outline" className="text-xs text-gray-400 border-white/20 rounded-none">
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
                                    className="h-9 w-9 border-white/20 text-gray-400 hover:bg-white hover:text-black rounded-none"
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
