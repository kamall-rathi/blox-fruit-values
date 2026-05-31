'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BarChart3, Repeat, Calculator, Star, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  const links = [
    { href: '/values', label: 'Values', icon: BarChart3 },
    { href: '/trading', label: 'Trade Ads', icon: Repeat },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/community', label: 'Community', icon: Star },
  ];

  return (
    <nav style={{
      background: 'rgba(10, 14, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.95,
            }} />
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '6px',
              width: '8px',
              height: '6px',
              borderRadius: '50%',
              background: '#065f46',
              transform: 'rotate(-30deg)',
            }} />
          </div>
          <div>
            <div style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#f1f5f9',
              lineHeight: '1',
              letterSpacing: '-0.02em',
            }}>BloxValues</div>
            <div style={{
              fontSize: '10px',
              color: '#10b981',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>Trade Smart</div>
          </div>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {links.map((link) => {
            const Icon = link.icon;
            const isHovered = hovered === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isHovered ? '#10b981' : '#94a3b8',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  background: isHovered ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={16} strokeWidth={2.2} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/discord" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#94a3b8',
            fontSize: '14px',
            fontWeight: '600',
            padding: '10px 14px',
          }}>
            <MessageCircle size={16} strokeWidth={2.2} />
            Discord
          </Link>
          <Link href="/login" style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)',
          }}>Login</Link>
        </div>
      </div>
    </nav>
  );
}