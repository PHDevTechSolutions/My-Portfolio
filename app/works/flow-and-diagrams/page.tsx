"use client";

import React, { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, type PanInfo, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Shield,
    User,
    Settings,
    Database,
    CheckCircle,
    FileText,
    Server,
    Facebook,
    MapPin,
    Phone,
    Mail,
    ArrowUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface WorkflowNode {
    id: string;
    type: "role" | "workflow";
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    position: { x: number; y: number };
}

interface WorkflowConnection {
    from: string;
    to: string;
}

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;

const colorClasses: Record<string, string> = {
    emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
    blue: "border-blue-400/40 bg-blue-400/10 text-blue-400",
    amber: "border-amber-400/40 bg-amber-400/10 text-amber-400",
    purple: "border-purple-400/40 bg-purple-400/10 text-purple-400",
    indigo: "border-indigo-400/40 bg-indigo-400/10 text-indigo-400",
    gray: "border-gray-400/40 bg-gray-400/10 text-gray-400",
    pink: "border-pink-400/40 bg-pink-400/10 text-pink-400",
    teal: "border-teal-400/40 bg-teal-400/10 text-teal-400",
};

const VERTICAL_GAP = 24;  // compact spacing
const HORIZONTAL_GAP = 24; // compact spacing

const baseRoleNodes: Omit<WorkflowNode, "position">[] = [
    {
        id: "node-1",
        type: "role",
        title: "Super Developer",
        description: "Highest level developer role",
        icon: Shield,
        color: "emerald",
    },
    {
        id: "node-2",
        type: "role",
        title: "Developer",
        description: "Software developer",
        icon: User,
        color: "blue",
    },
    {
        id: "node-3",
        type: "role",
        title: "Super Admin",
        description: "Super administrator role",
        icon: Settings,
        color: "amber",
    },
    {
        id: "node-4",
        type: "role",
        title: "Admin",
        description: "Administrator",
        icon: Settings,
        color: "purple",
    },
    {
        id: "node-5",
        type: "role",
        title: "Manager",
        description: "Manager role",
        icon: User,
        color: "indigo",
    },
    {
        id: "node-6",
        type: "role",
        title: "Users",
        description: "Regular users",
        icon: User,
        color: "gray",
    },
];

const roleConnections: WorkflowConnection[] = [
    { from: "node-1", to: "node-2" },
    { from: "node-2", to: "node-3" },
    { from: "node-3", to: "node-4" },
    { from: "node-4", to: "node-5" },
    { from: "node-5", to: "node-6" },
];

const baseWorkflowNodes: Omit<WorkflowNode, "position">[] = [
    {
        id: "w-node-1",
        type: "workflow",
        title: "Create (Form Submission)",
        description: "User submits data via form",
        icon: FileText,
        color: "pink",
    },
    {
        id: "w-node-2",
        type: "workflow",
        title: "API Endpoint",
        description: "Receive and process submission",
        icon: Server,
        color: "teal",
    },
    {
        id: "w-node-3",
        type: "workflow",
        title: "Verification",
        description: "Validate and verify data",
        icon: CheckCircle,
        color: "amber",
    },
    {
        id: "w-node-4",
        type: "workflow",
        title: "Database",
        description: "Store data securely",
        icon: Database,
        color: "emerald",
    },
    {
        id: "w-node-5",
        type: "workflow",
        title: "Fetch & Display",
        description: "Retrieve data for UI table",
        icon: User,
        color: "blue",
    },
];

const workflowConnections: WorkflowConnection[] = [
    { from: "w-node-1", to: "w-node-2" },
    { from: "w-node-2", to: "w-node-3" },
    { from: "w-node-3", to: "w-node-4" },
    { from: "w-node-4", to: "w-node-5" },
];

function snakeLayout(
    baseNodes: Omit<WorkflowNode, "position">[],
    containerWidth: number
): WorkflowNode[] {
    const nodesPerRow = Math.max(
        1,
        Math.floor((containerWidth + HORIZONTAL_GAP) / (NODE_WIDTH + HORIZONTAL_GAP))
    );

    // total width of row used by nodes + gaps
    const totalRowWidth = nodesPerRow * NODE_WIDTH + (nodesPerRow - 1) * HORIZONTAL_GAP;
    const offsetX = (containerWidth - totalRowWidth) / 2;

    return baseNodes.map((node, idx) => {
        const rowIndex = Math.floor(idx / nodesPerRow);
        const colIndex = idx % nodesPerRow;

        const y = rowIndex * (NODE_HEIGHT + VERTICAL_GAP);
        const x =
            rowIndex % 2 === 0
                ? offsetX + colIndex * (NODE_WIDTH + HORIZONTAL_GAP) // left to right
                : offsetX + (nodesPerRow - 1 - colIndex) * (NODE_WIDTH + HORIZONTAL_GAP); // right to left

        return { ...node, position: { x, y } };
    });
}

function WorkflowConnectionLine({
    from,
    to,
    nodes,
}: {
    from: string;
    to: string;
    nodes: WorkflowNode[];
}) {
    const fromNode = nodes.find((n) => n.id === from);
    const toNode = nodes.find((n) => n.id === to);
    if (!fromNode || !toNode) return null;

    const startX = fromNode.position.x + NODE_WIDTH / 2;
    const startY = fromNode.position.y + NODE_HEIGHT / 2;
    const endX = toNode.position.x + NODE_WIDTH / 2;
    const endY = toNode.position.y + NODE_HEIGHT / 2;

    const path = `M${startX},${startY} L${endX},${endY}`;

    return (
        <path
            d={path}
            fill="none"
            stroke="red"
            strokeWidth={2.5}
            strokeDasharray="6,4"
            opacity={0.5}
        />
    );
}

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

export default function HeroBlock() {
    const canvasRefRole = useRef<HTMLDivElement>(null);
    const canvasRefWorkflow = useRef<HTMLDivElement>(null);
    const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
    const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const [roleNodes, setRoleNodes] = useState<WorkflowNode[]>([]);
    const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        function updatePositions() {
            const roleWidth = canvasRefRole.current?.clientWidth ?? NODE_WIDTH + 100;
            const workflowWidth =
                canvasRefWorkflow.current?.clientWidth ?? NODE_WIDTH + 100;
            setRoleNodes(snakeLayout(baseRoleNodes, roleWidth));
            setWorkflowNodes(snakeLayout(baseWorkflowNodes, workflowWidth));
        }

        updatePositions();
        window.addEventListener("resize", updatePositions);
        return () => window.removeEventListener("resize", updatePositions);
    }, []);

    const handleDragStart = (nodeId: string) => {
        setDraggingNodeId(nodeId);
        const node =
            roleNodes.find((n) => n.id === nodeId) ||
            workflowNodes.find((n) => n.id === nodeId);
        if (node) dragStartPosition.current = { x: node.position.x, y: node.position.y };
    };

    const handleDrag = (nodeId: string, { offset }: PanInfo) => {
        if (draggingNodeId !== nodeId || !dragStartPosition.current) return;

        const newX = dragStartPosition.current.x + offset.x;
        const newY = dragStartPosition.current.y + offset.y;

        const constrainedX = Math.max(0, newX);
        const constrainedY = Math.max(0, newY);

        flushSync(() => {
            if (roleNodes.some((n) => n.id === nodeId)) {
                setRoleNodes((prev) =>
                    prev.map((node) =>
                        node.id === nodeId
                            ? { ...node, position: { x: constrainedX, y: constrainedY } }
                            : node
                    )
                );
            } else {
                setWorkflowNodes((prev) =>
                    prev.map((node) =>
                        node.id === nodeId
                            ? { ...node, position: { x: constrainedX, y: constrainedY } }
                            : node
                    )
                );
            }
        });
    };

    const handleDragEnd = () => {
        setDraggingNodeId(null);
        dragStartPosition.current = null;
    };

    function renderDiagram(
        nodes: WorkflowNode[],
        connections: WorkflowConnection[],
        canvasRef: React.RefObject<HTMLDivElement | null>,
        ariaLabel: string
    ) {
        const nodesPerRow = Math.max(
            1,
            Math.floor(
                (canvasRef.current?.clientWidth ?? NODE_WIDTH + HORIZONTAL_GAP) /
                (NODE_WIDTH + HORIZONTAL_GAP)
            )
        );

        const rowsCount = Math.ceil(nodes.length / nodesPerRow);
        const contentHeight = rowsCount * (NODE_HEIGHT + VERTICAL_GAP) + 50;
        const totalRowWidth = nodesPerRow * NODE_WIDTH + (nodesPerRow - 1) * HORIZONTAL_GAP;
        const contentWidth = canvasRef.current
            ? Math.max(canvasRef.current.clientWidth, totalRowWidth)
            : totalRowWidth;

        return (
            <div
                ref={canvasRef}
                className="relative w-full rounded-xl border border-border/30 p-2 bg-background/40 mb-4 flex items-center justify-center"
                style={{ minHeight: "200px" }}
                role="region"
                aria-label={ariaLabel}
                tabIndex={0}
            >
                <div
                    className="relative"
                    style={{
                        minWidth: contentWidth,
                        minHeight: contentHeight,
                    }}
                >
                    <svg
                        className="absolute inset-0 pointer-events-none"
                        style={{ width: contentWidth, height: contentHeight }}
                        aria-hidden="true"
                    >
                        {connections.map((c) => (
                            <WorkflowConnectionLine
                                key={`${c.from}-${c.to}`}
                                from={c.from}
                                to={c.to}
                                nodes={nodes}
                            />
                        ))}
                    </svg>

                    {nodes.map((node) => {
                        const Icon = node.icon;
                        const isDragging = draggingNodeId === node.id;

                        return (
                            <motion.div
                                key={node.id}
                                drag
                                dragMomentum={false}
                                dragConstraints={{ left: 0, top: 0, right: 100000, bottom: 100000 }}
                                onDragStart={() => handleDragStart(node.id)}
                                onDrag={(_, info) => handleDrag(node.id, info)}
                                onDragEnd={handleDragEnd}
                                style={{
                                    x: node.position.x,
                                    y: node.position.y,
                                    width: NODE_WIDTH,
                                    transformOrigin: "0 0",
                                }}
                                className="absolute cursor-grab"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
                                aria-grabbed={isDragging}
                            >
                                <Card
                                    className={`group/node relative w-full overflow-hidden rounded-xl border ${colorClasses[node.color]
                                        } bg-background/70 p-3 backdrop-blur transition-all hover:shadow-lg ${isDragging ? "shadow-xl ring-2 ring-primary/50" : ""
                                        }`}
                                    role="article"
                                    aria-label={`${node.type} node: ${node.title}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100" />

                                    <div className="relative space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${colorClasses[node.color]
                                                    } bg-background/80 backdrop-blur`}
                                                aria-hidden="true"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <Badge
                                                    variant="outline"
                                                    className="mb-0.5 rounded-full border-border/40 bg-background/80 px-1.5 py-0 text-[9px] uppercase tracking-[0.15em] text-foreground/60"
                                                >
                                                    {node.type}
                                                </Badge>
                                                <h3 className="truncate text-xs font-semibold tracking-tight text-foreground">
                                                    {node.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="line-clamp-2 text-[10px] leading-relaxed text-foreground/70">
                                            {node.description}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                                            <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                                            <span className="uppercase tracking-[0.1em]">Connected</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full overflow-hidden rounded-2xl border border-border/40 bg-background/60 backdrop-blur p-4 sm:p-6">
                {/* Role Hierarchy */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.25em]">
                        Role Hierarchy Diagram
                    </span>
                    {renderDiagram(roleNodes, roleConnections, canvasRefRole, "Role hierarchy canvas")}
                </div>


                {/* CRUD Workflow */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.25em]">
                        CRUD Workflow Diagram
                    </span>
                    {renderDiagram(workflowNodes, workflowConnections, canvasRefWorkflow, "CRUD workflow canvas")}
                </div>
            </div>
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
