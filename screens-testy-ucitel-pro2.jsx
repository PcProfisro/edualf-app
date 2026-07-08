// ─────────────────────────────────────────────────────────────
// TestListTeacherPro2Screen — 06f · Učiteľská verzia (usporiadanie podľa referenčného screenu)
// Rovnaké prvky ako 06e, ale v riadku inak usporiadané:
//   • materiál (vľavo)
//   • názov (hore) → pod ním meta riadok: vek chip | oddeľovač | ikony zručností
//   • ikona výsledkov úplne vpravo, zvislo vycentrovaná
// ─────────────────────────────────────────────────────────────

const PRO2_ACCENT = '#00A8B5';
const PRO2_ACCENT_DEEP = '#0E7A87';

const PRO2_SKILL_ICONS = {
  zrakove:    'assets/skill_zrakove.svg',
  sluchove:   'assets/skill_sluchove.svg',
  pocuvanie:  'assets/skill_pocuvanie.svg',
  slovna:     'assets/skill_slovna.svg',
  logicke:    'assets/skill_logicke.svg',
  cisla:      'assets/skill_cisla.svg',
  orientacia: 'assets/skill_orientacia.svg',
  enviro:     'assets/skill_enviro.svg',
  rozvijanie: 'assets/skill_rozvijanie.svg'
};
const PRO2_SKILL_LABEL = {
  zrakove:    'Zrakové rozlišovanie',
  sluchove:   'Sluchové rozlišovanie',
  pocuvanie:  'Počúvanie s porozumením',
  slovna:     'Slovná zásoba',
  logicke:    'Logické myslenie',
  cisla:      'Čísla a vzťahy',
  orientacia: 'Orientácia',
  enviro:     'Environmentálne cítenie',
  rozvijanie: 'Rozvíjanie poznania'
};
const PRO2_TEST_SKILLS = [
  ['sluchove', 'pocuvanie', 'slovna'],
  ['zrakove', 'slovna', 'logicke'],
  ['logicke', 'rozvijanie', 'enviro'],
  ['zrakove', 'slovna', 'orientacia'],
  ['zrakove', 'enviro', 'slovna'],
  ['zrakove', 'enviro'],
  ['zrakove', 'orientacia'],
  ['zrakove', 'logicke'],
  ['zrakove', 'enviro', 'rozvijanie'],
  ['sluchove', 'pocuvanie', 'slovna'],
  ['zrakove', 'logicke', 'orientacia']
];

