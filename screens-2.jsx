// Alfík — category, subcategory and test list screens

// ─────────────────────────────────────────────────────────────
// Optické vyváženie ikon — rovnaký box klame, lebo ikony majú
// rôzne proporcie. Naškálujeme podľa plochy (perceived area),
// aby vysoké-úzke dokumenty mali rovnakú hmotnosť ako široký
// medvedík/kniha. base = veľkosť, akú by mala štvorcová ikona.
// ─────────────────────────────────────────────────────────────
window.ICON_VB = {
  'assets/age_3_4.svg': [37, 36],
  'assets/age_4_5.svg': [27, 34],
  'assets/age_5_6.svg': [36, 31],
  'assets/age_all_new.svg': [29, 34],
  'assets/rating_great.svg': [44, 44],
  'assets/rating_good.svg': [44, 44],
  'assets/rating_ok.svg': [44, 44],
  'assets/mat_audio.svg': [33, 41],
  'assets/mat_pdf.svg': [33, 41],
  'assets/mat_interaktivny.svg': [33, 41],
  'assets/mat_obrazok.svg': [33, 41],
  'assets/mat_video.svg': [33, 41]
};
window.opticalSize = function (src, base) {
  const vb = window.ICON_VB[src];
  if (!vb) return { w: base, h: base };
  const a = vb[0] / vb[1];
  const B = a >= 1 ? base * Math.sqrt(a) : base / Math.sqrt(a);
  const w = a >= 1 ? B : B * a;
  const h = a >= 1 ? B / a : B;
  return { w: Math.round(w * 10) / 10, h: Math.round(h * 10) / 10 };
};

// ─────────────────────────────────────────────────────────────
// ScrollFade — wrapper s dynamickým fade hore aj dole
// ─────────────────────────────────────────────────────────────
function ScrollFade({ children, style, ...rest }) {
  const ref = React.useRef(null);
  const updateMask = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const atTop = el.scrollTop < 6;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 6;
    const top = atTop ? '#000 0%' : 'transparent 0px, #000 28px';
    const bot = atBottom ? '#000 100%' : '#000 calc(100% - 32px), transparent 100%';
    const mask = `linear-gradient(180deg, ${top}, ${bot})`;
    el.style.WebkitMaskImage = mask;
    el.style.maskImage = mask;
  }, []);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateMask();
    el.addEventListener('scroll', updateMask, { passive: true });
    // tiež observer pre prípad že sa obsah zmení
    const ro = new ResizeObserver(updateMask);
    ro.observe(el);
    return () => {el.removeEventListener('scroll', updateMask);ro.disconnect();};
  }, [updateMask]);
  return (
    <div ref={ref} data-scroll-area style={style} {...rest}>
      {children}
    </div>);

}

// Brand teal-mint — zladené s blobom z produktovej stránky
const BRAND_TEAL = '#00A8B5'; // bližšie k modrej screen 04, nie totožné
const BRAND_TEAL_DEEP = '#007880';
const BRAND_MINT = '#C2EDD4';
const TILE_GRADIENT = `linear-gradient(180deg, #15A1A9 0%, #1DBCC4 30%, #4DD6CE 65%, #A0E5D9 100%)`;

