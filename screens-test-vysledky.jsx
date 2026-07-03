// ─────────────────────────────────────────────────────────────
// TestVysledkyScreen — 09b · Výsledky konkrétneho testu (učiteľ)
// Otvára sa z ikony „Výsledky" pri teste v zozname testov.
// Zobrazuje výsledky IBA tohto testu od všetkých žiakov:
//   • hlavička s názvom testu + predmet
//   • súhrn: počet žiakov · priemerná úspešnosť
//   • vyhľadávanie žiaka + prepínač triedy
//   • riadok: žiak · trieda | dátum, čas | body | úspešnosť | play
//   • viac pokusov → rozbaliteľné ako v Histórii
// Vizuálny jazyk: zhodný s HistoriaUcitelScreen (Dosis, modrý akcent)
// ─────────────────────────────────────────────────────────────

const TV_ACCENT = '#3FA9E0';
const TV_ACCENT_DEEP = '#2190C0';
const TV_PLAY = '#7DB800';

const TV_TEST = { nazov: 'Čo sa skrýva v ZOO?', predmet: 'Príroda', maxBody: 14 };

const TV_ROWS = [
  { ziak: 'Fuga Rado',           trieda: 'I.B',  datum: '30.6.2026', cas: '15:21', body: 14, usp: 100 },
  { ziak: 'Chovanec Ján',        trieda: 'I.B',  datum: '30.6.2026', cas: '14:52', body: 12, usp: 86,
    pokusy: [
      { datum: '28.6.2026', cas: '14:10', body: 8,  usp: 57 },
      { datum: '30.6.2026', cas: '14:52', body: 12, usp: 86 }
    ] },
  { ziak: 'Kováč Samuel',        trieda: 'II.A', datum: '29.6.2026', cas: '11:05', body: 11, usp: 79 },
  { ziak: 'Molnárová Ema',       trieda: 'I.A',  datum: '29.6.2026', cas: '10:48', body: 9,  usp: 64,
    pokusy: [
      { datum: '26.6.2026', cas: '10:02', body: 4, usp: 29 },
      { datum: '27.6.2026', cas: '10:31', body: 7, usp: 50 },
      { datum: '29.6.2026', cas: '10:48', body: 9, usp: 64 }
    ] },
  { ziak: 'Bielik Martin',       trieda: 'I.A',  datum: '27.6.2026', cas: '09:40', body: 7,  usp: 50 },
  { ziak: 'Čikovská Petronela',  trieda: 'I.B',  datum: '26.6.2026', cas: '11:31', body: 4,  usp: 29 }
];

const TV_TRIEDY = ['Všetky', 'I.A', 'I.B', 'II.A'];
const TV_PREDMETY = ['Všetky', 'Príroda', 'Matematika', 'Slovná zásoba SJ'];

// ── Dropdown pole (Trieda / Predmet) ──
function TvDropdown({ label, value, allValue, options, open, dark, onToggle, onPick }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const active = value !== allValue;
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <button onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
        width: '100%', padding: '8px 12px', borderRadius: 12, cursor: 'pointer',
        background: dark ? '#1A2433' : '#FFFFFF',
        border: `1.5px solid ${open ? TV_ACCENT : (dark ? '#2A3447' : '#DDE5EC')}`,
        boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)',
        fontFamily: '"Dosis", sans-serif', fontSize: 13.5, fontWeight: 800,
        color: active ? (dark ? '#7CC7EE' : TV_ACCENT_DEEP) : ink,
        textAlign: 'left'
      }}>
        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 700, color: inkSoft }}>{label}: </span>{value}
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }}>
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      {open &&
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 4, zIndex: 30,
          background: dark ? '#1A2433' : '#FFFFFF',
          border: `1.5px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(10,20,32,0.22)', overflow: 'hidden'
        }}>
          {options.map((o, i) => {
            const sel = value === o;
            return (
              <button key={o} onClick={() => onPick(o)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                width: '100%', padding: '10px 13px', cursor: 'pointer',
                background: sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent',
                border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${line}`,
                fontFamily: '"Dosis", sans-serif', fontSize: 14,
                fontWeight: sel ? 800 : 600,
                color: sel ? (dark ? '#7CC7EE' : TV_ACCENT_DEEP) : ink,
                textAlign: 'left'
              }}>
                <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o}</span>
                {sel &&
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : TV_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>}
              </button>
            );
          })}
        </div>}
    </div>
  );
}

