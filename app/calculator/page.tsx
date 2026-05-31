'use client';

import { useState, useMemo } from 'react';
import { Plus, X, Search, RotateCcw, ArrowLeftRight, TrendingUp, TrendingDown, Minus as MinusIcon, Sparkles } from 'lucide-react';
import { FRUITS, RARITY_COLORS, formatValue, Fruit } from '@/lib/fruits';

type ValueMode = 'physical' | 'permanent';
type Side = 'you' | 'them';

export default function CalculatorPage() {
  const [mode, setMode] = useState<ValueMode>('permanent');
  const [you, setYou] = useState<Fruit[]>([]);
  const [them, setThem] = useState<Fruit[]>([]);
  const [picker, setPicker] = useState<Side | null>(null);
  const [search, setSearch] = useState('');

  const getValue = (f: Fruit) => mode === 'physical' ? f.physicalValue : f.permanentValue;
  const youTotal = useMemo(() => you.reduce((s, f) => s + getValue(f), 0), [you, mode]);
  const themTotal = useMemo(() => them.reduce((s, f) => s + getValue(f), 0), [them, mode]);
  const youDemand = useMemo(() => you.length ? you.reduce((s, f) => s + f.demand, 0) / you.length : 0, [you]);
  const themDemand = useMemo(() => them.length ? them.reduce((s, f) => s + f.demand, 0) / them.length : 0, [them]);

  const diff = themTotal - youTotal;
  const diffPct = youTotal > 0 ? (diff / youTotal) * 100 : 0;

const verdict = useMemo(() => {
    if (you.length === 0 || them.length === 0) return null;
    const cap = (n: number) => n > 999 ? '999' : n.toFixed(0);
    if (Math.abs(diffPct) < 5) return { label: 'FAIR', color: '#3b82f6', desc: 'Values are within 5% — balanced trade' };
    if (diffPct > 30) return { label: 'HUGE WIN', color: '#10b981', desc: `${diffPct > 999 ? '999+' : '+' + cap(diffPct)}% in your favor` };
    if (diffPct > 5) return { label: 'WIN', color: '#10b981', desc: `+${cap(diffPct)}% in your favor` };
    if (diffPct < -30) return { label: 'HUGE LOSS', color: '#ef4444', desc: `${cap(Math.abs(diffPct))}% — they win big` };
    return { label: 'LOSS', color: '#ef4444', desc: `${cap(Math.abs(diffPct))}% — they win` };
  }, [diffPct, you.length, them.length]);

  const filteredFruits = useMemo(() => {
    if (!search.trim()) return FRUITS;
    const q = search.toLowerCase();
    return FRUITS.filter(f => f.name.toLowerCase().includes(q));
  }, [search]);

  const addFruit = (f: Fruit) => {
    if (picker === 'you') setYou(prev => [...prev, f]);
    if (picker === 'them') setThem(prev => [...prev, f]);
    setPicker(null);
    setSearch('');
  };

  const removeFruit = (side: Side, idx: number) => {
    if (side === 'you') setYou(prev => prev.filter((_, i) => i !== idx));
    else setThem(prev => prev.filter((_, i) => i !== idx));
  };

  const swap = () => {
    setYou(them);
    setThem(you);
  };

  const reset = () => {
    setYou([]);
    setThem([]);
  };

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: '#10b981', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px',
          }}>
            <Sparkles size={14} strokeWidth={2.5} />
            Trade Analysis
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            marginBottom: '12px',
          }}>
            Will you <span style={{ color: '#10b981' }}>win</span> or <span style={{ color: '#ef4444' }}>lose</span>?
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8' }}>
            Add fruits to both sides. Get instant verdict.
          </p>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex', gap: '12px', justifyContent: 'center',
          marginBottom: '32px', flexWrap: 'wrap',
        }}>
          {/* Mode toggle */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(241,245,249,0.04)',
            border: '1px solid rgba(241,245,249,0.08)',
            borderRadius: '10px',
            padding: '4px',
          }}>
            {(['physical', 'permanent'] as ValueMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: '8px 16px',
                borderRadius: '7px',
                border: 'none',
                background: mode === m ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
                color: mode === m ? '#fff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}>
                {m}
              </button>
            ))}
          </div>

          <button onClick={swap} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#60a5fa',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
          }}>
            <ArrowLeftRight size={14} strokeWidth={2.5} />
            Swap Sides
          </button>

          <button onClick={reset} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
          }}>
            <RotateCcw size={14} strokeWidth={2.5} />
            Reset
          </button>
        </div>

        {/* Two sides */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          <TradeSide
            label="YOU OFFER"
            color="#10b981"
            fruits={you}
            total={youTotal}
            demand={youDemand}
            mode={mode}
            onAdd={() => setPicker('you')}
            onRemove={(i) => removeFruit('you', i)}
          />
          <TradeSide
            label="THEY OFFER"
            color="#3b82f6"
            fruits={them}
            total={themTotal}
            demand={themDemand}
            mode={mode}
            onAdd={() => setPicker('them')}
            onRemove={(i) => removeFruit('them', i)}
          />
        </div>

        {/* Verdict */}
        {verdict && (
          <div style={{
            background: `linear-gradient(135deg, ${verdict.color}15, ${verdict.color}05)`,
            border: `1px solid ${verdict.color}40`,
            borderRadius: '20px',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: `0 0 60px ${verdict.color}20`,
          }}>
            <div style={{
              fontSize: '13px', color: verdict.color, fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px',
            }}>Verdict</div>
            <div style={{
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: '900',
              color: verdict.color,
              letterSpacing: '-0.03em',
              lineHeight: '1',
              marginBottom: '12px',
              textShadow: `0 0 40px ${verdict.color}80`,
            }}>{verdict.label}</div>
            <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '24px' }}>{verdict.desc}</div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '24px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              padding: '16px 24px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>You</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#10b981' }}>{formatValue(youTotal)}</div>
              </div>
              <div style={{ color: '#475569' }}>vs</div>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Them</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#3b82f6' }}>{formatValue(themTotal)}</div>
              </div>
              <div style={{ color: '#475569' }}>=</div>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Difference</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: verdict.color }}>
                  {diff >= 0 ? '+' : ''}{formatValue(Math.abs(diff))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Fruit Picker Modal */}
      {picker && (
        <div
          onClick={() => { setPicker(null); setSearch(''); }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(241,245,249,0.1)',
              borderRadius: '20px',
              padding: '24px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
                Add to {picker === 'you' ? 'YOUR' : 'THEIR'} side
              </h3>
              <button onClick={() => { setPicker(null); setSearch(''); }} style={{
                background: 'transparent', border: 'none', color: '#94a3b8',
                cursor: 'pointer', padding: '4px',
              }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Search size={16} strokeWidth={2.2} style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)', color: '#64748b',
              }} />
              <input
                autoFocus
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

            <div style={{
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '8px',
              paddingRight: '4px',
            }}>
              {filteredFruits.map(f => {
                const colors = RARITY_COLORS[f.rarity];
                return (
                  <button key={f.id} onClick={() => addFruit(f)} style={{
                    background: 'rgba(241,245,249,0.03)',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '10px',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = colors.bg;
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(241,245,249,0.03)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '36px', height: '36px',
                      background: colors.bg,
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}>{f.emoji}</div>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.name}
                      </div>
                      <div style={{ fontSize: '11px', color: colors.text, fontWeight: '600' }}>
                        {formatValue(getValue(f))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TradeSide({
  label, color, fruits, total, demand, mode, onAdd, onRemove,
}: {
  label: string;
  color: string;
  fruits: Fruit[];
  total: number;
  demand: number;
  mode: ValueMode;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div style={{
      background: 'rgba(241,245,249,0.02)',
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '20px',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          color: color,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>{label}</div>
        <div style={{
          background: `${color}15`,
          color: color,
          fontSize: '11px',
          fontWeight: '700',
          padding: '4px 10px',
          borderRadius: '6px',
        }}>{fruits.length}/4</div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        flex: 1,
        marginBottom: '16px',
      }}>
        {fruits.map((f, i) => {
          const colors = RARITY_COLORS[f.rarity];
          return (
            <div key={i} style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              padding: '10px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}>
              <button onClick={() => onRemove(i)} style={{
                position: 'absolute', top: '4px', right: '4px',
                background: 'rgba(0,0,0,0.4)',
                border: 'none',
                width: '20px', height: '20px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
              }}>
                <X size={12} strokeWidth={3} />
              </button>
              <div style={{ fontSize: '28px' }}>{f.emoji}</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#f1f5f9', textAlign: 'center' }}>{f.name}</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: colors.text }}>
                {formatValue(mode === 'physical' ? f.physicalValue : f.permanentValue)}
              </div>
            </div>
          );
        })}

        {fruits.length < 4 && (
          <button onClick={onAdd} style={{
            background: 'transparent',
            border: `2px dashed ${color}40`,
            borderRadius: '10px',
            padding: '10px',
            minHeight: '120px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: color, gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${color}10`;
              (e.currentTarget as HTMLElement).style.borderStyle = 'solid';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderStyle = 'dashed';
            }}
          >
            <Plus size={24} strokeWidth={2.5} />
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Add Fruit</div>
          </button>
        )}
      </div>

      <div style={{
        borderTop: `1px solid ${color}20`,
        paddingTop: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: color }}>{formatValue(total)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg Demand</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: color }}>{demand.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
}
