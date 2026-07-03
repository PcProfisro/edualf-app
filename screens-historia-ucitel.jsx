// ─────────────────────────────────────────────────────────────
// HistoriaUcitelScreen — záložka História pre učiteľa (mobil)
// Mobilná adaptácia desktopovej tabuľky histórie:
//   • filtre Trieda / Žiak / Predmet ako dropdown chipy + bottom sheet
//   • záznamy zoskupené podľa dňa (namiesto stĺpca ČAS)
//   • riadok: názov testu, žiak · trieda, predmet, čas, ABS
//     + úspešnosť a body vpravo, zelené play tlačidlo
//   • pätička: počet záznamov + Načítať ďalšie
// Vizuálny jazyk: učiteľská PRO verzia (Dosis, biela karta, hairline)
// ─────────────────────────────────────────────────────────────

const HIST_ACCENT = '#3FA9E0';       // Quasar accent — označený stav
const HIST_ACCENT_DEEP = '#2190C0';
const HIST_PRIMARY = '#7DB800';      // Quasar primary — hlavné akcie
const HIST_PRIMARY_DEEP = '#5E9600';
const HIST_PLAY = '#7DB800';

const HIST_RECORDS = [
  { trieda: 'I.B', ziak: 'Chovanec Ján', nazov: 'Čo sa skrýva v ZOO?', predmet: 'Príroda', abs: 1, datum: '30. jún 2026', cas: '15:21', body: 12, usp: 86 },
  { trieda: 'I.A', ziak: 'Molnárová Ema', nazov: 'Rozstrihané obrázky – zvieratá', predmet: 'Príroda', abs: 2, datum: '30. jún 2026', cas: '15:15', body: 9, usp: 75,
    pokusy: [
      { datum: '28.6.2026', cas: '14:52', body: 6, usp: 50 },
      { datum: '30.6.2026', cas: '15:15', body: 9, usp: 75 }
    ] },
  { trieda: 'I.B', ziak: 'Chovanec Ján', nazov: 'Pomenovanie zvieracích zvukov', predmet: 'Príroda', abs: 1, datum: '30. jún 2026', cas: '15:10', body: 6, usp: 60 },
  { trieda: 'II.A', ziak: 'Kováč Samuel', nazov: 'Čo sa skrýva pod hladinou?', predmet: 'Príroda', abs: 1, datum: '30. jún 2026', cas: '15:10', body: 10, usp: 100 },
  { trieda: 'I.B', ziak: 'Chovanec Ján', nazov: 'Čo sa skrýva za stromom?', predmet: 'Príroda', abs: 1, datum: '30. jún 2026', cas: '15:09', body: 0, usp: 0 },
  { trieda: 'I.A', ziak: 'Molnárová Ema', nazov: 'Čo sa skrýva za plotom?', predmet: 'Príroda', abs: 3, datum: '30. jún 2026', cas: '15:08', body: 7, usp: 47,
    pokusy: [
      { datum: '27.6.2026', cas: '14:20', body: 2, usp: 13 },
      { datum: '29.6.2026', cas: '14:41', body: 4, usp: 27 },
      { datum: '30.6.2026', cas: '15:08', body: 7, usp: 47 }
    ] },
  { trieda: 'II.A', ziak: 'Kováč Samuel', nazov: 'Sčítanie do 10', predmet: 'Matematika', abs: 1, datum: '30. jún 2026', cas: '15:08', body: 11, usp: 92 },
  { trieda: 'I.B', ziak: 'Chovanec Ján', nazov: 'Kto povedal mňau?', predmet: 'Príroda', abs: 1, datum: '30. jún 2026', cas: '15:08', body: 3, usp: 25 },
  { trieda: 'I.B', ziak: 'Čikovská Petronela', nazov: 'Ovocie 1', predmet: 'Slovná zásoba SJ', abs: 1, datum: '7. apríl 2026', cas: '11:31', body: 4, usp: 14 },
  { trieda: 'I.B', ziak: 'Čikovská Petronela', nazov: 'Zelenina 1', predmet: 'Slovná zásoba SJ', abs: 2, datum: '7. apríl 2026', cas: '11:24', body: 9, usp: 32,
    pokusy: [
      { datum: '5.4.2026', cas: '11:02', body: 5, usp: 18 },
      { datum: '7.4.2026', cas: '11:24', body: 9, usp: 32 }
    ] }
];

