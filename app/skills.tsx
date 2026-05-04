'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SKILLS_DATA = [
    {
        category: 'Frontend Engineering',
        color: '#67e8f9',
        skills: [
            { name: 'React.js', level: 95 },
            { name: 'Next.js', level: 90 },
            { name: 'Redux', level: 85 },
            { name: 'React Native', level: 80 },
            { name: 'HTML5 / CSS3', level: 95 },
            { name: 'Tailwind / SCSS', level: 90 },
            { name: 'Ant Design / MUI', level: 85 }
        ]
    },
    {
        category: 'Backend & APIs',
        color: '#68a063',
        skills: [
            { name: 'Node.js', level: 95 },
            { name: 'NestJS', level: 90 },
            { name: 'Express.js', level: 90 },
            { name: 'Laravel', level: 75 },
            { name: 'REST APIs', level: 95 },
            { name: 'GraphQL', level: 80 },
            { name: 'Microservices', level: 85 }
        ]
    },
    {
        category: 'Databases & Cache',
        color: '#f59e0b',
        skills: [
            { name: 'PostgreSQL', level: 90 },
            { name: 'MongoDB', level: 85 },
            { name: 'MySQL', level: 85 },
            { name: 'Redis', level: 80 }
        ]
    },
    {
        category: 'DevOps & Cloud',
        color: '#a78bfa',
        skills: [
            { name: 'Docker', level: 85 },
            { name: 'AWS', level: 80 },
            { name: 'Nginx', level: 80 },
            { name: 'PM2', level: 85 },
            { name: 'GitHub Actions', level: 85 },
            { name: 'Vercel', level: 90 }
        ]
    },
    {
        category: 'Integrations & Tools',
        color: '#f472b6',
        skills: [
            { name: 'Stripe API', level: 90 },
            { name: 'WhatsApp Business API', level: 85 },
            { name: 'PhonePe', level: 80 },
            { name: 'Git & GitHub', level: 95 },
            { name: 'Jira & Trello', level: 90 }
        ]
    }
];

function SkillCard({ category, color, skills, index }: { category: string, color: string, skills: any[], index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            className="w-full"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: `0 20px 40px -20px rgba(0,0,0,0.5)`,
                    cursor: 'none',
                    position: 'relative'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: -1, left: -1, right: -1, height: 2,
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: 0.5,
                    borderRadius: '16px 16px 0 0'
                }} />
                
                <h3 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: color,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />
                    {category}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {skills.map((skill, i) => (
                        <div key={i} style={{ width: '100%' }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
                                color: 'rgba(255,255,255,0.85)', marginBottom: 6
                            }}>
                                <span>{skill.name}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{skill.level}%</span>
                            </div>
                            <div style={{
                                width: '100%', height: 4, background: 'rgba(255,255,255,0.05)',
                                borderRadius: 2, overflow: 'hidden'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                                    style={{
                                        height: '100%',
                                        background: color,
                                        boxShadow: `0 0 10px ${color}`
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function SkillsPage({ onBack }: { onBack: () => void }) {
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
                background: 'radial-gradient(circle at 80% 20%, rgba(0,255,204,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(167,139,250,0.05) 0%, transparent 50%)'
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

            <section style={{ padding: '80px 44px', maxWidth: 1200, margin: '0 auto' }}>
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: '#a78bfa', letterSpacing: '0.25em', textTransform: 'uppercase',
                        marginBottom: 18, opacity: 0.8,
                    }}>
                        // expertise
                    </div>
                    <h1 style={{
                        margin: 0, fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff',
                        marginBottom: 60
                    }}>
                        Technical <span style={{ color: '#a78bfa', textShadow: '0 0 40px rgba(167,139,250,0.3)' }}>Arsenal</span>
                    </h1>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: 32 
                    }}>
                        {SKILLS_DATA.map((data, i) => (
                            <SkillCard key={i} index={i} {...data} />
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
