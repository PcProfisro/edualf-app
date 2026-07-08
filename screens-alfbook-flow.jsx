// ─────────────────────────────────────────────────────────────
// ALFBOOK FLOW — Ročníky → Predmety → Témy → Obsah
// Pozadie: rovnaké ako Alfík (svetlomodré)
// Dlaždice: biele emoji boxy, AlfBook červená tile
// Obsah: Alfík-štýl zoznam (bez filtra veku)
// ─────────────────────────────────────────────────────────────
(function () {

// ── AlfBook paleta ──
const AB = {
  bg:         'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)',
  tileBg:     'linear-gradient(180deg, #141F5E 0%, #253B8C 45%, #4468C8 100%)',
  red:        '#A61B1D',
  redDeep:    '#7A1315',
  accent:     '#3FA9E0',
  ink:        '#1A2B3D',
  inkSoft:    '#4A5B6E',
  inkMute:    '#8194A8',
  tileBorder: '#FFFFFF',
  heroGrad:   'linear-gradient(155deg, #141F5E 0%, #253B8C 45%, #4468C8 100%)',
  modalBg:    '#FFFFFF',
  surf:       '#FFFFFF',
};

// ── Dáta ──
const AB_ROCNIKY = [
  { id: 'r1',    label: '1.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(56)-f80f7350.png' },
  { id: 'r2',    label: '2.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(57)-4b62efde.png' },
  { id: 'r3',    label: '3.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(58)-6babf0c7.png' },
  { id: 'r4',    label: '4.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(59)-9502bf2c.png' },
  { id: 'r5',    label: '5.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(60).png' },
  { id: 'r6',    label: '6.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(61).png' },
  { id: 'r7',    label: '7.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(62).png' },
  { id: 'r8',    label: '8.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(63).png' },
  { id: 'r9',    label: '9.ročník', img: 'uploads/Bez%20n%C3%A1zvu%20-%20k%C3%B3pia%20(800%20x%20800%20px)%20(64).png' },
];

const AB_PREDMETY = [
  { id: 'sj',  label: 'Slovenský jazyk',   emoji: '📖' },
  { id: 'mat', label: 'Matematika',         emoji: '🔢' },
  { id: 'aj',  label: 'Anglický jazyk',     emoji: '🇬🇧' },
  { id: 'nj',  label: 'Nemecký jazyk',      emoji: '🇩🇪' },
  { id: 'rj',  label: 'Ruský jazyk',        emoji: '🇷🇺' },
  { id: 'bio', label: 'Biológia',           emoji: '🧬' },
  { id: 'geo', label: 'Geografia',          emoji: '🌍' },
  { id: 'dej', label: 'Dejepis',            emoji: '🏛️' },
  { id: 'lit', label: 'Literatúra',         emoji: '📚' },
  { id: 'nab', label: 'Náboženstvo',        emoji: '✝️' },
  { id: 'dv',  label: 'Dopravná výchova',   emoji: '🚲' },
];

const AB_TEMY_GEO = [
  { id: 't1', label: 'Atmosféra, činnosť vody',     emoji: '🌊' },
  { id: 't2', label: 'Zem vo vesmíre',               emoji: '🌍' },
  { id: 't3', label: 'Typy krajín',                  emoji: '🏔️' },
  { id: 't4', label: 'Sopky, zemetrasenia',          emoji: '🌋' },
  { id: 't5', label: 'Mapa a glóbus',                emoji: '🗺️' },
  { id: 't6', label: 'Pamiatky a stavby sveta',      emoji: '🗼' },
  { id: 't7', label: 'Objavovanie našej planéty',    emoji: '🔭' },
  { id: 't8', label: 'Záverečné opakovanie',         emoji: '📝' },
];

const AB_OBSAH_ZEM = [
  { id: 'o1', name: 'Pohyby Zeme',                           pct: 59, count: 2570, diamonds: 18 },
  { id: 'o2', name: 'Vesmír, pohyby a objavitelia Zeme',     pct: 70, count: 1835, diamonds: 24, nove: true },
  { id: 'o3', name: 'Slnečná sústava',                       pct: 45, count: 980,  diamonds: 15 },
  { id: 'o4', name: 'Hviezdy a súhvezdia',                   pct: 0,  count: 0,    diamonds: 0 },
];

const AB_DIAMONDS_CURRENT = 200;
const AB_MEDALS = [
  { id: 'bronze', label: 'Bronz',  accus: 'bronzovú',   gen: 'bronzu',   threshold: 155,  color: '#C47D3A', colorDark: '#8B5020', bg: 'linear-gradient(135deg, #F0A855 0%, #C47D3A 100%)' },
  { id: 'silver', label: 'Striebro', accus: 'striebornú', gen: 'striebra', threshold: 310, color: '#8194A8', colorDark: '#4A5B6E', bg: 'linear-gradient(135deg, #C8D0DC 0%, #8194A8 100%)' },
  { id: 'gold',   label: 'Zlato',  accus: 'zlatú',       gen: 'zlata',    threshold: 500,  color: '#D4A017', colorDark: '#9A7000', bg: 'linear-gradient(135deg, #FFD84D 0%, #D4A017 100%)' },
];

// ─────────────────────────────────────────────────────────────
// DiamondIcon — inline SVG diamant
// ─────────────────────────────────────────────────────────────
function DiamondIcon({ size = 14, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'block' }}>
      <path d="M6 3h12l4 6-10 13L2 9z"/>
      <path d="M2 9h20M6 3l4 6m4 0l4-6m-8 0v6" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// MedalProgressSection — kompaktný pás s progress
// ─────────────────────────────────────────────────────────────
function MedalProgressSection({ current = AB_DIAMONDS_CURRENT }) {
  const nextMedal = AB_MEDALS.find(m => current < m.threshold) || AB_MEDALS[AB_MEDALS.length - 1];
  const prevThreshold = AB_MEDALS[AB_MEDALS.indexOf(nextMedal) - 1]?.threshold || 0;
  const pct = Math.min(100, ((current - prevThreshold) / (nextMedal.threshold - prevThreshold)) * 100);
  const toNext = nextMedal.threshold - current;

  return (
    <div style={{ margin: '-4px 14px 10px', background: '#FFFFFF', borderRadius: 12, padding: '8px 12px', boxShadow: '0 2px 5px rgba(15,30,55,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Diamanty */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        <DiamondIcon size={13} color="#A61B1D" />
        <span style={{ fontSize: 13, fontWeight: 800, color: '#1A2B3D', fontFamily: '"Dosis", sans-serif' }}>{current}</span>
      </div>

      {/* Progress bar */}
      <div style={{ flex: 1, height: 6, borderRadius: 999, background: '#E4EBF2', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #7A1315 0%, #A61B1D 100%)', borderRadius: 999 }} />
      </div>

      {/* Ďalšia medaila */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: nextMedal.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 6px ${nextMedal.color}55` }}>
          <svg width="15" height="15" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="20" r="9" fill="rgba(255,255,255,0.30)" stroke="rgba(255,255,255,0.70)" strokeWidth="1.5"/>
            <path d="M11 7h10l2 6H9z" fill="rgba(255,255,255,0.50)"/>
            <rect x="13" y="13" width="6" height="2.5" rx="1" fill="rgba(255,255,255,0.40)"/>
            <path d="M13.5 20l2 2.5L18.5 17" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#4A5B6E', fontFamily: '"Dosis", sans-serif', whiteSpace: 'nowrap' }}>ešte <strong style={{ color: nextMedal.colorDark }}>{toNext}</strong></span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AbLogo — AlfBook logo badge
// ─────────────────────────────────────────────────────────────
function AbLogo() {
  return (
    <span style={{
      fontFamily: '"Dosis", sans-serif',
      fontWeight: 800,
      fontSize: 19,
      letterSpacing: '-0.2px',
      color: '#1A2B3D',
      lineHeight: 1,
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="#1A2B3D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/>
      </svg>
      AlfBook
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// AbTopBar — svetlý, AlfBook logo v strede, bez filtra veku
// ─────────────────────────────────────────────────────────────
function AbTopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '6px 18px 14px',
      minHeight: 58,
      position: 'relative',
    }}>
      {/* Hamburger */}
      <button style={{
        width: 38, height: 38, border: 'none', background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, cursor: 'pointer', padding: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={AB.ink} strokeWidth="2.4" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Logo — absolútne centrované (rovnaký štýl ako Alfík) */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <AbLogo />
      </div>

      <div style={{ flex: 1 }} />
      {/* — žiadny filter veku — */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AbHero — červený hero banner s titulkom + breadcrumbs
// ─────────────────────────────────────────────────────────────
function AbHero({ title, emoji, img, crumbs = [], diamonds = null }) {
  const [openMedal, setOpenMedal] = React.useState(null);
  return (
    <div>
      <AbTopBar />
      <div style={{ padding: '0 14px 12px', position: 'relative' }}>
        {/* Cieľová medaila — len na poslednom baneri (s diamantmi), jemne prečnieva za horný okraj */}
        {diamonds !== null && (
          <img src="uploads/madaila bronzova.png" alt="Medaila"
            style={{ position: 'absolute', right: 4, top: -14, width: 96, height: 'auto', zIndex: 2, pointerEvents: 'none', transform: 'rotate(9deg)', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.28))' }} />
        )}
        <div style={{
          background: AB.heroGrad,
          borderRadius: 16,
          padding: '8px 18px 14px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Dekoratívne kruhy */}
          <div style={{ position: 'absolute', right: -28, top: -28, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 60, bottom: -28, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

          {/* Breadcrumbs — vždy viditeľné, min. "AlfBook" */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            fontSize: 12, fontWeight: 700,
            color: 'rgba(255,255,255,0.90)',
            marginBottom: 10, flexWrap: 'wrap',
            position: 'relative', zIndex: 1,
            minHeight: 16,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.90)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              style={{ display: 'block' }}>
              <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/>
            </svg>
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.60)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6"/>
                </svg>
                <span style={{ opacity: i === crumbs.length - 1 ? 1 : 0.78 }}>{c}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Titulok riadok */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            position: 'relative', zIndex: 1,
          }}>
            {/* Späť */}
            <button style={{
              width: 30, height: 30, borderRadius: 8, border: 'none',
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0, cursor: 'pointer', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={AB.redDeep} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Titulok */}
            <div style={{
              fontFamily: '"Dosis", sans-serif',
              fontWeight: 700, fontSize: 22,
              color: '#FFFFFF',
              letterSpacing: '-0.3px',
              textShadow: '0 2px 6px rgba(0,0,0,0.22)',
              flex: 1,
            }}>
              {title}
            </div>
          </div>

          {/* Diamond progress — len ak je zadaný */}
          {diamonds !== null && (() => {
            const goldT = AB_MEDALS[AB_MEDALS.length - 1].threshold;
            const nextMedal = AB_MEDALS.find(m => diamonds < m.threshold) || AB_MEDALS[AB_MEDALS.length - 1];
            const toNext = Math.max(0, nextMedal.threshold - diamonds);
            const fillFrac = Math.min(1, diamonds / goldT);
            const MedalCoin = ({ size, bg, state }) => (
              <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: state === 'future' ? 0.4 : 0.95 }}>
                {state === 'reached' ? (
                  <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7"/>
                  </svg>
                ) : (
                  <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="11" fill="rgba(255,255,255,0.24)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6"/>
                    <path d="M16 9.5l4.5 3.5-1.8 6.5h-5.4L11.5 13z" fill="rgba(255,255,255,0.85)"/>
                  </svg>
                )}
              </div>
            );
            return (
              <div style={{ position: 'relative', zIndex: 1, marginTop: 11, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <DiamondIcon size={11} color="rgba(255,255,255,0.85)" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.92)', fontFamily: '"Dosis", sans-serif' }}>{diamonds}</span>
                  </div>
                  <div style={{ position: 'relative', flex: 1, height: 16 }}>
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.20)' }} />
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: `calc(7px + (100% - 14px) * ${fillFrac})`, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.8)' }} />
                    {AB_MEDALS.map(m => {
                      const frac = m.threshold / goldT;
                      const reached = diamonds >= m.threshold;
                      const isNext = m.id === nextMedal.id;
                      const state = reached ? 'reached' : (isNext ? 'next' : 'future');
                      const sz = isNext ? 15 : 13;
                      return (
                        <button key={m.id} onClick={() => setOpenMedal(openMedal === m.id ? null : m.id)}
                          style={{ position: 'absolute', top: '50%', left: `calc(7px + (100% - 14px) * ${frac})`, transform: 'translate(-50%,-50%)', zIndex: openMedal === m.id ? 3 : (isNext ? 2 : 1), padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '50%', boxShadow: openMedal === m.id ? '0 0 0 3px rgba(255,255,255,0.45)' : 'none' }}>
                          <div style={{ borderRadius: '50%', border: `1.5px solid ${isNext || openMedal === m.id ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}` }}>
                            <MedalCoin size={sz} bg={m.bg} state={state} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0, fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: '"Dosis", sans-serif', whiteSpace: 'nowrap' }}>
                    <DiamondIcon size={10} color="rgba(255,255,255,0.6)" />
                    <span>{goldT}</span>
                  </div>
                </div>
                {/* Hláška po kliknutí na míľnik */}
                {openMedal && (() => {
                  const m = AB_MEDALS.find(x => x.id === openMedal);
                  const has = diamonds >= m.threshold;
                  const rem = m.threshold - diamonds;
                  return (
                    <div style={{ marginTop: 9, background: '#FFFFFF', borderRadius: 12, padding: '7px 11px', boxShadow: '0 3px 8px rgba(0,0,0,0.18)', fontSize: 12, fontWeight: 700, color: '#1A2B3D', fontFamily: '"Dosis", sans-serif', lineHeight: 1.35, textAlign: 'center', textWrap: 'balance' }}>
                      {has ? (
                        <span>{m.accus.charAt(0).toUpperCase() + m.accus.slice(1)} medailu už máš 🎉</span>
                      ) : (
                        <span>
                          Získaj ešte <strong style={{ color: '#A61B1D' }}>{rem}</strong>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#A61B1D" style={{ display: 'inline-block', verticalAlign: '-2px', margin: '0 3px' }}>
                            <path d="M6 3h12l4 6-10 13L2 9z"/>
                            <path d="M2 9h20M6 3l4 6m4 0l4-6m-8 0v6" fill="none" stroke="#A61B1D" strokeWidth="1.5" strokeLinejoin="round"/>
                          </svg>
                          a dosiahneš {m.accus} medailu
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AbTile — dlaždica BEZ zvukovej ikony, biele emoji pole
// ─────────────────────────────────────────────────────────────
function AbTile({ item, compact = false }) {
  return (
    <div style={{
      background: AB.tileBg,
      borderRadius: compact ? 20 : 24,
      padding: compact ? '10px 10px 8px' : '13px 13px 8px',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 2px 4px 0px rgba(15,30,55,0.35)',
      border: `2px solid ${AB.tileBorder}`,
      display: 'flex', flexDirection: 'column', gap: 8,
      height: '100%',
    }}>
      {/* Emoji / ikona — BIELE pozadie rovnako ako v Alfíkovi */}
      <div style={{
        width: '100%', flexShrink: 0,
        borderRadius: compact ? 12 : 16,
        background: '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: compact ? 30 : 40,
        height: compact ? '70px' : '83px',
        lineHeight: 1,
        boxShadow: '0 3px 8px rgba(20,50,150,0.28)',
      }}>
        {item.img
          ? <img src={item.img} alt={item.label} style={{ width: '84%', height: '84%', objectFit: 'contain', display: 'block' }} />
          : item.emoji
        }
      </div>

      {/* Label */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: compact ? '2px 4px 5px' : '3px 4px 6px',
      }}>
        <div style={{
          fontSize: 16, fontWeight: 700,
          fontFamily: '"Dosis", sans-serif',
          color: '#FFFFFF',
          textAlign: 'center',
          wordBreak: 'break-word',
          letterSpacing: '-0.1px',
          lineHeight: 1.1,
          textShadow: '0 1px 4px rgba(0,0,0,0.30)',
        }}>
          {item.label}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AbGrid — spoločná mriežka dlaždíc
// ─────────────────────────────────────────────────────────────
function AbGrid({ items, compact = false }) {
  const cols = compact ? 3 : 2;
  const tileSize = compact ? 99 : 154;
  const gap = compact ? 14 : 20;
  return (
    <div
      data-scroll-area
      onWheel={e => e.stopPropagation()}
      style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        padding: compact ? '10px 32px 26px' : '10px 31px 26px',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap,
        alignContent: 'start',
      }}
    >
      {items.map(item => (
        <window.ScaleTile key={item.id} design={tileSize}>
          <AbTile item={item} compact={compact} />
        </window.ScaleTile>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// fade masku aplikuj podľa scrollu — hore len keď je zascrolované
function abFadeMask(el) {
  if (!el) return;
  const atTop = el.scrollTop <= 2;
  const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
  const top = atTop ? '0px' : '22px';
  const bot = atBottom ? '100%' : 'calc(100% - 26px)';
  const g = 'linear-gradient(to bottom, transparent 0, #000 ' + top + ', #000 ' + bot + ', transparent 100%)';
  el.style.webkitMaskImage = g;
  el.style.maskImage = g;
}

// AbObsahRow — plochý zoznam testov (štýl ako učiteľský zoznam v Alfíkovi)
//   materiálová ikona · názov + meta · progress
// ─────────────────────────────────────────────────────────────
function AbObsahRow({ item, alt, isLast }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 12,
      minHeight: 62, paddingTop: 8, paddingBottom: 8, paddingRight: 14,
      paddingLeft: 26,
      background: alt ? 'rgba(246,249,252,0.9)' : '#FFFFFF',
      borderBottom: isLast ? 'none' : '1px solid #E4EBF2',
    }}>
      {/* Typ materiálu — interaktívny test */}
      <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <img src="assets/mat_interaktivny.svg" alt="Interaktívny test" title="Interaktívny test"
          style={{ height: 27, width: 'auto', display: 'block' }} />
      </div>

      {/* Stred: názov */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 600, fontSize: 14,
          color: '#1A2B3D', letterSpacing: '-0.1px', lineHeight: 1.2, minWidth: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.name}
        </div>
      </div>

      {/* Pravá strana: percentá + diamanty pod sebou */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 52 }}>
        {item.count > 0 && (
          <div style={{
            background: AB.tileBg,
            borderRadius: 8, padding: '3px 7px',
            fontSize: 12, fontWeight: 800,
            fontFamily: '"Dosis", sans-serif',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}>
            {item.pct}%
          </div>
        )}
        {item.diamonds > 0 && (
          <span style={{
            display: 'flex', alignItems: 'center', gap: 3,
            fontFamily: '"Dosis", sans-serif', fontWeight: 700, fontSize: 11.5,
            color: '#7A1315', whiteSpace: 'nowrap',
          }}>
            <DiamondIcon size={12} color="#A61B1D" />{item.diamonds}
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen AB-01: Ročníky
// ─────────────────────────────────────────────────────────────
function AbRocnikyScreen({ compact = false }) {
  return (
    <PhoneFrame dark={false} label="AB-01 Ročníky">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: AB.bg }}>
        <AbTopBar />
        <AbGrid items={AB_ROCNIKY} compact={compact} />
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen AB-02: Predmety (ukážka: 5.ročník)
// ─────────────────────────────────────────────────────────────
function AbPredmetyScreen({ compact = false }) {
  return (
    <PhoneFrame dark={false} label="AB-02 Predmety">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: AB.bg }}>
        <AbHero title="5.ročník" emoji="5️⃣" crumbs={[]} />
        <AbGrid items={AB_PREDMETY} compact={compact} />
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen AB-03: Témy (ukážka: Geografia)
// ─────────────────────────────────────────────────────────────
function AbTemyScreen({ compact = false }) {
  return (
    <PhoneFrame dark={false} label="AB-03 Témy">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: AB.bg }}>
        <AbHero title="Geografia" emoji="🌍" crumbs={['5.ročník']} />
        <AbGrid items={AB_TEMY_GEO} compact={compact} />
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen AB-04: Obsah — Alfík-štýl zoznam
// ─────────────────────────────────────────────────────────────
function AbObsahScreen({ compact = false }) {
  return (
    <PhoneFrame dark={false} label="AB-04 Obsah">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: AB.bg }}>
        <AbHero title="Zem vo vesmíre" emoji="🌍" crumbs={['5.ročník', 'Geografia']} diamonds={AB_DIAMONDS_CURRENT} />

        {/* Zoznam testov — plochý, ako učiteľský zoznam */}
        <div
          data-scroll-area
          ref={abFadeMask}
          onScroll={e => abFadeMask(e.currentTarget)}
          onWheel={e => e.stopPropagation()}
          style={{
            flex: 1, minHeight: 0, overflowY: 'auto',
            padding: '10px 14px 26px',
          }}
        >
          <div style={{
            background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(15,30,55,0.10)', border: '1px solid #E4EBF2',
          }}>
            {AB_OBSAH_ZEM.map((item, i) => (
              <AbObsahRow key={item.id} item={item} alt={i % 2 === 1} isLast={i === AB_OBSAH_ZEM.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen AB-04B: Obsah — bez medaily a progres baru na hero baneri
// ─────────────────────────────────────────────────────────────
function AbObsahScreenNoMedal({ compact = false }) {
  return (
    <PhoneFrame dark={false} label="AB-04B Obsah">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: AB.bg }}>
        <AbHero title="Zem vo vesmíre" emoji="🌍" crumbs={['5.ročník', 'Geografia']} />

        {/* Zoznam testov — plochý, ako učiteľský zoznam */}
        <div
          data-scroll-area
          ref={abFadeMask}
          onScroll={e => abFadeMask(e.currentTarget)}
          onWheel={e => e.stopPropagation()}
          style={{
            flex: 1, minHeight: 0, overflowY: 'auto',
            padding: '10px 14px 26px',
          }}
        >
          <div style={{
            background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(15,30,55,0.10)', border: '1px solid #E4EBF2',
          }}>
            {AB_OBSAH_ZEM.map((item, i) => (
              <AbObsahRow key={item.id} item={item} alt={i % 2 === 1} isLast={i === AB_OBSAH_ZEM.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// AbObsahTeacherRow — učiteľská verzia riadku:
//   materiálová ikona · názov · Nové · (bez diamantov) · button História
// ─────────────────────────────────────────────────────────────
function AbObsahTeacherRow({ item, alt, isLast }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 12,
      minHeight: 62, paddingTop: 8, paddingBottom: 8, paddingRight: 14,
      paddingLeft: 26,
      background: alt ? 'rgba(246,249,252,0.9)' : '#FFFFFF',
      borderBottom: isLast ? 'none' : '1px solid #E4EBF2',
    }}>
      {/* Typ materiálu — interaktívny test */}
      <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <img src="assets/mat_interaktivny.svg" alt="Interaktívny test" title="Interaktívny test"
          style={{ height: 27, width: 'auto', display: 'block' }} />
      </div>

      {/* Stred: názov */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{
          fontFamily: '"Dosis", sans-serif', fontWeight: 600, fontSize: 14,
          color: '#1A2B3D', letterSpacing: '-0.1px', lineHeight: 1.2, minWidth: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.name}
        </div>
      </div>

      {/* Pravá strana: button História (ako na Alfíkovi) */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 44 }}>
        <button title="Výsledky" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: AB.redDeep, background: 'transparent',
          border: 'none', padding: 0, cursor: 'pointer', lineHeight: 1,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={AB.redDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16v5" />
            <path d="M16 14v7" />
            <path d="M20 10v11" />
            <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
            <path d="M4 18v3" />
            <path d="M8 14v7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen AB-04T: Obsah — učiteľská verzia
// ─────────────────────────────────────────────────────────────
function AbObsahTeacherScreen({ compact = false }) {
  return (
    <PhoneFrame dark={false} label="AB-04T Obsah — učiteľ">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: AB.bg }}>
        <AbHero title="Zem vo vesmíre" emoji="🌍" crumbs={['5.ročník', 'Geografia']} />

        {/* Zoznam testov — učiteľská verzia */}
        <div
          data-scroll-area
          ref={abFadeMask}
          onScroll={e => abFadeMask(e.currentTarget)}
          onWheel={e => e.stopPropagation()}
          style={{
            flex: 1, minHeight: 0, overflowY: 'auto',
            padding: '10px 14px 26px',
          }}
        >
          <div style={{
            background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(15,30,55,0.10)', border: '1px solid #E4EBF2',
          }}>
            {AB_OBSAH_ZEM.map((item, i) => (
              <AbObsahTeacherRow key={item.id} item={item} alt={i % 2 === 1} isLast={i === AB_OBSAH_ZEM.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────
window.AbRocnikyScreen = AbRocnikyScreen;
window.AbPredmetyScreen = AbPredmetyScreen;
window.AbTemyScreen = AbTemyScreen;
window.AbObsahScreen = AbObsahScreen;
window.AbObsahScreenNoMedal = AbObsahScreenNoMedal;
window.AbObsahTeacherScreen = AbObsahTeacherScreen;

})();