function TeacherPro2Row({ test, skills, dark, last, alt }) {
  const ink = dark ? '#F2F7FB' : '#1A2B3D';
  const line = dark ? '#2A3447' : '#E4EBF2';

  const [tip, setTip] = React.useState(null);
  React.useEffect(() => {
    if (!tip) return;
    const t = setTimeout(() => setTip(null), 2200);
    return () => clearTimeout(t);
  }, [tip]);

  const ageLabel = { '3-4': '3–4', '4-5': '4–5', '5-6': '5–6', '3-6': '3–6' }[test.age] || test.age;
  const agePalette = {
    '3-4': { tint: 'rgba(0,131,143,0.12)',  deep: '#00838F' },
    '4-5': { tint: 'rgba(230,81,0,0.12)',   deep: '#E65100' },
    '5-6': { tint: 'rgba(21,101,192,0.12)', deep: '#1565C0' },
    '3-6': { tint: 'rgba(46,125,50,0.12)',  deep: '#2E7D32' }
  };
  const agec = agePalette[test.age] || agePalette['4-5'];
  const ribbonW = 18;

  return (
    <div style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', gap: 13,
      minHeight: 64, paddingTop: 11, paddingBottom: 11, paddingRight: 16,
      paddingLeft: test.nove ? ribbonW + 8 : 12,
      background: alt ? (dark ? 'rgba(255,255,255,0.03)' : '#F7FCFE') : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${line}`
    }}>
      {/* NOVÉ — jemná zvislá stužka na ľavom kraji */}
      {test.nove &&
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: ribbonW,
          background: dark ? 'rgba(232,105,94,0.85)' : '#EC7B70',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            fontFamily: '"Dosis", sans-serif', fontSize: 7.5, fontWeight: 800,
            letterSpacing: '0.6px', color: '#fff', textTransform: 'uppercase', lineHeight: 1
          }}>Nové</span>
        </div>
      }

      {/* Materiál */}
      <div style={{ width: 26, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <img src="assets/mat_interaktivny.svg" alt="Interaktívny" title="Interaktívny test"
          style={{ height: 24, width: 'auto', display: 'block' }} />
      </div>

      {/* Stred: názov + meta riadok (vek | oddeľovač | zručnosti) */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 600, fontSize: 14,
          color: ink, letterSpacing: '-0.1px', lineHeight: 1.2,
          minWidth: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {test.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          {/* vek chip */}
          <span style={{
            fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 11.5,
            color: agec.deep, background: agec.tint,
            borderRadius: 8, padding: '2px 8px', lineHeight: 1.2, whiteSpace: 'nowrap', flexShrink: 0
          }}>{ageLabel} r.</span>
          {/* tenký oddeľovač */}
          <span style={{ width: 1, height: 13, background: line, flexShrink: 0 }} />
          {/* ikony zručností — ťuknutie zobrazí názov */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}>
            {tip &&
              <div style={{
                position: 'absolute', left: 0, bottom: 'calc(100% + 7px)', zIndex: 30,
                background: dark ? '#2E3B52' : '#1A2B3D', color: '#FFFFFF',
                fontFamily: '"Dosis", sans-serif', fontSize: 12, fontWeight: 700,
                padding: '5px 10px', borderRadius: 8, whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(10,30,50,0.28)', pointerEvents: 'none'
              }}>
                {PRO2_SKILL_LABEL[tip]}
                <div style={{
                  position: 'absolute', left: 12, top: '100%',
                  width: 0, height: 0, borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: `5px solid ${dark ? '#2E3B52' : '#1A2B3D'}`
                }}></div>
              </div>
            }
            {skills.map(s =>
              <button key={s} onClick={() => setTip(tip === s ? null : s)} aria-label={PRO2_SKILL_LABEL[s]} style={{
                background: 'transparent', border: 'none', padding: 0, margin: 0,
                cursor: 'pointer', lineHeight: 0, flexShrink: 0
              }}>
                <img src={PRO2_SKILL_ICONS[s]} alt={PRO2_SKILL_LABEL[s]}
                  style={{ width: 18, height: 18, display: 'block', objectFit: 'contain' }} />
              </button>
            )}
          </div>
          {/* Výsledky — na úrovni ikon zručností, menšia a jemnejšia */}
          {test.rating &&
            <button title="Výsledky" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: PRO2_ACCENT_DEEP, background: 'transparent',
              border: 'none', padding: 0, cursor: 'pointer', lineHeight: 1,
              flexShrink: 0, marginLeft: 'auto'
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PRO2_ACCENT_DEEP} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16v5" />
                <path d="M16 14v7" />
                <path d="M20 10v11" />
                <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                <path d="M4 18v3" />
                <path d="M8 14v7" />
              </svg>
            </button>
          }
        </div>
      </div>
    </div>
  );
}

function TestListTeacherPro2Screen({ dark = false, age = 'all' }) {
  const proFadeMask = (el) => {
    if (!el) return;
    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
    const top = atTop ? '0px' : '22px';
    const bot = atBottom ? '100%' : 'calc(100% - 26px)';
    const g = 'linear-gradient(to bottom, transparent 0, #000 ' + top + ', #000 ' + bot + ', transparent 100%)';
    el.style.webkitMaskImage = g;
    el.style.maskImage = g;
  };
  const TESTS = window.TESTS || [];
  const line = dark ? '#2A3447' : '#E4EBF2';
  const card = dark ? '#1A2433' : '#FFFFFF';

  const [activeAge, setActiveAge] = React.useState(age);
  React.useEffect(() => { setActiveAge(age); }, [age]);
  const visible = activeAge === 'all' ? TESTS : TESTS.filter(t => t.age === activeAge || t.age === '3-6');

  return (
    <window.PhoneFrame dark={dark} label="06f Testy — učiteľská verzia (usporiadanie)">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        <window.CategoryHero
          dark={dark}
          title="Živočíchy"
          imgNoBg={true}
          gradient={`linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)`}
          gradientDark={`linear-gradient(135deg, ${PRO2_ACCENT_DEEP} 0%, #1A2B3D 100%)`}
          shadowColor="rgba(0,168,181,0.45)"
          ageIcon={activeAge}
          ageActive={false}
          showAgeLabel={false}
          showSpeaker={false}
          speakerDot="#00A8B5"
          crumbs={['', 'Interaktívne cvičenia', 'Príroda', 'Živočíchy']}
        />

        <div data-scroll-area ref={proFadeMask} onScroll={(e) => proFadeMask(e.currentTarget)} onWheel={(e) => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px'
        }}>
          <div style={{
            background: card, borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${line}`,
            boxShadow: dark ? 'none' : '0 1px 3px rgba(20,40,60,0.05), 0 8px 24px -16px rgba(20,40,60,0.18)'
          }}>
            {visible.map((t, i) => {
              const idx = TESTS.indexOf(t);
              const wide36 = ['Kto povedal mňau?', 'Čo sa skrýva pod hladinou?'];
              const t2 = wide36.includes(t.name) ? { ...t, age: '3-6' } : t;
              return (
                <TeacherPro2Row
                  key={i}
                  test={t2}
                  skills={PRO2_TEST_SKILLS[idx] || ['zrakove']}
                  dark={dark}
                  alt={i % 2 === 1}
                  last={i === visible.length - 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { TestListTeacherPro2Screen });
