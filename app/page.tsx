'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const Scene        = dynamic(() => import('./scene'),         { ssr: false });
const ContactScene = dynamic(() => import('./contact'), { ssr: false });
import AboutPage   from './about';
import ProjectsPage from './projects';
import SkillsPage from './skills';

// ─────────────────────────────────────────────────────────────────────────────
// Custom cursor
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const raw = useRef({ x: -100, y: -100 });
  const lag = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { raw.current.x = e.clientX; raw.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });
    const tick = () => {
      lag.current.x += (raw.current.x - lag.current.x) * 0.13;
      lag.current.y += (raw.current.y - lag.current.y) * 0.13;
      if (ringRef.current) ringRef.current.style.transform = `translate(${raw.current.x - 18}px,${raw.current.y - 18}px)`;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${lag.current.x - 4}px,${lag.current.y - 4}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={ringRef} style={{ position:'fixed', top:0, left:0, width:36, height:36, borderRadius:'50%', border:'1px solid rgba(0,255,204,0.55)', pointerEvents:'none', zIndex:9999, willChange:'transform' }} />
      <div ref={dotRef}  style={{ position:'fixed', top:0, left:0, width:8,  height:8,  borderRadius:'50%', background:'#00ffcc', boxShadow:'0 0 10px #00ffcc', pointerEvents:'none', zIndex:9999, willChange:'transform' }} />
    </>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// Desk scene SVG — no character, just the workspace
// ─────────────────────────────────────────────────────────────────────────────
function DeveloperSVG() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(id);
  }, []);

  const screenLines = ['> npm run dev', '✓ compiled', '> git push', '$ cd portfolio'];
  const visibleLine = screenLines[tick % screenLines.length];

  return (
    <svg
      viewBox="0 0 420 260"
      style={{ width: '100%', maxWidth: 500, filter: 'drop-shadow(0 0 28px rgba(0,120,255,0.2))' }}
    >
      {/* ── Desk surface ── */}
      <rect x="10" y="178" width="400" height="14" rx="3" fill="#0a1628" stroke="#1a3050" strokeWidth="1.5" />
      <rect x="10" y="178" width="400" height="3" rx="2" fill="#1e4060" opacity="0.8" />
      {/* Desk legs */}
      <rect x="28"  y="192" width="9" height="55" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <rect x="383" y="192" width="9" height="55" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />

      {/* ── Plant (left corner) ── */}
      <rect x="18" y="154" width="12" height="24" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <ellipse cx="24" cy="152" rx="13" ry="10" fill="#0a2010" stroke="#0d3015" strokeWidth="1" />
      <ellipse cx="16" cy="148" rx="10" ry="7" fill="#0d2a12" stroke="#0d3015" strokeWidth="1" />
      <ellipse cx="33" cy="149" rx="9"  ry="7"  fill="#0a2510" stroke="#0d3015" strokeWidth="1" />
      <ellipse cx="24" cy="143" rx="7"  ry="5"  fill="#0c2e14" stroke="#0d3015" strokeWidth="1" />

      {/* ── Monitor ── */}
      <rect x="190" y="68" width="170" height="104" rx="4" fill="#050d1a" stroke="#1a3a5c" strokeWidth="1.5" />
      <rect x="195" y="73" width="160" height="92"  rx="2" fill="#020810" />
      {/* Screen content */}
      <rect x="197" y="75" width="156" height="88" rx="1.5" fill="#010609" />
      {['#00ff88','#0099ff','#ff6644','#00ffcc','#ffaa00'].map((c, i) => (
        <rect key={i} x={202} y={81 + i * 15} width={18 + Math.sin(i * 1.4) * 7 + 48} height={6} rx="1.5" fill={c} opacity={0.65} />
      ))}
      <rect x="202" y="152" width="72" height="6" rx="1.5" fill="#00ffcc" opacity="0.9" />
      {/* Blinking cursor on monitor */}
      <rect x="276" y="152" width="4" height="6" rx="1" fill="#00ffcc" opacity={tick % 2 === 0 ? 1 : 0} />
      {/* Monitor stand */}
      <rect x="268" y="172" width="14" height="6" rx="1" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <rect x="254" y="177" width="42" height="4" rx="1" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      {/* Monitor brand dot */}
      <circle cx="275" cy="170" r="2.5" fill="#1a3a5c" />

      {/* ── Laptop (left of monitor) ── */}
      <rect x="68" y="135" width="112" height="44" rx="3" fill="#071020" stroke="#1a3a5c" strokeWidth="1.2" />
      <rect x="72" y="138" width="104" height="35" rx="2" fill="#020810" />
      <rect x="73" y="139" width="102" height="33" rx="1.5" fill="#041020" />
      {/* Laptop screen text */}
      <text x="78" y="153" fontSize="7.5" fontFamily="monospace" fill="#00ffcc" opacity="0.9">{visibleLine}</text>
      {/* Cursor on laptop */}
      <rect x={78 + visibleLine.length * 4.35} y="148" width="2.5" height="8" rx="0.5" fill="#00ffcc" opacity={tick % 2 === 0 ? 0.9 : 0} />
      {[0,1].map(i => (
        <rect key={i} x={78} y={161 + i * 8} width={28 + i * 20} height={4} rx="1" fill={['#0066ff','#ff6644'][i]} opacity={0.45} />
      ))}
      {/* Laptop base */}
      <rect x="60" y="178" width="128" height="5" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      {/* Keyboard row */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={68 + i * 18} y="176" width="13" height="3" rx="0.5" fill="#0d1e30" opacity="0.9" />
      ))}
      {/* Trackpad */}
      <rect x="102" y="180" width="32" height="2.5" rx="1" fill="#1a3050" opacity="0.6" />

      {/* ── Mouse ── */}
      <rect x="248" y="170" width="16" height="11" rx="4" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <line x1="256" y1="170" x2="256" y2="181" stroke="#1a3050" strokeWidth="0.8" />

      {/* ── Small desk lamp ── */}
      <rect x="373" y="150" width="6" height="28" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <ellipse cx="376" cy="150" rx="8" ry="4" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <path d="M368 148 Q360 138 368 130" fill="none" stroke="#1a3050" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="370" cy="130" rx="12" ry="6" fill="#0d1e30" stroke="#1a3050" strokeWidth="1" />
      {/* Lamp glow */}
      <ellipse cx="370" cy="135" rx="30" ry="12" fill="rgba(255,220,100,0.04)" />

      {/* ── Coffee mug ── */}
      <rect x="358" y="156" width="16" height="20" rx="3" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <path d="M374 161 Q384 161 384 168 Q384 175 374 175" fill="none" stroke="#1a3050" strokeWidth="1.2" />
      <rect x="360" y="158" width="12" height="3" rx="1" fill="#3d1a00" opacity="0.6" />
      {/* Steam */}
      <path d="M363 152 Q365 146 363 140" fill="none" stroke="rgba(100,200,255,0.28)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M369 150 Q371 144 369 138" fill="none" stroke="rgba(100,200,255,0.28)" strokeWidth="1.2" strokeLinecap="round" />

      {/* ── Phone flat on desk ── */}
      <rect x="314" y="172" width="32" height="6" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <rect x="316" y="173" width="28" height="4" rx="1" fill="#020810" />
      {/* Phone screen glow */}
      <rect x="317" y="173.5" width="26" height="3" rx="0.8" fill="#001433" />
      <rect x="319" y="174.5" width="10" height="1.5" rx="0.5" fill="#0066ff" opacity="0.5" />
      <rect x="331" y="174.5" width="8"  height="1.5" rx="0.5" fill="#00ffcc" opacity="0.4" />

      {/* ── Chair (empty, peeking below desk) ── */}
      {/* Seat */}
      <rect x="100" y="210" width="80" height="12" rx="3" fill="#0c1a2e" stroke="#1a3050" strokeWidth="1.2" />
      {/* Chair back */}
      <rect x="152" y="185" width="22" height="28" rx="4" fill="#0c1a2e" stroke="#1a3050" strokeWidth="1.2" />
      {/* Back top curve */}
      <rect x="150" y="183" width="26" height="5" rx="3" fill="#0c1a2e" stroke="#1a3050" strokeWidth="1" />
      {/* Center stem */}
      <rect x="135" y="222" width="10" height="22" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      {/* Base plate */}
      <rect x="112" y="242" width="56" height="6"  rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      {/* Wheels */}
      <circle cx="118" cy="249" r="4.5" fill="#070e1a" stroke="#1a3050" strokeWidth="1" />
      <circle cx="140" cy="249" r="4.5" fill="#070e1a" stroke="#1a3050" strokeWidth="1" />
      <circle cx="162" cy="249" r="4.5" fill="#070e1a" stroke="#1a3050" strokeWidth="1" />
      {/* Armrests */}
      <rect x="96"  y="213" width="14" height="4" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />
      <rect x="170" y="213" width="14" height="4" rx="2" fill="#0a1628" stroke="#1a3050" strokeWidth="1" />

      {/* ── Desk ambient glow ── */}
      <ellipse cx="210" cy="184" rx="180" ry="7" fill="rgba(0,80,200,0.07)" />
      {/* Monitor screen ambient glow on desk */}
      <ellipse cx="275" cy="182" rx="60" ry="5" fill="rgba(0,180,255,0.06)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Email copy panel
