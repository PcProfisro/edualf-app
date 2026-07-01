// ─────────────────────────────────────────────────────────────
// TestListV2Screen — screen 06 (Živočíchy → testy)
// Dlaždicový (tile) layout — rovnaký jazyk ako kategórie:
//   • titulná strana (náhľad testu) ako obrázok
//   • zvuková (speaker) ikona
//   • smajlík hodnotenia keď je test ohodnotený
//   • NOVÉ badge
// ─────────────────────────────────────────────────────────────

function TestListV2Screen({ dark = false, expanded = false, age = 'all', columns = 2 }) {
  const p = window.ALFIK_PALETTE;
  const TESTS = window.TESTS || [];

  const teal = '#00A8B5';
  const tealDeep = '#0E7A87';

  // Testy s vekovým rozsahom '3-6' sa zobrazia pri KAŽDEJ vekovej voľbe
  const visibleTests = (expanded || age === 'all')
    ? TESTS
    : TESTS.filter(t => t.age === age || t.age === '3-6');

  return (
    <window.PhoneFrame dark={dark} label={expanded ? "06c Vyber veku" : "06 Testy"}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        position: 'relative',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>

        {/* ── Header + banner ─────────── */}
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

        {/* ── Tile grid — rovnaké rozmery ako dlaždice kategórií (štvorec) ─────────────────────────── */}
        <div data-scroll-area onWheel={(e) => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto',
          padding: columns === 3 ? '10px 32px 26px' : '10px 31px 26px',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: columns === 3 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
          gap: columns === 3 ? 14 : 20,
          alignContent: 'start',
          filter: expanded ? 'blur(1.5px)' : 'none',
          transition: 'filter 0.2s'
        }}>
          {visibleTests.map((t, i) =>
            <window.ScaleTile key={i} design={columns === 3 ? 99 : 154}>
              <TestTileV2 test={t} dark={dark} compact={columns === 3} />
            </window.ScaleTile>
          )}
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
// TestTileV2 — jedna dlaždica testu
// ─────────────────────────────────────────────────────────────
function TestTileV2({ test, dark, compact }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const TILE_GRADIENT = `linear-gradient(180deg, #15A1A9 0%, #1DBCC4 30%, #4DD6CE 65%, #A0E5D9 100%)`;
  const BRAND_TEAL = '#00A8B5';
  const Q = window.QUASAR || { primary: '#8FD400', primaryDeep: '#72B600' };

  const agePalette = {
    '3-4': { accent: '#5DD3C8', deep: '#1F8F92' },
    '4-5': { accent: '#00A8B5', deep: '#0E7A87' },
    '5-6': { accent: '#0078A3', deep: '#054E6B' }
  };
  const { accent, deep } = agePalette[test.age] || agePalette['4-5'];

  const ratingSrc = {
    great: 'assets/rating_great.svg',
    good:  'assets/rating_good.svg',
    ok:    'assets/rating_ok.svg'
  }[test.rating];
  const ageSrc = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[test.age];

  const tileBg = dark ? p.darkSurf : TILE_GRADIENT;

  return (
    <div style={{
      background: tileBg,
      borderRadius: compact ? 20 : 24,
      padding: compact ? '10px 10px 8px' : '13px 13px 8px',
      position: 'relative', overflow: 'visible',
      boxShadow: dark ? 'none' : `0 2px 4px 0px rgba(15,30,55,0.35)`,
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)',
      height: '100%',
      display: 'flex', flexDirection: 'column', gap: 8
    }}>
      {/* NOVÉ badge — rovnaký ako na kategóriách */}
      {test.nove &&
        <div style={{
          position: 'absolute',
          top: compact ? 8 : 9,
          left: compact ? 8 : 9,
          zIndex: 6,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'linear-gradient(135deg, #FF6B5E 0%, #E0463A 100%)',
          color: '#fff',
          fontSize: compact ? 8 : 9, fontWeight: 800, letterSpacing: '0.6px',
          padding: compact ? '3px 7px 3px 6px' : '3px 8px 3px 7px',
          borderRadius: 999, fontFamily: '"Dosis", sans-serif',
          boxShadow: '0 4px 12px -2px rgba(224,70,58,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
          textTransform: 'uppercase'
        }}>
          NOVÉ
        </div>
      }

      {/* Hodnotenie (smajlík) — zobrazené vpravo od názvu (nižšie) */}

      {/* Zvuková (speaker) ikona */}
      <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 4 }}>
        <window.SpeakerIcon size={compact ? 32 : 40} dotFill={BRAND_TEAL} shadow={false} circleBorder={true} />
      </div>

      {/* Hodnotenie (smajlík) — badge v pravom dolnom rohu, mierne pretŕča */}
      {ratingSrc &&
        <div style={{
          position: 'absolute', bottom: compact ? -4 : -5, right: compact ? -3 : -4, zIndex: 6,
          width: compact ? 23 : 28, height: compact ? 23 : 28,
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 1.5px 4px rgba(15,30,55,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src={ratingSrc} alt={test.rating}
            style={{ width: compact ? 20 : 25, height: compact ? 20 : 25, objectFit: 'contain', opacity: 0.92 }} />
        </div>
      }

      {/* Titulná strana (náhľad) + play overlay — box 3:2 ako emoji box kategórie */}
      <div style={{
        width: '100%', flexShrink: 0,
        aspectRatio: '3 / 2', minHeight: 0,
        borderRadius: compact ? 14 : 18,
        background: dark ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: dark ? 'none' : `0 3px 8px ${deep}22`,
        backgroundImage: test.preview ? 'none' : dark
          ? `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 6px, transparent 6px 14px)`
          : `repeating-linear-gradient(45deg, ${accent}14 0 6px, transparent 6px 14px)`
      }}>
        {test.preview &&
          <img src={test.preview} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        }
        {test.preview &&
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 55%)'
          }} />
        }
        {!test.preview &&
          <div style={{
            position: 'absolute', bottom: 5, right: 7,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: compact ? 8 : 9, letterSpacing: 0.3,
            color: dark ? 'rgba(255,255,255,0.45)' : `${deep}99`,
            textTransform: 'uppercase'
          }}>náhľad</div>
        }

      </div>

      {/* Názov testu — vycentrovaný */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0px 4px 6px'
      }}>
        <div style={{
          width: '100%',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: '"Dosis", sans-serif',
          letterSpacing: '-0.1px',
          color: dark ? ink : '#1A4040',
          lineHeight: 1.1,
          textAlign: 'center',
          wordBreak: 'break-word',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {test.name}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TestListV2Screen, TestTileV2 });