const ALF_CATEGORIES = [
{ id: 'slovencina', name: 'Slovenský jazyk', emoji: '📖', img: 'uploads/ilustracie/slovensky-jazyk.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT },
{ id: 'cudzie', name: 'Cudzie jazyky', emoji: '🌍', img: 'uploads/ilustracie/cudzie-jazyky.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT },
{ id: 'rozpravky', name: 'Rozprávky', emoji: '📚', img: 'uploads/ilustracie/rozpravky.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT },
{ id: 'pracovne', name: 'Pracovné listy', emoji: '✏️', img: 'uploads/ilustracie/pracovne-listy.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT },
{ id: 'interaktivne', name: 'Interaktívne cvičenia', emoji: '🎯', img: 'uploads/ilustracie/interaktivne-cvicenia.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT, smallLabel: true },
{ id: 'malovanky', name: 'Maľovanky', emoji: '🎨', img: 'uploads/ilustracie/malovanky.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT, nove: true },
{ id: 'hadanky', name: 'Hádanky', emoji: '❓', img: 'uploads/ilustracie/hadanky.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT },
{ id: 'ukazky', name: 'Ukážky úloh', emoji: '🍂', img: 'uploads/ilustracie/ukazky-uloh.webp', imgNoBg: true, color: BRAND_TEAL, bg: BRAND_MINT }];


// Podkategórie pod „Interaktívne cvičenia“ — všetky tyrkysové
const INTERAKTIVNE_SUB = [
{ id: 'okolo', name: 'Okolo nás', emoji: '🏘️', img: 'uploads/ilustracie/okolo-nas.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'rodina', name: 'Moja rodina a krajina', emoji: '👨\u200d👩\u200d👧', img: 'uploads/ilustracie/moja-rodina-a-krajina.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'povolania', name: 'Povolania', emoji: '👷', img: 'uploads/ilustracie/povolania.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'priroda', name: 'Príroda', emoji: '🌳', img: 'uploads/ilustracie/priroda.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'cisla', name: 'Čísla', emoji: '🔢', img: 'uploads/ilustracie/cisla.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'zdravie', name: 'Zdravie', emoji: '🍎', img: 'uploads/ilustracie/zdravie.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'geometria', name: 'Geometria', emoji: '🔺', img: 'uploads/ilustracie/geometria.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'doprava', name: 'Doprava', emoji: '🚌', img: 'uploads/ilustracie/doprava.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'logika', name: 'Logika', emoji: '🧩', img: 'uploads/ilustracie/logika.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'sviatky', name: 'Sviatky', emoji: '🎄', img: 'uploads/ilustracie/sviatky.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'abeceda', name: 'Abeceda', emoji: '🔤', img: 'uploads/ilustracie/abeceda.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'rocne', name: 'Ročné obdobia', emoji: '🍁', img: 'uploads/ilustracie/rocne-obdobia.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'farby', name: 'Farby', emoji: '🎨', img: 'uploads/ilustracie/farby.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' }];


// Podkategórie pod „Príroda“ — tyrkysové
const PRIRODA_SUB = [
{ id: 'svet', name: 'Svet okolo nás', emoji: '🌍', img: 'uploads/ilustracie/okolo-nas.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'rastliny', name: 'Rastliny', emoji: '🌷', img: 'uploads/ilustracie/rastliny.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' },
{ id: 'zivocichy', name: 'Živočíchy', emoji: '🐾', img: 'uploads/ilustracie/zivocichy.webp', imgNoBg: true, color: '#00A8B5', bg: '#7BDDE6' }];


// Testy pre „Živočíchy“
const TESTS = [
{ age: '3-6', name: 'Kto povedal mňau?', rating: 'great', preview: 'assets/test_macik.png' },
{ age: '3-4', name: 'Kde je moja mamička?', rating: 'good', preview: 'assets/test_baby_animals.png' },
{ age: '3-4', name: 'Čím sa živia zvieratká?', rating: 'ok', preview: 'assets/test_food.png' },
{ age: '4-5', name: 'Čo sa skrýva v ZOO?', rating: null, preview: 'assets/test_zoo_brana.png' },
{ age: '4-5', name: 'Čo sa skrýva na lúke?', rating: 'good', preview: 'assets/test_luka.png' },
{ age: '4-5', name: 'Čo sa skrýva pri vode?', rating: null, preview: 'assets/test_voda.png' },
{ age: '4-5', name: 'Čo sa skrýva za plotom?', rating: 'ok', preview: 'assets/test_fence.png' },
{ age: '5-6', name: 'Čo sa skrýva za stromom?', rating: null, preview: 'assets/test_zoo2.png' },
{ age: '3-6', name: 'Čo sa skrýva pod hladinou?', rating: 'good', preview: 'assets/test_hladina.png' },
{ age: '5-6', name: 'Pomenovanie zvieracích zvukov', rating: null, preview: 'assets/test_plot.png' },
{ age: '5-6', name: 'Rozstrihané obrázky — zvieratá', rating: null, preview: 'assets/test_strom.png' }];


// ─────────────────────────────────────────────────────────────
// Top app bar — shared
// ─────────────────────────────────────────────────────────────
function TopBar({ dark, title, showBack = false, showHome = false, showAvatar = true, showProfile = true, accent, ageIcon = 'all', onAgeTap, ageActive, showAgeAvatar = true, profile = 'Timo' }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  return (
    <div style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', padding: '6px 18px 14px',
      minHeight: 58,
      background: dark ?
      'linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(15,30,55,0.30) 70%, rgba(15,30,55,0) 100%)' :
      'transparent',
      backdropFilter: 'blur(10px) saturate(120%)',
      WebkitBackdropFilter: 'blur(10px) saturate(120%)',
      borderBottom: dark ?
      '1px solid rgba(255,255,255,0.07)' :
      'none',
      boxShadow: dark ?
      '0 6px 14px -10px rgba(0,0,0,0.4)' :
      'none'
    }}>
      {/* Titulok — absolútne centrovaný v rámci celej lišty */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        fontSize: 19, fontWeight: 800, letterSpacing: '-0.2px',
        fontFamily: '"Dosis", sans-serif', color: ink
      }}>
        {title}
      </div>

      {/* Ľavá strana: profil + (back) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, zIndex: 1 }}>
        {showProfile && <ProfileAvatar name={profile} dark={dark} />}
        {showBack && <BackButton dark={dark} accent={accent || (window.QUASAR || {}).accent || p.skyDeep} />}
        {showHome && <HomeButton dark={dark} />}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Pravá strana: vek */}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
        {showAvatar && showAgeAvatar && <AgeAvatar age={ageIcon} dark={dark} active={ageActive} />}
      </div>
    </div>);

}

function HomeButton({ dark, onHero = false }) {
  return (
    <button title="Domov" style={{
      width: 34, height: 34, borderRadius: 12,
      border: 'none',
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 0, flexShrink: 0, cursor: 'pointer'
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={onHero ? '#FFFFFF' : '#1A2B3D'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    </button>);
}

function BackButton({ dark, accent, onHero = false }) {
  const p = ALFIK_PALETTE;
  const border = onHero ? 'rgba(255,255,255,0.85)' : accent;
  const bg = onHero ?
  'rgba(255,255,255,0.18)' :
  dark ? p.darkSurf : '#FFFFFF';
  const stroke = onHero ? '#FFFFFF' : accent;
  return (
    <button style={{
      width: 38, height: 38, borderRadius: 14,
      border: 'none',
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 0, flexShrink: 0, cursor: 'pointer',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none'
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={onHero ? '#FFFFFF' : '#1A2B3D'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>);

}

// Štýlová šípka späť do hero bannera — rounded square, polopriesvitná biela
function HeroBackButton() {
  return (
    <button style={{
      width: 30, height: 30, borderRadius: 9,
      border: 'none',
      background: 'rgba(255,255,255,0.70)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 0, flexShrink: 0, cursor: 'pointer',
      boxShadow: 'none'
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#006E7A" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>);

}

function AgeAvatar({ age, dark, active, showLabel = false }) {
  const p = ALFIK_PALETTE;
  const palette = {
    '3-4': { stroke: '#FF8A65', bg: '#FFE3D6' },
    '4-5': { stroke: '#FFB400', bg: '#FFF3D6' },
    '5-6': { stroke: '#3DD9B0', bg: '#D9F8EF' },
    'all': { stroke: '#3FA9E0', bg: '#D6ECF8' }
  };
  const { stroke, bg } = palette[age] || palette['all'];
  const iconSrc = {
    '3-4': 'assets/age_3_4.svg',
    '4-5': 'assets/age_4_5.svg',
    '5-6': 'assets/age_5_6.svg',
    'all': 'assets/age_all_new.svg'
  }[age] || 'assets/age_all_new.svg';
  const label = {
    '3-4': '3–4 r.',
    '4-5': '4–5 r.',
    '5-6': '5–6 r.',
    'all': 'Všetky'
  }[age] || 'Všetky';
  return (
    <button style={{
      width: 38, minHeight: 38, borderRadius: 14, border: 'none',
      background: 'transparent',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: showLabel ? 1 : 0,
      boxShadow: active ? `0 6px 14px -4px ${stroke}AA` : 'none',
      padding: 0, flexShrink: 0
    }}>
      <img src={iconSrc}
      style={{ width: showLabel ? 28 : 20, height: showLabel ? 28 : 20, objectFit: 'contain' }} alt="filter veku" />
      {showLabel &&
      <div style={{
        fontSize: 12, fontWeight: 800,
        color: dark ? '#FFFFFF' : '#3FA9E0',
        letterSpacing: '-0.2px', fontFamily: '"Dosis", sans-serif',
        lineHeight: 1
      }}>{label}</div>}
    </button>);

}

// ─────────────────────────────────────────────────────────────
// 3. CATEGORY TREE (top-level)
// ─────────────────────────────────────────────────────────────
function CategoryTreeContent({ dark = false, columns = 2 }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      background: dark ?
      'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
      'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
    }}>
      <TopBar
        dark={dark}
        title={
        <span style={{
          fontFamily: '"Dosis", sans-serif',
          fontWeight: 800,
          fontSize: 19,
          letterSpacing: '-0.2px',
          color: dark ? '#FFFFFF' : '#1A2B3D',
          lineHeight: 1,
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={dark ? '#FFFFFF' : '#1A2B3D'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z" />
          </svg>
          Alfík
        </span>
        }
        showBack={false}
        showHome={false}
        showProfile={true}
        ageIcon="all"
        showAgeAvatar={false}
        profile="Timo" />

      {/* D — počet stĺpcov podľa šírky (container queries), dlaždica zastropovaná
           na 154px → štvorec, pomer aj padding ostanú konštantné, dlaždica nikdy
           neballoní. Telefón 2 → tablet 4 → veľký displej 6 stĺpcov, vycentrované. */}
      {columns === 'auto' &&
      <style>{`
        .alf-cat-host { container-type: inline-size; }
        .alf-cat-grid {
          display: grid;
          justify-content: center;
          gap: 20px;
          padding: 0 20px;
          align-content: start;
          grid-template-columns: repeat(2, minmax(0, 154px));
        }
        /* Len veľmi úzky displej (iPhone SE ~320px): zmenšia sa okraje a medzery,
           aby dlaždica ostala veľká. Malý telefón (360px+) má pôvodné paddingy. */
        @container (max-width: 325px) { .alf-cat-grid { gap: 8px; padding: 0 6px; } }
        @container (min-width: 560px) { .alf-cat-grid { grid-template-columns: repeat(3, minmax(0, 154px)); } }
        @container (min-width: 740px) { .alf-cat-grid { grid-template-columns: repeat(4, minmax(0, 154px)); } }
        @container (min-width: 1100px){ .alf-cat-grid { grid-template-columns: repeat(6, minmax(0, 154px)); } }
      `}</style>
      }

      <div
        data-scroll-area
        onWheel={(e) => e.stopPropagation()}
        className={columns === 'auto' ? 'alf-cat-host' : undefined}
        style={columns === 'auto' ? {
          flex: 1, minHeight: 0, overflowY: 'auto', padding: '10px 0 26px'
        } : {
          flex: 1, minHeight: 0, overflowY: 'auto',
          padding: columns === 3 ? '10px 32px 26px' : '10px 31px 26px',
          display: 'grid',
          gridTemplateColumns: columns === 3 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
          gap: columns === 3 ? 14 : 20,
          alignContent: 'start'
        }}>
        <div className={columns === 'auto' ? 'alf-cat-grid' : undefined} style={columns === 'auto' ? undefined : { display: 'contents' }}>
          {ALF_CATEGORIES.slice(0, columns === 3 ? 9 : 8).map((c) =>
          <window.ScaleTile key={c.id} design={columns === 3 ? 99 : 154}>
            <CategoryTile cat={c} dark={dark} compact={columns === 3} nove={c.nove} />
          </window.ScaleTile>
          )}
        </div>
      </div>
    </div>);

}

function CategoryTreeScreen({ dark = false, columns = 2 }) {
  return (
    <PhoneFrame dark={dark} label="03 Kategorie">
      <CategoryTreeContent dark={dark} columns={columns} />
    </PhoneFrame>);
}

function CategoryTile({ cat, dark, compact, nove }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const tileBg = dark ? p.darkSurf : cat.bg;
  const tileAccent = dark ? p.skyDeep : cat.color;
  const labelSize = 16;

  return (
    <div style={{
      background: dark ? tileBg : TILE_GRADIENT,
      borderRadius: compact ? 20 : 24,
      padding: compact ? '10px 10px 8px' : '13px 13px 8px',
      position: 'relative', overflow: 'hidden',
      boxShadow: dark ? 'none' : `0 2px 4px 0px rgba(15,30,55,0.35)`,
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)',
      display: 'flex', flexDirection: 'column', gap: 8,
      height: '100%'
    }}>
      {/* NOVÉ badge */}
      {nove &&
      <div style={{
        position: 'absolute',
        top: compact ? 8 : 9,
        left: compact ? 8 : 9,
        zIndex: 5,
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

      {/* Speaker badge */}
      <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 4 }}>
        <SpeakerIcon size={compact ? 32 : 40} dotFill={tileAccent} shadow={false} circleBorder={true} />
      </div>

      {/* Emoji container */}
      <div style={{ ...{
          width: '100%', flexShrink: 0, borderRadius: compact ? 14 : 18,
          background: dark ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: compact ? 36 : 54,
          boxShadow: dark ? 'none' : `0 3px 8px ${tileAccent}22`,
          lineHeight: 1
        }, aspectRatio: '3 / 2', minHeight: 0 }}>
        {cat.img ?
        <img src={cat.img} alt={cat.name} style={{ width: '84%', height: '84%', objectFit: 'contain', display: 'block' }} /> :
        cat.emoji}
      </div>

      <div style={{ ...{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: cat.smallLabel ? "0px 4px 6px" : compact ? "2px 4px 5px" : "3px 4px 6px" }, padding: "0px 4px 6px" }}>
        <div style={{
          fontSize: labelSize, fontWeight: 700,
          fontFamily: '"Dosis", sans-serif',
          color: dark ? p.darkInk : '#1A4040',
          textAlign: 'center',
          wordBreak: 'break-word', letterSpacing: "-0.1px", lineHeight: "1.1"
        }}>{cat.name}</div>
      </div>
    </div>);

}

function ProfileAvatar({ name = 'Timo', dark }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  return (
    <button title="Menu" style={{
      width: 38, height: 38, borderRadius: 14,
      border: 'none',
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 0, flexShrink: 0, overflow: 'hidden', cursor: 'pointer',
      boxShadow: 'none'
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </svg>
    </button>);

}

// ─────────────────────────────────────────────────────────────
// Speaker SVG — extrahovaný (pre Hero / CategoryHero)
// ─────────────────────────────────────────────────────────────
function SpeakerIcon({ size = 46, dotFill = BRAND_TEAL, shadow = true, circleBorder = false }) {
  return (
    <div style={{
      width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      filter: shadow ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.28))' : 'none'
    }}>
      <svg width={size} height={size} viewBox="0 0 26 26" overflow="visible"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
        <g transform="matrix(1,0,0,1,-16022,-14255)">
          <g transform="matrix(0.632764,0,0,0.516235,15098.763229,14270.302624)">
            <g transform="matrix(0.276757,0,0,0.46163,823.438483,-2660.734291)">
              <g transform="matrix(3.366616,0,0,2.473962,-1544.09083,-4263.415335)">
                <circle cx="1162.704" cy="4049.021" r="21.864" style={{ fill: 'white', stroke: circleBorder ? dotFill : 'none', strokeWidth: circleBorder ? '2.5px' : '0' }} />
              </g>
              <g transform="matrix(4.34507,0,0,4.157565,-1426.385026,5310.994916)">
                <g transform="matrix(0.834738,0,0,0.427928,-4019.28,-1335.95953)">
                  <path d="M5854.93,3364.04L5854.93,3377.5L5850.49,3377.5C5849.68,3377.5 5849.02,3376.53 5849.02,3375.34L5849.02,3366.2C5849.02,3365.01 5849.68,3364.04 5850.49,3364.04L5854.93,3364.04Z" style={{ fill: dotFill, stroke: dotFill, strokeWidth: '2.19px' }} />
                </g>
                <g transform="matrix(-0,-0.582863,0.759038,-0,-1691.3,3493.24047)">
                  <path d="M5810.55,3366.94L5821.53,3379.07L5799.58,3379.07L5810.55,3366.94Z" style={{ fill: dotFill, stroke: dotFill, strokeWidth: '4.48px' }} />
                </g>
                <g transform="matrix(0.750233,0,0,0.617551,-3488.26,-1974.53953)">
                  <path d="M5823.01,3359.45C5826.31,3361.71 5828.48,3365.51 5828.48,3369.81C5828.48,3374.11 5826.31,3377.9 5823.01,3380.16" style={{ fill: 'none', stroke: dotFill, strokeWidth: '2.18px' }} />
                </g>
                <g transform="matrix(0.44674,0,0,0.367732,-1723.8,-1132.69953)">
                  <path d="M5822.83,3359.33C5826.23,3361.57 5828.48,3365.43 5828.48,3369.81C5828.48,3378.04 5826.23,3378.04 5822.83,3380.28" style={{ fill: 'none', stroke: dotFill, strokeWidth: '3.67px' }} />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// CategoryHero — zlúčený TopBar + Hero banner pre detail kategórie
// ─────────────────────────────────────────────────────────────
function CategoryHero({
  dark, title, icon, img, gradient, gradientDark, shadowColor,
  showSpeaker = true, speakerDot = '#0A3D33',
  ageIcon = 'all', ageActive = false, showAgeAvatar = true, showAgeLabel = false, profile = 'Timo', accent = '#4FB36A',
  crumbs = null, imgNoBg = false
}) {
  const p = ALFIK_PALETTE;
  return (
    <div>
      {/* Horný riadok: menu (vľavo), Alfík (stred), vek (vpravo) */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 18px 4px',
        minHeight: 48,
        position: 'relative'
      }}>
        <ProfileAvatar name={profile} dark={dark} />
        <div style={{
          position: 'absolute', left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{
            fontFamily: '"Dosis", sans-serif',
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: '-0.2px',
            color: dark ? '#FFFFFF' : '#1A2B3D',
            lineHeight: 1,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={dark ? '#FFFFFF' : '#1A2B3D'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z" />
            </svg>
            Alfík
          </span>
        </div>
        <div style={{ flex: 1 }} />
        {showAgeAvatar && <AgeAvatar age={ageIcon} dark={dark} active={ageActive} showLabel={showAgeLabel} />}
      </div>

      {/* Farebný hero pruh — plávajúca karta s rohmi všade */}
      <div style={{ padding: '4px 14px 12px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: dark ? gradientDark : gradient,
          padding: '8px 18px 14px',
          borderRadius: 18
        }}>
          {/* Jemné radiálne svetlo za ikonou */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%',
            background: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 65%)',
            pointerEvents: 'none'
          }} />

          {/* Dekoratívne kruhy */}
          <div style={{ position: 'absolute', right: -28, top: -28, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 60, bottom: -28, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -34, bottom: -40, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

          {/* Breadcrumbs v rámci baneru, nad titulkom */}
          {crumbs && crumbs.length > 1 && (() => {
            const visibleCrumbs = crumbs.slice(0, -1);
            return (
              <div style={{
                position: 'relative', zIndex: 1,
                display: 'flex', alignItems: 'center', gap: 1,
                fontSize: 12, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.92)' : '#000000',
                marginBottom: 10, flexWrap: 'wrap'
              }}>
              {visibleCrumbs.map((c, i) => {
                  const last = i === visibleCrumbs.length - 1;
                  // Prvý crumb (koreň) reprezentuje iba domček — text sa nezobrazuje
                  if (i === 0) {
                    return (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.92)' : '#000000'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z" />
                      </svg>
                    );
                  }
                  return (
                    <React.Fragment key={i}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 2px' }}>
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                      <span style={{ opacity: last ? 1 : 0.75 }}>{c}</span>
                  </React.Fragment>);
                })}
            </div>);
          })()}

          <div style={{
            display: 'flex', alignItems: 'center',
            position: 'relative', zIndex: 1, color: dark ? '#FFFFFF' : '#0D3B35',
            marginLeft: -6, gap: "8px"
          }}>
            <HeroBackButton />
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
              {(icon || img) &&
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: imgNoBg ? 'transparent' : 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 20, overflow: imgNoBg ? 'visible' : 'hidden',
                boxShadow: imgNoBg ? 'none' : '0 4px 10px -3px rgba(0,0,0,0.22), inset 0 -2px 0 rgba(0,0,0,0.04)'
              }}>
                {img ?
                <img src={img} alt="" style={{ ...{ width: imgNoBg ? '130%' : '100%', height: imgNoBg ? '130%' : '100%', objectFit: imgNoBg ? 'contain' : 'cover', borderRadius: imgNoBg ? 0 : '50%' }, width: "40px", height: "40px" }} /> :
                icon
                }
              </div>
              }
              <div style={{
                flex: 1,
                fontFamily: '"Dosis", sans-serif', letterSpacing: '-0.3px',
                textShadow: dark ? '0 2px 6px rgba(0,0,0,0.20)' : 'none', fontWeight: "700", fontSize: 18
              }}>
                {title}
              </div>
            </div>
            {showSpeaker && <SpeakerIcon size={36} dotFill={speakerDot} shadow={false} circleBorder={true} />}
          </div>
        </div>
      </div>
    </div>);

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
            {i === 0 &&
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.skyDeep} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
                <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z" />
              </svg>
            }
            <span style={{ color: last ? p.skyDeep : inkSoft }}>{c}</span>
            {!last &&
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            }
          </React.Fragment>);

      })}
    </div>);

}

// ─────────────────────────────────────────────────────────────
// 4. SUBCATEGORY (Interaktívne cvičenia → ...)
// ─────────────────────────────────────────────────────────────
function SubcategoryScreen({ dark = false, columns = 2, categoryId = 'interaktivne' }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const cat = ALF_CATEGORIES.find((c) => c.id === categoryId) ||
  ALF_CATEGORIES.find((c) => c.id === 'interaktivne');

  return (
    <PhoneFrame dark={dark} label="04 Interaktívne cvičenia">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark ?
        'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
        'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        <CategoryHero
          dark={dark}
          title={cat.name}
          icon={cat.emoji}
          img={cat.img}
          imgNoBg={cat.imgNoBg}
          gradient="linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)"
          gradientDark="linear-gradient(135deg, #0E7A87 0%, #053D45 100%)"
          shadowColor="rgba(0,168,181,0.45)"
          accent="#4FB36A"
          ageIcon="all"
          showAgeAvatar={false}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', cat.name]} />
        



                <div data-scroll-area onWheel={(e) => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: columns === 3 ? '10px 32px 26px' : '10px 31px 26px',
          display: 'grid',
          gridTemplateColumns: columns === 3 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
          gap: columns === 3 ? 14 : 20,
          alignContent: 'start'
        }}>
          {INTERAKTIVNE_SUB.map((s) =>
          <window.ScaleTile key={s.id} design={columns === 3 ? 99 : 154}>
            <SubTile sub={s} dark={dark} compact={columns === 3} active={s.id === 'priroda'} />
          </window.ScaleTile>
          )}
        </div>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 4b. PRÍRODA (Interaktívne cvičenia → Príroda → ...)
// ─────────────────────────────────────────────────────────────
function PrirodaScreen({ dark = false, columns = 2 }) {
  const p = ALFIK_PALETTE;
  return (
    <PhoneFrame dark={dark} label="04b Príroda">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        background: dark ?
        'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
        'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
        <CategoryHero
          dark={dark}
          title="Príroda"
          img="uploads/Bez názvu - kópia (800 x 800 px) (41).png"
          imgNoBg={true}
          gradient="linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)"
          gradientDark="linear-gradient(135deg, #0E7A87 0%, #053D45 100%)"
          shadowColor="rgba(0,168,181,0.45)"
          accent="#4FB36A"
          ageIcon="all"
          showAgeAvatar={false}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', 'Interaktívne cvičenia', 'Príroda']} />
        



        <div data-scroll-area onWheel={(e) => e.stopPropagation()} style={{
          flex: 1, minHeight: 0, overflowY: 'auto', padding: columns === 3 ? '10px 32px 26px' : '10px 31px 26px',
          display: 'grid',
          gridTemplateColumns: columns === 3 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
          gap: columns === 3 ? 14 : 20,
          alignContent: 'start',
          overflowY: 'auto'
        }}>
          {PRIRODA_SUB.map((s) =>
          <window.ScaleTile key={s.id} design={columns === 3 ? 99 : 154}>
            <SubTile sub={s} dark={dark} compact={columns === 3} active={s.id === 'zivocichy'} />
          </window.ScaleTile>
          )}
        </div>
      </div>
    </PhoneFrame>);

}

function SubTile({ sub, dark, compact, active }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const tileBg = dark ? p.darkSurf : sub.bg;
  const tileAccent = dark ? p.skyDeep : sub.color;
  return (
    <div style={{
      background: dark ? tileBg : TILE_GRADIENT,
      borderRadius: compact ? 20 : 24,
      padding: compact ? '10px 10px 8px' : '13px 13px 8px',
      position: 'relative', overflow: 'hidden',
      boxShadow: dark ? 'none' : `0 2px 4px 0px rgba(15,30,55,0.35)`,
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)',
      display: 'flex', flexDirection: 'column', gap: 8,
      width: '100%', height: '100%'
    }}>
      <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 4 }}>
        <SpeakerIcon size={compact ? 32 : 40} dotFill={tileAccent} shadow={false} circleBorder={true} />
      </div>

      {/* Emoji / image container */}
      <div style={{
        width: '100%', flexShrink: 0, borderRadius: compact ? 14 : 18,
        background: dark ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: compact ? 36 : 44,
        boxShadow: dark ? 'none' : `0 3px 8px ${tileAccent}22`,
        lineHeight: 1,
        aspectRatio: '3 / 2',
        minHeight: 0
      }}>
        {sub.img ?
        <img src={sub.img} alt={sub.name} style={{ width: '84%', height: '84%', objectFit: 'contain', display: 'block' }} /> :
        sub.emoji}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "0px 4px 4px", margin: "-4px 0px 0px" }}>
        <div style={{ ...{ ...{
              fontSize: sub.tinyLabel ? compact ? 11 : 12 : compact ? 13 : 16, fontWeight: 700,
              fontFamily: '"Dosis", sans-serif',
              color: dark ? ink : '#1A4040',
              textAlign: 'center',
              wordBreak: 'break-word', letterSpacing: sub.tinyLabel ? "-0.2px" : "-0.1px", lineHeight: sub.tinyLabel ? "1.1" : "1.1"
            }, fontSize: 16 }, fontSize: "16px" }}>{sub.name}</div>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// 5. TEST LIST
// ─────────────────────────────────────────────────────────────
function TestListScreen({ dark = false, expanded = false, columns = 2, age = 'all' }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf = dark ? p.darkSurf : p.surface;
  const active = age;
  const visibleTests = age === 'all' ? TESTS : TESTS.filter((t) => t.age === age);

  return (
    <PhoneFrame dark={dark} label={expanded ? "05c Vyber veku" : "05b Testy (dlaždice)"}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        position: 'relative',
        background: dark ?
        'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' :
        'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)'
      }}>
      <CategoryHero
          dark={dark}
          title="Živočíchy"
          img="uploads/zivocichy.png"
          imgNoBg={true}
          gradient="linear-gradient(160deg, #00A8B5 0%, #5DD8D2 45%, #C2EDD4 100%)"
          gradientDark="linear-gradient(135deg, #0E7A87 0%, #053D45 100%)"
          shadowColor="rgba(0,168,181,0.45)"
          accent="#4FB36A"
          ageIcon={active}
          ageActive={expanded}
          showSpeaker={true}
          speakerDot="#00A8B5"
          crumbs={['Alfík', 'Interaktívne cvičenia', 'Príroda', 'Živočíchy']} />
        

      <div data-scroll-area onWheel={(e) => e.stopPropagation()} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '10px 18px 0', position: 'relative' }}>
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: columns === 3 ? 10 : 14,
            alignContent: 'start',
            filter: expanded ? 'blur(1.5px)' : 'none',
            transition: 'filter 0.2s',
            paddingBottom: 14
          }}>
          {visibleTests.map((t, i) => <TestTile key={i} test={t} dark={dark} compact={columns === 3} />)}
        </div>
      </div>

      {expanded &&
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,30,55,0.10) 0%, rgba(15,30,55,0.16) 40%, rgba(15,30,55,0.26) 100%)',
          zIndex: 5,
          pointerEvents: 'none'
        }} />
        }

      {expanded && <AgePickerSheet dark={dark} active={active} />}
      </div>
    </PhoneFrame>);

}