// ─────────────────────────────────────────────────────────────────────────────
function EmailPanel() {
  const EMAIL = 'deepakshantoriya@gmail.com';
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 28,
      alignItems: 'flex-start', maxWidth: 400,
    }}>
      {/* Label */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#00ffcc', opacity: 0.7, marginBottom: 10,
        }}>
          // reach out
        </div>
        <h2 style={{
          margin: 0, fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          fontWeight: 800, lineHeight: 1.1,
          letterSpacing: '-0.03em', color: '#fff',
        }}>
          Let&apos;s build<br />
          <span style={{ color: '#00ffcc', textShadow: '0 0 30px rgba(0,255,204,0.3)' }}>
            something
          </span>{' '}great
        </h2>
        <p style={{
          marginTop: 14, fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.7, maxWidth: 320,
        }}>
          Open to full-time roles, freelance contracts, and interesting side projects.
          Drop me a line — I usually reply within 24 hours.
        </p>
      </div>

      {/* Email copy box */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={copy}
        style={{
          display: 'flex', alignItems: 'center', gap: 0,
          background: hovered ? 'rgba(0,255,204,0.06)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${hovered ? 'rgba(0,255,204,0.4)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 4, overflow: 'hidden',
          transition: 'background 0.2s, border-color 0.2s',
          cursor: 'none',
          boxShadow: hovered ? '0 0 30px rgba(0,255,204,0.12)' : 'none',
        }}
      >
        <div style={{
          padding: '14px 20px',
          fontFamily: 'var(--font-mono)', fontSize: '0.95rem',
          color: hovered ? '#fff' : 'rgba(255,255,255,0.65)',
          letterSpacing: '0.04em',
          transition: 'color 0.2s',
          userSelect: 'none',
        }}>
          {EMAIL}
        </div>
        <div style={{
          padding: '14px 18px',
          borderLeft: `1px solid ${hovered ? 'rgba(0,255,204,0.3)' : 'rgba(255,255,255,0.08)'}`,
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: copied ? '#00ffcc' : (hovered ? '#00ffcc' : 'rgba(255,255,255,0.35)'),
          transition: 'color 0.2s, border-color 0.2s',
          whiteSpace: 'nowrap',
          minWidth: 80, textAlign: 'center',
        }}>
          {copied ? '✓ Copied!' : 'Copy'}
        </div>
      </div>

      {/* Or section */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 340,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          or connect
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/deepjangid', color: '#e2e8f0' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepak-kumar-432889148/', color: '#0a66c2' },
          ].map(({ label, href, color }) => (
            <SocialBtn key={label} label={label} href={href} color={color} />
          ))}
        </div>
      </div>

      {/* Response time */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em',
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: '#00ff88', boxShadow: '0 0 6px #00ff88',
          animation: 'blink 2.4s ease-in-out infinite',
          display: 'inline-block',
        }} />
        Typically responds within 24 hrs
      </div>
    </div>
  );
}

