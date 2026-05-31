'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Clock, ArrowRight, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { FRUITS, RARITY_COLORS, formatValue, Fruit } from '@/lib/fruits';
import { supabase, TradeAdRecord } from '@/lib/supabase';

interface TradeAd {
  id: string;
  user: string;
  verified: boolean;
  rating: number;
  offering: Fruit[];
  requesting: Fruit[];
  note?: string;
  postedMinsAgo: number;
}

const findFruit = (id: string) => FRUITS.find(f => f.id === id);

type FilterType = 'all' | 'verified' | 'recent';

export default function TradingPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [ads, setAds] = useState<TradeAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAds();
  }, []);

  async function loadAds() {
    setLoading(true);
    const { data, error } = await supabase
      .from('trade_ads')
      .select('*, profiles(username, verified, rating)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading ads:', error);
      setLoading(false);
      return;
    }

    const minsAgo = (created: string) =>
      Math.floor((Date.now() - new Date(created).getTime()) / 60000);

    const mapped: TradeAd[] = (data as TradeAdRecord[]).map(r => ({
      id: r.id,
      user: r.profiles?.username || 'Unknown',
      verified: r.profiles?.verified || false,
      rating: r.profiles?.rating || 0,
      offering: r.offering.map(findFruit).filter(Boolean) as Fruit[],
      requesting: r.requesting.map(findFruit).filter(Boolean) as Fruit[],
      note: r.note || undefined,
      postedMinsAgo: minsAgo(r.created_at),
    }));

    setAds(mapped);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    let result = [...ads];
    if (filter === 'verified') result = result.filter(a => a.verified);
    if (filter === 'recent') result = result.filter(a => a.postedMinsAgo < 60);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.user.toLowerCase().includes(q) ||
        a.offering.some(f => f.name.toLowerCase().includes(q)) ||
        a.requesting.some(f => f.name.toLowerCase().includes(q))
      );
    }
    return result;
  }, [filter, search, ads]);

  const timeAgo = (mins: number) => {
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', color: '#10b981', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px',
            }}>
              <Sparkles size={14} strokeWidth={2.5} />
              Live Marketplace
            </div>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              marginBottom: '8px',
            }}>
              Trade <span style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Ads</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#94a3b8' }}>
              {loading ? 'Loading...' : `${filtered.length} active trades`}
            </p>
          </div>

          <Link href="/trading/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '700',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
          }}>
            <Plus size={18} strokeWidth={2.5} />
            Post Trade Ad
          </Link>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex', gap: '12px',
          marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <Search size={16} strokeWidth={2.2} style={{
              position: 'absolute', left: '14px', top: '50%',
              transform: 'translateY(-50%)', color: '#64748b',
            }} />
            <input
              type="text"
              placeholder="Search by player or fruit..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(241,245,249,0.04)',
                border: '1px solid rgba(241,245,249,0.08)',
                borderRadius: '10px',
                padding: '12px 16px 12px 40px',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {([
            { id: 'all', label: 'All Trades' },
            { id: 'verified', label: 'Verified', icon: ShieldCheck },
            { id: 'recent', label: 'Recent', icon: Clock },
          ] as { id: FilterType; label: string; icon?: typeof Clock }[]).map(opt => {
            const Icon = opt.icon;
            return (
              <button key={opt.id} onClick={() => setFilter(opt.id)} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: filter === opt.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(241,245,249,0.04)',
                border: `1px solid ${filter === opt.id ? '#10b981' : 'rgba(241,245,249,0.08)'}`,
                color: filter === opt.id ? '#fff' : '#94a3b8',
                padding: '12px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
              }}>
                {Icon && <Icon size={14} strokeWidth={2.5} />}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>Loading trades...</div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && ads.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(241,245,249,0.02)',
            border: '1px dashed rgba(241,245,249,0.1)',
            borderRadius: '20px',
          }}>
            <Sparkles size={40} style={{ margin: '0 auto 16px', opacity: 0.5, color: '#10b981' }} />
            <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
              No trades yet — be the first!
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
              Post your trade and start the marketplace.
            </div>
            <Link href="/trading/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700',
            }}>
              <Plus size={16} strokeWidth={2.5} />
              Post First Trade
            </Link>
          </div>
        )}

        {/* No filter results */}
        {!loading && filtered.length === 0 && ads.length > 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
            <Filter size={40} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <div style={{ fontSize: '16px', fontWeight: '600' }}>No trades match your filters</div>
          </div>
        )}

        {/* Trade Ads Grid */}
        {!loading && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map(ad => (
              <TradeAdCard key={ad.id} ad={ad} timeAgo={timeAgo} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function TradeAdCard({ ad, timeAgo }: { ad: TradeAd; timeAgo: (m: number) => string }) {
  const [hovered, setHovered] = useState(false);

  const offerTotal = ad.offering.reduce((s, f) => s + f.permanentValue, 0);
  const requestTotal = ad.requesting.reduce((s, f) => s + f.permanentValue, 0);
  const diff = requestTotal > 0 ? ((offerTotal - requestTotal) / requestTotal) * 100 : 0;
  const isWin = Math.abs(diff) < 10 ? 'fair' : diff > 0 ? 'over' : 'under';
  const fairnessColor = isWin === 'fair' ? '#3b82f6' : isWin === 'over' ? '#10b981' : '#f59e0b';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(241,245,249,0.04)' : 'rgba(241,245,249,0.02)',
        border: `1px solid ${hovered ? 'rgba(16,185,129,0.3)' : 'rgba(241,245,249,0.08)'}`,
        borderRadius: '16px',
        padding: '20px',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px', fontWeight: '800', color: '#fff',
          }}>
            {ad.user.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>{ad.user}</span>
              {ad.verified && <ShieldCheck size={14} strokeWidth={2.5} style={{ color: '#10b981' }} />}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
              ⭐ {ad.rating.toFixed(1)} · {timeAgo(ad.postedMinsAgo)}
            </div>
          </div>
        </div>

        <div style={{
          fontSize: '10px', fontWeight: '700',
          color: fairnessColor,
          background: `${fairnessColor}15`,
          border: `1px solid ${fairnessColor}40`,
          padding: '4px 8px', borderRadius: '6px',
          textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {isWin === 'fair' ? 'Fair' : isWin === 'over' ? `+${diff.toFixed(0)}%` : `${diff.toFixed(0)}%`}
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        gap: '10px', alignItems: 'center', marginBottom: '14px',
      }}>
        <FruitStack label="OFFERING" fruits={ad.offering} accent="#10b981" />
        <ArrowRight size={20} strokeWidth={2.5} style={{ color: '#475569' }} />
        <FruitStack label="WANTS" fruits={ad.requesting} accent="#3b82f6" />
      </div>

      {ad.note && (
        <div style={{
          background: 'rgba(241,245,249,0.03)',
          border: '1px solid rgba(241,245,249,0.06)',
          borderRadius: '8px',
          padding: '10px 12px',
          fontSize: '12px',
          color: '#94a3b8',
          fontStyle: 'italic',
          marginBottom: '14px',
        }}>
          &quot;{ad.note}&quot;
        </div>
      )}

      <button style={{
        width: '100%',
        background: hovered ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        color: hovered ? '#fff' : '#10b981',
        padding: '12px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}>
        <MessageCircle size={14} strokeWidth={2.5} />
        Message Trader
      </button>
    </div>
  );
}

function FruitStack({ label, fruits, accent }: { label: string; fruits: Fruit[]; accent: string }) {
  return (
    <div>
      <div style={{
        fontSize: '9px', fontWeight: '700',
        color: accent, letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: '6px',
      }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {fruits.map((f, i) => {
          const colors = RARITY_COLORS[f.rarity];
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              padding: '6px 10px',
            }}>
              <div style={{ fontSize: '18px' }}>{f.emoji}</div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{
                  fontSize: '12px', fontWeight: '700', color: '#f1f5f9',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{f.name}</div>
                <div style={{ fontSize: '10px', color: colors.text, fontWeight: '700' }}>
                  {formatValue(f.permanentValue)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}