function AgeFilter({ age, active, dark, all }) {
  const p = ALFIK_PALETTE;

  const config = all ?
  { stroke: '#3FA9E0', bg: '#D6ECF8', srcActive: 'assets/age_all_new.svg', srcInactive: 'assets/age_all_new.svg', label: 'Všetky', alt: 'všetky' } :
  {
    ...{
      '3-4': { stroke: '#FF8A65', bg: '#FFE3D6' },
      '4-5': { stroke: '#FFB400', bg: '#FFF3D6' },
      '5-6': { stroke: '#3DD9B0', bg: '#D9F8EF' }
    }[age],
    srcActive: { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[age],
    srcInactive: { '3-4': 'assets/age_3_4_inactive.svg', '4-5': 'assets/age_4_5_inactive.svg', '5-6': 'assets/age_5_6_inactive.svg' }[age],
    label: { '3-4': '3–4 r.', '4-5': '4–5 r.', '5-6': '5–6 r.' }[age],
    alt: age
  };

  const { srcActive, srcInactive, label, alt } = config;
  // Jednotná modrá farba pre všetky možnosti (ako pri "Všetky")
  const stroke = '#3FA9E0';
  const bg = '#D6ECF8';
  const src = srcActive;

  return (
    <div style={{
      position: 'relative',
      width: 78, borderRadius: 16,
      background: active ? bg : '#F4F6FA',
      border: active ? `2.5px solid ${stroke}` : '2.5px solid rgba(15,30,55,0.06)',
      padding: '8px 6px 6px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      boxShadow: 'none',
      transform: active ? 'scale(1.06)' : 'scale(1)',
      transition: 'transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease'
    }}>
      {/* left-edge selection bar — peeks toward the screen */}
      {active &&
      <div style={{
        position: 'absolute', left: -10, top: '50%',
        transform: 'translateY(-50%)',
        width: 5, height: 28, borderRadius: 3,
        background: stroke,
        boxShadow: `0 2px 6px -1px ${stroke}AA`
      }} />}

      {/* check badge top-right */}
      {active &&
      <div style={{
        position: 'absolute', top: -6, right: -6,
        width: 22, height: 22, borderRadius: '50%',
        background: stroke,
        border: '2px solid #FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 3px 6px -1px ${stroke}80`
      }}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>}

      <img
        src={src}
        style={{ width: 44, height: 44, objectFit: 'contain', filter: active ? 'none' : 'grayscale(1)', opacity: active ? 1 : 0.5, transition: 'filter .18s ease, opacity .18s ease' }}
        alt={alt} />
      <div style={{
        fontSize: 14, fontWeight: 800,
        color: active ? stroke : '#9AA4B5',
        letterSpacing: '-0.2px', fontFamily: '"Dosis", sans-serif',
        transition: 'color .18s ease'
      }}>{label}</div>
    </div>);

}

function KidAvatar() {return null;}

function AgePickerSheet({ dark, active }) {
  const p = ALFIK_PALETTE;
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 110,
      background: dark ? p.darkSurf : '#FFFFFF',
      padding: '18px 0',
      boxShadow: '-12px 0 32px -10px rgba(15,30,55,0.22)',
      borderLeft: dark ? `1.5px solid ${p.darkLine}` : '1px solid rgba(15,30,55,0.05)',
      zIndex: 10,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18
    }}>
      <AgeFilter dark={dark} all active={active === 'all'} />
      <AgeFilter dark={dark} age="3-4" active={active === '3-4'} />
      <AgeFilter dark={dark} age="4-5" active={active === '4-5'} />
      <AgeFilter dark={dark} age="5-6" active={active === '5-6'} />
    </div>);

}

