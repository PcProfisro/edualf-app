// ─────────────────────────────────────────────────────────────
// TestListV2Screen — list view (matches Figma "05 _ Živočíchy _ testy")
// • Top bar: smiley avatar + menu icon
// • Hero banner: back + paw + title + speaker
// • Breadcrumbs BELOW hero (with home icon)
// • Single-column list of TestRow tiles
// ─────────────────────────────────────────────────────────────

function TestListV2Screen({ dark = false, expanded = false, age = 'all' }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;

  // Zdieľané dáta z screens-2.jsx (exportované cez window.TESTS)
  const TESTS = window.TESTS || [];

  const teal = '#00A8B5';
  const tealDeep = '#0E7A87';

  return (
    <window.PhoneFrame dark={dark} label={expanded ? "05c Vyber veku" : "05 Testy"}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>

        {/* ── Header + banner — rovnaký ako 05 ─────────── */}
        <window.CategoryHero
          dark={dark}
          title="Živočíchy"
          img="uploads/zivocichy.png"
          imgNoBg={true}
          gradient={`linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)`}
          gradientDark={`linear-gradient(135deg, ${tealDeep} 0%, #053D45 100%)`}
          shadowColor="rgba(0,168,181,0.45)"
          ageIcon={age}
          ageActive={expanded}
          showAgeLabel={false}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', 'Interaktívne cvičenia', 'Príroda', 'Živočíchy']}
        />

        {/* ── List of test rows ───────────────────── */}
        <div data-scroll-area style={{
          flex: 1, minHeight: 0, overflowY: 'auto',
          padding: '12px 14px 14px',
          display: 'flex', flexDirection: 'column', gap: 10,
          filter: expanded ? 'blur(1.5px)' : 'none',
          transition: 'filter 0.2s'
        }}>
          {(expanded || age === 'all' ? TESTS : TESTS.filter(t => t.age === age))
            .map((t, i) => <TestListRow key={i} test={t} dark={dark} speakerColor={teal} />)}
        </div>

        {expanded &&
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(15,30,55,0.10) 0%, rgba(15,30,55,0.16) 40%, rgba(15,30,55,0.26) 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }} />
        }

        {expanded && window.AgePickerSheet && <window.AgePickerSheet dark={dark} active={age} />}
      </div>
    </window.PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Menu button (top-right) — three horizontal bars in a circle
// ─────────────────────────────────────────────────────────────
function MenuButton({ dark }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  return (
    <button style={{
      width: 38, height: 38, borderRadius: 14,
      background: dark ? 'rgba(255,255,255,0.10)' : '#FFFFFF',
      border: dark ? '1.5px solid rgba(255,255,255,0.18)' : '2px solid #FFFFFF',
      boxShadow: dark ? 'none' : '0 2px 6px rgba(15,30,55,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', padding: 0
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="7" x2="20" y2="7"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="17" x2="20" y2="17"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// TestListRow — single row in list view
// Layout: age | test icon | name | speaker (audio) | rating
// ─────────────────────────────────────────────────────────────
function TestListRow({ test, dark, speakerColor = '#00A8B5' }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const surf = dark ? p.darkSurf : '#FFFFFF';
  const Q = window.QUASAR || { primary: '#8FD400', primaryDeep: '#72B600' };

  const ratingSrc = {
    great: 'assets/rating_great.svg',
    good:  'assets/rating_good.svg',
    ok:    'assets/rating_ok.svg'
  }[test.rating];

  return (
    <div style={{
      position: 'relative',
      background: surf,
      borderRadius: 22,
      padding: '10px 14px 10px 10px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: dark ? 'none' : '0 2px 5px rgba(15,30,55,0.18)',
      border: dark ? `1.5px solid ${p.darkLine}` : 'none',
      minHeight: 63
    }}>
      {/* NOVÉ badge — ľavý horný roh riadku */}
      {test.nove &&
        <span style={{
          position: 'absolute', top: -5, left: 9, zIndex: 5,
          background: 'linear-gradient(135deg, #FF6B5E 0%, #E0463A 100%)',
          color: '#fff',
          fontSize: 9, fontWeight: 800, letterSpacing: '0.6px',
          padding: '3px 8px 3px 7px',
          borderRadius: 999, fontFamily: '"Dosis", sans-serif',
          textTransform: 'uppercase'
        }}>NOVÉ</span>
      }
      {/* vekový odznak */}
      {window.AgeBadge && <window.AgeBadge age={test.age} size={30} />}

      {/* typ materiálu */}
      <img src="assets/mat_interaktivny.svg"
        style={{ width: 30, height: 30, objectFit: 'contain', display: 'block', flexShrink: 0 }} alt="Interaktívny test" />

      {/* názov — jeden riadok */}
      <div style={{
        flex: 1, minWidth: 0,
        fontSize: 15, fontWeight: 800, letterSpacing: '-0.2px',
        color: ink, lineHeight: 1.25,
        fontFamily: '"Dosis", sans-serif',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        {test.name}
      </div>

      {/* rating */}
      <div style={{
        width: 32, height: 32, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {ratingSrc ? (
          <img src={ratingSrc} alt={test.rating}
            style={{ width: 30, height: 30, objectFit: 'contain' }} />
        ) : null}
      </div>
    </div>
  );
}

Object.assign(window, { TestListV2Screen, TestListRow, MenuButton });
