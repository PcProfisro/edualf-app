// ─────────────────────────────────────────────────────────────
// ALFBOOK — výber jazyka pri vstupe (keď appka beží v angličtine)
// + domovská obrazovka AlfBooku v zvolenom jazyku
// Použité v Alfik-prototype v3.html
// ─────────────────────────────────────────────────────────────
(function () {
  const INK = '#1A2B3D';
  const INK_SOFT = '#6A7A8F';
  const INK_MUTE = '#9AA8B8';
  const LINE = 'rgba(15,30,55,0.08)';
  const SURF = '#FFFFFF';
  const ACCENT = '#3FA9E0';

  // AlfBook je dostupný len v týchto jazykoch
  const ALFBOOK_LANGS = ['sk', 'cz', 'hu'];

  // ── Vlajky (lokálne, self-contained) ──
  function AbFlag({ code, size = 1 }) {
    const base = { width: 24 * size, height: 16 * size, borderRadius: 3, overflow: 'hidden', position: 'relative', flexShrink: 0, boxShadow: '0 0 0 1px rgba(15,30,55,0.10)' };
    const stripes = (cols) => (
      <div style={{ ...base }}>
        {cols.map((c, i) => <div key={i} style={{ height: (100 / cols.length) + '%', background: c }} />)}
      </div>
    );
    if (code === 'sk') return (
      <div style={base}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ height: '33.34%', background: '#FFFFFF' }} />
          <div style={{ height: '33.33%', background: '#0B4EA2' }} />
          <div style={{ height: '33.33%', background: '#EE1C25' }} />
        </div>
        <svg viewBox="0 0 24 16" width={24 * size} height={16 * size} style={{ position: 'absolute', inset: 0 }}>
          <path d="M4 2.6 H10.5 V8 C10.5 11 7.25 12.6 7.25 12.6 C7.25 12.6 4 11 4 8 Z" fill="#EE1C25" stroke="#FFFFFF" strokeWidth="0.7" />
          <rect x="6.85" y="4" width="0.8" height="5.6" fill="#FFFFFF" />
          <rect x="6.1" y="5.1" width="2.3" height="0.7" fill="#FFFFFF" />
          <rect x="5.7" y="6.5" width="3.1" height="0.7" fill="#FFFFFF" />
        </svg>
      </div>
    );
    if (code === 'hu') return stripes(['#CD2A3E', '#FFFFFF', '#436F4D']);
    if (code === 'cz') return (
      <div style={base}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ height: '50%', background: '#FFFFFF' }} /><div style={{ height: '50%', background: '#D7141A' }} />
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, borderTop: `${8 * size}px solid transparent`, borderBottom: `${8 * size}px solid transparent`, borderLeft: `${12 * size}px solid #11457E` }} />
      </div>
    );
    if (code === 'en') return (
      <div style={base}>
        <svg viewBox="0 0 24 16" width={24 * size} height={16 * size} style={{ display: 'block' }}>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="3.2" />
          <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.4" />
          <rect x="9" y="0" width="6" height="16" fill="#FFFFFF" />
          <rect x="0" y="5" width="24" height="6" fill="#FFFFFF" />
          <rect x="10.2" y="0" width="3.6" height="16" fill="#C8102E" />
          <rect x="0" y="6.2" width="24" height="3.6" fill="#C8102E" />
        </svg>
      </div>
    );
    return null;
  }

  const EN_NAMES = { sk: 'Slovak', cz: 'Czech', hu: 'Hungarian' };

  // ── BOTTOM SHEET: výber jazyka AlfBooku (appka beží v angličtine) ──
  function AlfBookLangSheet({ onPick, onCancel }) {
    const [pick, setPick] = React.useState('sk');
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, background: SURF,
          borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: '12px 22px 30px',
          boxShadow: '0 -18px 50px -18px rgba(15,30,55,0.4)',
        }}>
        <div style={{ width: 40, height: 5, borderRadius: 4, background: 'rgba(15,30,55,0.16)', margin: '0 auto 18px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 4 }}>
          <div style={{ width: 52, height: 52, borderRadius: 13, background: '#EAF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="assets/alfbook_logo.svg" alt="AlfBook" style={{ width: 34, height: 34, objectFit: 'contain' }} />
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, color: INK, letterSpacing: '-0.2px', lineHeight: 1.12 }}>AlfBook isn't available in English</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, color: INK_SOFT, lineHeight: 1.5, margin: '8px 2px 18px', textWrap: 'pretty' }}>
          Choose a language to open it in:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {ALFBOOK_LANGS.map((c) => {
            const sel = c === pick;
            return (
              <div key={c} onClick={() => setPick(c)} style={{
                display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', cursor: 'pointer',
                borderRadius: 15, background: sel ? 'rgba(63,169,224,0.10)' : '#F4F7FA',
                border: sel ? `2px solid ${ACCENT}` : '2px solid transparent',
              }}>
                <AbFlag code={c} size={1.2} />
                <div style={{ fontSize: 17, fontWeight: 700, color: INK, flex: 1 }}>{EN_NAMES[c]}</div>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  border: sel ? 'none' : '2px solid rgba(15,30,55,0.18)',
                  background: sel ? ACCENT : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {sel && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => onPick && onPick(pick)} style={{
          width: '100%', border: 'none', cursor: 'pointer', padding: '16px', borderRadius: 15,
          background: ACCENT, color: '#fff', fontFamily: 'Dosis, sans-serif', fontSize: 17, fontWeight: 800, letterSpacing: 0.2,
        }}>
          Open AlfBook in {EN_NAMES[pick]}
        </button>
        <div onClick={() => onCancel && onCancel()} style={{ textAlign: 'center', marginTop: 14, fontSize: 15, fontWeight: 700, color: INK_MUTE, cursor: 'pointer' }}>Cancel</div>
      </div>
    );
  }

  // ── DOMOV ALFBOOKU v zvolenom jazyku ──
  const HOME = {
    sk: {
      hi: 'Vitaj späť!', sub: 'Čo sa dnes naučíme?', code: 'SK',
      cats: [['Slovenčina', 'Písmená a slabiky'], ['Počítanie', 'Čísla do 100'], ['Svet okolo nás', 'Zvieratá a príroda']],
    },
    cz: {
      hi: 'Vítej zpátky!', sub: 'Co se dnes naučíme?', code: 'CZ',
      cats: [['Čeština', 'Písmena a slabiky'], ['Počítání', 'Čísla do 100'], ['Svět kolem nás', 'Zvířata a příroda']],
    },
    hu: {
      hi: 'Üdv újra!', sub: 'Mit tanulunk ma?', code: 'HU',
      cats: [['Magyar nyelv', 'Betűk és szótagok'], ['Számolás', 'Számok 100-ig'], ['A világ körülöttünk', 'Állatok és természet']],
    },
  };

  function AlfBookHomeScreen({ lang = 'sk' }) {
    const t = HOME[lang] || HOME.sk;
    return (
      <div data-screen-label="AlfBook — domov" style={{ position: 'absolute', inset: 0, background: '#F2F7FB', display: 'flex', flexDirection: 'column' }}>
        {/* status bar spacer */}
        <div style={{ height: 50, flexShrink: 0 }} />
        {/* topbar */}
        <div style={{ background: SURF, borderBottom: `1px solid ${LINE}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          <img src="assets/alfbook_logo.svg" alt="AlfBook" style={{ height: 28, width: 'auto' }} />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#EEF4F9', padding: '6px 12px', borderRadius: 20 }}>
            <AbFlag code={lang} />
            <div style={{ fontSize: 14, fontWeight: 800, color: INK_SOFT }}>{t.code}</div>
          </div>
        </div>

        <div style={{ padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.4px' }}>{t.hi}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: INK_SOFT, marginTop: 3 }}>{t.sub}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {t.cats.map(([title, sub], i) => (
              <div key={title} style={{
                background: SURF, borderRadius: 18, padding: '17px 16px', display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 2px 8px -3px rgba(15,30,55,0.12)',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 13, flexShrink: 0,
                  background: ['#FDEBD8', '#DBF0E6', '#E2ECFB'][i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 23, height: 23, borderRadius: 7, background: ['#E8930C', '#1F8A5B', '#3F7FE0'][i], opacity: 0.85 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: INK, lineHeight: 1.15 }}>{title}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK_MUTE, marginTop: 2 }}>{sub}</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={INK_MUTE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  window.AlfBookLangSheet = AlfBookLangSheet;
  window.AlfBookHomeScreen = AlfBookHomeScreen;
  window.ALFBOOK_LANGS = ALFBOOK_LANGS;
})();