function AgeBadge({ age, size = 40 }) {
  const src = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[age] || 'assets/age_all_new.svg';
  const img = size - 2;
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <img src={src} style={{ width: img, height: img, objectFit: 'contain' }} alt={age} />
    </div>);

}

function RatingIcon({ rating }) {
  const map = {
    great: 'assets/rating_great.svg',
    good: 'assets/rating_good.svg',
    ok: 'assets/rating_ok.svg'
  };
  if (!rating) {
    // empty space when not yet rated
    return <div style={{ width: 40, height: 40, flexShrink: 0 }} />;
  }
  const d = window.opticalSize(map[rating], 38);
  return (
    <div style={{ flexShrink: 0, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={map[rating]} style={{ width: 38, height: 38, objectFit: 'contain' }} alt={rating} />
    </div>);

}

function TestRow({ test, dark }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const surf = dark ? p.darkSurf : p.surface;
  const ageColors = {
    '3-4': { accent: '#FF8A65', bg: '#FFF1EC' },
    '4-5': { accent: '#FFB400', bg: '#FFFAEC' },
    '5-6': { accent: '#3DD9B0', bg: '#EDFDF7' }
  };
  const { accent, bg } = ageColors[test.age] || ageColors['4-5'];
  return (
    <div style={{
      background: dark ? surf : '#FFFFFF',
      borderRadius: 22, padding: '11px 12px',
      display: 'flex', alignItems: 'center', gap: 11,
      boxShadow: dark ?
      'none' :
      `0 2px 4px 0px rgba(15,30,55,0.35)`,
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)'
    }}>
      <AgeBadge age={test.age} />
      <button style={{
        width: 50, height: 50, borderRadius: 18, border: 'none', flexShrink: 0,
        background: `linear-gradient(135deg, ${(window.QUASAR || { primary: '#8FD400' }).primary} 0%, ${(window.QUASAR || { primaryDeep: '#72B600' }).primaryDeep} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M9 6.5v11l9-5.5z" />
        </svg>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 700, letterSpacing: '-0.2px',
          color: ink, lineHeight: 1.25,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          fontFamily: '"Dosis", sans-serif'
        }}>
          {test.name}
        </div>
      </div>
      <RatingIcon rating={test.rating} />
    </div>);

}

function TestTile({ test, dark, compact }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  // All tiles share the Živočíchy turquoise — only a subtle hue shift per age
  const agePalette = {
    '3-4': { accent: '#5DD3C8', deep: '#1F8F92' }, // svetlejší aqua
    '4-5': { accent: '#00A8B5', deep: '#0E7A87' }, // základná tyrkysová
    '5-6': { accent: '#0078A3', deep: '#054E6B' } // hlbšia modro-tyrkysová
  };
  const { accent, deep } = agePalette[test.age] || agePalette['4-5'];
  const ratingSrc = {
    great: 'assets/rating_great.svg',
    good: 'assets/rating_good.svg',
    ok: 'assets/rating_ok.svg'
  }[test.rating];
  const ageSrc = { '3-4': 'assets/age_3_4.svg', '4-5': 'assets/age_4_5.svg', '5-6': 'assets/age_5_6.svg' }[test.age];

  const tileBg = dark ? p.darkSurf : TILE_GRADIENT;

  return (
    <div style={{
      background: tileBg,
      borderRadius: compact ? 22 : 26,
      padding: compact ? '11px 10px' : '14px 13px',
      position: 'relative', overflow: 'hidden',
      boxShadow: dark ? 'none' : `0 2px 4px 0px rgba(15,30,55,0.35)`,
      border: dark ? `1.5px solid ${p.darkLine}` : '2px solid rgba(255,255,255,0.85)',
      minHeight: compact ? 122 : 188,
      display: 'flex', flexDirection: 'column', gap: 5
    }}>
      {/* Rating smiley — top-left when test was done (over preview corner) */}
      {ratingSrc &&
      <div style={{
        position: 'absolute', top: compact ? 8 : 10, left: compact ? 8 : 10, zIndex: 3,
        width: compact ? 28 : 34, height: compact ? 28 : 34,
        borderRadius: '50%',
        background: '#FFFFFF',
        boxShadow: '0 2px 5px rgba(15,30,55,0.28)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
          <img src={ratingSrc} alt={test.rating}
        style={{ width: compact ? 24 : 30, height: compact ? 24 : 30, objectFit: 'contain' }} />
        </div>
      }

      {/* Speaker badge */}
      <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 4 }}>
        <SpeakerIcon size={compact ? 32 : 40} dotFill={BRAND_TEAL} shadow={false} circleBorder={true} />
      </div>

      {/* Preview area with play overlay */}
      <div style={{
        width: '100%', flex: 1,
        borderRadius: compact ? 16 : 20,
        background: dark ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: dark ? 'none' : `0 3px 8px ${deep}22`,
        minHeight: compact ? 82 : 122,
        // diagonal-stripe placeholder when no preview
        backgroundImage: test.preview ? 'none' : dark ?
        `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 6px, transparent 6px 14px)` :
        `repeating-linear-gradient(45deg, ${accent}14 0 6px, transparent 6px 14px)`
      }}>
        {/* Preview image */}
        {test.preview &&
        <img
          src={test.preview} alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover'
          }} />

        }

        {/* Subtle dimming under the play button so it pops on any image */}
        {test.preview &&
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 55%)'
        }} />
        }

        {/* placeholder label only when no preview */}
        {!test.preview &&
        <div style={{
          position: 'absolute', bottom: 6, left: 8,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: compact ? 8 : 9, letterSpacing: 0.3,
          color: dark ? 'rgba(255,255,255,0.45)' : `${deep}99`,
          textTransform: 'uppercase'
        }}>náhľad</div>
        }

        {/* Rating smiley moved to tile top-left */}

        {/* Play button — centered */}
        <button style={{
          width: compact ? 44 : 54, height: compact ? 44 : 54,
          borderRadius: '50%', cursor: 'pointer',
          background: `linear-gradient(135deg, ${(window.QUASAR || { primary: '#8FD400' }).primary} 0%, ${(window.QUASAR || { primaryDeep: '#72B600' }).primaryDeep} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '3px solid #FFFFFF',
          boxShadow: `0 4px 12px -2px rgba(114,182,0,0.55), 0 0 0 2px rgba(15,30,55,0.05)`,
          position: 'relative', zIndex: 1
        }}>
          <svg width={compact ? 26 : 32} height={compact ? 26 : 32} viewBox="0 0 24 24"
          fill="#fff" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
          style={{ marginLeft: 2 }}>
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
        </button>
      </div>

      {/* Bottom row: age badge + test name */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        padding: '6px 4px',
        minHeight: compact ? 24 : 28
      }}>
        <img src={ageSrc} alt={test.age}
        style={{
          width: compact ? 22 : 28, height: compact ? 22 : 28,
          objectFit: 'contain', flexShrink: 0,
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
        }} />
        <div style={{
          width: '100%',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: '"Dosis", sans-serif',
          letterSpacing: '-0.1px',
          color: dark ? ink : '#1A4040',
          lineHeight: 1.2,
          textAlign: 'center',
          textWrap: 'pretty',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {test.name}
        </div>
      </div>
    </div>);
}

Object.assign(window, { TESTS, CategoryTreeScreen, CategoryTreeContent, SubcategoryScreen, PrirodaScreen, TestListScreen, ProfileMenuScreen, CategoryHero, Breadcrumbs, SubTile, ProfileAvatar, TopBar, AgePickerSheet, AgeFilter, SpeakerIcon });

// ─────────────────────────────────────────────────────────────
// PROFILE DRAWER (extracted, for use as overlay over any screen)
// ─────────────────────────────────────────────────────────────
function ProfileDrawer({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const surf = dark ? p.darkSurf : '#FFFFFF';
  const line = dark ? p.darkLine : 'rgba(15,30,55,0.08)';
  const headerBg = dark ? '#1A2E50' : '#D1EBF9';
  const neg = (window.QUASAR || {}).negative || '#E0463A';

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, bottom: 0,
      width: 265,
      background: surf,
      boxShadow: '12px 0 32px -10px rgba(15,30,55,0.28)',
      zIndex: 10,
      display: 'flex', flexDirection: 'column'
    }}>

      {/* ── Header: logo + meno ── */}
      <div style={{
        background: headerBg,
        padding: '18px 20px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
        borderBottom: `1px solid ${line}`
      }}>
        <img src="assets/logo_edu_alf.svg" alt="AlfEdu"
        style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: ink, fontFamily: '"Dosis", sans-serif', letterSpacing: '-0.3px', lineHeight: 1.1 }}>EduAlf</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: inkSoft, marginTop: 2 }}>Učím sa hrou</div>
        </div>
      </div>

      {/* ── Menu položky ── */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 8, flex: 1 }}>
        <MenuRow dark={dark}
        icon={<img src="assets/alfbook_logo.svg" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />}
        label="AlfBook" />
        <MenuRow dark={dark}
        icon={<img src="assets/alfik_logo.svg" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />}
        label="Alfík" />
        <div style={{ height: 1, background: line, margin: '6px 20px' }} />
        <MenuRow dark={dark}
        icon={
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>}
        label="Môj profil" />
        <MenuRow dark={dark}
        icon={
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1-.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
            </svg>}
        label="Nastavenia" />
        <MenuRow dark={dark}
        icon={
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>}
        label="O aplikácii" />
      </div>

      {/* ── Odhlásiť sa ── */}
      <div style={{ borderTop: `1px solid ${line}`, paddingBottom: 80 }}>
        <MenuRow dark={dark} danger
        icon={
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={neg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
            </svg>}
        label="Odhlásiť sa" />
      </div>
    </div>);

}

