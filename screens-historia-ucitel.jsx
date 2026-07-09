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

// Predmet → nadradená kategória (na filter Kategória)
const HIST_PREDMET_KAT = {
  'Príroda': 'Prírodovedné predmety',
  'Matematika': 'Matematika',
  'Slovná zásoba SJ': 'Slovenský jazyk a literatúra'
};

// Strom kategórií pre filter (hlavné kategórie → podkategórie)
const HIST_KAT_TREE = [
  { name: 'Slovenský jazyk a literatúra' },
  { name: 'Maďarský jazyk a literatúra' },
  { name: 'Cudzie jazyky' },
  { name: 'Matematika' },
  { name: 'Informatika', children: [
    { name: 'Hardvér' },
    { name: 'Operačný systém, súbory' },
    { name: 'Bezpečnosť a pravidlá správania' },
    { name: 'Kódovanie, digitalizácia' },
    { name: 'Siete, internet, prenos dát' },
    { name: 'Word - textový editor' },
    { name: 'Excel - tabuľkový editor' },
    { name: 'Powerpoint - prezentácie' },
    { name: 'Grafika, obrázky' },
    { name: 'Audio, Video' },
    { name: 'Programovanie' },
    { name: 'Licencie programov' },
    { name: 'História počítačov' },
    { name: 'Opakovanie podľa ročníkov' },
    { name: 'Nezaradené' }
  ] },
  { name: 'Prírodovedné predmety' },
  { name: 'Dejepis' },
  { name: 'Výchovy, spoločenskovedné' },
  { name: 'Odborné predmety' },
  { name: 'Materská škola' },
  { name: 'Špeciálna základná škola' },
  { name: 'Žiaci s PAS' },
  { name: 'Odborné učilište' },
  { name: 'Praktická škola' },
  { name: 'Oddychové' },
  { name: 'Autoškola' },
  { name: 'Maturitné testy' }
];

const HIST_FILTERS = {
  trieda:    { label: 'Trieda',    all: 'Všetky', options: ['Všetky', 'I.A', 'I.B', 'II.A'] },
  ziak:      { label: 'Žiak',      all: 'Všetci', options: ['Všetci', 'Chovanec Ján', 'Čikovská Petronela', 'Kováč Samuel', 'Molnárová Ema'] },
  predmet:   { label: 'Predmet',   all: 'Všetky', options: ['Všetky', 'Príroda', 'Slovná zásoba SJ', 'Matematika'] },
  kategoria: { label: 'Kategória', all: 'Všetky', options: ['Všetky', 'Interaktívne cvičenia', 'Slovenský jazyk', 'Cudzie jazyky', 'Pracovné listy'] }
};

// ── Časové obdobia pre úvodný filter ──
const HIST_OBDOBIA = [
  { id: '7d',   label: 'Posledných 7 dní' },
  { id: '30d',  label: 'Posledných 30 dní' },
  { id: 'rok',  label: 'Aktuálny školský rok' }
];

const HIST_MONTHS = { 'január': 0, 'február': 1, 'marec': 2, 'apríl': 3, 'máj': 4, 'jún': 5, 'júl': 6, 'august': 7, 'september': 8, 'október': 9, 'november': 10, 'december': 11 };
const HIST_TODAY = new Date(2026, 6, 6);  // referenčné „dnes" pre prototyp

function parseHistDate(s) {
  const m = s.match(/(\d+)\.\s*([^\s]+)\s*(\d{4})/);
  if (!m) return null;
  const mon = HIST_MONTHS[m[2].toLowerCase()];
  if (mon === undefined) return null;
  return new Date(+m[3], mon, +m[1]);
}