const HIST_FILTERS = {
  trieda:  { label: 'Trieda',  all: 'Všetky', options: ['Všetky', 'I.A', 'I.B', 'II.A'] },
  ziak:    { label: 'Žiak',    all: 'Všetci', options: ['Všetci', 'Chovanec Ján', 'Čikovská Petronela', 'Kováč Samuel', 'Molnárová Ema'] },
  predmet: { label: 'Predmet', all: 'Všetky', options: ['Všetky', 'Príroda', 'Slovná zásoba SJ', 'Matematika'] }
};

// Farba úspešnosti — neutrálna škála (nechceme žiaka „červenať")
function histUspColor(usp, dark) {
  if (usp >= 60) return dark ? '#7CCB6E' : '#2E7D32';
  if (usp >= 25) return dark ? '#FFB74D' : '#E65100';
  return dark ? '#8A98AA' : '#6B7888';
}

function HistFilterChip({ label, value, isDefault, dark, onClick }) {
  // (starý dropdown chip — už sa nepoužíva, ponechaný pre prípad návratu)
  return null;
}

// ── Filter bar: tlačidlo Filtre + aktivne hodnoty ako odstranitelne chipy ──
function HistFilterBar({ filters, dark, activeCount, onOpen, onClear }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const active = Object.entries(filters).filter(([k, v]) => v !== HIST_FILTERS[k].all);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button onClick={onOpen} style={{
        display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
        padding: '8px 14px', borderRadius: 12, cursor: 'pointer',
        fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: 800,
        color: activeCount ? '#FFFFFF' : ink,
        background: activeCount ? HIST_ACCENT : (dark ? '#1A2433' : '#FFFFFF'),
        border: `1.5px solid ${activeCount ? HIST_ACCENT : (dark ? '#2A3447' : '#DDE5EC')}`,
        boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)'
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h18M7 12h10M10 19h4" />
        </svg>
        Filtre
        {activeCount > 0 &&
          <span style={{
            minWidth: 19, height: 19, borderRadius: 999, padding: '0 5px',
            background: '#FFFFFF', color: HIST_ACCENT_DEEP,
            fontSize: 12, fontWeight: 800,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}>{activeCount}</span>}
      </button>

      {/* aktívne hodnoty */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flex: 1, minWidth: 0 }}>
        {active.length === 0
          ? <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 13, fontWeight: 600, color: inkSoft, whiteSpace: 'nowrap' }}>Všetky triedy, žiaci a predmety</span>
          : active.map(([k, v]) =>
              <button key={k} onClick={() => onClear(k)} title="Zrušiť filter" style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0,
                padding: '5px 8px 5px 10px', borderRadius: 999, cursor: 'pointer',
                fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 700,
                color: dark ? '#7CC7EE' : HIST_ACCENT_DEEP,
                background: dark ? 'rgba(63,169,224,0.18)' : 'rgba(63,169,224,0.10)',
                border: 'none', whiteSpace: 'nowrap'
              }}>
                {v}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>)}
      </div>
    </div>
  );
}

