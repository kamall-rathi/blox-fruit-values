'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      background: 'rgba(10, 10, 15, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}>🍎</div>
            <span style={{
              fontSize: '20px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>BloxValues</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { href: '/values', label: '📊 Values' },
            { href: '/trading', label: '🔄 Trade Ads' },
            { href: '/calculator', label: '🧮 Calculator' },
            { href: '/community', label: '⭐ Community' },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{
              color: '#94a3b8',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = '#ffffff';
                (e.target as HTMLElement).style.background = 'rgba(59,130,246,0.1)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = '#94a3b8';
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >{link.label}</Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/discord" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}>Discord</Link>
          <Link href="/login" style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '8px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
          }}>Login</Link>
        </div>
      </div>
    </nav>
  );
}