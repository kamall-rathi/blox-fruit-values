'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  BarChart3, Repeat, Calculator, Star, Gift, MessageSquare,
  TrendingUp, Zap, Shield, Sparkles, ArrowRight, Apple
} from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'Live Values', desc: 'Real-time prices updated by traders. Never overpay again.', href: '/values', accent: '#10b981' },
  { icon: Repeat, title: 'Trade Ads', desc: 'Post what you have, find what you want. Zero friction.', href: '/trading', accent: '#3b82f6' },
  { icon: Calculator, title: 'Calculator', desc: 'Drop both sides in. Get instant WIN / FAIR / LOSS verdict.', href: '/calculator', accent: '#8b5cf6' },
  { icon: Star, title: 'Reputation', desc: 'Rate traders. Build trust. Avoid scammers.', href: '/community', accent: '#f59e0b' },
  { icon: Gift, title: 'Giveaways', desc: 'Free fruits, daily drops, no catch.', href: '/giveaways', accent: '#ec4899' },
  { icon: MessageSquare, title: 'Safe Chat', desc: 'Built-in messaging. No Discord doxx.', href: '/messages', accent: '#06b6d4' },
];

const stats = [
  { value: '46+', label: 'Fruits Tracked', icon: Apple, color: '#10b981' },
  { value: '<1s', label: 'Load Time', icon: Zap, color: '#3b82f6' },
  { value: '24/7', label: 'Updated', icon: TrendingUp, color: '#8b5cf6' },
  { value: '100%', label: 'Free', icon: Shield, color: '#f59e0b' },
];

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed',
        top: '-200px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* HERO */}
      <section style={{ position: 'relative', padding: '80px 24px 60px', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '100px',
            padding: '8px 18px',
            fontSize: '13px',
            color: '#10b981',
            fontWeight: '600',
            marginBottom: '32px',
          }}>
            <Sparkles size={14} strokeWidth={2.5} />
            Faster than the rest
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: '900',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
          }}>
            Stop getting{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>scammed</span>
            <br />
            in Blox Fruits trades.
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '580px',
            margin: '0 auto 40px',
          }}>
            Real-time fruit values, trade ads, and a calculator that tells you
            instantly if a trade is fair. Built by traders, for traders.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/values" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '700',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
            }}>
              Check Fruit Values
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <Link href="/calculator" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(241, 245, 249, 0.05)',
              border: '1px solid rgba(241, 245, 249, 0.1)',
              color: '#f1f5f9',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '700',
            }}>
              <Calculator size={18} strokeWidth={2.5} />
              Open Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '40px 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{
                background: 'rgba(241, 245, 249, 0.03)',
                border: '1px solid rgba(241, 245, 249, 0.06)',
                borderRadius: '16px',
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  flexShrink: 0,
                }}>
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '900',
                    color: stat.color,
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                  }}>{stat.value}</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '4px',
                  }}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '60px 24px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#10b981',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}>
              <Sparkles size={14} strokeWidth={2.5} />
              What we do
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '900',
              letterSpacing: '-0.02em',
            }}>
              Everything traders need.<br />
              <span style={{ color: '#64748b' }}>Nothing they don&apos;t.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}>
            {features.map((f) => {
              const Icon = f.icon;
              const isHovered = hovered === f.href;
              return (
                <Link
                  key={f.href}
                  href={f.href}
                  onMouseEnter={() => setHovered(f.href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{
                    background: isHovered ? 'rgba(241, 245, 249, 0.05)' : 'rgba(241, 245, 249, 0.02)',
                    border: `1px solid ${isHovered ? f.accent + '60' : 'rgba(241, 245, 249, 0.06)'}`,
                    borderRadius: '16px',
                    padding: '28px',
                    height: '100%',
                    transition: 'all 0.2s',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered ? `0 10px 30px ${f.accent}20` : 'none',
                  }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      background: `${f.accent}15`,
                      border: `1px solid ${f.accent}30`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: f.accent,
                      marginBottom: '20px',
                    }}>
                      <Icon size={24} strokeWidth={2.2} />
                    </div>

                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: '#f1f5f9',
                    }}>{f.title}</h3>

                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      lineHeight: '1.6',
                    }}>{f.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '40px 24px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.05))',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '24px',
          padding: '60px 32px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '900',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            Your next trade could be a win.
          </h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '16px',
            marginBottom: '32px',
          }}>
            Or a loss. Check before you click accept.
          </p>
          <Link href="/calculator" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '700',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
          }}>
            <Calculator size={18} strokeWidth={2.5} />
            Open Trade Calculator
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(241, 245, 249, 0.06)',
        padding: '40px 24px',
        textAlign: 'center',
        color: '#475569',
        fontSize: '13px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          BloxValues © 2026 · Not affiliated with Roblox or Gamer Robot Inc.
        </div>
      </footer>

    </div>
  );
}