function HistRow({ r, dark, last, alt }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const uspC = histUspColor(r.usp, dark);
  const hasPokusy = r.abs > 1 && r.pokusy;
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onClick={hasPokusy ? () => setOpen(!open) : undefined}
      style={{
        background: alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
        borderBottom: last ? 'none' : `1px solid ${line}`,
        cursor: hasPokusy ? 'pointer' : 'default'
      }}>
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 14px'
      }}>
      {/* stred: názov + žiak + meta */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 15,
          color: ink, lineHeight: 1.2,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{r.nazov}</div>
        <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 13, fontWeight: 600, color: inkSoft, lineHeight: 1.2 }}>
          {r.ziak} <span style={{ opacity: 0.6 }}>·</span> {r.trieda}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 1 }}>
          <span style={{
            fontFamily: '"Dosis", sans-serif', fontSize: 11.5, fontWeight: 700,
            color: dark ? '#7CC7EE' : HIST_ACCENT_DEEP,
            background: dark ? 'rgba(63,169,224,0.18)' : 'rgba(63,169,224,0.10)',
            borderRadius: 6, padding: '2px 8px', lineHeight: 1.25, whiteSpace: 'nowrap'
          }}>{r.predmet}</span>
          <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 600, color: inkSoft }}>{r.cas}</span>
          {hasPokusy
            ? <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontFamily: '"Dosis", sans-serif', fontSize: 13, fontWeight: 800,
                color: dark ? '#7CC7EE' : HIST_ACCENT_DEEP,
                background: dark ? 'rgba(63,169,224,0.18)' : 'rgba(63,169,224,0.10)',
                border: `1px solid ${dark ? 'rgba(124,199,238,0.35)' : 'rgba(63,169,224,0.30)'}`,
                borderRadius: 8, padding: '3px 10px', whiteSpace: 'nowrap', lineHeight: 1.4,
                margin: '-5px 0'
              }}>
                {r.abs} pokusy
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            : <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 600, color: inkSoft }}>{r.abs}×</span>}
        </div>
      </div>
      {/* úspešnosť + body */}
      <div style={{ width: 46, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
        <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: uspC, lineHeight: 1.1 }}>{r.usp}<span style={{ fontSize: 12 }}> %</span></div>
        <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 11.5, fontWeight: 600, color: inkSoft, lineHeight: 1.2 }}>{r.body} b.</div>
      </div>
      {/* play */}
      <button title="Prehrať test" onClick={e => e.stopPropagation()} style={{
        width: 36, height: 36, flexShrink: 0, borderRadius: '50%',
        border: 'none', padding: 0, cursor: 'pointer',
        background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="34" height="34" viewBox="0 0 34 34">
          <circle cx="17" cy="17" r="15.5" fill="none" stroke={HIST_PLAY} strokeWidth="3" strokeLinecap="round" />
          <path d="M14 11.5 L23.5 17 L14 22.5 Z" fill={HIST_PLAY} stroke={HIST_PLAY} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </button>
    </div>

    {/* rozbalené pokusy — vnožené položky so zvislou čiarou vľavo (ako v menu) */}
    {hasPokusy && open &&
      <div style={{
        margin: '0 14px 11px 22px',
        borderLeft: `3px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
        paddingLeft: 12
      }}>
        {r.pokusy.map((p, i) => {
          const pC = histUspColor(p.usp, dark);
          const best = p.usp === Math.max(...r.pokusy.map(x => x.usp));
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: i === r.pokusy.length - 1 ? 'none' : `1px solid ${line}`
            }}>
              <span style={{
                fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 700,
                color: ink, width: 62, flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', gap: 4
              }}>{i + 1}. pokus{best &&
                <svg width="11" height="11" viewBox="0 0 24 24" fill={HIST_PLAY} stroke="none">
                  <path d="M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 20 12 16.77 6.2 20l1.3-6.35L3 9.27l6.1-1.01z" />
                </svg>}</span>
              <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft, flex: 1, whiteSpace: 'nowrap' }}>{p.datum}, {p.cas}</span>
              <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft }}>{p.body} b.</span>
              <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: 800, color: pC, width: 44, textAlign: 'right' }}>{p.usp} %</span>
              <button title="Prehrať pokus" onClick={e => e.stopPropagation()} style={{
                width: 26, height: 26, flexShrink: 0, borderRadius: '50%',
                border: 'none', padding: 0, cursor: 'pointer', background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" r="15.5" fill="none" stroke={HIST_PLAY} strokeWidth="3" strokeLinecap="round" />
                  <path d="M14 11.5 L23.5 17 L14 22.5 Z" fill={HIST_PLAY} stroke={HIST_PLAY} strokeWidth="2.5" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>}
    </div>
  );
}

function HistSheet({ filters, dark, onApply, onClose }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const card = dark ? '#16202E' : '#FFFFFF';
  const [local, setLocal] = React.useState(filters);
  const [openKey, setOpenKey] = React.useState(null);
  const pick = (k, o) => setLocal({ ...local, [k]: o });
  const reset = () => { setLocal({ trieda: 'Všetky', ziak: 'Všetci', predmet: 'Všetky' }); setOpenKey(null); };
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(10,20,32,0.45)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: card, borderRadius: '22px 22px 0 0',
        padding: '10px 0 20px', boxShadow: '0 -12px 40px rgba(10,20,32,0.25)',
        maxHeight: '82%', height: 400, display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: dark ? '#2A3447' : '#DDE5EC', margin: '4px auto 8px', flexShrink: 0 }} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px 4px', flexShrink: 0
        }}>
          <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 18, fontWeight: 800, color: ink }}>Filtre</span>
          <button onClick={reset} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 0',
            fontFamily: '"Dosis", sans-serif', fontSize: 13.5, fontWeight: 700,
            color: dark ? '#7CC7EE' : HIST_ACCENT_DEEP
          }}>Zrušiť všetky</button>
        </div>

        <div style={{ overflowY: 'visible', padding: '4px 20px 10px', flex: 1, position: 'relative', zIndex: 5 }}>
          {Object.entries(HIST_FILTERS).map(([k, f]) => {
            const isOpen = openKey === k;
            return (
              <div key={k} style={{ marginTop: 8, position: 'relative' }}>
                <div style={{
                  fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 800,
                  color: inkSoft, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6
                }}>{f.label}</div>
                {/* dropdown field */}
                <button onClick={() => setOpenKey(isOpen ? null : k)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '9px 14px', cursor: 'pointer',
                  background: dark ? '#1A2433' : '#FFFFFF',
                  border: `1.5px solid ${isOpen ? HIST_ACCENT : (dark ? '#2A3447' : '#DDE5EC')}`,
                  borderRadius: 12,
                  fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 700,
                  color: local[k] !== f.all ? (dark ? '#7CC7EE' : HIST_ACCENT_DEEP) : ink,
                  textAlign: 'left'
                }}>
                  {local[k]}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={dark ? '#8A98AA' : '#6B7888'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease', flexShrink: 0 }}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {/* možnosti — plavajúce menu; pri veľa položkách scrolluje vnútri */}
                {isOpen &&
                  <div style={{
                    position: 'absolute', left: 0, right: 0, zIndex: 20,
                    top: '100%', marginTop: 4,
                    maxHeight: 120, overflowY: 'auto',
                    background: dark ? '#1A2433' : '#FFFFFF',
                    border: `1.5px solid ${dark ? '#2A3447' : '#DDE5EC'}`,
                    borderRadius: 12,
                    boxShadow: '0 10px 30px rgba(10,20,32,0.22)'
                  }}>
                    {f.options.map((o, i) => {
                      const sel = local[k] === o;
                      return (
                        <button key={o} onClick={() => { pick(k, o); setOpenKey(null); }} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '11px 14px', cursor: 'pointer',
                          background: sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent',
                          border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${line}`,
                          fontFamily: '"Dosis", sans-serif', fontSize: 15,
                          fontWeight: sel ? 800 : 600,
                          color: sel ? (dark ? '#7CC7EE' : HIST_ACCENT_DEEP) : ink,
                          textAlign: 'left'
                        }}>
                          {o}
                          {sel &&
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>}
                        </button>
                      );
                    })}
                  </div>}
              </div>
            );
          })}
        </div>

        <div style={{ padding: '10px 20px 14px', borderTop: `1px solid ${line}`, flexShrink: 0 }}>
          <button onClick={() => onApply(local)} style={{
            display: 'block', width: '100%', padding: '13px 0', borderRadius: 14, cursor: 'pointer',
            background: `linear-gradient(135deg, ${HIST_PRIMARY} 0%, ${HIST_PRIMARY_DEEP} 100%)`, border: 'none',
            fontFamily: '"Dosis", sans-serif', fontSize: 16, fontWeight: 800, color: '#FFFFFF'
          }}>Zobraziť výsledky</button>
        </div>
      </div>
    </div>
  );
}