window.ProfileDrawer = ProfileDrawer;

// ─────────────────────────────────────────────────────────────
// PROFILE DRAWER V2 — interaktívne bočné menu (Alfík kontext)
// ─────────────────────────────────────────────────────────────
const DRAWER_LANGS = [
{ code: 'sk', name: 'Slovenčina' },
{ code: 'cz', name: 'Čeština' },
{ code: 'en', name: 'Angličtina' },
{ code: 'de', name: 'Nemčina' },
{ code: 'hu', name: 'Maďarčina' },
{ code: 'ua', name: 'Ukrajčina' }];


function LangFlag({ code }) {
  const base = { width: 24, height: 16, borderRadius: 3, overflow: 'hidden', position: 'relative', flexShrink: 0, boxShadow: '0 0 0 1px rgba(15,30,55,0.10)' };
  const stripes = (cols) =>
  <div style={{ ...base }}>
      {cols.map((c, i) => <div key={i} style={{ height: 100 / cols.length + '%', background: c }} />)}
    </div>;

  if (code === 'sk') return (
    <div style={base}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ height: '33.34%', background: '#FFFFFF' }} />
        <div style={{ height: '33.33%', background: '#0B4EA2' }} />
        <div style={{ height: '33.33%', background: '#EE1C25' }} />
      </div>
      <svg viewBox="0 0 24 16" width="24" height="16" style={{ position: 'absolute', inset: 0 }}>
        <path d="M4 2.6 H10.5 V8 C10.5 11 7.25 12.6 7.25 12.6 C7.25 12.6 4 11 4 8 Z" fill="#EE1C25" stroke="#FFFFFF" strokeWidth="0.7" />
        <rect x="6.85" y="4" width="0.8" height="5.6" fill="#FFFFFF" />
        <rect x="6.1" y="5.1" width="2.3" height="0.7" fill="#FFFFFF" />
        <rect x="5.7" y="6.5" width="3.1" height="0.7" fill="#FFFFFF" />
      </svg>
    </div>);

  if (code === 'de') return stripes(['#000000', '#DD0000', '#FFCE00']);
  if (code === 'hu') return stripes(['#CD2A3E', '#FFFFFF', '#436F4D']);
  if (code === 'ua') return stripes(['#0057B7', '#FFD700']);
  if (code === 'cz') return (
    <div style={base}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ height: '50%', background: '#FFFFFF' }} /><div style={{ height: '50%', background: '#D7141A' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #11457E' }} />
    </div>);

  if (code === 'en') return (
    <div style={base}>
      <svg viewBox="0 0 24 16" width="24" height="16" style={{ display: 'block' }}>
        <rect width="24" height="16" fill="#012169" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="3.2" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.4" />
        <rect x="9" y="0" width="6" height="16" fill="#FFFFFF" />
        <rect x="0" y="5" width="24" height="6" fill="#FFFFFF" />
        <rect x="10.2" y="0" width="3.6" height="16" fill="#C8102E" />
        <rect x="0" y="6.2" width="24" height="3.6" fill="#C8102E" />
      </svg>
    </div>);

  return null;
}

