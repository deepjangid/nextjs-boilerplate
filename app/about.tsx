'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                const duration = 1400;
                const start = performance.now();
                const tick = (now: number) => {
                    const p = Math.min((now - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - p, 3);
                    setCount(Math.round(ease * target));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Passion card ─────────────────────────────────────────────────────────────
function PassionCard({ icon, title, desc, color, delay }: {
    icon: React.ReactNode; title: string; desc: string; color: string; delay: number;
}) {
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setVisible(true);
        }, { threshold: 0.2 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: '1 1 200px',
                padding: '28px 24px',
                border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 6,
                background: hovered ? `${color}0a` : 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease',
                cursor: 'none',
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${delay}ms`,
                boxShadow: hovered ? `0 0 30px ${color}15, inset 0 0 30px ${color}08` : 'none',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: hovered ? `linear-gradient(to right, transparent, ${color}, transparent)` : 'transparent',
                transition: 'all 0.3s',
            }} />
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>{icon}</div>
            <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700,
                color: hovered ? color : '#fff', marginBottom: 8,
                letterSpacing: '-0.01em', transition: 'color 0.3s',
            }}>{title}</div>
            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.38)', lineHeight: 1.7,
                letterSpacing: '0.02em',
            }}>{desc}</div>
        </div>
    );
}

// ─── Skill pill ───────────────────────────────────────────────────────────────
function SkillPill({ label, color, delay }: { label: string; color: string; delay: number }) {
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setVisible(true);
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '7px 16px',
                border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: hovered ? color : 'rgba(255,255,255,0.45)',
                background: hovered ? `${color}12` : 'transparent',
                transition: 'all 0.18s ease',
                cursor: 'none',
                transform: visible ? 'scale(1)' : 'scale(0.85)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${delay}ms`,
                boxShadow: hovered ? `0 0 12px ${color}30` : 'none',
                whiteSpace: 'nowrap',
            }}
        >
            {label}
        </div>
    );
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} style={{
            marginBottom: 48,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            opacity: visible ? 1 : 0,
            transition: 'all 0.6s ease',
        }}>
            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: accent, letterSpacing: '0.25em', textTransform: 'uppercase',
                marginBottom: 10, opacity: 0.8,
            }}>{eyebrow}</div>
            <h2 style={{
                margin: 0, fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff',
            }}>{title}</h2>
            <div style={{ width: 48, height: 2, background: accent, marginTop: 16, borderRadius: 1, boxShadow: `0 0 10px ${accent}` }} />
        </div>
    );
}

// ─── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({ year, role, place, desc, color, delay }: {
    year: string; role: string; place: string; desc: string; color: string; delay: number;
}) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', gap: 24, alignItems: 'flex-start',
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                opacity: visible ? 1 : 0,
                transition: `all 0.55s ease ${delay}ms`,
                cursor: 'none',
            }}
        >
            {/* Left: year + dot + line */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: hovered ? color : 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.08em', marginBottom: 8, transition: 'color 0.2s',
                }}>{year}</div>
                <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: hovered ? color : 'rgba(255,255,255,0.2)',
                    boxShadow: hovered ? `0 0 12px ${color}` : 'none',
                    transition: 'all 0.2s', flexShrink: 0,
                }} />
                <div style={{ width: 1, flex: 1, minHeight: 40, background: 'rgba(255,255,255,0.07)', marginTop: 6 }} />
            </div>
            {/* Right: content */}
            <div style={{ paddingBottom: 32 }}>
                <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700,
                    color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
                    letterSpacing: '-0.01em', marginBottom: 4, transition: 'color 0.2s',
                }}>{role}</div>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                    color: color, letterSpacing: '0.08em', textTransform: 'uppercase',
                    marginBottom: 10,
                }}>{place}</div>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.73rem',
                    color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 480,
                }}>{desc}</div>
            </div>
        </div>
    );
}

