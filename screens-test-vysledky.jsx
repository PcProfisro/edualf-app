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

// ── Časové obdobia (zhodné s obrazovkou 09) ──
const TV_OBDOBIA = [
  { id: '7d',   label: 'Posledných 7 dní' },
  { id: '30d',  label: 'Posledných 30 dní' },
  { id: 'rok',  label: 'Aktuálny školský rok' }
];
const TV_TODAY = new Date(2026, 6, 6);
function tvParseDate(s) {
  const m = s.match(/(\d+)\.(\d+)\.(\d{4})/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}
function tvInObdobie(datum, obId, custom) {
  if (!obId || obId === 'rok') return true;
  const d = tvParseDate(datum);
  if (!d) return true;
  if (obId === 'vlastne') {
    const od = custom && custom.od ? new Date(custom.od) : null;
    const doo = custom && custom.do ? new Date(custom.do) : null;
    if (od && d < od) return false;
    if (doo && d > doo) return false;
    return true;
  }
  const diff = (TV_TODAY - d) / 86400000;
  if (diff < 0) return false;
  if (obId === 'dnes') return diff < 1;
  if (obId === '7d') return diff <= 7;
  if (obId === '30d') return diff <= 30;
  return true;
}

// ── Dropdown pole (Trieda / Predmet) ──
function TvDropdown({ label, value, allValue, options, open, dark, onToggle, onPick }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const active = value !== allValue;
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <button onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
        width: '100%', padding: '8px 12px', borderRadius: 12, cursor: 'pointer',
        background: dark ? '#1A2433' : '#FFFFFF',
        border: `1.5px solid ${open ? TV_ACCENT : (dark ? '#2A3447' : '#E4EBF2')}`,
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
          border: `1.5px solid ${dark ? '#2A3447' : '#E4EBF2'}`,
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
  const green = dark ? '#8FD400' : '#5E9600';   // Quasar primary
  const red   = dark ? '#FF6B6F' : '#E5484D';   // Quasar negative
  return usp < 50 ? red : green;
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
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const uspC = tvUspColor(r.usp, dark);
  return (
    <div style={{
      background: alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${line}`,
      display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px'
    }}>
      {/* meno žiaka + trieda */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 15.5,
          color: ink, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>{r.ziak}</div>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 12,
          color: dark ? '#8FA0B4' : '#7A8BA0', lineHeight: 1.2, marginTop: 2
        }}>{r.trieda}</div>
      </div>
      {/* úspešnosť */}
      <div style={{ fontFamily: '"Dosis", sans-serif', fontSize: 17, fontWeight: 800, color: uspC, lineHeight: 1.1, flexShrink: 0 }}>{r.usp}<span style={{ fontSize: 12 }}> %</span></div>
    </div>
  );
}

const TV_ZIACI = ['Všetci', ...TV_ROWS.map(r => r.ziak)];

// ── Úvodný filter (podľa obrazovky 09 História): Trieda + Žiak ──
function TvFilterField({ valueLabel, changed, options, dark }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '10px 14px', cursor: 'pointer',
        background: card, border: 'none', borderRadius: 13,
        fontFamily: '"Dosis", sans-serif', fontSize: 15.5, fontWeight: 600,
        color: ink, textAlign: 'left',
        boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.06)'
      }}>
        {valueLabel}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }}>
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      {open &&
        <div data-scroll-area onWheel={e => e.stopPropagation()} style={{
          position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 5, zIndex: 20,
          maxHeight: 240, overflowY: 'auto', padding: '6px 0',
          background: card, border: `1.5px solid ${line}`, borderRadius: 13,
          boxShadow: '0 12px 34px rgba(10,20,32,0.22)'
        }}>
          {options.map((o, i) =>
            <button key={o.value} onClick={() => { o.onPick(); setOpen(false); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
              width: '100%', padding: '10px 15px', cursor: 'pointer',
              background: o.sel ? (dark ? 'rgba(63,169,224,0.15)' : 'rgba(63,169,224,0.08)') : 'transparent',
              border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${line}`,
              fontFamily: '"Dosis", sans-serif', fontSize: 14.5, fontWeight: 600,
              color: ink, textAlign: 'left'
            }}>
              {o.label}
              {o.sel &&
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark ? '#7CC7EE' : TV_ACCENT_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>}
            </button>
          )}
        </div>}
    </div>
  );
}

