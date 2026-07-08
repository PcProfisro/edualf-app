// ─────────────────────────────────────────────────────────────
// HistoriaZiakScreen — 10 · História žiaka (AlfBook)
// Duplikát obrazovky 09, upravený pre žiaka:
//   • v zozname vypadne meno žiaka (vidí len svoje záznamy)
//   • vo filtri nie je Trieda ani Žiak (ostáva Obdobie, Predmet, Kategória)
// Samostatné identifikátory (HZ_*) — nezdieľa scope s učiteľskou verziou.
// ─────────────────────────────────────────────────────────────

const HZ_ACCENT = '#3FA9E0';
const HZ_ACCENT_DEEP = '#2190C0';
const HZ_PRIMARY = '#7DB800';
const HZ_PRIMARY_DEEP = '#5E9600';

// Vlastné záznamy žiaka
const HZ_RECORDS = [
  { nazov: 'Čo sa skrýva v ZOO?', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:21', body: 12, usp: 86 },
  { nazov: 'Rozstrihané obrázky – zvieratá', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:15', body: 9, usp: 75 },
  { nazov: 'Pomenovanie zvieracích zvukov', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:10', body: 6, usp: 60 },
  { nazov: 'Čo sa skrýva pod hladinou?', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:10', body: 10, usp: 100 },
  { nazov: 'Čo sa skrýva za stromom?', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:09', body: 0, usp: 0 },
  { nazov: 'Čo sa skrýva za plotom?', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:08', body: 7, usp: 47 },
  { nazov: 'Sčítanie do 10', predmet: 'Matematika', datum: '30. jún 2026', cas: '15:08', body: 11, usp: 92 },
  { nazov: 'Kto povedal mňau?', predmet: 'Príroda', datum: '30. jún 2026', cas: '15:08', body: 3, usp: 25 },
  { nazov: 'Ovocie 1', predmet: 'Slovná zásoba SJ', datum: '7. apríl 2026', cas: '11:31', body: 4, usp: 14 },
  { nazov: 'Zelenina 1', predmet: 'Slovná zásoba SJ', datum: '7. apríl 2026', cas: '11:24', body: 9, usp: 32 }
];

const HZ_PREDMET_KAT = {
  'Príroda': 'Prírodovedné predmety',
  'Matematika': 'Matematika',
  'Slovná zásoba SJ': 'Slovenský jazyk a literatúra'
};

const HZ_KAT_TREE = [
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

const HZ_PREDMETY = ['Všetky', 'Príroda', 'Slovná zásoba SJ', 'Matematika'];

const HZ_OBDOBIA = [
  { id: 'dnes', label: 'Dnes',                desc: '6. júl 2026' },
  { id: '7d',   label: 'Posledných 7 dní',    desc: '30. jún – 6. júl 2026' },
  { id: '30d',  label: 'Posledných 30 dní',   desc: '7. jún – 6. júl 2026' },
  { id: 'rok',  label: 'Aktuálny školský rok', desc: 'od 1. sep 2025' },
  { id: 'vlastne', label: 'Vlastné obdobie',  desc: 'vyberte dátumy' }
];

const HZ_MONTHS = { 'január': 0, 'február': 1, 'marec': 2, 'apríl': 3, 'máj': 4, 'jún': 5, 'júl': 6, 'august': 7, 'september': 8, 'október': 9, 'november': 10, 'december': 11 };
const HZ_TODAY = new Date(2026, 6, 6);

function hzParseDate(s) {
  const m = s.match(/(\d+)\.\s*([^\s]+)\s*(\d{4})/);
  if (!m) return null;
  const mon = HZ_MONTHS[m[2].toLowerCase()];
  if (mon === undefined) return null;
  return new Date(+m[3], mon, +m[1]);
}

function hzInObdobie(datum, obId, custom) {
  if (obId === 'rok') return true;
  const d = hzParseDate(datum);
  if (!d) return true;
  if (obId === 'vlastne') {
    const od = custom && custom.od ? new Date(custom.od) : null;
    const doo = custom && custom.do ? new Date(custom.do) : null;
    if (od && d < od) return false;
    if (doo && d > doo) return false;
    return true;
  }
  const diff = (HZ_TODAY - d) / 86400000;
  if (diff < 0) return false;
  if (obId === 'dnes') return diff < 1;
  if (obId === '7d') return diff <= 7;
  if (obId === '30d') return diff <= 30;
  return true;
}

function hzUspColor(usp, dark) {
  const green = dark ? '#8FD400' : HZ_PRIMARY_DEEP;
  const red   = dark ? '#FF6B6F' : ((window.QUASAR && window.QUASAR.negative) || '#E5484D');
  return usp < 50 ? red : green;
}

// ── Riadok záznamu — BEZ mena žiaka ──
function HzRow({ r, dark, last, alt }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const uspC = hzUspColor(r.usp, dark);
  return (
    <div style={{
      background: alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${line}`,
      display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px'
    }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 15,
          color: ink, lineHeight: 1.2,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{r.nazov}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: '"Dosis", sans-serif', fontSize: 13, fontWeight: 600,
            color: inkSoft, lineHeight: 1.2, whiteSpace: 'nowrap'
          }}>{r.predmet}</span>
        </div>
      </div>
      <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: uspC, lineHeight: 1.1, flexShrink: 0 }}>{r.usp}<span style={{ fontSize: 12 }}> %</span></div>
    </div>
  );
}

// ── Uzol stromu kategórií ──
function HzKatNode({ node, depth, value, expanded, toggle, onPick, dark }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const hasKids = node.children && node.children.length > 0;
  const isOpen = expanded.has(node.name);
  const sel = value === node.name;
  const pad = 10 + depth * 20;
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        paddingLeft: pad, paddingRight: 12,
        background: sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent'
      }}>
        <button onClick={() => toggle(node.name)} title={isOpen ? 'Zbaliť' : 'Rozbaliť'} style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          border: `1.5px solid ${dark ? '#2A3447' : '#E4EBF2'}`,
          background: dark ? '#101A28' : '#F7FCFE'
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3.4" strokeLinecap="round">
            <path d="M5 12h14"></path>
            {!isOpen && <path d="M12 5v14"></path>}
          </svg>
        </button>
        <button onClick={() => onPick(node.name)} style={{
          flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 0', cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'left'
        }}>
          <span style={{
            width: 16, height: 16, borderRadius: 999, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${sel ? HZ_ACCENT : (dark ? '#3A4658' : '#C9D6E2')}`,
            background: sel ? HZ_ACCENT : 'transparent'
          }}>
            {sel && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
          </span>
          <span style={{
            display: 'inline-block',
            padding: '3px 10px', borderRadius: 8,
            border: `1.5px solid ${sel ? HZ_ACCENT : (dark ? '#2A3447' : 'rgba(125,184,0,0.5)')}`,
            fontFamily: '"Dosis", sans-serif', fontSize: 14, fontWeight: sel ? 800 : 700,
            color: sel ? (dark ? '#7CC7EE' : HZ_ACCENT_DEEP) : ink, lineHeight: 1.25
          }}>{node.name}</span>
        </button>
      </div>
      {isOpen && (hasKids
        ? node.children.map(c =>
            <HzKatNode key={c.name} node={c} depth={depth + 1} value={value} expanded={expanded} toggle={toggle} onPick={onPick} dark={dark} />)
        : <div style={{
            paddingLeft: pad + 30, paddingRight: 12, padding: `4px 12px 6px ${pad + 30}px`,
            fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, fontStyle: 'italic',
            color: inkSoft
          }}>Podkategórie sa doplnia</div>)}
    </div>
  );
}

// ── Pole Kategória s rozbaľovacím stromom ──
function HzKatTree({ value, open, onToggle, onPick, dark }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';
  const [expanded, setExpanded] = React.useState(() => new Set(['Informatika']));
  const toggle = (n) => setExpanded(prev => {
    const s = new Set(prev); s.has(n) ? s.delete(n) : s.add(n); return s;
  });
  const changed = value !== 'Všetky';
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '10px 14px', cursor: 'pointer',
        background: card, border: 'none', borderRadius: 13,
        fontFamily: '"Dosis", sans-serif', fontSize: 15.5, fontWeight: 600,
        color: ink, textAlign: 'left',
        boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)'
      }}>
        {changed ? value : 'Všetky'}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }}>
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      {open &&
        <div data-scroll-area onWheel={e => e.stopPropagation()} style={{
          position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 5, zIndex: 20,
          maxHeight: 320, overflowY: 'auto', padding: '6px 0',
          background: card, border: `1.5px solid ${line}`, borderRadius: 13,
          boxShadow: '0 12px 34px rgba(10,20,32,0.22)'
        }}>
          <button onClick={() => onPick('Všetky')} style={{
            display: 'flex', alignItems: 'center', gap: 9, width: '100%',
            padding: '8px 12px', cursor: 'pointer', border: 'none',
            borderBottom: `1px solid ${line}`, marginBottom: 4, textAlign: 'left',
            background: !changed ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent'
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: 999, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${!changed ? HZ_ACCENT : (dark ? '#3A4658' : '#C9D6E2')}`,
              background: !changed ? HZ_ACCENT : 'transparent'
            }}>
              {!changed && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
            </span>
            <span style={{ fontFamily: '"Dosis", sans-serif', fontSize: 14.5, fontWeight: 800, color: !changed ? (dark ? '#7CC7EE' : HZ_ACCENT_DEEP) : ink }}>Všetky kategórie</span>
          </button>
          {HZ_KAT_TREE.map(n =>
            <HzKatNode key={n.name} node={n} depth={0} value={value} expanded={expanded} toggle={toggle} onPick={onPick} dark={dark} />
          )}
        </div>}
    </div>
  );
}

// ── Úvodný filter: Obdobie (povinné) + Predmet + Kategória ──
function HzIntro({ dark, initPredmet, initKategoria, initObdobie, initCustom, onSubmit, onBack }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [predmet, setPredmet] = React.useState(initPredmet || 'Všetky');
  const [kategoria, setKategoria] = React.useState(initKategoria || 'Všetky');
  const [obdobie, setObdobie] = React.useState(initObdobie || '7d');
  const [custom, setCustom] = React.useState(initCustom || { od: '', do: '' });
  const [openKey, setOpenKey] = React.useState(null);

  const sectionLabel = {
    fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 800,
    color: inkSoft, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 6
  };

  const Field = ({ fieldKey, valueLabel, options }) => {
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : HZ_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>}
              </button>
            ))}
          </div>}
      </div>
    );
  };

  return (
    <window.PhoneFrame dark={dark} label="10 História žiaka — filter">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
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
          <div style={{
            fontFamily: '"Dosis", sans-serif', fontSize: 15, fontWeight: 600, color: inkSoft,
            lineHeight: 1.35, margin: '2px 2px 16px'
          }}>Vyberte obdobie (povinné), prípadne spresnite predmet a kategóriu.</div>

          {/* Obdobie — povinné */}
          <div style={sectionLabel}>Časové obdobie <span style={{ color: '#E5484D' }}>*</span></div>
          <div style={{ marginBottom: 14 }}>
            <Field
              fieldKey="obdobie"
              valueLabel={obdobie ? ((HZ_OBDOBIA.find(o => o.id === obdobie) || {}).label || '') : 'Vyberte obdobie…'}
              options={HZ_OBDOBIA.map(ob => ({
                value: ob.id, label: ob.label, desc: ob.desc, sel: obdobie === ob.id,
                onPick: () => { setObdobie(ob.id); setOpenKey(null); }
              }))} />
          </div>

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

          {/* Predmet */}
          <div style={sectionLabel}>Predmet</div>
          <div style={{ marginBottom: 14 }}>
            <Field
              fieldKey="predmet"
              valueLabel={predmet}
              options={HZ_PREDMETY.map(o => ({
                value: o, label: o, sel: predmet === o,
                onPick: () => { setPredmet(o); setOpenKey(null); }
              }))} />
          </div>

          {/* Kategória — rozbaľovací strom */}
          <div style={sectionLabel}>Kategória</div>
          <div style={{ marginBottom: 14 }}>
            <HzKatTree
              value={kategoria}
              open={openKey === 'kategoria'}
              onToggle={() => setOpenKey(openKey === 'kategoria' ? null : 'kategoria')}
              onPick={o => { setKategoria(o); setOpenKey(null); }}
              dark={dark} />
          </div>
        </div>

        <div style={{ padding: '12px 18px 16px', borderTop: `1px solid ${line}` }}>
          <button
            disabled={!obdobie}
            onClick={() => { if (obdobie) onSubmit({ predmet, kategoria, obdobie, custom }); }}
            style={{
              display: 'block', width: '100%', padding: '14px 0', borderRadius: 14,
              cursor: obdobie ? 'pointer' : 'not-allowed',
              background: obdobie ? `linear-gradient(135deg, ${HZ_PRIMARY} 0%, ${HZ_PRIMARY_DEEP} 100%)` : (dark ? '#243040' : '#DCE7F0'),
              border: 'none',
              fontFamily: '"Dosis", sans-serif', fontSize: 16.5, fontWeight: 800,
              color: obdobie ? '#FFFFFF' : (dark ? '#5A6B7E' : '#9CB0C2')
            }}>Zobraziť výsledky</button>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

function HistoriaZiakScreen({ dark = false }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [stage, setStage] = React.useState('filter');
  const [obdobie, setObdobie] = React.useState('7d');
  const [custom, setCustom] = React.useState({ od: '', do: '' });
  const [predmet, setPredmet] = React.useState('Všetky');
  const [kategoria, setKategoria] = React.useState('Všetky');

  if (stage === 'filter') {
    return (
      <HzIntro
        dark={dark}
        initPredmet={predmet} initKategoria={kategoria} initObdobie={obdobie} initCustom={custom}
        onSubmit={({ predmet, kategoria, obdobie, custom }) => {
          setPredmet(predmet); setKategoria(kategoria); setObdobie(obdobie); setCustom(custom);
          setStage('results');
        }}
        onBack={() => {}} />
    );
  }

  const obLabel = (HZ_OBDOBIA.find(o => o.id === obdobie) || {}).label || '';

  const visible = HZ_RECORDS.filter(r =>
    (predmet === 'Všetky' || r.predmet === predmet) &&
    (kategoria === 'Všetky' || HZ_PREDMET_KAT[r.predmet] === kategoria) &&
    hzInObdobie(r.datum, obdobie, custom)
  );

  const groups = [];
  visible.forEach(r => {
    const g = groups[groups.length - 1];
    if (g && g.datum === r.datum) g.rows.push(r);
    else groups.push({ datum: r.datum, rows: [r] });
  });

  const hzFade = (el) => {
    if (!el) return;
    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
    const g = 'linear-gradient(to bottom, transparent 0, #000 ' + (atTop ? '0px' : '22px') + ', #000 ' + (atBottom ? '100%' : 'calc(100% - 26px)') + ', transparent 100%)';
    el.style.webkitMaskImage = g;
    el.style.maskImage = g;
  };

  return (
    <window.PhoneFrame dark={dark} label="10 História žiaka — AlfBook">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        {/* ── Hlavička ── */}
        <div style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', padding: '6px 18px 14px',
          minHeight: 58,
          background: dark
            ? 'linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(15,30,55,0.30) 70%, rgba(15,30,55,0) 100%)'
            : 'transparent'
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            fontSize: 19, fontWeight: 800, letterSpacing: '-0.2px',
            fontFamily: '"Dosis", sans-serif', color: ink
          }}>História</div>

          <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
            <button onClick={() => setStage('filter')} title="Späť na filter" style={{
              width: 38, height: 38, borderRadius: 12, border: 'none', background: 'transparent',
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

        {/* ── Aktuálne výbery ako štítky ── */}
        <div style={{ padding: '0 18px 10px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, flex: 1, minWidth: 0 }}>
            {[
              { key: 'obdobie', text: obLabel, fixed: true },
              kategoria !== 'Všetky' && { key: 'kategoria', text: kategoria, onClear: () => setKategoria('Všetky') },
              predmet !== 'Všetky' && { key: 'predmet', text: predmet, onClear: () => setPredmet('Všetky') }
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
                  border: 'none', background: dark ? 'rgba(255,255,255,0.06)' : '#EDF3F8'
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
        <div data-scroll-area ref={hzFade} onScroll={e => hzFade(e.currentTarget)} onWheel={e => e.stopPropagation()} style={{
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
                  <HzRow key={i} r={r} dark={dark} alt={i % 2 === 1} last={i === g.rows.length - 1} />
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
          {visible.length > 0 && <>
            <button style={{
              display: 'block', width: '100%', marginTop: 14,
              padding: '13px 0', borderRadius: 12, cursor: 'pointer',
              background: `linear-gradient(135deg, ${HZ_PRIMARY} 0%, ${HZ_PRIMARY_DEEP} 100%)`, border: 'none',
              fontFamily: '"Dosis", sans-serif', fontSize: 15.5, fontWeight: 800,
              color: '#FFFFFF'
            }}>Načítať ďalšie</button>
            <div style={{
              textAlign: 'center', marginTop: 8,
              fontFamily: '"Dosis", sans-serif', fontSize: 12.5, fontWeight: 600, color: inkSoft
            }}>Záznamy: 1 – {visible.length} z 42</div>
          </>}
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { HistoriaZiakScreen });