// Vráti true ak dátum záznamu spadá do zvoleného obdobia
function histInObdobie(datum, obId, custom) {
  if (obId === 'rok') return true;
  const d = parseHistDate(datum);
  if (!d) return true;
  if (obId === 'vlastne') {
    const od = custom && custom.od ? new Date(custom.od) : null;
    const doo = custom && custom.do ? new Date(custom.do) : null;
    if (od && d < od) return false;
    if (doo && d > doo) return false;
    return true;
  }
  const diff = (HIST_TODAY - d) / 86400000;
  if (diff < 0) return false;
  if (obId === 'dnes') return diff < 1;
  if (obId === '7d') return diff <= 7;
  if (obId === '30d') return diff <= 30;
  return true;
}

// Farba úspešnosti — zelená/červená z palety appky (pod 50 % červená)
function histUspColor(usp, dark) {
  const green = dark ? '#8FD400' : HIST_PRIMARY_DEEP;   // Quasar primary
  const red   = dark ? '#FF6B6F' : ((window.QUASAR && window.QUASAR.negative) || '#E5484D');
  return usp < 50 ? red : green;
}

function HistFilterChip({ label, value, isDefault, dark, onClick }) {
  // (starý dropdown chip — už sa nepoužíva, ponechaný pre prípad návratu)
  return null;
}