function HistoriaUcitelScreen({ dark = false }) {
  const ink = dark ? '#E7EEF6' : '#1C2733';
  const inkSoft = dark ? '#8A98AA' : '#6B7888';
  const line = dark ? '#222C39' : '#ECEFF3';
  const card = dark ? '#141D29' : '#FFFFFF';

  const [trieda, setTrieda] = React.useState('Všetky');
  const [predmet, setPredmet] = React.useState('Všetky');
  const [openKey, setOpenKey] = React.useState(null);   // 'trieda' | 'predmet' | null
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState('');

  const visible = HIST_RECORDS.filter(r =>
    (trieda === 'Všetky' || r.trieda === trieda) &&
    (predmet === 'Všetky' || r.predmet === predmet) &&
    r.ziak.toLowerCase().includes(q.trim().toLowerCase())
  );

  // zoskupenie podľa dňa (poradie zachované — už zoradené podľa času)
  const groups = [];
  visible.forEach(r => {
    const g = groups[groups.length - 1];
    if (g && g.datum === r.datum) g.rows.push(r);
    else groups.push({ datum: r.datum, rows: [r] });
  });

  const histFade = (el) => {
    if (!el) return;
    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
    const g = 'linear-gradient(to bottom, transparent 0, #000 ' + (atTop ? '0px' : '22px') + ', #000 ' + (atBottom ? '100%' : 'calc(100% - 26px)') + ', transparent 100%)';
    el.style.webkitMaskImage = g;
    el.style.maskImage = g;
  };

  return (
    <window.PhoneFrame dark={dark} label="09 História — učiteľ">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>

        {/* ── Hlavička — rovnaký toolbar ako „Môj profil“ ── */}
        <div style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', padding: '6px 18px 14px',
          minHeight: 58,
          background: dark
            ? 'linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(15,30,55,0.30) 70%, rgba(15,30,55,0) 100%)'
            : 'transparent'
        }}>
          {/* Centered title */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            fontSize: 19, fontWeight: 800, letterSpacing: '-0.2px',
            fontFamily: '"Dosis", sans-serif', color: ink
          }}>História</div>

          {/* Left: back button */}
          <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
            <button title="Späť" style={{
              width: 38, height: 38, borderRadius: 14,
              border: 'none',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0, flexShrink: 0, cursor: 'pointer'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={dark ? '#F2F7FB' : '#1A2B3D'} strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </button>
          </div>

          <div style={{ flex: 1 }}></div>

          {/* Right: info button */}
          <button title="Informácie" style={{
            width: 38, height: 38, borderRadius: 14, border: 'none', flexShrink: 0, cursor: 'pointer',
            background: 'transparent', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
          }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="2.4" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path><path d="M12 8h.01"></path>
            </svg>
          </button>
        </div>

        <div style={{ padding: '0 18px', display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* ── Dropdowny Trieda / Predmet + ikona vyhľadávania (ako 09b) ── */}
          <window.TvDropdown
            label="Trieda" value={trieda} allValue="Všetky" options={HIST_FILTERS.trieda.options}
            open={openKey === 'trieda'} dark={dark}
            onToggle={() => setOpenKey(openKey === 'trieda' ? null : 'trieda')}
            onPick={o => { setTrieda(o); setOpenKey(null); }} />
          <window.TvDropdown
            label="Predmet" value={predmet} allValue="Všetky" options={HIST_FILTERS.predmet.options}
            open={openKey === 'predmet'} dark={dark}
            onToggle={() => setOpenKey(openKey === 'predmet' ? null : 'predmet')}
            onPick={o => { setPredmet(o); setOpenKey(null); }} />
          <button onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setQ(''); }} title="Hľadať žiaka" style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            color: searchOpen ? '#FFFFFF' : (dark ? '#7CC7EE' : HIST_ACCENT_DEEP),
            background: searchOpen ? HIST_ACCENT : (dark ? '#1A2433' : '#FFFFFF'),
            border: `1.5px solid ${searchOpen ? HIST_ACCENT : (dark ? '#2A3447' : '#DDE5EC')}`,
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

        {/* ── Zoznam ── */}
        <div data-scroll-area ref={histFade} onScroll={e => histFade(e.currentTarget)} onWheel={e => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 14px 14px'
        }}>
          {groups.map(g => (
            <div key={g.datum}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 800,
                color: inkSoft, textTransform: 'uppercase', letterSpacing: '0.7px',
                padding: '10px 4px 7px'
              }}>
                {g.datum}
                <span style={{ flex: 1, height: 1, background: inkSoft, opacity: 0.35 }} />
              </div>
              <div style={{
                background: card, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${line}`,
                boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.05), 0 8px 24px -16px rgba(20,40,60,0.18)'
              }}>
                {g.rows.map((r, i) =>
                  <HistRow key={i} r={r} dark={dark} alt={i % 2 === 1} last={i === g.rows.length - 1} />
                )}
              </div>
            </div>
          ))}

          {visible.length === 0 &&
            <div style={{
              textAlign: 'center', padding: '48px 20px',
              fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: inkSoft
            }}>Žiadne záznamy pre zvolené filtre.</div>
          }
          {/* pätička */}
          {visible.length > 0 && <>
            <button style={{
              display: 'block', width: '100%', marginTop: 14,
              padding: '12px 0', borderRadius: 12, cursor: 'pointer',
              background: dark ? 'rgba(63,169,224,0.18)' : 'rgba(63,169,224,0.10)',
              border: `1.5px solid ${dark ? 'rgba(124,199,238,0.4)' : 'rgba(63,169,224,0.35)'}`,
              fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 800,
              color: dark ? '#7CC7EE' : HIST_ACCENT_DEEP
            }}>Načítať ďalšie</button>
            <div style={{
              textAlign: 'center', marginTop: 8,
              fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft
            }}>Záznamy: 1 – {visible.length} z 104</div>
          </>}
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { HistoriaUcitelScreen });
