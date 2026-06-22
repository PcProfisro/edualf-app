// Alfík — category, subcategory and test list screens

const ALF_CATEGORIES = [
  { id: 'alphabet',    name: 'Abeceda',        icon: 'icon_alphabet',    color: '#FF6B6B', bg: '#FFE3E3' },
  { id: 'math',        name: 'Matematika',     icon: 'icon_math',        color: '#FFB400', bg: '#FFF3D6' },
  { id: 'animals',     name: 'Zvieratá',       icon: 'icon_animals',     color: '#3DD9B0', bg: '#D9F8EF' },
  { id: 'nature',      name: 'Príroda',        icon: 'icon_nature',      color: '#4FB36A', bg: '#DFF1E3' },
  { id: 'transport',   name: 'Doprava',        icon: 'icon_transport',   color: '#3FA9E0', bg: '#DBEEF9' },
  { id: 'colors',      name: 'Farby',          icon: 'icon_colors',      color: '#8B7CF6', bg: '#E6E1FB' },
  { id: 'body',        name: 'Telo',           icon: 'icon_body',        color: '#FF8A65', bg: '#FFE3D6' },
  { id: 'music',       name: 'Hudba',          icon: 'icon_music',       color: '#D4A24A', bg: '#F4EAD2' },
  { id: 'logic',       name: 'Logika',         icon: 'icon_logic',       color: '#5B8DEF', bg: '#DEE9FB' },
  { id: 'family',      name: 'Rodina',         icon: 'icon_family',      color: '#F47C92', bg: '#FCE0E6' },
];

const ANIMALS_SUB = [
  { id: 'farm',     name: 'Domáce zvieratá',  emoji: '🐴', color: '#3DD9B0', bg: '#D9F8EF' },
  { id: 'wild',     name: 'Voľne žijúce',     emoji: '🦊', color: '#FF9F2D', bg: '#FFE9CC' },
  { id: 'forest',   name: 'V lese',           emoji: '🦌', color: '#4FB36A', bg: '#DFF1E3' },
  { id: 'sea',      name: 'V mori',           emoji: '🐠', color: '#3FA9E0', bg: '#DBEEF9' },
  { id: 'birds',    name: 'Vtáky',            emoji: '🐦', color: '#8B7CF6', bg: '#E6E1FB' },
  { id: 'insects',  name: 'Hmyz',             emoji: '🐝', color: '#FFB400', bg: '#FFF3D6' },
];

const TESTS = [
  { age: '3-4', name: 'Spoznaj domáce zvieratká',                    rating: 'great' },
  { age: '3-4', name: 'Ako robia zvieratká na dvore?',                rating: 'good'  },
  { age: '4-5', name: 'Mláďatá a ich mamy v stajni',                  rating: 'ok'    },
  { age: '4-5', name: 'Čo jedávajú domáce zvieratá počas leta',       rating: null    },
  { age: '5-6', name: 'Život na farme počas štyroch ročných období', rating: 'good'  },
  { age: '5-6', name: 'Zvuky a zvolania zo dvora',                    rating: null    },
];

// ─────────────────────────────────────────────────────────────
// Top app bar — shared
// ─────────────────────────────────────────────────────────────
function TopBar({ dark, title, showBack = false, showAvatar = true, accent, ageIcon = 'all', onAgeTap, ageActive }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const surf = dark ? p.darkSurf : p.surface;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '6px 20px 14px', gap: 12,
    }}>
      {showBack ? (
        <button style={{
          width: 44, height: 44, borderRadius: 14, border: 'none',
          background: surf, boxShadow: dark ? 'none' : '0 2px 6px rgba(15,30,55,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accent || p.skyDeep} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      ) : (
        <button style={{
          width: 44, height: 44, borderRadius: 14, border: 'none',
          background: surf, boxShadow: dark ? 'none' : '0 2px 6px rgba(15,30,55,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h10"/>
          </svg>
        </button>
      )}

      <div style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 800, letterSpacing: '-0.2px' }}>
        {title}
      </div>

      {showAvatar && <AgeAvatar age={ageIcon} dark={dark} active={ageActive}/>}
    </div>
  );
}