// ── Filter bar: tlačidlo Filtre + aktivne hodnoty ako odstranitelne chipy ──
function HistFilterBar({ filters, dark, activeCount, onOpen, onClear }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const active = Object.entries(filters).filter(([k, v]) => v !== HIST_FILTERS[k].all);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button onClick={onOpen} style={{
        display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
        padding: '8px 14px', borderRadius: 12, cursor: 'pointer',
        fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: 800,
        color: activeCount ? '#FFFFFF' : ink,
        background: activeCount ? HIST_ACCENT : (dark ? '#1A2433' : '#FFFFFF'),
        border: `1.5px solid ${activeCount ? HIST_ACCENT : (dark ? '#2A3447' : '#E4EBF2')}`,
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
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const uspC = histUspColor(r.usp, dark);
  return (
    <div style={{
      background: alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${line}`,
      display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px'
    }}>
      {/* názov testu + meno + predmet */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 15,
          color: ink, lineHeight: 1.2,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{r.nazov}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 13, fontWeight: 600, color: inkSoft, lineHeight: 1.2 }}>{r.ziak}</span>
          <span style={{ width: 1, height: 13, background: line, flexShrink: 0 }}></span>
          <span style={{
            fontFamily: '"Dosis", sans-serif', fontSize: 13, fontWeight: 600,
            color: inkSoft, lineHeight: 1.2, whiteSpace: 'nowrap'
          }}>{r.predmet}</span>
        </div>
      </div>
      {/* úspešnosť */}
      <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: uspC, lineHeight: 1.1, flexShrink: 0 }}>{r.usp}<span style={{ fontSize: 12 }}> %</span></div>
    </div>
  );
}

function HistSheet({ filters, dark, onApply, onClose }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';
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
        background: card, borderRadius: '20px 22px 0 0',
        padding: '10px 0 20px', boxShadow: '0 -12px 40px rgba(10,20,32,0.25)',
        maxHeight: '82%', height: 400, display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: dark ? '#2A3447' : '#E4EBF2', margin: '4px auto 8px', flexShrink: 0 }} />
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
                  border: `1.5px solid ${isOpen ? HIST_ACCENT : (dark ? '#2A3447' : '#E4EBF2')}`,
                  borderRadius: 12,
                  fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 700,
                  color: local[k] !== f.all ? (dark ? '#7CC7EE' : HIST_ACCENT_DEEP) : ink,
                  textAlign: 'left'
                }}>
                  {local[k]}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={dark ? '#A8B6C8' : '#4A5B6E'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease', flexShrink: 0 }}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {/* možnosti — plavajúce menu; pri veľa položkách scrolluje vnútri */}
                {isOpen &&
                  <div data-scroll-area onWheel={e => e.stopPropagation()} style={{
                    position: 'absolute', left: 0, right: 0, zIndex: 20,
                    top: '100%', marginTop: 4,
                    maxHeight: 120, overflowY: 'auto',
                    background: dark ? '#1A2433' : '#FFFFFF',
                    border: `1.5px solid ${dark ? '#2A3447' : '#E4EBF2'}`,
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
            display: 'block', width: '100%', padding: '13px 0', borderRadius: 12, cursor: 'pointer',
            background: `linear-gradient(135deg, ${HIST_PRIMARY} 0%, ${HIST_PRIMARY_DEEP} 100%)`, border: 'none',
            fontFamily: '"Dosis", sans-serif', fontSize: 16, fontWeight: 800, color: '#FFFFFF'
          }}>Zobraziť výsledky</button>
        </div>
      </div>
    </div>
  );
}

// ── Sploštenie stromu na hľadateľný zoznam { name, path } ──
function histFlattenKat(tree, path, out) {
  out = out || [];
  path = path || [];
  for (const node of tree) {
    out.push({ name: node.name, path });
    if (node.children && node.children.length)
      histFlattenKat(node.children, [...path, node.name], out);
  }
  return out;
}
const HIST_KAT_FLAT = histFlattenKat(HIST_KAT_TREE);

// Odstráni diakritiku pre hľadanie (Matematika ≈ matematika)
function histNorm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ── Uzol stromu kategórií — rozbaľovací + vyberateľný ──
function HistKatNode({ node, depth, value, expanded, toggle, onPick, dark }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const hasKids = node.children && node.children.length > 0;
  const isOpen = expanded.has(node.name);
  const sel = value === node.name;
  const pad = 12 + depth * 18;
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        paddingLeft: pad, paddingRight: 12, borderTop: `1px solid ${line}`,
        background: sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent'
      }}>
        {hasKids
          ? <button onClick={() => toggle(node.name)} title={isOpen ? 'Zbaliť' : 'Rozbaliť'} style={{
              width: 26, height: 26, borderRadius: 8, flexShrink: 0, cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', background: 'transparent'
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                {!isOpen && <path d="M12 5v14"></path>}
              </svg>
            </button>
          : <span style={{ width: 26, flexShrink: 0 }} />}
        <button onClick={() => onPick(node.name)} style={{
          flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          padding: '10px 0', cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'left'
        }}>
          <span style={{
            fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: ink, lineHeight: 1.2
          }}>{node.name}</span>
          {sel &&
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20 6 9 17l-5-5"></path>
            </svg>}
        </button>
      </div>
      {isOpen && hasKids &&
        node.children.map(c =>
          <HistKatNode key={c.name} node={c} depth={depth + 1} value={value} expanded={expanded} toggle={toggle} onPick={onPick} dark={dark} />)}
    </div>
  );
}

// ── Pole Kategória — vyhľadávanie + strom ──
function HistKatSearch({ value, open, onToggle, onPick, dark }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';
  const changed = value !== 'Všetky';
  const [q, setQ] = React.useState(changed ? value : '');
  const [mode, setMode] = React.useState('search');   // 'search' | 'tree'
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(() => new Set());
  const toggleNode = (n) => setExpanded(prev => {
    const s = new Set(prev); s.has(n) ? s.delete(n) : s.add(n); return s;
  });
  const inputRef = React.useRef(null);
  const wrapRef = React.useRef(null);

  const closePanel = () => { setPanelOpen(false); setMode('search'); setQ(value !== 'Všetky' ? value : ''); };
  const openSearch = () => { setPanelOpen(true); setMode('search'); setQ(''); };
  const openTree = () => { setPanelOpen(true); setMode('tree'); };
  const pick = (name) => { onPick(name); setPanelOpen(false); setMode('search'); setQ(name !== 'Všetky' ? name : ''); };

  React.useEffect(() => {
    if (!panelOpen) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) closePanel(); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [panelOpen, value]);

  const nq = histNorm(q.trim());
  const results = nq
    ? HIST_KAT_FLAT.filter(it => histNorm(it.name).includes(nq)).slice(0, 40)
    : HIST_KAT_FLAT;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Prepínač: vyhľadávanie / strom — vždy viditeľné */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
        <div onClick={() => inputRef.current && inputRef.current.focus()} style={{
          flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 13px', borderRadius: 13, cursor: 'text', background: card,
          border: 'none',
          boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)'
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={panelOpen && mode === 'search' ? (dark ? '#7CC7EE' : HIST_ACCENT_DEEP) : inkSoft} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setMode('search'); setPanelOpen(true); }}
            onFocus={openSearch}
            placeholder="Vyhľadať kategóriu…"
            style={{
              flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: ink
            }} />
          {q && <button onClick={(e) => { e.stopPropagation(); onPick('Všetky'); setQ(''); setPanelOpen(true); setMode('search'); inputRef.current && inputRef.current.focus(); }} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, flexShrink: 0, display: 'flex'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
          </button>}
        </div>
        <button onClick={openTree} style={{
          flexShrink: 0, padding: '10px 16px', borderRadius: 13, cursor: 'pointer', background: card,
          border: 'none',
          boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)',
          fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 700,
          color: panelOpen && mode === 'tree' ? (dark ? '#7CC7EE' : HIST_ACCENT_DEEP) : ink, whiteSpace: 'nowrap'
        }}>Vybrať kategóriu</button>
      </div>
      {panelOpen &&
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 6, zIndex: 20,
          background: card, border: `1.5px solid ${line}`, borderRadius: 13,
          boxShadow: '0 12px 34px rgba(10,20,32,0.22)', overflow: 'hidden'
        }}>
          {/* Telo — výsledky vyhľadávania alebo strom */}
          <div data-scroll-area onWheel={e => e.stopPropagation()} style={{
            maxHeight: 300, overflowY: 'auto', padding: '4px 0'
          }}>
            {/* Všetky kategórie — vždy dostupné */}
            <button onClick={() => pick('Všetky')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%',
              padding: '10px 14px', cursor: 'pointer', border: 'none',
              borderBottom: `1px solid ${line}`, textAlign: 'left',
              background: !changed ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent'
            }}>
              <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: ink }}>Všetky kategórie</span>
              {!changed &&
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>}
            </button>

            {/* Režim: strom */}
            {mode === 'tree' &&
              HIST_KAT_TREE.map(n =>
                <HistKatNode key={n.name} node={n} depth={0} value={value} expanded={expanded} toggle={toggleNode} onPick={pick} dark={dark} />)}

            {/* Režim: vyhľadávanie */}
            {mode === 'search' && results.map((it, i) => {
              const sel = value === it.name;
              return (
                <button key={it.name + '·' + i} onClick={() => pick(it.name)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  width: '100%', padding: '9px 14px', cursor: 'pointer',
                  border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${line}`, textAlign: 'left',
                  background: sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent'
                }}>
                  <span style={{ minWidth: 0 }}>
                  {it.path.length > 0 &&
                    <div style={{
                      fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 600, color: inkSoft,
                      marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>{it.path.join(' › ')}</div>}
                  <div style={{
                    fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600,
                    color: ink, lineHeight: 1.2
                  }}>{it.name}</div>
                  </span>
                  {sel &&
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>}
                </button>
              );
            })}

            {mode === 'search' && results.length === 0 &&
              <div style={{
                padding: '18px 14px', textAlign: 'center',
                fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: 600, fontStyle: 'italic', color: inkSoft
              }}>Nič sa nenašlo</div>}
          </div>
        </div>}
    </div>
  );
}