function DrawerRowV2({ icon, label, danger, active, onClick, dark }) {
  const p = ALFIK_PALETTE;
  const INK = dark ? p.darkInk : '#1A2B3D';
  const NEG = (window.QUASAR || {}).negative || '#E5484D';
  const ACCENT = '#3FA9E0';
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 18,
      padding: '11px 22px', cursor: 'pointer', position: 'relative',
      background: active ? 'rgba(63,169,224,0.12)' : 'transparent'
    }}>
      {active && <div style={{ position: 'absolute', left: 0, top: 7, bottom: 7, width: 4, borderRadius: '0 4px 4px 0', background: ACCENT }} />}
      <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: danger ? 700 : 600, color: danger ? NEG : INK, flex: 1 }}>{label}</div>
    </div>);

}

function ProfileDrawerV2({
  dark = false,
  onEduAlf, onAlfBook, onAlfik, onHistoria,
  onProfil, onAdmin, onPodpora, onAbout, onLogout, onNastavenia,
  lang: langProp, onLang, product = 'alfik'
}) {
  const p = ALFIK_PALETTE;
  const INK = dark ? p.darkInk : '#1A2B3D';
  const INK_SOFT = dark ? p.darkInkSoft : '#6A7A8F';
  const INK_MUTE = dark ? '#7C8DA0' : '#9AA8B8';
  const LINE = dark ? p.darkLine : 'rgba(15,30,55,0.08)';
  const SURF = dark ? p.darkSurf : '#FFFFFF';
  const STRIP = dark ? '#1F4570' : '#D1EBF9';
  const ACCENT = '#3FA9E0';
  const NEG = (window.QUASAR || {}).negative || '#E5484D';
  const [openLang, setOpenLang] = React.useState(false);
  const [langState, setLangState] = React.useState('sk');
  const lang = langProp != null ? langProp : langState;
  const setLang = (code) => {if (onLang) onLang(code);else setLangState(code);};

  return (
    <div onClick={(e) => e.stopPropagation()} style={{
      position: 'absolute', top: 0, left: 0, bottom: 0, width: 256,
      background: SURF, boxShadow: '14px 0 36px -12px rgba(15,30,55,0.32)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* EduAlf header */}
      <div onClick={onEduAlf} style={{
        background: STRIP, padding: '18px 22px 16px',
        display: 'flex', alignItems: 'center', gap: 14, borderBottom: `1px solid ${LINE}`, cursor: 'pointer'
      }}>
        <img src="assets/logo_edu_alf.svg" alt="EduAlf" style={{ width: 48, height: 48, objectFit: 'contain', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: INK, fontFamily: '"Dosis", sans-serif', letterSpacing: '-0.2px', lineHeight: 1 }}>EduAlf</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK_SOFT, marginTop: 3 }}>Učím sa hrou</div>
        </div>
      </div>

      {/* Produkty */}
      <div style={{ paddingTop: 8 }}>
        {(() => {
          const HistoriaRow = (
            <div onClick={onHistoria} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 22px 9px 30px', cursor: 'pointer' }}>
              <div style={{ width: 14, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 2, height: 20, background: 'rgba(15,30,55,0.12)', borderRadius: 2 }} />
              </div>
              <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.2, color: '#41526A', flex: 1 }}>História</div>
            </div>
          );
          const isAlfBook = product === 'alfbook';
          return (
            <React.Fragment>
              <DrawerRowV2 dark={dark} label="AlfBook" active={isAlfBook} onClick={onAlfBook}
              icon={<img src="assets/alfbook_logo.svg" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />} />
              {isAlfBook && HistoriaRow}
              <DrawerRowV2 dark={dark} label="Alfík" active={!isAlfBook} onClick={onAlfik}
              icon={<img src="assets/alfik_logo.svg" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />} />
              {!isAlfBook && HistoriaRow}
            </React.Fragment>
          );
        })()}
      </div>

      <div style={{ height: 1, background: LINE, margin: '6px 22px' }} />

      {/* Spodná skupina (hneď pod vrchnou) */}
      <div style={{ paddingTop: 2 }}>
        <DrawerRowV2 dark={dark} label="Môj profil" onClick={onProfil}
        icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>} />
        <DrawerRowV2 dark={dark} label="Nastavenia" onClick={onNastavenia}
        icon={<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>} />
        <DrawerRowV2 dark={dark} label="Administrácia" onClick={onAdmin}
        icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.3-2.9 8.2-7 9.4C7.9 19.2 5 15.3 5 11V6l7-3z" /><path d="M9.2 12l1.9 1.9 3.7-3.8" /></svg>} />
        <DrawerRowV2 dark={dark} label="Podpora" onClick={onPodpora}
        icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" /><path d="M12 17h.01" /></svg>} />
        <DrawerRowV2 dark={dark} label="O EduAlf" onClick={onAbout}
        icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>} />
      </div>

      {/* spacer */}
      <div style={{ flex: 1 }} />

      {/* Odhlásiť sa (dole) */}
      <div style={{ borderTop: `1px solid ${LINE}`, paddingBottom: 40, paddingTop: 4 }}>
        <DrawerRowV2 dark={dark} label="Odhlásiť sa" danger onClick={onLogout}
        icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={NEG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>} />
      </div>
    </div>);

}

