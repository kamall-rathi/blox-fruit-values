'use client';

import Link from 'next/link';

const features = [
  {
    icon: '📊',
    title: 'Real-Time Values',
    description: 'Live market data updated daily by our expert team',
    href: '/values',
    color: '#3b82f6',
  },
  {
    icon: '🔄',
    title: 'Trade Ads',
    description: 'Post and browse trades with our active community',
    href: '/trading',
    color: '#8b5cf6',
  },
  {
    icon: '🧮',
    title: 'Smart Calculator',
    description: 'Analyze trades with precision and confidence',
    href: '/calculator',
    color: '#06b6d4',
  },
  {
    icon: '⭐',
    title: 'Safe Trading',
    description: 'Trusted platform with verified community members',
    href: '/community',
    color: '#f59e0b',
  },
  {
    icon: '🎁',
    title: 'Giveaways',
    description: 'Participate in exciting community giveaways',
    href: '/giveaways',
    color: '#10b981',
  },
  {
    icon: '💬',
    title: 'Safe Messaging',
    description: 'Monitored messages to keep trading secure',
    href: '/messages',
    color: '#ef4444',
  },
];

const stats = [
  { value: '50K+', label: 'Active Traders' },
  { value: '100+', label: 'Fruits Tracked' },
  { value: '24/7', label: 'Live Updates' },
  { value: '0ms', label: 'Load Time' },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>

      {/* Hero */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 24px 80px',
        textAlign: 'center',
      }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%',
          transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50px', left: '20%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: '100px',
            padding: '6px 16px',
            fontSize: '13px', color: '#93c5fd',
            marginBottom: '24px',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', display: 'inline-block' }} />
            #1 Blox Fruits Trading Platform
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            Blox Fruits{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Values</span>
            <br />& Trading Hub
          </h1>

          <p style={{
            fontSize: '18px', color: '#94a3b8',
            lineHeight: '1.7', marginBottom: '40px',
            maxWidth: '560px', margin: '0 auto 40px',
          }}>
            The ultimate hub for Blox Fruits trading. Discover real-time values,
            create trade ads, and connect with our trusted community.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/trading" style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#fff', textDecoration: 'none',
              padding: '14px 32px', borderRadius: '12px',
              fontSize: '16px', fontWeight: '700',
              boxShadow: '0 0 30px rgba(59,130,246,0.3)',
            }}>
              Start Trading →
            </Link>
            <Link href="/values" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', textDecoration: 'none',
              padding: '14px 32px', borderRadius: '12px',
              fontSize: '16px', fontWeight: '700',
            }}>
              View Values
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 24px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '24px',
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '36px', fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{stat.value}</div>
            <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
        <h2 style={{
          fontSize: '36px', fontWeight: '800',
          textAlign: 'center', marginBottom: '48px',
        }}>
          Everything you need to{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>trade smart</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                height: '100%',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${feature.color}40`;
                  (e.currentTarget as HTMLElement).style.background = `rgba(255,255,255,0.05)`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '48px', height: '48px',
                  background: `${feature.color}20`,
                  border: `1px solid ${feature.color}40`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', marginBottom: '16px',
                }}>{feature.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        margin: '0 24px 100px',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '24px',
        padding: '60px 24px',
        textAlign: 'center',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
          Ready to start trading?
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>
          Join thousands of traders already using BloxValues
        </p>
        <Link href="/trading" style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: '#fff', textDecoration: 'none',
          padding: '14px 40px', borderRadius: '12px',
          fontSize: '16px', fontWeight: '700',
          boxShadow: '0 0 30px rgba(59,130,246,0.3)',
        }}>
          Browse Trade Ads →
        </Link>
      </div>

    </div>
  );
}