// ── Úvodný filter: výber triedy, predmetu, kategórie, žiaka a časového obdobia ──
function HistIntro({ dark, initTrieda, initPredmet, initKategoria, initZiak, initObdobie, initCustom, onSubmit, onBack }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [trieda, setTrieda] = React.useState(initTrieda || null);
  const [predmet, setPredmet] = React.useState(initPredmet || 'Všetky');
  const [kategoria, setKategoria] = React.useState(initKategoria || 'Všetky');
  const [ziak, setZiak] = React.useState(initZiak || 'Všetci');
  const [obdobie, setObdobie] = React.useState(initObdobie || '7d');
  const [custom, setCustom] = React.useState(initCustom || { od: '', do: '' });
  const [openKey, setOpenKey] = React.useState(null);   // 'trieda' | 'predmet' | 'ziak' | 'obdobie' | null

  const sectionLabel = {
    fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 800,
    color: inkSoft, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 6
  };

  // Labelované dropdown pole s plavajúcim zoznamom možností
  const Field = ({ fieldKey, valueLabel, changed, options }) => {
    const isOpen = openKey === fieldKey;
    return (
      <div style={{ position: 'relative' }}>
        <button onClick={() => setOpenKey(isOpen ? null : fieldKey)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '10px 14px', cursor: 'pointer',
          background: card, border: 'none', borderRadius: 13,
          fontFamily: '"Dosis", sans-serif', fontSize: 15.5, fontWeight: 600,
          color: ink, textAlign: 'left',
          boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)'
        }}>
          {valueLabel}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }}>
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        {isOpen &&
          <div data-scroll-area onWheel={e => e.stopPropagation()} style={{
            position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 5, zIndex: 20,
            maxHeight: 210, overflowY: 'auto',
            background: card, border: `1.5px solid ${line}`, borderRadius: 13,
            boxShadow: '0 12px 34px rgba(10,20,32,0.22)'
          }}>
            {options.map((o, i) => (
              <button key={o.value} onClick={o.onPick} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '12px 15px', cursor: 'pointer',
                background: o.sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent',
                border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${line}`,
                fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600,
                color: ink, textAlign: 'left'
              }}>
                <span style={{ minWidth: 0 }}>
                  {o.label}
                  {o.desc && <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: inkSoft, marginTop: 1 }}>{o.desc}</span>}
                </span>
                {o.sel &&
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HIST_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>}
              </button>
            ))}
          </div>}
      </div>
    );
  };

  return (
    <window.PhoneFrame dark={dark} label="09 História — filter">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        {/* Hlavička */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '6px 18px 14px', minHeight: 58 }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
            fontSize: 19, fontWeight: 800, letterSpacing: '-0.2px', fontFamily: '"Dosis", sans-serif', color: ink
          }}>História</div>
          <button onClick={onBack} title="Späť" style={{
            width: 38, height: 38, borderRadius: 12, border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer', zIndex: 1
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 18px 18px' }} onWheel={e => e.stopPropagation()}>
          {/* Obdobie — povinné, prvé */}
          <div style={sectionLabel}>Časové obdobie <span style={{ color: ink }}>*</span></div>
          <div style={{ marginBottom: 14 }}>
            <Field
              fieldKey="obdobie"
              valueLabel={obdobie ? ((HIST_OBDOBIA.find(o => o.id === obdobie) || {}).label || '') : 'Vyberte obdobie…'}
              changed={!!obdobie}
              options={HIST_OBDOBIA.map(ob => ({
                value: ob.id, label: ob.label, desc: ob.desc, sel: obdobie === ob.id,
                onPick: () => { setObdobie(ob.id); setOpenKey(null); }
              }))} />
          </div>

          {/* Vlastné obdobie — polia od / do */}
          {obdobie === 'vlastne' &&
            <div style={{ display: 'flex', gap: 10, padding: '0 2px 14px' }}>
              {[['od', 'Od'], ['do', 'Do']].map(([k, lbl]) => (
                <label key={k} style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: '"Dosis", sans-serif', fontSize: 11.5, fontWeight: 700, color: inkSoft, marginBottom: 5, marginLeft: 2 }}>{lbl}</span>
                  <input type="date" value={custom[k]} onChange={e => setCustom({ ...custom, [k]: e.target.value })} style={{
                    width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 12,
                    background: card, border: `1.5px solid ${line}`, outline: 'none',
                    fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: 700, color: ink
                  }} />
                </label>
              ))}
            </div>}

          {/* Trieda — povinné */}
          <div style={sectionLabel}>Trieda <span style={{ color: ink }}>*</span></div>
          <div style={{ marginBottom: 14 }}>
            <Field
              fieldKey="trieda"
              valueLabel={trieda || 'Vyberte triedu…'}
              changed={!!trieda}
              options={HIST_FILTERS.trieda.options.map(o => ({
                value: o, label: o, sel: trieda === o,
                onPick: () => { setTrieda(o); setOpenKey(null); }
              }))} />
          </div>

          {/* Predmet */}
          <div style={sectionLabel}>Predmet</div>
          <div style={{ marginBottom: 14 }}>
            <Field
              fieldKey="predmet"
              valueLabel={predmet}
              changed={predmet !== 'Všetky'}
              options={HIST_FILTERS.predmet.options.map(o => ({
                value: o, label: o, sel: predmet === o,
                onPick: () => { setPredmet(o); setOpenKey(null); }
              }))} />
          </div>

          {/* Kategória — textové vyhľadávanie */}
          <div style={sectionLabel}>Kategória</div>
          <div style={{ marginBottom: 14 }}>
            <HistKatSearch
              value={kategoria}
              open={openKey === 'kategoria'}
              onToggle={() => setOpenKey(openKey === 'kategoria' ? null : 'kategoria')}
              onPick={o => { setKategoria(o); setOpenKey(null); }}
              dark={dark} />
          </div>

          {/* Žiak */}
          <div style={sectionLabel}>Žiak</div>
          <div style={{ marginBottom: 14 }}>
            <Field
              fieldKey="ziak"
              valueLabel={ziak}
              changed={ziak !== 'Všetci'}
              options={HIST_FILTERS.ziak.options.map(o => ({
                value: o, label: o, sel: ziak === o,
                onPick: () => { setZiak(o); setOpenKey(null); }
              }))} />
          </div>

          <button
            disabled={!obdobie || !trieda}
            onClick={() => { if (obdobie && trieda) onSubmit({ trieda, predmet, kategoria, ziak, obdobie, custom }); }}
            style={{
              display: 'block', width: '100%', padding: '14px 0', borderRadius: 14, marginTop: 18,
              cursor: (obdobie && trieda) ? 'pointer' : 'not-allowed',
              background: (obdobie && trieda) ? `linear-gradient(135deg, ${HIST_PRIMARY} 0%, ${HIST_PRIMARY_DEEP} 100%)` : (dark ? '#243040' : '#DCE7F0'),
              border: 'none',
              fontFamily: '"Dosis", sans-serif', fontSize: 16.5, fontWeight: 800,
              color: (obdobie && trieda) ? '#FFFFFF' : (dark ? '#5A6B7E' : '#9CB0C2')
            }}>Zobraziť</button>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

function HistoriaUcitelScreen({ dark = false }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [stage, setStage] = React.useState('filter');   // 'filter' | 'results'
  const [trieda, setTrieda] = React.useState(null);
  const [obdobie, setObdobie] = React.useState('7d');
  const [custom, setCustom] = React.useState({ od: '', do: '' });
  const [predmet, setPredmet] = React.useState('Všetky');
  const [kategoria, setKategoria] = React.useState('Všetky');
  const [ziak, setZiak] = React.useState('Všetci');

  // Úvodný filter — najprv vyber triedu, predmet, kategóriu, žiaka a obdobie
  if (stage === 'filter') {
    return (
      <HistIntro
        dark={dark}
        initTrieda={trieda} initPredmet={predmet} initKategoria={kategoria} initZiak={ziak} initObdobie={obdobie} initCustom={custom}
        onSubmit={({ trieda, predmet, kategoria, ziak, obdobie, custom }) => {
          setTrieda(trieda); setPredmet(predmet); setKategoria(kategoria); setZiak(ziak); setObdobie(obdobie); setCustom(custom);
          setStage('results');
        }}
        onBack={() => {}} />
    );
  }

  const obLabel = (HIST_OBDOBIA.find(o => o.id === obdobie) || {}).label || '';

  const visible = HIST_RECORDS.filter(r =>
    (!trieda || trieda === 'Všetky' || r.trieda === trieda) &&
    (predmet === 'Všetky' || r.predmet === predmet) &&
    (kategoria === 'Všetky' || HIST_PREDMET_KAT[r.predmet] === kategoria) &&
    (ziak === 'Všetci' || r.ziak === ziak) &&
    histInObdobie(r.datum, obdobie, custom)
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
            <button onClick={() => setStage('filter')} title="Späť na filter" style={{
              width: 38, height: 38, borderRadius: 12,
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

          {/* Right: filter button */}
          <button onClick={() => setStage('filter')} title="Upraviť filtre" style={{
            width: 38, height: 38, borderRadius: 12, border: 'none', flexShrink: 0, cursor: 'pointer',
            background: 'transparent', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dark ? '#F2F7FB' : '#1A2B3D'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.354 3H4a1 1 0 0 0-.78 1.63l5.056 6.19A2 2 0 0 1 8.73 12.07V19a1 1 0 0 0 .553.894l2 1A1 1 0 0 0 12.73 20v-7.928a2 2 0 0 1 .454-1.267l.503-.616"></path>
              <path d="M16 6h6"></path>
              <path d="M19 3v6"></path>
            </svg>
          </button>
        </div>

        {/* ── Filter bar: aktuálne výbery ako statické štítky ── */}
        <div style={{ padding: '0 18px 10px', display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* aktuálne výbery — každý so zrušením */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, flex: 1, minWidth: 0 }}>
            {[
              { key: 'obdobie', label: 'Obdobie', text: obLabel, onClear: () => setStage('filter') },
              trieda && trieda !== 'Všetky' && { key: 'trieda', label: 'Trieda', text: trieda, onClear: () => setTrieda('Všetky') },
              kategoria !== 'Všetky' && { key: 'kategoria', label: 'Kategória', text: kategoria, onClear: () => setKategoria('Všetky') },
              predmet !== 'Všetky' && { key: 'predmet', label: 'Predmet', text: predmet, onClear: () => setPredmet('Všetky') },
              ziak !== 'Všetci' && { key: 'ziak', label: 'Žiak', text: ziak, onClear: () => setZiak('Všetci') }
            ].filter(Boolean).map(chip =>
              <span key={chip.key} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
                padding: chip.fixed ? '6px 14px' : '5px 6px 5px 12px', borderRadius: 999,
                fontFamily: '"Dosis", sans-serif', fontSize: 13.5,
                background: card,
                border: `1px solid ${dark ? '#2A3447' : '#DCE7F0'}`,
                boxShadow: dark ? 'none' : '0 1px 2px rgba(20,40,60,0.05)',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ fontWeight: 600, color: ink }}>{chip.text}</span>
                {!chip.fixed &&
                <button onClick={chip.onClear} title="Zrušiť filter" style={{
                  width: 20, height: 20, borderRadius: 999, flexShrink: 0, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                  border: 'none', background: 'transparent'
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"></path>
                  </svg>
                </button>}
              </span>
            )}
          </div>
        </div>

        {/* ── Zoznam ── */}
        <div data-scroll-area ref={histFade} onScroll={e => histFade(e.currentTarget)} onWheel={e => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 14px 14px'
        }}>
          {groups.map((g, gi) => (
            <div key={g.datum}>
              <div style={{
                background: card, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${line}`, marginTop: gi === 0 ? 0 : 12,
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
              padding: '13px 0', borderRadius: 12, cursor: 'pointer',
              background: `linear-gradient(135deg, ${HIST_PRIMARY} 0%, ${HIST_PRIMARY_DEEP} 100%)`, border: 'none',
              fontFamily: '"Dosis", sans-serif', fontSize: 15.5, fontWeight: 800,
              color: '#FFFFFF'
            }}>Načítať ďalšie</button>
          </>}
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { HistoriaUcitelScreen });
