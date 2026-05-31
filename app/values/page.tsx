'use client';

import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Sparkles, Filter, ArrowUpDown } from 'lucide-react';
import { FRUITS, RARITY_COLORS, TYPE_COLORS, formatValue, Rarity, FruitType } from '@/lib/fruits';

const RARITIES: (Rarity | 'All')[] = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical'];
const TYPES: (FruitType | 'All')[] = ['All', 'Natural', 'Elemental', 'Beast'];

type SortBy = 'value' | 'demand' | 'name' | 'rarity';
type ValueMode = 'physical' | 'permanent';

const RARITY_ORDER: Record<Rarity, number> = {
  Common: 1, Uncommon: 2, Rare: 3, Legendary: 4, Mythical: 5,
};

export default function ValuesPage() {
  const [search, setSearch] = useState('');
  const [rarity, setRarity] = useState<Rarity | 'All'>('All');
  const [type, setType] = useState<FruitType | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortBy>('value');
  const [mode, setMode] = useState<ValueMode>('permanent');

  const filtered = useMemo(() => {
    let result = [...FRUITS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q));
    }
    if (rarity !== 'All') result = result.filter(f => f.rarity === rarity);
    if (type !== 'All') result = result.filter(f => f.type === type);

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'demand') return b.demand - a.demand;
      if (sortBy === 'rarity') return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
      const aVal = mode === 'physical' ? a.physicalValue : a.permanentValue;
      const bVal = mode === 'physical' ? b.physicalValue : b.permanentValue;
      return bVal - aVal;
    });

    return result;
  }, [search, rarity, type, sortBy, mode]);

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: '#10b981', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px',
          }}>
            <Sparkles size={14} strokeWidth={2.5} />
            Live Market Data
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
          }}>
            All <span style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{FRUITS.length} fruits</span> tracked
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>
            Real values, updated daily. Check before you trade.
          </p>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(241,245,249,0.04)',
          border: '1px solid rgba(241,245,249,0.08)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '20px',
        }}>
          {(['physical', 'permanent'] as ValueMode[]).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: mode === m ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: mode === m ? '#fff' : '#94a3b8',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
              boxShadow: mode === m ? '0 0 20px rgba(16,185,129,0.3)' : 'none',
            }}>
              {m} value
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(200px, 1fr) auto auto auto',
          gap: '12px',
          marginBottom: '32px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} strokeWidth={2.2} style={{
              position: 'absolute', left: '14px', top: '50%',
              transform: 'translateY(-50%)', color: '#64748b',
            }} />
            <input
              type="text"
              placeholder="Search fruits..."
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

          {/* Rarity Filter */}
          <select value={rarity} onChange={e => setRarity(e.target.value as Rarity | 'All')} style={{
            background: 'rgba(241,245,249,0.04)',
            border: '1px solid rgba(241,245,249,0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#f1f5f9',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none',
          }}>
            {RARITIES.map(r => <option key={r} value={r}>{r === 'All' ? 'All Rarities' : r}</option>)}
          </select>

          {/* Type Filter */}
          <select value={type} onChange={e => setType(e.target.value as FruitType | 'All')} style={{
            background: 'rgba(241,245,249,0.04)',
            border: '1px solid rgba(241,245,249,0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#f1f5f9',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none',
          }}>
            {TYPES.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
          </select>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)} style={{
            background: 'rgba(241,245,249,0.04)',
            border: '1px solid rgba(241,245,249,0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#f1f5f9',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none',
          }}>
            <option value="value">Sort: Value</option>
            <option value="demand">Sort: Demand</option>
            <option value="rarity">Sort: Rarity</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: '20px', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
          Showing {filtered.length} of {FRUITS.length} fruits
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map(fruit => {
            const colors = RARITY_COLORS[fruit.rarity];
            const value = mode === 'physical' ? fruit.physicalValue : fruit.permanentValue;
            const demandColor =
              fruit.demand >= 8 ? '#ef4444' :
              fruit.demand >= 6 ? '#f59e0b' :
              fruit.demand >= 4 ? '#3b82f6' : '#64748b';

            return (
              <div key={fruit.id} style={{
                background: 'rgba(241,245,249,0.02)',
                border: `1px solid ${colors.border}`,
                borderRadius: '14px',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${colors.glow}25`;
                  (e.currentTarget as HTMLElement).style.background = 'rgba(241,245,249,0.04)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(241,245,249,0.02)';
                }}
              >
                {/* Rarity stripe */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${colors.glow}, transparent)`,
                }} />

                {/* Top row: Emoji + Trend */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '56px', height: '56px',
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '28px',
                  }}>{fruit.emoji}</div>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: fruit.trend === 'up' ? '#10b98115' : fruit.trend === 'down' ? '#ef444415' : '#64748b15',
                    color: fruit.trend === 'up' ? '#10b981' : fruit.trend === 'down' ? '#ef4444' : '#94a3b8',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                  }}>
                    {fruit.trend === 'up' && <TrendingUp size={12} strokeWidth={2.5} />}
                    {fruit.trend === 'down' && <TrendingDown size={12} strokeWidth={2.5} />}
                    {fruit.trend === 'stable' && <Minus size={12} strokeWidth={2.5} />}
                    {fruit.trend}
                  </div>
                </div>

                {/* Name */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#f1f5f9', letterSpacing: '-0.01em' }}>
                      {fruit.name}
                    </h3>
                    {fruit.awakened && (
                      <span style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: '#fbbf24',
                        background: '#f59e0b15',
                        border: '1px solid #f59e0b40',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>Awaken</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: '700',
                      color: colors.text,
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      padding: '3px 8px', borderRadius: '4px',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{fruit.rarity}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: '700',
                      color: TYPE_COLORS[fruit.type],
                      background: `${TYPE_COLORS[fruit.type]}15`,
                      border: `1px solid ${TYPE_COLORS[fruit.type]}40`,
                      padding: '3px 8px', borderRadius: '4px',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{fruit.type}</span>
                  </div>
                </div>

                {/* Value */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', marginBottom: '4px' }}>
                    {mode === 'physical' ? 'Physical' : 'Permanent'} Value
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: colors.text, letterSpacing: '-0.02em' }}>
                    {formatValue(value)}
                  </div>
                </div>

                {/* Demand bar */}
                <div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '10px', fontWeight: '700',
                    color: '#64748b', textTransform: 'uppercase',
                    letterSpacing: '0.08em', marginBottom: '6px',
                  }}>
                    <span>Demand</span>
                    <span style={{ color: demandColor }}>{fruit.demand}/10</span>
                  </div>
                  <div style={{
                    height: '6px',
                    background: 'rgba(241,245,249,0.06)',
                    borderRadius: '100px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${fruit.demand * 10}%`,
                      height: '100%',
                      background: demandColor,
                      borderRadius: '100px',
                      boxShadow: `0 0 10px ${demandColor}80`,
                    }} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
            <Filter size={40} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <div style={{ fontSize: '16px', fontWeight: '600' }}>No fruits match your filters</div>
          </div>
        )}

      </div>
    </div>
  );
}