function SocialBtn({ label, href, color }: { label: string; href: string; color: string }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '8px 16px',
        background: h ? `${color}14` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${h ? color + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 3,
        fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: h ? color : 'rgba(255,255,255,0.3)',
        cursor: 'none',
        transition: 'all 0.18s',
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact page overlay
// ─────────────────────────────────────────────────────────────────────────────
function ContactPage({ onBack }: { onBack: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 20,
      display: 'flex', flexDirection: 'column',
      opacity: show ? 1 : 0,
      transition: 'opacity 0.7s ease',
    }}>
      {/* Nav bar */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '26px 44px', zIndex: 30,
        background: 'linear-gradient(to bottom, rgba(0,6,15,0.85), transparent)',
        pointerEvents: 'all',
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
            transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s',
            display: 'flex', alignItems: 'center', gap: 7,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.6)'; e.currentTarget.style.color = '#00ffcc'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,204,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.25)'; e.currentTarget.style.color = 'rgba(0,255,204,0.7)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          ← Back
        </button>
      </nav>

      {/* Main content — split layout */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 44px 40px',
        gap: 'clamp(40px, 6vw, 100px)',
      }}>
        {/* Left — character */}
        <div style={{
          flex: '0 0 auto',
          width: 'clamp(260px, 35vw, 440px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          transform: show ? 'translateY(0)' : 'translateY(30px)',
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <DeveloperSVG />
          {/* Name tag below character */}
          <div style={{
            marginTop: 12,
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            <span style={{ color: 'rgba(0,255,204,0.4)' }}>status:</span> brb, grabbing coffee
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: 1, alignSelf: 'stretch', maxHeight: 380,
          margin: 'auto 0',
          background: 'linear-gradient(to bottom, transparent, rgba(0,255,204,0.15) 30%, rgba(0,255,204,0.15) 70%, transparent)',
          flexShrink: 0,
        }} />

        {/* Right — email */}
        <div style={{
          flex: '1 1 auto',
          maxWidth: 440,
          transform: show ? 'translateX(0)' : 'translateX(30px)',
          transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s',
          pointerEvents: 'all',
        }}>
          <EmailPanel />
        </div>
      </div>

      {/* Corner brackets */}
      {[
        { top:14, left:14 }, { top:14, right:14 },
        { bottom:14, left:14 }, { bottom:14, right:14 },
      ].map((pos, i) => (
        <div key={i} style={{
          position:'absolute',
          top: 'top' in pos ? pos.top : undefined,
          bottom: 'bottom' in pos ? (pos as any).bottom : undefined,
          left: 'left' in pos ? pos.left : undefined,
          right: 'right' in pos ? (pos as any).right : undefined,
          width:18, height:18,
          borderTop:    i < 2 ? '1px solid rgba(0,255,204,0.15)' : 'none',
          borderBottom: i >= 2 ? '1px solid rgba(0,255,204,0.15)' : 'none',
          borderLeft:   i % 2 === 0 ? '1px solid rgba(0,255,204,0.15)' : 'none',
          borderRight:  i % 2 === 1 ? '1px solid rgba(0,255,204,0.15)' : 'none',
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skill labels
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'TypeScript', color: '#3b82f6', top: '28%', left: '21%' },
  { label: 'React', color: '#67e8f9', top: '32%', right: '8%' },
  { label: 'Next.js', color: '#e2e8f0', top: '60%', left: '25%' },
  { label: 'Node.js', color: '#68a063', top: '64%', right: '17%' },
  { label: 'Three.js', color: '#00ffcc', top: '14%', left: '44%' },
  { label: 'GraphQL', color: '#e535ab', top: '44%', left: '20%' },
  { label: 'Docker', color: '#2496ed', top: '20%', right: '19%' },
];

function SkillLabel({ label, color, style }: { label: string; color: string; style: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        display: 'flex', alignItems: 'center', gap: 7,
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        color: hovered ? '#fff' : color,
        opacity: hovered ? 1 : 0.75,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        pointerEvents: 'all',
        transition: 'opacity 0.2s, color 0.2s',
        userSelect: 'none',
        ...style,
      }}
    >
      <span style={{ width:6, height:6, borderRadius:'50%', background:color, boxShadow:`0 0 8px ${color}`, flexShrink:0 }} />
      {label}
    </div>
  );
}

function NavLink({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none', border: 'none', padding: '2px 0',
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: hovered ? '#00ffcc' : 'rgba(255,255,255,0.45)',
        cursor: 'none',
        transition: 'color 0.2s',
        position: 'relative',
      }}
    >
      {label}
      <span style={{
        position:'absolute', bottom:0, left:0, height:1,
        width: hovered ? '100%' : '0%',
        background:'#00ffcc',
        transition:'width 0.22s ease',
        display:'block',
      }} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root page — manages view state + warp transition
// ─────────────────────────────────────────────────────────────────────────────
type View = 'home' | 'contact' | 'about' | 'skills' | 'projects';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    document.body.style.cursor = 'none';
    const t = setTimeout(() => setVisible(true), 200);
    return () => { document.body.style.cursor = ''; clearTimeout(t); };
  }, []);

  const navigate = useCallback((next: View) => {
    if (view === next) return;
    setView(next);
  }, [view]);

  const goContact  = useCallback(() => navigate('contact'),  [navigate]);
  const goAbout    = useCallback(() => navigate('about'),    [navigate]);
  const goSkills   = useCallback(() => navigate('skills'),   [navigate]);
  const goProjects = useCallback(() => navigate('projects'), [navigate]);
  const goHome     = useCallback(() => navigate('home'),     [navigate]);

  const socialMedia = [
    {
id: 'github', label: 'GitHub', href: 'https://github.com/deepjangid', color: '#e2e8f0',
    },
    {
id: 'linkedIn', label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepak-kumar-432889148', color: '#e2e8f0',
    }
  ];

  return (
    <>
      <CustomCursor />

      {/* ── Background scenes ── */}
      <div style={{ opacity: view === 'home' ? 1 : 0, transition: 'opacity 0.5s', pointerEvents: view === 'home' ? 'all' : 'none' }}>
        <Scene />
      </div>
      <div style={{ opacity: view === 'contact' ? 1 : 0, transition: 'opacity 0.5s', pointerEvents: view === 'contact' ? 'all' : 'none' }}>
        <ContactScene />
      </div>

      {/* ── Home overlay ── */}
      {view === 'home' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.9s ease',
        }}>
          <nav style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '26px 44px',
            background: 'linear-gradient(to bottom, rgba(0,8,20,0.75), transparent)',
            pointerEvents: 'all',
          }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.95rem', color:'#00ffcc', letterSpacing:'0.2em', textShadow:'0 0 18px rgba(0,255,204,0.5)' }}>
              <span style={{ color:'rgba(255,255,255,0.25)' }}>//</span> Deepak Jangid
            </div>
            <div style={{ display:'flex', gap:'2.2rem' }}>
              <NavLink label="About"    onClick={goAbout} />
              <NavLink label="Projects" onClick={goProjects} />
              <NavLink label="Skills"   onClick={goSkills} />
              <NavLink label="Contact"  onClick={goContact} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:7, fontFamily:'var(--font-mono)', fontSize:'0.66rem', color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#00ff88', boxShadow:'0 0 6px #00ff88', display:'inline-block', animation:'blink 2.4s ease-in-out infinite' }} />
              AVAILABLE FOR WORK
            </div>
          </nav>

          <div style={{ position:'absolute', left:44, top:'50%', transform:'translateY(-50%)', maxWidth:500 }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.66rem', color:'#00ffcc', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:14, opacity:0.8 }}>
              Full-Stack Engineer &amp; Creative Dev
            </p>
            <h1 style={{ margin:0, fontSize:'clamp(2.6rem,4.5vw,4.8rem)', fontWeight:800, lineHeight:1.06, letterSpacing:'-0.03em', fontFamily:'var(--font-sans)', color:'#fff' }}>
              Building the{' '}
              <span style={{ color:'#00ffcc', textShadow:'0 0 40px rgba(0,255,204,0.35)' }}>digital</span>
              {' '}frontier
            </h1>
            <p style={{ marginTop:22, fontFamily:'var(--font-mono)', fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', lineHeight:1.75, letterSpacing:'0.02em', maxWidth:400 }}>
              High-performance web experiences at the intersection of design and engineering — reactive UIs to distributed systems.
            </p>
            <div style={{ display:'flex', gap:14, marginTop:36, pointerEvents:'all' }}>
              <button 
                onClick={goProjects}
                style={{ padding:'11px 30px', background:'#00ffcc', color:'#000814', border:'none', borderRadius:2, fontFamily:'var(--font-mono)', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'none', boxShadow:'0 0 28px rgba(0,255,204,0.28)', transition:'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { const b=e.currentTarget; b.style.transform='translateY(-2px)'; b.style.boxShadow='0 0 44px rgba(0,255,204,0.5)'; }}
                onMouseLeave={e => { const b=e.currentTarget; b.style.transform=''; b.style.boxShadow='0 0 28px rgba(0,255,204,0.28)'; }}
              >View Projects</button>
              <button
                onClick={goContact}
                style={{ padding:'11px 30px', background:'transparent', color:'rgba(255,255,255,0.6)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:2, fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.12em', textTransform:'uppercase', cursor:'none', transition:'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { const b=e.currentTarget; b.style.borderColor='rgba(0,255,204,0.45)'; b.style.color='#00ffcc'; }}
                onMouseLeave={e => { const b=e.currentTarget; b.style.borderColor='rgba(255,255,255,0.14)'; b.style.color='rgba(255,255,255,0.6)'; }}
              >Get in Touch</button>
            </div>
          </div>

          {SKILLS.map(s => (
            <SkillLabel key={s.label} label={s.label} color={s.color} style={{ top:s.top, ...('left' in s ? { left:s.left } : {}), ...('right' in s ? { right:(s as any).right } : {}) }} />
          ))}

          <div style={{ position:'absolute', bottom:36, left:44, display:'flex', gap:40 }}>
            {[['4+','Years XP'],['20+','Projects']].map(([v,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'1.9rem', fontWeight:700, color:'#00ffcc', fontFamily:'var(--font-mono)', textShadow:'0 0 18px rgba(0,255,204,0.45)', letterSpacing:'-0.02em' }}>{v}</div>
                <div style={{ fontSize:'0.64rem', color:'rgba(255,255,255,0.35)', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ position:'absolute', right:44, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:22, alignItems:'flex-end' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'rgba(255,255,255,0.28)', textAlign:'right', letterSpacing:'0.08em' }}>
              <div style={{ color:'rgba(0,255,204,0.45)', marginBottom:6, letterSpacing:'0.12em', textTransform:'uppercase' }}>Current Stack</div>
              {['Next.js 16','React 19','TypeScript','Rust'].map(s => <div key={s} style={{ marginBottom:3 }}>{s}</div>)}
            </div>
          </div>

          <div style={{ position:'absolute', bottom:36, right:44, display:'flex', gap:18, alignItems:'center', pointerEvents:'all' }}>
            {socialMedia.map(s => (
              <button key={s.id} style={{ background:'none', border:'none', padding:0, fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', cursor:'none', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='#00ffcc')}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.22)')}
                onClick={() => window.open(s.href, '_blank', 'noopener,noreferrer')}
              >{s.label}</button>
            ))}
          </div>

          {[{top:14,left:14},{top:14,right:14},{bottom:14,left:14},{bottom:14,right:14}].map((pos,i) => (
            <div key={i} style={{ position:'absolute', top:'top' in pos?pos.top:undefined, bottom:'bottom' in pos?(pos as any).bottom:undefined, left:'left' in pos?pos.left:undefined, right:'right' in pos?(pos as any).right:undefined, width:18, height:18, borderTop:i<2?'1px solid rgba(0,255,204,0.18)':'none', borderBottom:i>=2?'1px solid rgba(0,255,204,0.18)':'none', borderLeft:i%2===0?'1px solid rgba(0,255,204,0.18)':'none', borderRight:i%2===1?'1px solid rgba(0,255,204,0.18)':'none' }} />
          ))}

          {/* <div style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'rgba(255,255,255,0.18)', letterSpacing:'0.15em', textTransform:'uppercase' }}>Scroll</div>
            <div style={{ width:1, height:36, background:'linear-gradient(to bottom,rgba(0,255,204,0.35),transparent)', animation:'scrollLine 2s ease-in-out infinite' }} />
          </div> */}
        </div>
      )}

      {/* ── Contact overlay ── */}
      {view === 'contact' && <ContactPage onBack={goHome} />}

      {/* ── About overlay ── */}
      {view === 'about' && <AboutPage onBack={goHome} />}

      {/* ── Skills overlay ── */}
      {view === 'skills' && <SkillsPage onBack={goHome} />}

      {/* ── Projects overlay ── */}
      {view === 'projects' && <ProjectsPage onBack={goHome} />}

      <style>{`
        * { cursor: none !important; }
        html, body { overflow: hidden; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes scrollLine { 0%,100%{opacity:0.35;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.15)} }
      `}</style>
    </>
  );
}