window.ProfileDrawerV2 = ProfileDrawerV2;


// ─────────────────────────────────────────────────────────────
// NASTAVENIA — samostatný screen (výber jazyka)
// ─────────────────────────────────────────────────────────────
function NastaveniaScreen({ dark = false, lang = 'sk', onLang }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const LINE = dark ? p.darkLine : 'rgba(15,30,55,0.08)';
  const SURF = dark ? p.darkSurf : '#FFFFFF';
  const accent = (window.QUASAR && window.QUASAR.primary) || '#8FD400';
  const ACTIVE_BLUE = '#3FA9E0';
  const [open, setOpen] = React.useState(false);
  const selected = DRAWER_LANGS.find(l => l.code === lang) || DRAWER_LANGS[0];

  return (
    <PhoneFrame dark={dark} label="Nastavenia">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)',
        overflow: 'hidden'
      }}>
        {/* Topbar: späť + centrovaný titulok */}
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          padding: '6px 18px 14px', minHeight: 58
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', fontSize: 19, fontWeight: 800,
            letterSpacing: '-0.2px', fontFamily: '"Dosis", sans-serif', color: ink
          }}>Nastavenia</div>
          <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
            <button title="Späť" style={{
              width: 38, height: 38, borderRadius: 14, border: 'none',
              background: 'transparent', display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: 0, flexShrink: 0, cursor: 'pointer'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={dark ? '#F2F7FB' : '#1A2B3D'} strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div style={{ flex: 1 }} />
        </div>

        <div data-scroll-area style={{ flex: 1, overflowY: 'auto', padding: '6px 16px 24px' }}>
          {/* Sekcia: Jazyk */}
          <div style={{
            fontSize: 19, fontWeight: 800, color: ink,
            fontFamily: '"Dosis", sans-serif', letterSpacing: '-0.2px', marginBottom: 10
          }}>Jazyk aplikácie</div>

          {/* Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              data-lang-trigger
              onClick={() => setOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: SURF, borderRadius: 14, padding: '14px 16px', cursor: 'pointer',
                border: `1.5px solid ${open ? ACTIVE_BLUE : LINE}`,
                boxShadow: dark ? 'none' : '0 2px 4px 0 rgba(15,30,55,0.06)'
              }}>
              <LangFlag code={selected.code} />
              <div style={{
                flex: 1, fontSize: 15, fontWeight: 800, color: ink,
                fontFamily: '"Dosis", sans-serif'
              }}>{selected.name}</div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={inkSoft} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {open && (
              <div style={{
                marginTop: 8, background: SURF, borderRadius: 14, overflow: 'hidden',
                border: dark ? `1px solid ${p.darkLine}` : 'none',
                boxShadow: '0 8px 24px -6px rgba(15,30,55,0.22)'
              }}>
                {DRAWER_LANGS.map((l, i) => {
                  const active = l.code === lang;
                  return (
                    <div key={l.code}
                      data-lang-row={l.code}
                      onClick={() => { onLang && onLang(l.code); setOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '13px 16px', cursor: 'pointer',
                        borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                        background: active ? '#FFFFFF' : 'transparent'
                      }}>
                      <LangFlag code={l.code} />
                      <div style={{
                        flex: 1, fontSize: 15, fontWeight: active ? 800 : 600,
                        color: active ? ink : inkSoft, fontFamily: '"Dosis", sans-serif'
                      }}>{l.name}</div>
                      {active && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                          stroke={ACTIVE_BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>);

}

window.NastaveniaScreen = NastaveniaScreen;


// ─────────────────────────────────────────────────────────────
// 03b · MENU PROFILU (drawer over Kategórie)
// ─────────────────────────────────────────────────────────────
function ProfileMenuScreen({ dark = false, columns = 2 }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const surf = dark ? p.darkSurf : '#FFFFFF';
  const line = dark ? p.darkLine : 'rgba(15,30,55,0.08)';
  const stripBg = dark ? '#1F4570' : '#D1EBF9';

  return (
    <PhoneFrame dark={dark} label="03b Menu profilu">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        position: 'relative'
      }}>
        {/* Výber produktu v pozadí (rozmazaný) */}
        <div style={{ position: 'absolute', inset: 0, filter: 'blur(2px)', opacity: 0.7, pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
          <window.ProductChoiceContent dark={dark} />
        </div>

        {/* Overlay pozadia */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15,30,55,0.18)',
          zIndex: 5
        }} />

        {/* Drawer — zjednotené s prototypom (ProfileDrawerV2) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <window.ProfileDrawerV2 dark={dark} />
        </div>
      </div>
    </PhoneFrame>);

}

function MenuRow({ icon, label, dark, danger, active }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const accent = dark ? '#7FB8E8' : '#2D6FB5';
  const color = danger ? (window.QUASAR || { negative: '#E0463A' }).negative : active ? accent : ink;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      padding: '14px 22px',
      cursor: active ? 'default' : 'pointer',
      position: 'relative'
    }}>
      <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ fontSize: 16, fontWeight: danger ? 700 : active ? 700 : 600, color, fontFamily: '"Dosis", sans-serif', flex: 1 }}>{label}</div>
      {active &&
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      }
    </div>);

}