// ─── Main About component ─────────────────────────────────────────────────────
export default function AboutPage({ onBack }: { onBack: () => void }) {
    const [show, setShow] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 80);
        return () => clearTimeout(t);
    }, []);

    const skills = [
        { label: 'Next.js', color: '#e2e8f0' },
        { label: 'React.js', color: '#67e8f9' },
        { label: 'Three.js', color: '#00ffcc' },
        { label: 'Node.js', color: '#68a063' },
        { label: 'Express', color: '#94a3b8' },
        { label: 'MongoDB', color: '#47a248' },
        { label: 'PostgreSQL', color: '#336791' },
        { label: 'Docker', color: '#2496ed' },
        { label: 'SQL', color: '#f59e0b' },
        { label: 'Laravel', color: '#ff2d20' },
        { label: 'Rete.js', color: '#a78bfa' },
        { label: 'Grape.js', color: '#f472b6' },
        { label: 'Survey.js', color: '#34d399' },
        { label: 'Tailwind', color: '#38bdf8' },
        { label: 'SCSS', color: '#cc6699' },
        { label: 'Ant Design', color: '#1677ff' },
        { label: 'MUI', color: '#007fff' },
        { label: 'HTML / CSS', color: '#f97316' },
    ];

    const passions = [
        {
            icon: '🎮',
            title: 'Video Games',
            desc: 'From open-world RPGs to competitive shooters — gaming is where I recharge and find unexpected design inspiration.',
            color: '#a78bfa',
            delay: 0,
        },
        {
            icon: '⌨️',
            title: 'Building Things',
            desc: 'Turning ideas into running software is the closest thing to magic. I build apps the way others doodle — constantly.',
            color: '#00ffcc',
            delay: 80,
        },
        {
            icon: '🏍️',
            title: 'Motorcycles',
            desc: 'Royal Enfield GT 650 energy — raw, purposeful machines. Two wheels, open roads, zero distractions.',
            color: '#f97316',
            delay: 160,
        },
        {
            icon: '🌍',
            title: 'Travelling',
            desc: 'New cities, new cultures, new bugs to fix while sitting in airports. Wanderlust meets laptop life.',
            color: '#34d399',
            delay: 240,
        },
    ];

    const timeline = [
        {
            year: '2025 →',
            role: 'Senior Frontend Developer',
            place: 'AleaIt Solutions Pvt. Ltd, Jaipur',
            desc: 'Building full-stack products for clients worldwide. From SaaS dashboards to mobile apps — full ownership from architecture to deployment.',
            color: '#00ffcc',
            delay: 0,
        },
        {
            year: '2022',
            role: 'Frontend Developer',
            place: 'AleaIt Solutions Pvt. Ltd, Jaipur',
            desc: 'Led frontend engineering on complex data-visualization tools. Introduced Rete.js and Survey.js for node-based editors used in production.',
            color: '#67e8f9',
            delay: 100,
        },
    ];

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 20,
            overflowY: 'auto', overflowX: 'hidden',
            opacity: show ? 1 : 0,
            transition: 'opacity 0.6s ease',
        }}
            ref={scrollRef}
        >
            {/* Subtle gradient background overlay */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 20% 50%, rgba(0,100,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,255,204,0.04) 0%, transparent 50%)',
            }} />

            {/* ── Nav ── */}
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

            {/* ── HERO ── */}
            <section style={{ padding: '80px 44px 60px', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{
                    transform: show ? 'translateY(0)' : 'translateY(30px)',
                    opacity: show ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
                }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: '#00ffcc', letterSpacing: '0.25em', textTransform: 'uppercase',
                        marginBottom: 18, opacity: 0.8,
                    }}>
            // about me
                    </div>

                    <div style={{ display: 'flex', gap: 'clamp(32px,5vw,80px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {/* Left — big intro */}
                        <div style={{ flex: '1 1 400px' }}>
                            <h1 style={{
                                margin: 0, fontFamily: 'var(--font-sans)',
                                fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                                fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff',
                            }}>
                                Developer.<br />
                                <span style={{ color: '#00ffcc', textShadow: '0 0 40px rgba(0,255,204,0.3)' }}>Freelancer.</span><br />
                                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65em', fontWeight: 400, letterSpacing: '-0.02em' }}>Gamer. Rider. Explorer.</span>
                            </h1>

                            <p style={{
                                marginTop: 28, fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.85, maxWidth: 480, letterSpacing: '0.02em',
                            }}>
                                4+ years building web & mobile applications that people actually use.
                                I work across the full stack — from pixel-perfect frontends to
                                distributed backends — and I do it as a freelancer and as part of
                                product teams.
                            </p>

                            <p style={{
                                marginTop: 14, fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)',
                                lineHeight: 1.85, maxWidth: 480, letterSpacing: '0.02em',
                            }}>
                                When I&apos;m not shipping code, I&apos;m chasing corners on two wheels,
                                exploring new places, or deep in a video game storyline that I&apos;m
                                convinced is better than most movies.
                            </p>
                        </div>

                        {/* Right — quick stats */}
                        <div style={{
                            flex: '0 0 auto',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2,
                            transform: show ? 'translateX(0)' : 'translateX(20px)',
                            opacity: show ? 1 : 0,
                            transition: 'all 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s',
                        }}>
                            {[
                                { v: 4, s: '+', label: 'Years XP', color: '#00ffcc' },
                                { v: 20, s: '+', label: 'Projects', color: '#67e8f9' },
                                { v: 18, s: '', label: 'Tech Stack', color: '#a78bfa' },
                                { v: 10, s: '+', label: 'Happy Clients', color: '#f97316' },
                            ].map(({ v, s, label, color }) => (
                                <div key={label} style={{
                                    padding: '28px 32px',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    textAlign: 'center',
                                }}>
                                    <div style={{
                                        fontSize: '2.4rem', fontWeight: 800,
                                        color, fontFamily: 'var(--font-mono)',
                                        letterSpacing: '-0.03em',
                                        textShadow: `0 0 24px ${color}50`,
                                    }}>
                                        <AnimatedNumber target={v} suffix={s} />
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                                        color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em',
                                        textTransform: 'uppercase', marginTop: 6,
                                    }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 44px' }}>
                <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0,255,204,0.12), transparent)' }} />
            </div>

            {/* ── PASSIONS ── */}
            <section style={{ padding: '72px 44px', maxWidth: 1100, margin: '0 auto' }}>
                <SectionHeading eyebrow="// what drives me" title="Beyond the screen" accent="#a78bfa" />
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {passions.map(p => <PassionCard key={p.title} {...p} />)}
                </div>
            </section>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 44px' }}>
                <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0,255,204,0.12), transparent)' }} />
            </div>

            {/* ── SKILLS ── */}
            <section style={{ padding: '72px 44px', maxWidth: 1100, margin: '0 auto' }}>
                <SectionHeading eyebrow="// tech stack" title="Tools I ship with" accent="#00ffcc" />

                {/* Category groups */}
                {[
                    {
                        label: 'Frontend',
                        color: '#67e8f9',
                        items: ['Next.js', 'React.js', 'Three.js', 'Tailwind', 'SCSS', 'Ant Design', 'MUI', 'HTML / CSS'],
                    },
                    {
                        label: 'Backend & Data',
                        color: '#68a063',
                        items: ['Node.js', 'Express', 'Laravel', 'MongoDB', 'PostgreSQL', 'SQL'],
                    },
                    {
                        label: 'Tools & Platforms',
                        color: '#a78bfa',
                        items: ['Docker', 'Rete.js', 'Grape.js', 'Survey.js'],
                    },
                ].map((group, gi) => {
                    const groupSkills = skills.filter(s => group.items.includes(s.label));
                    return (
                        <div key={group.label} style={{ marginBottom: 36 }}>
                            <div style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                                color: group.color, letterSpacing: '0.14em', textTransform: 'uppercase',
                                marginBottom: 14, opacity: 0.7,
                                display: 'flex', alignItems: 'center', gap: 10,
                            }}>
                                <span style={{ width: 18, height: 1, background: group.color, display: 'inline-block', opacity: 0.5 }} />
                                {group.label}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {groupSkills.map((s, i) => (
                                    <SkillPill key={s.label} label={s.label} color={s.color} delay={gi * 60 + i * 35} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 44px' }}>
                <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(0,255,204,0.12), transparent)' }} />
            </div>

            {/* ── TIMELINE ── */}
            <section style={{ padding: '72px 44px 80px', maxWidth: 1100, margin: '0 auto' }}>
                <SectionHeading eyebrow="// experience" title="How I got here" accent="#f97316" />
                <div style={{ maxWidth: 620 }}>
                    {timeline.map(t => <TimelineItem key={t.role} {...t} />)}
                </div>
            </section>

            {/* ── FOOTER CTA ── */}
            <section style={{
                padding: '60px 44px 80px', maxWidth: 1100, margin: '0 auto',
                textAlign: 'center',
            }}>
                <div style={{
                    padding: '48px', border: '1px solid rgba(0,255,204,0.12)',
                    borderRadius: 8, background: 'rgba(0,255,204,0.02)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Corner accents */}
                    {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((p, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            top: 'top' in p ? -1 : undefined, bottom: 'bottom' in p ? -1 : undefined,
                            left: 'left' in p ? -1 : undefined, right: 'right' in p ? -1 : undefined,
                            width: 20, height: 20,
                            borderTop: i < 2 ? '2px solid rgba(0,255,204,0.3)' : 'none',
                            borderBottom: i >= 2 ? '2px solid rgba(0,255,204,0.3)' : 'none',
                            borderLeft: i % 2 === 0 ? '2px solid rgba(0,255,204,0.3)' : 'none',
                            borderRight: i % 2 === 1 ? '2px solid rgba(0,255,204,0.3)' : 'none',
                        }} />
                    ))}
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                        color: '#00ffcc', letterSpacing: '0.22em', textTransform: 'uppercase',
                        marginBottom: 14, opacity: 0.7,
                    }}>// currently open to work</div>
                    <h3 style={{
                        margin: '0 0 16px', fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
                    }}>
                        Got something interesting?
                    </h3>
                    <p style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                        color: 'rgba(255,255,255,0.35)', marginBottom: 28, lineHeight: 1.7,
                    }}>
                        Freelance contracts, full-time roles, or just a cool idea — let&apos;s talk.
                    </p>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '12px 36px', background: '#00ffcc',
                            color: '#000814', border: 'none', borderRadius: 3,
                            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'none',
                            boxShadow: '0 0 30px rgba(0,255,204,0.25)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,255,204,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,204,0.25)'; }}
                    >
                        Go to home →
                    </button>
                </div>
            </section>
        </div>
    );
}