function TvIntro({ dark, initTrieda, initZiak, initObdobie, initCustom, onSubmit }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [trieda, setTrieda] = React.useState(initTrieda || null);
  const [ziak, setZiak] = React.useState(initZiak || 'Všetci');
  const [obdobie, setObdobie] = React.useState(initObdobie || '7d');
  const [custom, setCustom] = React.useState(initCustom || { od: '', do: '' });

  const sectionLabel = {
    fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 800,
    color: inkSoft, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 6
  };

  return (
    <window.PhoneFrame dark={dark} label="09b Výsledky testu — filter">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        {/* hlavička */}
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          padding: '6px 18px 10px', minHeight: 52
        }}>
          <div style={{
            position: 'absolute', left: 56, right: 56, top: 6, bottom: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
            fontSize: 17, fontWeight: 800, letterSpacing: '-0.2px',
            fontFamily: '"Dosis", sans-serif', color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{TV_TEST.nazov}</div>
          <button title="Späť" style={{
            width: 38, height: 38, borderRadius: 12, border: 'none',
            background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0, cursor: 'pointer', zIndex: 1
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dark ? '#F2F7FB' : '#1A2B3D'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div style={{ flex: 1 }}></div>
          <div style={{ width: 38, flexShrink: 0 }}></div>
        </div>

        {/* obsah */}
        <div data-scroll-area onWheel={e => e.stopPropagation()} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 18px 18px' }}>
          <div style={sectionLabel}>Časové obdobie <span style={{ color: ink }}>*</span></div>
          <div style={{ marginBottom: 14 }}>
            <TvFilterField
              valueLabel={obdobie ? ((TV_OBDOBIA.find(o => o.id === obdobie) || {}).label || '') : 'Vyberte obdobie…'}
              changed={!!obdobie} dark={dark}
              options={TV_OBDOBIA.map(o => ({ value: o.id, label: o.label, sel: obdobie === o.id, onPick: () => setObdobie(o.id) }))} />
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

          <div style={sectionLabel}>Trieda <span style={{ color: ink }}>*</span></div>
          <div style={{ marginBottom: 14 }}>
            <TvFilterField
              valueLabel={trieda || 'Vyberte triedu…'} changed={!!trieda} dark={dark}
              options={TV_TRIEDY.map(o => ({ value: o, label: o, sel: trieda === o, onPick: () => setTrieda(o) }))} />
          </div>

          <button
            disabled={!obdobie || !trieda}
            onClick={() => { if (obdobie && trieda) onSubmit({ trieda, ziak, obdobie, custom }); }}
            style={{
              display: 'block', width: '100%', padding: '14px 0', borderRadius: 14, marginTop: 18,
              cursor: (obdobie && trieda) ? 'pointer' : 'not-allowed',
              background: (obdobie && trieda) ? `linear-gradient(135deg, ${TV_PLAY} 0%, #5E9600 100%)` : (dark ? '#243040' : '#DCE7F0'),
              border: 'none',
              fontFamily: '"Dosis", sans-serif', fontSize: 16.5, fontWeight: 800,
              color: (obdobie && trieda) ? '#FFFFFF' : (dark ? '#5A6B7E' : '#9CB0C2')
            }}>Zobraziť</button>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

function TestVysledkyScreen({ dark = false, theme = 'alfik' }) {
  const abHero = theme === 'alfbook';
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const inkSoft = dark ? '#A8B6C8' : '#4A5B6E';
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [stage, setStage] = React.useState('filter');   // 'filter' | 'results'
  const [trieda, setTrieda] = React.useState(null);
  const [ziak, setZiak] = React.useState('Všetci');
  const [obdobie, setObdobie] = React.useState('7d');
  const [custom, setCustom] = React.useState({ od: '', do: '' });

  // úvodný filter — najprv vyber obdobie, triedu a žiaka
  if (stage === 'filter') {
    return (
      <TvIntro
        dark={dark} initTrieda={trieda} initZiak={ziak} initObdobie={obdobie} initCustom={custom}
        onSubmit={({ trieda, ziak, obdobie, custom }) => { setTrieda(trieda); setZiak(ziak); setObdobie(obdobie); setCustom(custom); setStage('results'); }} />
    );
  }

  const obLabel = (TV_OBDOBIA.find(o => o.id === obdobie) || {}).label || '';

  const visible = TV_ROWS.filter(r =>
    (trieda === 'Všetky' || r.trieda === trieda) &&
    (ziak === 'Všetci' || r.ziak === ziak) &&
    tvInObdobie(r.datum, obdobie, custom)
  );

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
            fontSize: 17, fontWeight: 800, letterSpacing: '-0.2px',
            fontFamily: '"Dosis", sans-serif', color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{TV_TEST.nazov}</div>

          <button onClick={() => setStage('filter')} title="Späť na filter" style={{
            width: 38, height: 38, borderRadius: 12, border: 'none',
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
          {/* Right: filter button (funnel-plus, podľa 09) */}
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

        {/* ── Aktuálne výbery ako štítky so zrušením (podľa 09) ── */}
        <div style={{ padding: '0 18px 10px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, flex: 1, minWidth: 0 }}>
            {[
              { key: 'obdobie', label: 'Obdobie', text: obLabel, onClear: () => setStage('filter') },
              trieda !== 'Všetky' && { key: 'trieda', label: 'Trieda', text: trieda, onClear: () => setTrieda('Všetky') },
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

        {/* ── Zoznam žiakov ── */}
        <div data-scroll-area ref={tvFade} onScroll={e => tvFade(e.currentTarget)} onWheel={e => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 14px 14px'
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
              }}>Žiadny žiak nezodpovedá filtru.</div>}
          </div>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { TestVysledkyScreen, TvDropdown });