function tvUspColor(usp, dark) {
  if (usp >= 60) return dark ? '#7CCB6E' : '#2E7D32';
  if (usp >= 25) return dark ? '#FFB74D' : '#E65100';
  return dark ? '#8A98AA' : '#6B7888';
}

function TvPlay({ size = 34, onClick }) {
  return (
    <button title="Prehrať" onClick={onClick} style={{
      width: size + 2, height: size + 2, flexShrink: 0, borderRadius: '50%',
      border: 'none', padding: 0, cursor: 'pointer', background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <svg width={size} height={size} viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="15.5" fill="none" stroke={TV_PLAY} strokeWidth="3" strokeLinecap="round"></circle>
        <path d="M14 11.5 L23.5 17 L14 22.5 Z" fill={TV_PLAY} stroke={TV_PLAY} strokeWidth="2.5" strokeLinejoin="round"></path>
      </svg>
    </button>
  );
}

function TvRow({ r, dark, last, alt }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const uspC = tvUspColor(r.usp, dark);
  const hasPokusy = r.pokusy && r.pokusy.length > 1;
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onClick={hasPokusy ? () => setOpen(!open) : undefined}
      style={{
        background: alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
        borderBottom: last ? 'none' : `1px solid ${line}`,
        cursor: hasPokusy ? 'pointer' : 'default'
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px' }}>
        {/* žiak + meta */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{
            fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 15,
            color: ink, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{r.ziak} <span style={{ fontWeight: 600, fontSize: 13, color: inkSoft }}>· {r.trieda}</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft }}>{r.datum}</span>
            {hasPokusy &&
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 800,
                color: dark ? '#7CC7EE' : TV_ACCENT_DEEP,
                background: dark ? 'rgba(63,169,224,0.18)' : 'rgba(63,169,224,0.10)',
                border: `1px solid ${dark ? 'rgba(124,199,238,0.35)' : 'rgba(63,169,224,0.30)'}`,
                borderRadius: 8, padding: '2px 9px', whiteSpace: 'nowrap', lineHeight: 1.4
              }}>
                {r.pokusy.length} pokusy
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }}>
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>}
          </div>
        </div>
        {/* body + úspešnosť */}
        <div style={{ width: 50, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: uspC, lineHeight: 1.1 }}>{r.usp}<span style={{ fontSize: 12 }}> %</span></div>
          <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 11.5, fontWeight: 600, color: inkSoft, lineHeight: 1.2 }}>{r.body} b.</div>
        </div>
        <TvPlay onClick={e => e.stopPropagation()} />
      </div>

      {/* rozbalené pokusy */}
      {hasPokusy && open &&
        <div style={{
          margin: '0 14px 11px 22px',
          borderLeft: `3px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
          paddingLeft: 12
        }}>
          {r.pokusy.map((p, i) => {
            const pC = tvUspColor(p.usp, dark);
            const best = p.usp === Math.max(...r.pokusy.map(x => x.usp));
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i === r.pokusy.length - 1 ? 'none' : `1px solid ${line}`
              }}>
                <span style={{
                  fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 700,
                  color: ink, width: 62, flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', gap: 4
                }}>{i + 1}. pokus{best &&
                  <svg width="11" height="11" viewBox="0 0 24 24" fill={TV_PLAY} stroke="none">
                    <path d="M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 20 12 16.77 6.2 20l1.3-6.35L3 9.27l6.1-1.01z"></path>
                  </svg>}</span>
                <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft, flex: 1, whiteSpace: 'nowrap' }}>{p.datum}</span>
                <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft }}>{p.body} b.</span>
                <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: 800, color: pC, width: 44, textAlign: 'right' }}>{p.usp} %</span>
                <TvPlay size={24} onClick={e => e.stopPropagation()} />
              </div>
            );
          })}
        </div>}
    </div>
  );
}

function TestVysledkyScreen({ dark = false }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const card = dark ? '#141D29' : '#FFFFFF';

  const [q, setQ] = React.useState('');
  const [trieda, setTrieda] = React.useState('Všetky');
  const [predmet, setPredmet] = React.useState('Všetky');
  const [openKey, setOpenKey] = React.useState(null);   // 'trieda' | 'predmet' | null
  const [searchOpen, setSearchOpen] = React.useState(false);

  const visible = TV_ROWS.filter(r =>
    (trieda === 'Všetky' || r.trieda === trieda) &&
    r.ziak.toLowerCase().includes(q.trim().toLowerCase())
  );

  const avg = visible.length ? Math.round(visible.reduce((s, r) => s + r.usp, 0) / visible.length) : 0;

  const tvFade = (el) => {
    if (!el) return;
    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
    const g = 'linear-gradient(to bottom, transparent 0, #000 ' + (atTop ? '0px' : '22px') + ', #000 ' + (atBottom ? '100%' : 'calc(100% - 26px)') + ', transparent 100%)';
    el.style.webkitMaskImage = g;
    el.style.maskImage = g;
  };

  return (
    <window.PhoneFrame dark={dark} label="09b Výsledky testu — učiteľ">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>

        {/* ── Hlavička ── */}
        <div style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', padding: '6px 18px 10px',
          minHeight: 52,
          background: dark
            ? 'linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(15,30,55,0.30) 70%, rgba(15,30,55,0) 100%)'
            : 'transparent'
        }}>
          <div style={{
            position: 'absolute', left: 56, right: 56, top: 6, bottom: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            fontSize: 19, fontWeight: 800, letterSpacing: '-0.2px',
            fontFamily: '"Dosis", sans-serif', color: ink
          }}>Výsledky</div>

          <button title="Späť" style={{
            width: 38, height: 38, borderRadius: 14, border: 'none',
            background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0, cursor: 'pointer', zIndex: 1
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke={dark ? '#F2F7FB' : '#1A2B3D'} strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div style={{ flex: 1 }}></div>
          <div style={{ width: 38, flexShrink: 0 }}></div>
        </div>

        {/* ── Identita testu + súhrn — banner vo farbách Alfik hero ── */}
        <div style={{ padding: '0 18px 12px' }}>
          <div style={{
            background: dark
              ? 'linear-gradient(135deg, #0E7A87 0%, #053D45 100%)'
              : 'linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)',
            borderRadius: 16,
            boxShadow: dark ? 'none' : '0 1px 3px rgba(0,168,181,0.15), 0 10px 26px -14px rgba(0,168,181,0.45)',
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{
                fontFamily: '"Dosis", sans-serif', fontWeight: 800, fontSize: 16.5,
                color: dark ? '#E7F6F4' : '#053D45', lineHeight: 1.2
              }}>{TV_TEST.nazov}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: dark ? 'rgba(231,246,244,0.72)' : 'rgba(5,61,69,0.72)' }}>
                  max. {TV_TEST.maxBody} b.
                </span>
              </div>
            </div>
            {/* súhrn */}
            <div style={{ display: 'flex', gap: 14, flexShrink: 0, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: dark ? '#E7F6F4' : '#053D45', lineHeight: 1.1 }}>{visible.length}</div>
                <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 10.5, fontWeight: 700, color: dark ? 'rgba(231,246,244,0.72)' : 'rgba(5,61,69,0.72)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>žiakov</div>
              </div>
              <div style={{ width: 1, height: 30, background: dark ? 'rgba(231,246,244,0.25)' : 'rgba(5,61,69,0.20)' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: dark ? '#E7F6F4' : '#053D45', lineHeight: 1.1 }}>{avg} %</div>
                <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 10.5, fontWeight: 700, color: dark ? 'rgba(231,246,244,0.72)' : 'rgba(5,61,69,0.72)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>priemer</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Dropdowny Trieda / Predmet + ikona vyhľadávania ── */}
        <div style={{ padding: '0 18px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <TvDropdown
            label="Trieda" value={trieda} allValue="Všetky" options={TV_TRIEDY}
            open={openKey === 'trieda'} dark={dark}
            onToggle={() => setOpenKey(openKey === 'trieda' ? null : 'trieda')}
            onPick={o => { setTrieda(o); setOpenKey(null); }} />
          {/* ikona vyhľadávania vpravo */}
          <button onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setQ(''); }} title="Hľadať žiaka" style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            color: searchOpen ? '#FFFFFF' : (dark ? '#7CC7EE' : TV_ACCENT_DEEP),
            background: searchOpen ? TV_ACCENT : (dark ? '#1A2433' : '#FFFFFF'),
            border: `1.5px solid ${searchOpen ? TV_ACCENT : (dark ? '#2A3447' : '#DDE5EC')}`,
            boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-3.5-3.5"></path>
            </svg>
          </button>
        </div>

        {/* ── Rozbalené pole vyhľadávania ── */}
        {searchOpen &&
          <div style={{ padding: '8px 18px 0' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: dark ? '#1A2433' : '#FFFFFF',
              border: `1.5px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
              borderRadius: 12, padding: '8px 12px'
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.6" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="m20 20-3.5-3.5"></path>
              </svg>
              <input
                autoFocus
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Hľadať žiaka…"
                style={{
                  flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: '"Dosis", sans-serif', fontSize: 14.5, fontWeight: 700, color: ink
                }} />
              {q &&
                <button onClick={() => setQ('')} title="Vymazať" style={{
                  border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"></path>
                  </svg>
                </button>}
            </div>
          </div>}

        {/* ── Zoznam žiakov ── */}
        <div data-scroll-area ref={tvFade} onScroll={e => tvFade(e.currentTarget)} onWheel={e => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 14px 14px'
        }}>
          <div style={{
            background: card, borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${line}`,
            boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.05), 0 8px 24px -16px rgba(20,40,60,0.18)'
          }}>
            {visible.map((r, i) =>
              <TvRow key={r.ziak} r={r} dark={dark} alt={i % 2 === 1} last={i === visible.length - 1} />
            )}
            {visible.length === 0 &&
              <div style={{
                textAlign: 'center', padding: '36px 20px',
                fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: inkSoft
              }}>Žiadny žiak nezodpovedá hľadaniu.</div>}
          </div>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// TestVysledkyPopupScreen — 09c · Výsledky ako popup nad zoznamom testov
// Druhý návrh: učiteľ klikne na ikonu „Výsledky" pri teste a výsledky
// sa otvoria ako modálne okno priamo nad zoznamom testov (bez navigácie preč).
// ─────────────────────────────────────────────────────────────

function TvBackdropRow({ name, dark, last, alt, highlight }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const line = dark ? '#222C39' : '#ECEFF3';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 13,
      minHeight: 58, padding: '0 16px 0 12px',
      background: highlight
        ? (dark ? 'rgba(63,169,224,0.14)' : 'rgba(63,169,224,0.08)')
        : alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${line}`
    }}>
      <img src="assets/mat_interaktivny.svg" alt="" style={{ height: 24, width: 'auto', flexShrink: 0 }} />
      <div style={{
        flex: 1, minWidth: 0,
        fontFamily: '"Dosis", sans-serif', fontWeight: 600, fontSize: 14, color: ink,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
      }}>{name}</div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E7A87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M12 16v5"></path><path d="M16 14v7"></path><path d="M20 10v11"></path>
        <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"></path>
        <path d="M4 18v3"></path><path d="M8 14v7"></path>
      </svg>
    </div>
  );
}

function TestVysledkyPopupScreen({ dark = false }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const card = dark ? '#16202E' : '#FFFFFF';

  const [q, setQ] = React.useState('');
  const [trieda, setTrieda] = React.useState('Všetky');
  const [filterOpen, setFilterOpen] = React.useState(false);

  const visible = TV_ROWS.filter(r =>
    (trieda === 'Všetky' || r.trieda === trieda) &&
    r.ziak.toLowerCase().includes(q.trim().toLowerCase())
  );
  const avg = visible.length ? Math.round(visible.reduce((s, r) => s + r.usp, 0) / visible.length) : 0;

  const TESTS = window.TESTS || [];

  return (
    <window.PhoneFrame dark={dark} label="09c Výsledky testu — popup">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>

        {/* ── Pozadie: zoznam testov (statické, pod scrimom) ── */}
        <window.CategoryHero
          dark={dark}
          title="Živočíchy"
          imgNoBg={true}
          gradient={`linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)`}
          gradientDark={`linear-gradient(135deg, #0E7A87 0%, #053D45 100%)`}
          shadowColor="rgba(0,168,181,0.45)"
          ageIcon="all"
          ageActive={false}
          showAgeLabel={false}
          showSpeaker={false}
          speakerDot="#00A8B5"
          crumbs={['', 'Interaktívne cvičenia', 'Príroda', 'Živočíchy']}
        />
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '14px' }}>
          <div style={{
            background: dark ? '#141D29' : '#FFFFFF', borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${line}`
          }}>
            {TESTS.slice(0, 9).map((t, i) =>
              <TvBackdropRow key={i} name={t.name} dark={dark} alt={i % 2 === 1}
                highlight={t.name === TV_TEST.nazov}
                last={i === 8} />
            )}
          </div>
        </div>

        {/* ── Scrim + popup ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 60,
          background: 'rgba(10,20,32,0.45)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '26px 14px'
        }}>
          <div style={{
            background: card, borderRadius: 22,
            boxShadow: '0 18px 60px rgba(10,20,32,0.35)',
            display: 'flex', flexDirection: 'column',
            maxHeight: '100%', overflow: 'hidden'
          }}>

            {/* hlavička popupu */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '16px 16px 0 18px', flexShrink: 0
            }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{
                  fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 800,
                  color: inkSoft, textTransform: 'uppercase', letterSpacing: '0.7px'
                }}>Výsledky testu</div>
                <div style={{
                  fontFamily: '"Dosis", sans-serif', fontWeight: 800, fontSize: 17,
                  color: ink, lineHeight: 1.2
                }}>{TV_TEST.nazov}</div>
                <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft }}>
                  {visible.length} žiakov · priemer <span style={{ fontWeight: 800, color: tvUspColor(avg, dark) }}>{avg} %</span> · max. {TV_TEST.maxBody} b.
                </div>
              </div>
              <button title="Zavrieť" style={{
                width: 34, height: 34, borderRadius: 12, border: 'none', flexShrink: 0,
                background: dark ? 'rgba(255,255,255,0.06)' : '#F1F5F8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0, cursor: 'pointer'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* vyhľadávanie + filter */}
            <div style={{ padding: '12px 16px 10px', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                background: dark ? '#1A2433' : '#FFFFFF',
                border: `1.5px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
                borderRadius: 12, padding: '8px 12px'
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.6" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m20 20-3.5-3.5"></path>
                </svg>
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Hľadať žiaka…"
                  style={{
                    flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: '"Dosis", sans-serif', fontSize: 14.5, fontWeight: 700, color: ink
                  }} />
              </div>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button onClick={() => setFilterOpen(!filterOpen)} title="Filter triedy" style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 12px', borderRadius: 12, cursor: 'pointer',
                  fontFamily: '"Dosis", sans-serif', fontSize: 13.5, fontWeight: 800,
                  color: trieda !== 'Všetky' ? '#FFFFFF' : ink,
                  background: trieda !== 'Všetky' ? TV_ACCENT : (dark ? '#1A2433' : '#FFFFFF'),
                  border: `1.5px solid ${trieda !== 'Všetky' ? TV_ACCENT : (dark ? '#2A3447' : '#DDE5EC')}`,
                  whiteSpace: 'nowrap'
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5h18M7 12h10M10 19h4"></path>
                  </svg>
                  {trieda !== 'Všetky' && trieda}
                </button>
                {filterOpen &&
                  <div style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 4, zIndex: 30,
                    minWidth: 130,
                    background: dark ? '#1A2433' : '#FFFFFF',
                    border: `1.5px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
                    borderRadius: 12,
                    boxShadow: '0 10px 30px rgba(10,20,32,0.22)', overflow: 'hidden'
                  }}>
                    {TV_TRIEDY.map((t, i) => {
                      const sel = trieda === t;
                      return (
                        <button key={t} onClick={() => { setTrieda(t); setFilterOpen(false); }} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                          width: '100%', padding: '10px 14px', cursor: 'pointer',
                          background: sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent',
                          border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${line}`,
                          fontFamily: '"Dosis", sans-serif', fontSize: 14.5,
                          fontWeight: sel ? 800 : 600,
                          color: sel ? (dark ? '#7CC7EE' : TV_ACCENT_DEEP) : ink,
                          textAlign: 'left'
                        }}>
                          {t}
                          {sel &&
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : TV_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>}
                        </button>
                      );
                    })}
                  </div>}
              </div>
            </div>

            {/* zoznam žiakov */}
            <div data-scroll-area onWheel={e => e.stopPropagation()} style={{
              overflowY: 'auto', minHeight: 0,
              borderTop: `1px solid ${line}`
            }}>
              {visible.map((r, i) =>
                <TvRow key={r.ziak} r={r} dark={dark} alt={i % 2 === 1} last={i === visible.length - 1} />
              )}
              {visible.length === 0 &&
                <div style={{
                  textAlign: 'center', padding: '36px 20px',
                  fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: inkSoft
                }}>Žiadny žiak nezodpovedá hľadaniu.</div>}
            </div>
          </div>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { TestVysledkyScreen, TestVysledkyPopupScreen, TvDropdown });
