'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PROJECTS = [
    {
        id: 'hotel-crm',
        title: 'Hotel CRM & Automation Platform',
        role: 'SaaS CRM for Customer Engagement',
        image: '/hotel-crm.png',
        color: '#00ffcc',
        desc: 'Built a scalable CRM platform used by 5K-6K daily active users, improving communication efficiency by 35%. Features include AI-assisted onboarding, WhatsApp Business API integration (2x engagement), QR-based surveys (60%+ response), and Stripe subscription billing.',
        tech: ['Next.js', 'NestJS', 'PostgreSQL', 'WhatsApp API', 'Stripe', 'Docker'],
        metrics: [
            { label: 'Daily Users', value: '5K+' },
            { label: 'Req/Day', value: '10K+' },
            { label: 'Manual Effort', value: '-80%' }
        ]
    },
    {
        id: 'automation-engine',
        title: 'Nexus AI Automation Engine',
        role: 'LLM-Powered Workflow Automation',
        image: '/automation.png',
        color: '#a78bfa',
        desc: 'A visual, low-code automation engine powered by Large Language Models. Enables users to build complex, self-healing automation workflows without writing code. Improved task execution efficiency by 45%.',
        tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Redis', 'WebSockets'],
        metrics: [
            { label: 'Execution Speed', value: '+45%' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Active Flows', value: '2,500+' }
        ]
    },
    {
        id: 'voice-assistant',
        title: 'Aura Voice AI Assistant',
        role: 'Conversational Voice Model Interface',
        image: '/hotel-crm.png',
        color: '#f472b6',
        desc: 'Developed a real-time conversational voice assistant using state-of-the-art TTS and STT models. Reduced latency to <300ms for natural conversations and improved user engagement duration by 30%.',
        tech: ['React', 'WebRTC', 'FastAPI', 'PyTorch', 'ElevenLabs', 'Whisper'],
        metrics: [
            { label: 'Latency', value: '<300ms' },
            { label: 'Engagement', value: '+30%' },
            { label: 'Accuracy', value: '98%' }
        ]
    },
    {
        id: 'payment-system',
        title: 'FinTech Global Payment Gateway',
        role: 'Enterprise Payment Routing System',
        image: '/ecommerce.png',
        color: '#f59e0b',
        desc: 'Engineered a highly secure, high-throughput payment routing system supporting multiple global providers. Implemented machine learning for real-time fraud detection, reducing fraudulent transactions by 40%.',
        tech: ['Node.js', 'Go', 'PostgreSQL', 'Stripe', 'Kafka', 'Docker'],
        metrics: [
            { label: 'Fraud Reduction', value: '-40%' },
            { label: 'Throughput', value: '10K TPS' },
            { label: 'Availability', value: '99.999%' }
        ]
    },
    {
        id: 'affiliate-builder',
        title: 'Affiliate Marketing & Workflow Builder',
        role: 'Performance Marketing Automation',
        image: '/affiliate.png',
        color: '#34d399',
        desc: 'Workflow builder, survey engine, landing page creation, and lead routing. Built a workflow automation system supporting 1,000+ active flows. Developed a self-serve landing page builder, reducing developer dependency by 70%.',
        tech: ['React.js', 'Redux', 'React Flow', 'Laravel', 'Redis', 'Docker'],
        metrics: [
            { label: 'Active Flows', value: '1,000+' },
            { label: 'Conversion', value: '+35%' },
            { label: 'Performance', value: '+50%' }
        ]
    },
    {
        id: 'ecommerce',
        title: 'Multi-Vendor E-Commerce Platform',
        role: 'Role-based Marketplace',
        image: '/ecommerce.png',
        color: '#f97316',
        desc: 'Role-based e-commerce system for admin, vendor, and customer workflows. Built 50+ NestJS REST endpoints, integrated Stripe Payments, and implemented product search for 10,000+ records. Reduced API response time from 900ms to 150ms using Redis caching.',
        tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Stripe', 'GitHub Actions'],
        metrics: [
            { label: 'Products', value: '10K+' },
            { label: 'API Speed', value: '150ms' },
            { label: 'Uptime', value: '99.9%' }
        ]
    }
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative w-full"
        >
            <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                padding: 'clamp(20px, 4vw, 32px)',
                borderRadius: 16,
                background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
                border: `1px solid ${hovered ? project.color + '55' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: hovered ? `0 20px 40px -20px ${project.color}30, inset 0 0 40px ${project.color}05` : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'none',
                overflow: 'hidden',
                zIndex: 1
            }}>
                {/* Background Glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.6s',
                    pointerEvents: 'none',
                    zIndex: -1
                }} />

                {/* Top Section: Image & Title */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 32px)', alignItems: 'center' }}>
                    <motion.div 
                        animate={{ 
                            y: hovered ? -8 : 0,
                            scale: hovered ? 1.02 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        style={{
                            flex: '1 1 300px',
                            minWidth: 260,
                            position: 'relative',
                            aspectRatio: '16/9',
                            borderRadius: 8,
                            overflow: 'hidden',
                            border: `1px solid rgba(255,255,255,0.1)`,
                            boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`,
                            perspective: 1000
                        }}
                    >
                        <Image 
                            src={project.image} 
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s' }}
                        />
                        {/* Glass Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                            pointerEvents: 'none'
                        }} />
                    </motion.div>

                    <div style={{ flex: '1 1 300px' }}>
                        <div style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                            color: project.color, letterSpacing: '0.2em', textTransform: 'uppercase',
                            marginBottom: 12
                        }}>
                            // {project.role}
                        </div>
                        <h3 style={{
                            margin: '0 0 16px', fontFamily: 'var(--font-sans)',
                            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                            fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff',
                        }}>
                            {project.title}
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
                            letterSpacing: '0.02em',
                        }}>
                            {project.desc}
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Tech & Metrics */}
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 24, 
                    justifyContent: 'space-between',
                    paddingTop: 24,
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                }}>
                    {/* Tech Stack */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        {project.tech.map((t, i) => (
                            <span key={i} style={{
                                padding: '4px 12px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 4,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                color: 'rgba(255,255,255,0.6)',
                                letterSpacing: '0.05em'
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Metrics */}
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {project.metrics.map((m, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700,
                                    color: project.color, textShadow: `0 0 12px ${project.color}50`
                                }}>
                                    {m.value}
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                                    color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase'
                                }}>
                                    {m.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsPage({ onBack }: { onBack: () => void }) {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        const t = setTimeout(() => setShow(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 20,
            overflowY: 'auto', overflowX: 'hidden',
            opacity: show ? 1 : 0,
            transition: 'opacity 0.6s ease',
        }}>
            {/* Background effects */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,204,0.08) 0%, transparent 60%)'
            }} />

            {/* Nav */}
            <nav style={{
                position: 'sticky', top: 0, zIndex: 100,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '22px 44px',
                background: 'rgba(0,8,20,0.88)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.95rem',
                    color: '#00ffcc', letterSpacing: '0.2em',
                    textShadow: '0 0 18px rgba(0,255,204,0.5)',
                }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>//</span> Deepak Jangid
                </div>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none', border: '1px solid rgba(0,255,204,0.25)',
                        borderRadius: 3, padding: '7px 18px',
                        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'rgba(0,255,204,0.7)', cursor: 'none',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.6)'; e.currentTarget.style.color = '#00ffcc'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,204,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.25)'; e.currentTarget.style.color = 'rgba(0,255,204,0.7)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    ← Back
                </button>
            </nav>

            <section style={{ padding: '80px 44px', maxWidth: 1100, margin: '0 auto' }}>
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: '#00ffcc', letterSpacing: '0.25em', textTransform: 'uppercase',
                        marginBottom: 18, opacity: 0.8,
                    }}>
                        // selected works
                    </div>
                    <h1 style={{
                        margin: 0, fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff',
                        marginBottom: 60
                    }}>
                        Featured <span style={{ color: '#00ffcc', textShadow: '0 0 40px rgba(0,255,204,0.3)' }}>Projects</span>
                    </h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
                        {PROJECTS.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