function AgeAvatar({ age, dark, active }) {
  const p = ALFIK_PALETTE;
  const palette = {
    '3-4': { stroke: '#FF8A65', bg: '#FFE3D6' },
    '4-5': { stroke: '#FFB400', bg: '#FFF3D6' },
    '5-6': { stroke: '#3DD9B0', bg: '#D9F8EF' },
    'all': { stroke: p.skyDeep, bg: '#DBEEF9' },
  };
  const { stroke, bg } = palette[age] || palette['all'];
  return (
    <button style={{
      width: 44, height: 44, borderRadius: 14, border: `2.5px solid ${stroke}`,
      background: dark ? p.darkSurf : bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: active ? `0 6px 14px -4px ${stroke}AA` : (dark ? 'none' : '0 2px 6px rgba(15,30,55,0.08)'),
      padding: 0, flexShrink: 0,
    }}>
      {age === 'all' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['#FF8A65','#FFB400','#3DD9B0'].map((c,i) => (
            <div key={i} style={{ width: 18, height: 4, borderRadius: 2, background: c }}/>
          ))}
        </div>
      ) : (
        <img src={`assets/age_${age.replace('-', '_')}.svg`} style={{ width: 36, height: 36, objectFit: 'contain' }} alt={age}/>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. CATEGORY TREE (top-level)
// ─────────────────────────────────────────────────────────────
function CategoryTreeScreen({ dark = false, columns = 2 }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;

  return (
    <PhoneFrame dark={dark} label="03 Kategorie">
      <TopBar dark={dark} title="Kategórie" ageIcon="4-5"/>

      <div style={{ padding: '0 20px 10px' }}>
        <Breadcrumbs dark={dark} crumbs={['Domov']}/>
      </div>

      <div style={{
        flex: 1, overflowY: 'hidden', padding: '14px 20px 0',
        display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: columns === 3 ? 10 : 14,
        alignContent: 'start',
      }}>
        {ALF_CATEGORIES.slice(0, columns === 3 ? 9 : 8).map((c, i) => (
          <CategoryTile key={c.id} cat={c} dark={dark} compact={columns === 3} highlight={i === 2}/>
        ))}
      </div>
    </PhoneFrame>
  );
}

function CategoryTile({ cat, dark, compact, highlight }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const surf = dark ? p.darkSurf : p.surface;
  const tileBg = dark ? p.darkSurf : '#DBEEF9';
  const tileAccent = '#3FA9E0';
  const size = compact ? 96 : 122;

  return (
    <div style={{
      background: tileBg, borderRadius: compact ? 18 : 22,
      padding: compact ? '12px 10px 12px' : '16px 14px 16px',
      position: 'relative', overflow: 'hidden',
      boxShadow: dark ? 'none' : `0 4px 10px -4px rgba(15,30,55,0.08)`,
      border: dark ? `1.5px solid ${p.darkLine}` : 'none',
      minHeight: compact ? 138 : 188,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* speaker badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 34, height: 34, borderRadius: '50%',
        background: dark ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
        border: `2px solid ${tileAccent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: dark ? 'none' : '0 2px 4px rgba(15,30,55,0.06)',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tileAccent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
          <path d="M18.5 5.5a9 9 0 0 1 0 13"/>
        </svg>
      </div>

      <div style={{
        width: '100%', flex: 1,
        borderRadius: compact ? 14 : 18,
        background: dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: dark ? 'none' : '0 2px 6px rgba(15,30,55,0.06)',
        minHeight: compact ? 78 : 118,
      }}>
        <img src={`assets/${cat.icon}.png`} style={{ width: compact ? 60 : 90, height: compact ? 60 : 90, objectFit: 'contain' }} alt=""/>
      </div>

      <div style={{ fontSize: compact ? 14 : 18, fontWeight: 800, letterSpacing: '-0.3px', color: ink, lineHeight: 1.15 }}>{cat.name}</div>


    </div>
  );
}

function Breadcrumbs({ dark, crumbs }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, flexWrap: 'wrap' }}>
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <React.Fragment key={i}>
            {i === 0 && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.skyDeep} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
                <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/>
              </svg>
            )}
            <span style={{ color: last ? p.skyDeep : inkSoft }}>{c}</span>
            {!last && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6"/>
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. SUBCATEGORY (Zvieratá → ...)
// ─────────────────────────────────────────────────────────────
function SubcategoryScreen({ dark = false, columns = 2 }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;

  return (
    <PhoneFrame dark={dark} label="04 Podkategoria">
      <TopBar dark={dark} title="Zvieratá" showBack accent={p.mint} ageIcon="4-5"/>

      <div style={{ padding: '0 20px 10px' }}>
        <Breadcrumbs dark={dark} crumbs={['Domov', 'Zvieratá']}/>

        {/* hero banner */}
        <div style={{
          marginTop: 14, borderRadius: 24, padding: '18px 18px 18px 22px',
          background: dark
            ? `linear-gradient(135deg, #0F2A4A 0%, #061833 100%)`
            : `linear-gradient(135deg, #1E3A8A 0%, #0F2A4A 100%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: dark ? 'none' : '0 10px 24px -10px rgba(30,58,138,0.55)',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
          <div style={{ position: 'absolute', right: 30, bottom: -16, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}/>
          <div style={{
            width: 60, height: 60, borderRadius: 18, background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <img src="assets/icon_animals.png" style={{ width: 44, height: 44 }} alt=""/>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>Zvieratá</div>
          </div>
          {/* speaker — play category name sound */}
          <div style={{
            position: 'relative',
            width: 44, height: 44, borderRadius: '50%',
            background: '#FFFFFF',
            border: `2.5px solid #FFFFFF`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px -2px rgba(0,0,0,0.25)',
            flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
              <path d="M18.5 5.5a9 9 0 0 1 0 13"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{
        flex: 1, padding: '14px 20px 0',
        display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: columns === 3 ? 10 : 14,
        alignContent: 'start',
      }}>
        {ANIMALS_SUB.slice(0, columns === 3 ? 6 : 6).map((s) => (
          <SubTile key={s.id} sub={s} dark={dark} compact={columns === 3} active={s.id === 'farm'}/>
        ))}
      </div>
    </PhoneFrame>
  );
}

function SubTile({ sub, dark, compact, active }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const tileBg = dark ? p.darkSurf : '#DBEEF9';
  const tileAccent = '#3FA9E0';
  return (
    <div style={{
      background: tileBg, borderRadius: compact ? 18 : 22,
      padding: compact ? '12px 10px' : '16px 14px',
      position: 'relative', overflow: 'hidden',
      boxShadow: dark ? 'none' : `0 4px 10px -4px rgba(15,30,55,0.08)`,
      border: active ? `2.5px solid ${tileAccent}` : (dark ? `1.5px solid ${p.darkLine}` : 'none'),
      minHeight: compact ? 138 : 188,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 34, height: 34, borderRadius: '50%',
        background: dark ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
        border: `2px solid ${tileAccent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: dark ? 'none' : '0 2px 4px rgba(15,30,55,0.06)',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tileAccent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
        </svg>
      </div>
      <div style={{
        width: '100%', flex: 1,
        borderRadius: compact ? 14 : 18,
        background: dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: compact ? 50 : 78,
        boxShadow: dark ? 'none' : '0 2px 6px rgba(15,30,55,0.06)',
        minHeight: compact ? 78 : 118,
      }}>{sub.emoji}</div>
      <div style={{ fontSize: compact ? 13 : 16, fontWeight: 800, letterSpacing: '-0.2px', color: ink, lineHeight: 1.15 }}>{sub.name}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. TEST LIST
// ─────────────────────────────────────────────────────────────
function TestListScreen({ dark = false, expanded = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf = dark ? p.darkSurf : p.surface;
  const active = '4-5';

  return (
    <PhoneFrame dark={dark} label={expanded ? "05b Vyber veku" : "05 Testy"}>
      <TopBar dark={dark} title="Domáce zvieratá" showBack accent={p.mint} ageIcon={active} ageActive={expanded}/>

      <div style={{ padding: '0 20px 6px' }}>
        <Breadcrumbs dark={dark} crumbs={['Domov', 'Zvieratá', 'Domáce zvieratá']}/>
      </div>

      <div style={{ flex: 1, overflowY: 'hidden', padding: '14px 20px 0', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: expanded ? 0.35 : 1, transition: 'opacity 0.2s' }}>
          {TESTS.map((t, i) => <TestRow key={i} test={t} dark={dark}/>)}
        </div>
        {expanded && <AgePickerSheet dark={dark} active={active}/>}
      </div>
    </PhoneFrame>
  );
}

function AgeFilter({ age, active, dark, all }) {
  const p = ALFIK_PALETTE;
  if (all) {
    const stroke = p.skyDeep;
    const bg = dark ? p.darkSurf : '#FFF3D6';
    const inkC = dark ? p.darkInk : '#1F5C82';
    return (
      <div style={{
        flex: 1, borderRadius: 22, padding: '12px 8px 12px',
        background: bg,
        border: active ? `3px solid ${stroke}` : `3px solid transparent`,
        boxShadow: active ? `0 8px 18px -8px ${stroke}AA` : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        position: 'relative',
      }}>
        <div style={{
          width: 70, height: 70,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 56, height: 12, borderRadius: 6,
                background: ['#FF8A65','#FFB400','#3DD9B0'][i],
              }}/>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, color: inkC, letterSpacing: '-0.2px' }}>Všetky</div>
        {active && (
          <div style={{
            position: 'absolute', top: -8, right: -6,
            width: 24, height: 24, borderRadius: '50%', background: stroke,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 8px -2px ${stroke}AA`,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10"/></svg>
          </div>
        )}
      </div>
    );
  }
  const palette = {
    '3-4': { stroke: '#FF8A65', bg: '#FFF3D6', ink: '#C84A1F' },
    '4-5': { stroke: '#FFB400', bg: '#FFF3D6', ink: '#9C6B00' },
    '5-6': { stroke: '#3DD9B0', bg: '#FFF3D6', ink: '#0F8B6A' },
  }[age];
  const src = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[age];
  return (
    <div style={{
      flex: 1, borderRadius: 22, padding: '12px 8px 12px',
      background: dark ? p.darkSurf : palette.bg,
      border: active ? `3px solid ${palette.stroke}` : `3px solid transparent`,
      boxShadow: active ? `0 8px 18px -8px ${palette.stroke}AA` : 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      position: 'relative',
    }}>
      <img src={src} style={{ width: 70, height: 70, objectFit: 'contain' }} alt={age}/>
      <div style={{ fontSize: 14, fontWeight: 900, color: dark ? p.darkInk : '#1F5C82', letterSpacing: '-0.2px' }}>{age} rokov</div>
      {active && (
        <div style={{
          position: 'absolute', top: -8, right: -6,
          width: 24, height: 24, borderRadius: '50%', background: palette.stroke,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 8px -2px ${palette.stroke}AA`,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10"/></svg>
        </div>
      )}
    </div>
  );
}

function KidAvatar() { return null; }

function AgePickerSheet({ dark, active }) {
  const p = ALFIK_PALETTE;
  return (
    <div style={{
      position: 'absolute', top: -8, right: 0, width: 280,
      background: dark ? p.darkSurf : '#FFFFFF',
      borderRadius: 22, padding: '14px 12px',
      boxShadow: '0 20px 50px -10px rgba(15,30,55,0.35)',
      border: dark ? `1.5px solid ${p.darkLine}` : '1px solid rgba(15,30,55,0.06)',
      zIndex: 10,
    }}>
      {/* speech-bubble pointer */}
      <div style={{
        position: 'absolute', top: -10, right: 22,
        width: 20, height: 20, background: dark ? p.darkSurf : '#FFFFFF',
        transform: 'rotate(45deg)',
        borderTop: dark ? `1.5px solid ${p.darkLine}` : '1px solid rgba(15,30,55,0.06)',
        borderLeft: dark ? `1.5px solid ${p.darkLine}` : '1px solid rgba(15,30,55,0.06)',
      }}/>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        <AgeFilter dark={dark} all active={active === 'all'}/>
        <AgeFilter dark={dark} age="3-4" active={active === '3-4'}/>
        <AgeFilter dark={dark} age="4-5" active={active === '4-5'}/>
        <AgeFilter dark={dark} age="5-6" active={active === '5-6'}/>
      </div>
    </div>
  );
}

function AgeBadge({ age }) {
  const src = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[age];
  return (
    <div style={{
      width: 56, height: 56, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src={src} style={{ width: 54, height: 54, objectFit: 'contain' }} alt={age}/>
    </div>
  );
}

function RatingIcon({ rating }) {
  const map = {
    great: 'assets/rating_great.svg',
    good:  'assets/rating_good.svg',
    ok:    'assets/rating_ok.svg',
  };
  if (!rating) {
    // empty space when not yet rated
    return <div style={{ width: 52, height: 52, flexShrink: 0 }}/>;
  }
  return (
    <div style={{ flexShrink: 0, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={map[rating]} style={{ width: 50, height: 50, objectFit: 'contain' }} alt={rating}/>
    </div>
  );
}

function TestRow({ test, dark }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const surf = dark ? p.darkSurf : p.surface;
  return (
    <div style={{
      background: surf, borderRadius: 20, padding: '12px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: dark ? 'none' : '0 3px 8px -3px rgba(15,30,55,0.08)',
      border: dark ? `1.5px solid ${p.darkLine}` : 'none',
    }}>
      <AgeBadge age={test.age}/>
      <button style={{
        width: 48, height: 48, borderRadius: 16, border: 'none', flexShrink: 0,
        background: `linear-gradient(135deg, ${p.mint} 0%, #2EB892 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 6px 14px -4px ${p.mint}AA`,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 800, letterSpacing: '-0.2px', color: ink, lineHeight: 1.25,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {test.name}
        </div>
      </div>
      <RatingIcon rating={test.rating}/>
    </div>
  );
}

Object.assign(window, { CategoryTreeScreen, SubcategoryScreen, TestListScreen });
