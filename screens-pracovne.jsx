// Alfík — Pracovné listy path (Path 2)
// 04c Pracovné listy (kategórie) → 05c Šport (typy úloh) → 06c Grafomotorika (PDF/JPG zoznam) → 07c Otvorený PL

// 04c — Témy pracovných listov (rovnaké ako vo wheel-i druhého screenu)
const PRACOVNE_TOPICS = [
  { id: 'sport',     name: 'Šport',                emoji: '⚽', img: 'uploads/Bez názvu - kópia (800 x 800 px) (56).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'zvierata',  name: 'Zvieratá',             emoji: '🐴', img: 'uploads/zivocichy.png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'doprava',   name: 'Doprava',             emoji: '🚌', img: 'uploads/Bez názvu - kópia (800 x 800 px) (40).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'geometria', name: 'Geometria',           emoji: '🔺', img: 'uploads/Bez názvu - kópia (800 x 800 px) (49).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'povolania', name: 'Povolania',           emoji: '👮', img: 'uploads/Bez názvu - kópia (800 x 800 px) (52).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'rocne',     name: 'Ročné obdobia',        emoji: '🍂', img: 'uploads/Bez názvu - kópia (800 x 800 px) (46).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'rastliny',  name: 'Rastliny a huby',     emoji: '🌳', img: 'uploads/Bez názvu - kópia (800 x 800 px) (54).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'sviatky',   name: 'Sviatky a významné dni', emoji: '🎁', img: 'uploads/Bez názvu - kópia (800 x 800 px) (48).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'hudobne',   name: 'Hudobné nástroje',     emoji: '🎵', color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'veci',      name: 'Veci okolo nás',       emoji: '🏡', img: 'uploads/Bez názvu - kópia (800 x 800 px) (51).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'zdravie',   name: 'Zdravie',             emoji: '💊', img: 'uploads/Bez názvu - kópia (800 x 800 px) (43).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' }
];

// 05c — Typy úloh pre šport (3 typy ako v reálnej appke)
const SPORT_TYPY = [
  { id: 'grafomotorika', name: 'Grafomotorika', emoji: '✏️', img: 'uploads/Bez názvu - kópia (800 x 800 px) (59).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'bludiska',      name: 'Bludiská',      emoji: '🌀', img: 'uploads/Bez názvu - kópia (800 x 800 px) (57).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' },
  { id: 'spoj',          name: 'Spoj dvojice',  emoji: '🔗', img: 'uploads/Bez názvu - kópia (800 x 800 px) (58).png', imgNoBg: true, color: '#00A8B5', bg: '#C2EDD4' }
];

// Pracovné listy → Grafomotorika
const GRAFO_ITEMS = [
  { id: 1, name: 'Futbalisti trénujú 1',            variant: 'print',   age: '3-4', preview: 'assets/worksheet-futbalisti.png' },
  { id: 2, name: 'Futbalisti trénujú 1',            variant: 'display', age: '3-4', preview: 'assets/worksheet-futbalisti.png' },
  { id: 3, name: 'Krasokorčuľovanie s kamarátmi 1', variant: 'print',   age: '4-5', preview: null },
  { id: 4, name: 'Krasokorčuľovanie s kamarátmi 1', variant: 'display', age: '4-5', preview: null },
  { id: 5, name: 'Tenisový úder 1',                 variant: 'print',   age: '4-5', preview: null },
  { id: 6, name: 'Tenisový úder 1',                 variant: 'display', age: '4-5', preview: null },
  { id: 7, name: 'Skákanie cez švihadlo 1',         variant: 'print',   age: '5-6', preview: null },
  { id: 8, name: 'Skákanie cez švihadlo 1',         variant: 'display', age: '5-6', preview: null }
];

// ─────────────────────────────────────────────────────────────
// 04c · Pracovné listy (Témy — šport, zvieratá, geometria…)
// ─────────────────────────────────────────────────────────────
function PracovneListyScreen({ dark = false, columns = 2 }) {
  const p = window.ALFIK_PALETTE;
  return (
    <window.PhoneFrame dark={dark} label="04c Pracovné listy">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark ?
          'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
          'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        <window.CategoryHero
          dark={dark}
          title="Pracovné listy"
          img="uploads/Bez názvu - kópia (800 x 800 px) (39).png"
          imgNoBg={true}
          gradient="linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)"
          gradientDark="linear-gradient(135deg, #0E7A87 0%, #053D45 100%)"
          shadowColor="rgba(0,168,181,0.45)"
          accent="#00A8B5"
          ageIcon="all"
          showAgeAvatar={false}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', 'Pracovné listy']}
        />

        <div data-scroll-area style={{
          flex: 1, minHeight: 0, padding: '26px', overflowY: 'auto',
          display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: columns === 3 ? 20 : 26,
          alignContent: 'start'
        }}>
          {PRACOVNE_TOPICS.slice(0, columns === 3 ? 9 : 8).map((s) =>
            <window.ScaleTile key={s.id} design={columns === 3 ? 99 : 154}>
              <window.SubTile sub={s} dark={dark} compact={columns === 3} active={s.id === 'sport'} />
            </window.ScaleTile>
          )}
        </div>
      </div>
    </window.PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 05c · Šport — Pracovné listy (typy úloh: Grafomotorika, Bludiská, Spoj dvojice)
// ─────────────────────────────────────────────────────────────
function SportPracovneScreen({ dark = false, columns = 2 }) {
  const p = window.ALFIK_PALETTE;
  return (
    <window.PhoneFrame dark={dark} label="05c Šport — Pracovné listy">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark ?
          'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
          'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        <window.CategoryHero
          dark={dark}
          title="Šport"
          img="uploads/Bez názvu - kópia (800 x 800 px) (56).png"
          imgNoBg={true}
          gradient="linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)"
          gradientDark="linear-gradient(135deg, #0E7A87 0%, #053D45 100%)"
          shadowColor="rgba(0,168,181,0.45)"
          accent="#00A8B5"
          ageIcon="all"
          showAgeAvatar={false}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', 'Pracovné listy', 'Šport']}
        />

        <div style={{
          flex: 1, padding: '26px',
          display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: columns === 3 ? 20 : 26,
          alignContent: 'start'
        }}>
          {SPORT_TYPY.map((s) =>
            <window.ScaleTile key={s.id} design={columns === 3 ? 99 : 154}>
              <window.SubTile sub={s} dark={dark} compact={columns === 3} active={s.id === 'grafomotorika'} />
            </window.ScaleTile>
          )}
        </div>
      </div>
    </window.PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 06c · Grafomotorika (row list — PDF/JPG variants)
// ─────────────────────────────────────────────────────────────
function GrafomotorikaScreen({ dark = false, columns = 2 }) {
  const p = window.ALFIK_PALETTE;

  return (
    <window.PhoneFrame dark={dark} label="06c Grafomotorika">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark ?
          'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
          'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        <window.CategoryHero
          dark={dark}
          title="Grafomotorika"
          img="uploads/Bez názvu - kópia (800 x 800 px) (59).png"
          imgNoBg={true}
          gradient="linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)"
          gradientDark="linear-gradient(135deg, #0E7A87 0%, #053D45 100%)"
          shadowColor="rgba(0,168,181,0.45)"
          accent="#00A8B5"
          ageIcon="all"
          showAgeLabel={true}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', 'Pracovné listy', 'Šport', 'Grafomotorika']}
        />

        {/* Row list */}
        <div data-scroll-area style={{
          flex: 1, minHeight: 0, overflowY: 'auto',
          padding: '4px 14px 14px',
          display: 'flex', flexDirection: 'column', gap: 10
        }}>
          {GRAFO_ITEMS.map((it) =>
            <GrafoRow key={it.id} item={it} dark={dark} />
          )}
        </div>
      </div>
    </window.PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// GrafoRow — single row (mirrors TestListRow pattern)
// ─────────────────────────────────────────────────────────────
function GrafoRow({ item, dark }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const surf = dark ? p.darkSurf : '#FFFFFF';
  const Q = window.QUASAR || { primary: '#8FD400', primaryDeep: '#72B600' };
  const isPdf = item.variant === 'print';
  const ageSrc = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[item.age] || 'assets/age_all_new.svg';

  return (
    <div style={{
      background: surf,
      borderRadius: 22,
      padding: '10px 14px 10px 10px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: dark ? 'none' : '0 2px 5px rgba(15,30,55,0.18)',
      border: dark ? `1.5px solid ${p.darkLine}` : 'none',
      minHeight: 63
    }}>
      {/* vekový odznak */}
      {window.AgeBadge && <window.AgeBadge age={item.age} size={30} />}

      {/* PDF / JPG badge */}
      <div style={{
        flexShrink: 0,
        background: 'transparent',
        borderRadius: 8, padding: 0,
        display: 'flex', alignItems: 'center', gap: 3
      }}>
        <FileBadgeIcon kind={isPdf ? 'pdf' : 'jpg'} size={30} />
      </div>

      {/* Name */}
      <div style={{
        flex: 1, minWidth: 0,
        fontSize: 15, fontWeight: 800, letterSpacing: '-0.2px',
        color: ink, lineHeight: 1.25,
        fontFamily: '"Dosis", sans-serif',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        {item.name}
      </div>


    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GrafoTile — same shape as TestTile (05) but for worksheets
// ─────────────────────────────────────────────────────────────
function GrafoTile({ item, dark, compact }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  // Modrá rodina Pracovných listov — jasne odlíšené odtiene podľa veku
  const agePalette = {
    '3-4': { accent: '#5DD3C8', deep: '#1F8F92' }, // svetlejší aqua
    '4-5': { accent: '#00A8B5', deep: '#0E7A87' }, // základná tyrkysová
    '5-6': { accent: '#007880', deep: '#054E6B' }  // hlbšia teal
  };
  const { accent, deep } = agePalette[item.age] || agePalette['4-5'];
  const ageSrc = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[item.age] || 'assets/age_all_new.svg';
  const isPdf = item.variant === 'print';

  const tileBg = dark
    ? p.darkSurf
    : 'linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)';

  return (
    <div style={{
      background: tileBg,
      borderRadius: compact ? 22 : 26,
      padding: compact ? '11px 10px' : '14px 13px',
      position: 'relative', overflow: 'hidden',
      boxShadow: dark ? 'none' : `0 2px 4px 0px rgba(15,30,55,0.35)`,
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)',
      minHeight: compact ? 140 : 192,
      display: 'flex', flexDirection: 'column', gap: 5
    }}>
      {/* PDF/JPG badge — top-left (same slot as rating in 05) */}
      <div style={{
        position: 'absolute', top: compact ? 8 : 10, left: compact ? 8 : 10, zIndex: 3,
        background: '#FFFFFF',
        borderRadius: 10,
        padding: compact ? '2px 4px' : '3px 5px',
        boxShadow: '0 2px 5px rgba(15,30,55,0.28)',
        display: 'flex', alignItems: 'center'
      }}>
        <FileBadgeIcon kind={isPdf ? 'pdf' : 'jpg'} size={compact ? 18 : 22} />
      </div>

      {/* Speaker — top-right (audio of name) */}
      <div style={{
        position: 'absolute', top: 6, right: 6, zIndex: 2,
        width: compact ? 40 : 50, height: compact ? 40 : 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {window.SpeakerIcon
          ? <window.SpeakerIcon size={compact ? 40 : 50} dotFill="#00A8B5" shadow={false} circleBorder={true} />
          : null}
      </div>

      {/* Preview area with download overlay */}
      <div style={{
        width: '100%', flex: 1,
        borderRadius: compact ? 16 : 20,
        background: dark ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: dark ? 'none' : `0 3px 8px ${deep}22`,
        minHeight: compact ? 82 : 122,
        backgroundImage: item.preview ? 'none' : (dark
          ? `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 6px, transparent 6px 14px)`
          : `repeating-linear-gradient(45deg, ${accent}14 0 6px, transparent 6px 14px)`)
      }}>
        {/* Preview image */}
        {item.preview &&
          <img
            src={item.preview} alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover'
            }}
          />
        }

        {/* Subtle dimming under the action button */}
        {item.preview &&
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 55%)'
          }} />
        }

        {/* placeholder label only when no preview */}
        {!item.preview &&
          <div style={{
            position: 'absolute', bottom: 6, left: 8,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: compact ? 8 : 9, letterSpacing: 0.3,
            color: dark ? 'rgba(255,255,255,0.45)' : `${deep}99`,
            textTransform: 'uppercase'
          }}>náhľad</div>
        }

        {/* Download button — centered (same slot as play button in 05) */}
        <button style={{
          width: compact ? 44 : 54, height: compact ? 44 : 54,
          borderRadius: '50%', cursor: 'pointer',
          background: `linear-gradient(135deg, ${(window.QUASAR||{primary:'#8FD400'}).primary} 0%, ${(window.QUASAR||{primaryDeep:'#72B600'}).primaryDeep} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '3px solid #FFFFFF',
          boxShadow: `0 4px 12px -2px rgba(114,182,0,0.55), 0 0 0 2px rgba(15,30,55,0.05)`,
          position: 'relative', zIndex: 1, padding: 0
        }}>
          <svg width={compact ? 24 : 30} height={compact ? 24 : 30} viewBox="0 0 24 24"
            fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v13" />
            <polyline points="6 11 12 17 18 11" />
            <line x1="4" y1="21" x2="20" y2="21" />
          </svg>
        </button>
      </div>

      {/* Bottom row: age badge + worksheet name */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '0 2px 2px',
        minHeight: compact ? 24 : 28
      }}>

        <div style={{
          flex: 1, minWidth: 0,
          fontSize: compact ? 13 : 15,
          fontWeight: 900,
          fontFamily: '"Dosis", sans-serif',
          letterSpacing: '-0.1px',
          color: dark ? ink : '#1A4040',
          textShadow: 'none',
          lineHeight: 1.12,
          textAlign: 'left',
          textWrap: 'pretty',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {item.name}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ dark, active, icon, label, accent: accentProp }) {
  const p = window.ALFIK_PALETTE;
  const Q = window.QUASAR || p;
  const ink = dark ? p.darkInk : p.ink;
  const accent = accentProp || Q.primaryDeep || Q.primary || '#72B600';
  const accentLight = accentProp || Q.primary || '#8FD400';
  const bg = dark ? p.darkSurf : (active ? `${accentLight}14` : '#FFFFFF');
  const border = active ? accent : (dark ? p.darkLine : 'rgba(15,30,55,0.08)');
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '7px 12px',
      borderRadius: 999,
      background: bg,
      border: `1.5px solid ${border}`,
      fontSize: 13, fontWeight: 800,
      color: active ? accent : (dark ? p.darkInkSoft : p.inkSoft),
      fontFamily: '"Dosis", sans-serif',
      cursor: 'pointer',
      boxShadow: 'none'
    }}>
      {icon === 'pdf' && <FileBadgeIcon kind="pdf" size={18} />}
      {icon === 'jpg' && <FileBadgeIcon kind="jpg" size={18} />}
      {label}
    </div>
  );
}

function FileBadgeIcon({ kind, size = 26 }) {
  const isPdf = kind === 'pdf';
  const src = isPdf ? 'assets/mat_pdf.svg' : 'assets/mat_obrazok.svg';
  const label = isPdf ? 'PDF' : 'JPG';
  return (
    <div style={{
      width: size, height: size,
      position: 'relative', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <img src={src} alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

function TeddyIcon({ size = 40 }) {
  // Vek 3–4 r. ikona — zhodná s AgeBadge v 05
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <img
        src="assets/age_3_4.svg"
        style={{ width: size - 2, height: size - 2, objectFit: 'contain' }}
        alt="3–4 r." />
    </div>
  );
}

function FileRow({ item, dark }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const isPdf = item.variant === 'print';
  const variantLabel = isPdf ? '(pre tlač, PDF)' : '(pre displej, JPG)';
  const surf = dark ? p.darkSurf : p.surface;

  return (
    <div style={{
      background: dark ? surf : '#FFFFFF',
      borderRadius: 22, padding: '11px 12px',
      display: 'flex', alignItems: 'center', gap: 11,
      boxShadow: dark
        ? 'none'
        : '0 2px 4px 0px rgba(15,30,55,0.35)',
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)'
    }}>
      <TeddyIcon size={40} />
      <FileBadgeIcon kind={isPdf ? 'pdf' : 'jpg'} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 800, letterSpacing: '-0.2px',
          color: ink, lineHeight: 1.25,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          fontFamily: '"Dosis", sans-serif'
        }}>
          {item.name}
        </div>
        <div style={{
          fontSize: 12, fontWeight: 700, color: inkSoft,
          fontFamily: '"Dosis", sans-serif', marginTop: 1
        }}>{variantLabel}</div>
      </div>
      <div style={{
        width: 32, height: 32, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={(window.QUASAR && window.QUASAR.primaryDeep) || '#72B600'}
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 06c · Otvorený pracovný list (PDF viewer)
// ─────────────────────────────────────────────────────────────
function PracovnyListOpenScreen({ dark = false }) {
  const p = window.ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const accent = '#5B8DEF';

  return (
    <window.PhoneFrame dark={dark} label="07c Pracovný list otvorený">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark ? '#0E1622' : '#ECEEF1'
      }}>
        {/* Top bar with back + title */}
        <div style={{
          padding: '10px 14px 10px 12px',
          background: dark ? '#16213A' : '#FFFFFF',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(15,30,55,0.08)'}`,
          flexShrink: 0
        }}>
          <button style={{
            width: 38, height: 38, borderRadius: 12,
            border: `1.5px solid ${dark ? 'rgba(255,255,255,0.45)' : accent}`,
            background: dark ? 'rgba(255,255,255,0.10)' : '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0, cursor: 'pointer'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke={dark ? '#FFFFFF' : accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: ink,
              letterSpacing: '-0.2px', lineHeight: 1.2,
              fontFamily: '"Dosis", sans-serif',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              Futbalisti trénujú
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: inkSoft,
              fontFamily: '"Dosis", sans-serif', marginTop: 1
            }}>
              Grafomotorika · PDF
            </div>
          </div>
          {/* More menu */}
          <button style={{
            width: 38, height: 38, borderRadius: 12,
            border: `1.5px solid ${dark ? 'rgba(255,255,255,0.45)' : 'rgba(15,30,55,0.10)'}`,
            background: dark ? 'rgba(255,255,255,0.10)' : '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0, cursor: 'pointer'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={dark ? '#FFFFFF' : '#4A5B6E'}>
              <circle cx="5" cy="12" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="19" cy="12" r="2"/>
            </svg>
          </button>
        </div>

        {/* Paper area */}
        <div style={{
          flex: 1, overflow: 'hidden', position: 'relative',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '16px 14px 12px',
          background: dark
            ? 'linear-gradient(180deg, #0E1622 0%, #1A2433 100%)'
            : '#ECEEF1'
        }}>
          <div style={{
            width: '100%',
            maxWidth: 340,
            background: '#FFFFFF',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 8px 24px -6px rgba(15,30,55,0.18), 0 2px 6px -1px rgba(15,30,55,0.10)',
            border: '1px solid rgba(15,30,55,0.06)'
          }}>
            <img
              src="assets/worksheet-futbalisti.png"
              alt="Futbalisti trénujú"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* Bottom toolbar */}
        <PdfToolbar dark={dark} accent={accent} />
      </div>
    </window.PhoneFrame>
  );
}

function PdfToolbar({ dark, accent }) {
  const p = window.ALFIK_PALETTE;
  return (
    <div style={{
      flexShrink: 0,
      background: dark ? '#1A2433' : '#FFFFFF',
      borderTop: `1px solid ${dark ? p.darkLine : 'rgba(15,30,55,0.08)'}`,
      padding: '8px 6px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 0
    }}>
      <ToolBtn accent={accent} dark={dark}>
        {/* Grid / thumbnails */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      </ToolBtn>

      <ToolBtn dark={dark}>
        {/* Zoom out */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      </ToolBtn>

      <ToolBtn dark={dark}>
        {/* Zoom in */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
        </svg>
      </ToolBtn>

      <ToolBtn dark={dark}>
        {/* First page |< */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 6 10 12 17 18"/>
          <line x1="7" y1="5" x2="7" y2="19"/>
        </svg>
      </ToolBtn>

      <div style={{
        fontFamily: '"Dosis", sans-serif',
        fontSize: 13, fontWeight: 700,
        color: dark ? p.darkInkSoft : p.inkSoft,
        padding: '0 4px', minWidth: 30, textAlign: 'center'
      }}>
        1/1
      </div>

      <ToolBtn dark={dark}>
        {/* Last page >| */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 6 14 12 7 18"/>
          <line x1="17" y1="5" x2="17" y2="19"/>
        </svg>
      </ToolBtn>

      <ToolBtn dark={dark}>
        {/* Download */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="4" y1="20" x2="20" y2="20"/>
        </svg>
      </ToolBtn>

      <ToolBtn dark={dark}>
        {/* Speaker */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="4 9 4 15 9 15 14 20 14 4 9 9 4 9"/>
          <path d="M17 8a5 5 0 0 1 0 8"/>
          <path d="M19.5 5a9 9 0 0 1 0 14"/>
        </svg>
      </ToolBtn>

      <ToolBtn dark={dark}>
        {/* Fullscreen */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 9 3 3 9 3"/>
          <polyline points="21 9 21 3 15 3"/>
          <polyline points="3 15 3 21 9 21"/>
          <polyline points="21 15 21 21 15 21"/>
        </svg>
      </ToolBtn>
    </div>
  );
}

function ToolBtn({ children, accent, dark }) {
  const p = window.ALFIK_PALETTE;
  const color = accent || (dark ? p.darkInkSoft : '#4A5B6E');
  return (
    <button style={{
      flex: 1, height: 38,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'transparent', border: 'none', padding: 0,
      color: color, cursor: 'pointer'
    }}>
      {children}
    </button>
  );
}

Object.assign(window, { PracovneListyScreen, SportPracovneScreen, GrafomotorikaScreen, PracovnyListOpenScreen, GrafoTile });
