// Alfík — mobile screens (modernized, playful)
// All screens share a viewport ~ 390×844 (iPhone-like), but design is platform-neutral.

// ─────────────────────────────────────────────────────────────
// QUASAR semantic tokens — single source of truth for interactive elements
// Tieto farby používa Quasar framework pre tlačidlá, polia, hlášky, prepínače.
// Vývojár ich vloží do quasar.config.js → framework → config → brand.
// ─────────────────────────────────────────────────────────────
const QUASAR = {
  primary: '#7DB800', // hlavné akcie (Vstúpiť, Uložiť, Začať kvíz), toolbar, focus inputu
  primaryDeep: '#5E9600', // hover/darker varianta pre gradienty
  secondary: '#D1EBF9', // pozadie obrazoviek, karty, sekcie (nie interaktívne)
  accent: '#3FA9E0', // prepínače, slidery, vybraný stav v listoch
  accentDeep: '#2190C0',
  dark: '#0E1622', // dark mode pozadie

  positive: '#21BA45', // úspech (správna odpoveď, dokončený test)
  negative: '#E5484D', // chyby (nevalidný email, zlá odpoveď, mazanie)
  info: '#6AB7F0', // informačné toasty, tipy
  warning: '#FFB400' // upozornenia (offline, nedokončený test)
};

const ALFIK_PALETTE = {
  // — Quasar semantic (mirror) —
  ...QUASAR,

  // — Dekoratívne (pozadia, sparkles, gradienty) — NIE interaktívne —
  sky: '#7CC4F0',
  skyDeep: '#3FA9E0',
  sun: '#FFC542',
  sunDeep: '#FF9F2D',
  coral: '#FF6B6B',
  mint: '#3DD9B0',
  grape: '#8B7CF6', // dekoratívna farba — neopakuje sa v UI

  // — Neutrály —
  ink: '#1A2B3D',
  inkSoft: '#4A5B6E',
  inkMute: '#8194A8',
  line: '#E4EBF2',
  bg: '#F2F7FB',
  surface: '#FFFFFF',
  // Dark mode
  darkBg: '#0E1622',
  darkSurf: '#1A2433',
  darkLine: '#2A3447',
  darkInk: '#F2F7FB',
  darkInkSoft: '#A8B6C8'
};

// Export to window so other screen files can pick them up
if (typeof window !== 'undefined') {
  window.QUASAR = QUASAR;
  window.ALFIK_PALETTE = ALFIK_PALETTE;
}

// ─────────────────────────────────────────────────────────────
// Shared chrome — phone-style frame (platform-neutral)
// ─────────────────────────────────────────────────────────────
function PhoneFrame({ children, dark = false, label, width = 390, height = 844 }) {
  const p = ALFIK_PALETTE;
  const bg = dark ? p.darkBg : p.bg;
  const ink = dark ? p.darkInk : p.ink;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', margin: "0px 0px 4px" }}>
    <div data-screen-label={label} style={{
        width, height, borderRadius: 44, background: bg, color: ink,
        position: 'relative', overflow: 'hidden',
        fontFamily: '"Dosis", "SF Pro", system-ui, sans-serif',
        boxShadow: '0 0 0 10px #0E1622, 0 0 0 12px #2A3447, 0 30px 60px -20px rgba(15,30,55,0.35)'
      }}>
      {/* status bar */}
      <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 44,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 28px 0', zIndex: 30,
          fontSize: 15, fontWeight: 700, color: ink
        }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <SignalIcon color={ink} />
          <WifiIcon color={ink} />
          <BatteryIcon color={ink} />
        </div>
      </div>
      {/* notch */}
      <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 32, background: '#0E1622', borderRadius: 999, zIndex: 40
        }} />
      {/* content — jemný fade pri horných a spodných zaoblených rohoch */}
      <div style={{
          position: 'absolute', inset: 0, paddingTop: 50, paddingBottom: 28,
          display: 'flex', flexDirection: 'column',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 44px, #000 calc(100% - 44px), transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0, #000 44px, #000 calc(100% - 44px), transparent 100%)'
        }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 999, background: dark ? '#F2F7FB' : '#1A2B3D', opacity: 0.85, zIndex: 40
        }} />
    </div>
    </div>);

}

function SignalIcon({ color }) {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11"><g fill={color}>
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
    </g></svg>);

}
function WifiIcon({ color }) {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
      <path d="M7.5 3a8.5 8.5 0 0 1 6 2.5l1-1A10 10 0 0 0 0.5 4.5l1 1A8.5 8.5 0 0 1 7.5 3z" fill={color} />
      <path d="M7.5 6.5a5 5 0 0 1 3.5 1.4l1-1a6.5 6.5 0 0 0-9 0l1 1A5 5 0 0 1 7.5 6.5z" fill={color} />
      <circle cx="7.5" cy="10" r="1.3" fill={color} />
    </svg>);

}
function BatteryIcon({ color }) {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke={color} strokeOpacity="0.5" />
      <rect x="2" y="2" width="18" height="8" rx="1.8" fill={color} />
      <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill={color} fillOpacity="0.5" />
    </svg>);

}

// ─────────────────────────────────────────────────────────────
// Sparkle helper
// ─────────────────────────────────────────────────────────────
function Sparkle({ style, size = 18, color = '#FFD93D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute', ...style }}>
      <path d="M12 2l1.8 5.5H19l-4.6 3.4 1.8 5.5L12 13l-4.2 3.4 1.8-5.5L5 7.5h5.2z"
      fill={color} opacity="0.88" />
    </svg>);

}

// ─────────────────────────────────────────────────────────────
// 1. SPLASH
// ─────────────────────────────────────────────────────────────
function SplashScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';
  return (
    <PhoneFrame dark={dark} label="01 Splash">
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`
      }}>
        {/* clouds */}
        <Cloud style={{ top: 70, left: -20, opacity: 0.85 }} w={140} />
        <Cloud style={{ top: 150, right: -30, opacity: 0.9 }} w={170} />
        <Cloud style={{ top: 260, left: 30, opacity: 0.6 }} w={110} />

        {/* sparkles */}
        <Sparkle style={{ top: 80, right: 55 }} size={22} color={dark ? '#FFD93D' : '#FFD93D'} />
        <Sparkle style={{ top: 200, left: 24 }} size={16} color={dark ? '#3DD9B0' : '#3DD9B0'} />
        <Sparkle style={{ top: 320, right: 28 }} size={20} color={dark ? '#FF9F2D' : '#FF9F2D'} />
        <Sparkle style={{ top: 130, left: 60 }} size={13} color="#8B7CF6" />
        <Sparkle style={{ top: 58, right: 120 }} size={14} color="#FF6B6B" />

        {/* sun glow behind logo */}
        <div style={{
          position: 'absolute', top: 70, right: 30, width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,220,120,0.7) 0%, rgba(255,220,120,0) 70%)'
        }} />

        {/* logo (icon_alfik_sk.svg) */}
        <div style={{
          position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', width: '90%'
        }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 180, height: 'auto', filter: dark ? 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))' : 'drop-shadow(0 8px 16px rgba(15,30,55,0.18))' }} alt="Alfík" />
          <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: dark ? '#A8C8E8' : '#3D6A8C', letterSpacing: '2px' }}>
            UČÍM SA HROU
          </div>
        </div>

        {/* boy illustration */}
        <div style={{
          position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 320, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
        }}>
          {/* grass arc */}
          <div style={{
            position: 'absolute', bottom: 0, left: -40, right: -40, height: 90,
            background: dark ?
            'radial-gradient(ellipse at center top, #1F4A3E 0%, transparent 65%)' :
            'radial-gradient(ellipse at center top, #B6E68E 0%, #DFF6BD 50%, transparent 75%)',
            borderRadius: '50%'
          }} />
          <img src="assets/light_background_boy.webp"
          style={{ height: 300, width: 'auto', objectFit: 'contain', position: 'relative', filter: 'drop-shadow(0 12px 20px rgba(15,30,55,0.25))' }}
          alt="" />
        </div>

        {/* loading dots */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
          {['#FF6B6B', '#FFB400', '#3DD9B0'].map((c, i) =>
          <div key={i} style={{
            width: 12, height: 12, borderRadius: '50%',
            background: dark ? c : c,
            opacity: 0.45 + i * 0.2,
            boxShadow: `0 3px 8px ${c}88`
          }} />
          )}
        </div>
      </div>
    </PhoneFrame>);

}

function Cloud({ style, w = 120 }) {
  return (
    <div style={{ position: 'absolute', width: w, height: w * 0.55, ...style }}>
      <svg viewBox="0 0 100 55" width="100%" height="100%">
        <g fill="#FFFFFF">
          <ellipse cx="25" cy="35" rx="22" ry="18" />
          <ellipse cx="50" cy="25" rx="28" ry="22" />
          <ellipse cx="75" cy="35" rx="22" ry="18" />
          <ellipse cx="50" cy="42" rx="35" ry="13" />
        </g>
      </svg>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// 2a. LOGIN — krok 1, pole aktívne (kód školy zadávaný)
// ─────────────────────────────────────────────────────────────
function LoginTypingScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';
  const sec = window.QUASAR && window.QUASAR.accent || QUASAR.accent;
  const pri = window.QUASAR && window.QUASAR.primary || QUASAR.primary;

  // Jednoduchá klávesnica mockup
  const kbRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']];


  return (
    <PhoneFrame dark={dark} label="02a Prihlásenie — zadávanie kódu">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Horná časť — logo + form */}
        <div style={{ flex: 1, padding: '12px 22px 16px', display: 'flex', flexDirection: 'column' }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 16 }}>
            <img src="assets/logo_edu_alf.svg" style={{ width: 120, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
          </div>

          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
            Ahoj, kamarát! 👋
          </h1>
          <p style={{ margin: '5px 0 18px', textAlign: 'center', color: inkSoft, fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>
            Prihlás sa a poďme sa hrať a učiť spolu.
          </p>

          {/* Pole s focus stavom — modrý obrys */}
          <div style={{
            background: dark ? p.darkSurf : 'rgba(255,255,255,0.94)',
            borderRadius: 14, overflow: 'hidden',
            boxShadow: `0 0 0 2px ${pri}`,
            border: `1px solid ${pri}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px' }}>
              <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={pri} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: pri, lineHeight: 1 }}>E-mail alebo kód školy</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: dark ? p.darkInk : p.ink, marginTop: 3 }}>
                  Platinum<span style={{ display: 'inline-block', width: 2, height: 16, background: pri, marginLeft: 1, verticalAlign: 'middle', borderRadius: 1 }}></span>
                </div>
              </div>
            </div>
          </div>

          {/* Ďalej button */}
          <button style={{ ...loginBtnStyle(), marginTop: 16 }}>
            Ďalej
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          {/* Registrácia — secondary button */}
          <button style={{
            marginTop: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', padding: '12px 20px',
            background: 'transparent',
            border: `2px solid ${sec}`,
            borderRadius: 14,
            fontSize: 15, fontWeight: 800, color: sec,
            cursor: 'pointer', fontFamily: 'inherit'
          }}>
            Nemáš účet? Registruj sa
          </button>
        </div>

        {/* Klávesnica */}
        <div style={{
          background: '#D1D5DB', paddingTop: 8, paddingBottom: 10,
          borderTop: '1px solid #B0B5BE'
        }}>
          {/* Autocomplete bar */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: '#E5E7EB', height: 34, marginBottom: 6,
            borderBottom: '1px solid #C5C9D0'
          }}>
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Platinum</span>
          </div>

          {kbRows.map((row, ri) =>
          <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: 5 }}>
              {row.map((k, ki) => {
              const isSpecial = k === '⇧' || k === '⌫';
              return (
                <div key={ki} style={{
                  background: isSpecial ? '#ADB5BD' : '#fff',
                  borderRadius: 5, minWidth: isSpecial ? 34 : 28, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: isSpecial ? 14 : 15, fontWeight: 500, color: '#1F2937',
                  boxShadow: '0 1px 0 #9CA3AF', paddingInline: 4
                }}>{k}</div>);

            })}
            </div>
          )}

          {/* Spodný riadok */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
            {['?123', '😊', ''].map((k, i) =>
            <div key={i} style={{
              background: i === 2 ? '#fff' : '#ADB5BD',
              borderRadius: 5,
              width: i === 2 ? 140 : 48,
              height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 500, color: '#1F2937',
              boxShadow: '0 1px 0 #9CA3AF'
            }}>{k}</div>
            )}
            <div style={{
              background: '#1D6EE0', borderRadius: 5, width: 48, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 0 #1452AA'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// Shared login helpers
// ─────────────────────────────────────────────────────────────

// Login field row (štýl z reálnej app — label navrchu, hodnota dole)
function LoginField({ dark, label, value, icon, trailing, compact }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '9px 14px' : '13px 14px' }}>
      <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: inkSoft, lineHeight: 1 }}>{label}</div>
        {value && <div style={{ fontSize: 15, fontWeight: 700, color: ink, marginTop: 3 }}>{value}</div>}
      </div>
      {trailing && <div style={{ flexShrink: 0 }}>{trailing}</div>}
    </div>);

}

// Obal pre login polia — biely blok so separátorom
function LoginFieldBlock({ dark, children, outline }) {
  const p = ALFIK_PALETTE;
  const surf = dark ? p.darkSurf : 'rgba(255,255,255,0.94)';
  const sep = dark ? p.darkLine : 'rgba(200,215,230,0.7)';
  const arr = React.Children.toArray(children);
  return (
    <div style={{
      background: surf, borderRadius: 14, overflow: 'hidden',
      boxShadow: outline ? 'none' : '0 2px 12px rgba(15,30,55,0.09)',
      border: outline
        ? `1px solid ${dark ? p.darkLine : 'rgba(190,206,222,0.7)'}`
        : '1px solid rgba(200,215,230,0.4)'
    }}>
      {arr.map((child, i) =>
      <React.Fragment key={i}>
          {i > 0 && <div style={{ height: 1, background: sep, marginLeft: 52 }} />}
          {child}
        </React.Fragment>
      )}
    </div>);

}

// Červeno-oranžový login button (z reálnej app)
function loginBtnStyle() {
  const pri = window.QUASAR && window.QUASAR.primary || QUASAR.primary;
  const priDeep = window.QUASAR && window.QUASAR.primaryDeep || QUASAR.primaryDeep;
  return {
    height: 58, borderRadius: 18, border: 'none',
    background: `linear-gradient(135deg, ${pri} 0%, ${priDeep} 100%)`,
    color: '#fff', fontFamily: '"Dosis", sans-serif', fontWeight: 800, fontSize: 18,
    letterSpacing: '0.3px', boxShadow: '0 2px 4px 0px rgba(15,30,55,0.35)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    cursor: 'pointer', position: 'relative', zIndex: 1
  };
}

// ─────────────────────────────────────────────────────────────
// 2. LOGIN — krok 1 (email / kód školy)
// ─────────────────────────────────────────────────────────────
function LoginScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';

  return (
    <PhoneFrame dark={dark} label="02 Prihlásenie — krok 1">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 140, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
        </div>

        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Ahoj, kamarát! 👋
        </h1>
        <p style={{ margin: '6px 0 24px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
          Prihlás sa a poďme sa hrať a učiť spolu.
        </p>

        {/* Pole: E-mail alebo kód školy */}
        <div>
          <LoginFieldBlock dark={dark}>
            <LoginField dark={dark} label="E-mail alebo kód školy" value="admin"
            icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            } />
            
          </LoginFieldBlock>
        </div>

        {/* Zabudnuté heslo */}
        <div style={{ textAlign: 'right', marginTop: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: QUASAR.accent, cursor: 'pointer', letterSpacing: '0.1px' }}>
            Zabudol si heslo?
          </span>
        </div>

        {/* Ďalej button */}
        <button style={{ ...loginBtnStyle(), marginTop: 20 }}>
          Ďalej
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        {/* Registrácia — secondary button */}
        <button style={{
          marginTop: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '13px 20px',
          background: 'transparent',
          border: `2px solid ${QUASAR.accent}`,
          borderRadius: 14,
          fontSize: 15, fontWeight: 800, color: QUASAR.accent,
          cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1px'
        }}>
          Nemáš účet? Registruj sa
        </button>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2c. LOGIN — krok 2 (heslo)
// ─────────────────────────────────────────────────────────────
function LoginStep2Screen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';

  return (
    <PhoneFrame dark={dark} label="02c Prihlásenie — krok 2">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 140, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
        </div>

        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Ahoj, kamarát! 👋
        </h1>
        <p style={{ margin: '6px 0 24px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
          Prihlás sa a poďme sa hrať a učiť spolu.
        </p>

        {/* Polia: email (predvyplnený) + heslo */}
        <div>
          <LoginFieldBlock dark={dark}>
            <LoginField dark={dark} label="E-mail" value="admin@betaalf.com"
            icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
            } />
            
            <LoginField dark={dark} label="Heslo" value=""
            icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
            }
            trailing={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            } />
            
          </LoginFieldBlock>
        </div>

        {/* Zabudnuté heslo */}
        <div style={{ textAlign: 'right', marginTop: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: QUASAR.accent, cursor: 'pointer', letterSpacing: '0.1px' }}>
            Zabudol si heslo?
          </span>
        </div>

        {/* Prihlásiť sa button */}
        <button style={{ ...loginBtnStyle(), marginTop: 14 }}>
          Prihlásiť sa
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <div style={{ flex: 1 }} />

        {/* ← SPÄŤ */}
        <div style={{ fontSize: 13, fontWeight: 700, color: inkSoft, position: 'relative', zIndex: 1 }}>
          ← SPÄŤ
        </div>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2e. LOGIN — zabudnuté heslo
// ─────────────────────────────────────────────────────────────
function ForgotPasswordScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';

  return (
    <PhoneFrame dark={dark} label="02e Prihlásenie — zabudnuté heslo">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* ← Späť (hore) */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 6,
          fontSize: 14, fontWeight: 700, color: inkSoft, cursor: 'pointer',
          position: 'relative', zIndex: 1, alignSelf: 'flex-start'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Späť
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 20 }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 140, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
        </div>

        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Zabudol si heslo? 🔑
        </h1>
        <p style={{ margin: '8px 0 24px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
          Nič sa nedeje! Zadaj svoj e-mail a my ti pošleme odkaz na obnovenie hesla.
        </p>

        {/* Pole: E-mail */}
        <div>
          <LoginFieldBlock dark={dark}>
            <LoginField dark={dark} label="E-mail" value="admin@betaalf.com"
            icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
            } />
            
          </LoginFieldBlock>
        </div>

        {/* Odoslať button */}
        <button style={{ ...loginBtnStyle(), marginTop: 20 }}>
          Odoslať kód
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
          </svg>
        </button>

        <div style={{ flex: 1 }} />

        {/* Spomenul si si? */}
        <p style={{ margin: 0, textAlign: 'center', color: inkSoft, fontSize: 13, fontWeight: 600 }}>
          Spomenul si si na heslo?{' '}
          <span style={{ color: QUASAR.accent, fontWeight: 800, cursor: 'pointer' }}>Prihlás sa</span>
        </p>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2e-1. LOGIN — overenie kódu (OTP)
// ─────────────────────────────────────────────────────────────
function VerifyCodeScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';
  const surf = dark ? p.darkSurf : 'rgba(255,255,255,0.94)';
  const line = dark ? p.darkLine : 'rgba(190,206,222,0.8)';
  const code = ['5', '2', '8', '', '', ''];

  return (
    <PhoneFrame dark={dark} label="02e-1 Prihlásenie — overenie kódu">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* ← Späť */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 6,
          fontSize: 14, fontWeight: 700, color: inkSoft, cursor: 'pointer',
          position: 'relative', zIndex: 1, alignSelf: 'flex-start'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Späť
        </div>

        {/* Ikona obálky v kruhu */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, marginBottom: 18 }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: dark ? p.darkSurf : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="M2 7l10 6 10-6" />
            </svg>
          </div>
        </div>

        <h1 style={{ margin: 0, fontSize: 25, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Skontroluj si e-mail 📬
        </h1>
        <p style={{ margin: '8px 0 26px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
          Zadaj 6-miestny kód, ktorý sme poslali na<br />
          <strong style={{ color: ink }}>admin@betaalf.com</strong>
        </p>

        {/* OTP boxy */}
        <div style={{ display: 'flex', gap: 9, justifyContent: 'center', marginBottom: 24 }}>
          {code.map((d, i) => {
            const filled = d !== '';
            const active = i === 3; // ďalšie políčko na zadanie
            return (
              <div key={i} style={{
                width: 46, height: 56, borderRadius: 13,
                background: surf,
                border: `2px solid ${active ? QUASAR.primary : (filled ? line : line)}`,
                boxShadow: active ? `0 0 0 3px ${dark ? 'rgba(125,184,0,0.28)' : 'rgba(125,184,0,0.20)'}` : '0 1px 4px rgba(15,30,55,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 800, color: ink, position: 'relative'
              }}>
                {d}
                {active && <span style={{
                  position: 'absolute', width: 2, height: 26, background: QUASAR.primary, borderRadius: 1
                }} />}
              </div>);
          })}
        </div>

        {/* Overiť button */}
        <button style={{ ...loginBtnStyle() }}>
          Overiť kód
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </button>

        <div style={{ flex: 1 }} />

        {/* Resend */}
        <p style={{ margin: 0, textAlign: 'center', color: inkSoft, fontSize: 13, fontWeight: 600 }}>
          Neprišiel kód?{' '}
          <span style={{ color: inkSoft, fontWeight: 700, opacity: 0.55 }}>Poslať znova (0:42)</span>
        </p>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2e-2. LOGIN — nové heslo
// ─────────────────────────────────────────────────────────────
function NewPasswordScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';

  const lockIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>);
  const eyeIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>);

  return (
    <PhoneFrame dark={dark} label="02e-2 Prihlásenie — nové heslo">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* ← Späť */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 6,
          fontSize: 14, fontWeight: 700, color: inkSoft, cursor: 'pointer',
          position: 'relative', zIndex: 1, alignSelf: 'flex-start'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Späť
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, marginBottom: 16 }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: dark ? p.darkSurf : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={QUASAR.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
        </div>

        <h1 style={{ margin: 0, fontSize: 25, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Vytvor si nové heslo 🔒
        </h1>
        <p style={{ margin: '8px 0 22px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
          Zvoľ si nové heslo, ktoré si ľahko zapamätáš.
        </p>

        <LoginFieldBlock dark={dark}>
          <LoginField dark={dark} label="Nové heslo" value="••••••••" icon={lockIcon} trailing={eyeIcon} />
          <LoginField dark={dark} label="Zopakuj nové heslo" value="••••••••" icon={lockIcon} trailing={eyeIcon} />
        </LoginFieldBlock>

        {/* Sila hesla */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <div style={{ display: 'flex', gap: 5, flex: 1 }}>
            {[QUASAR.primary, QUASAR.primary, QUASAR.primary, 'rgba(150,165,180,0.3)'].map((c, i) =>
              <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: c }} />
            )}
          </div>
          <span style={{ fontSize: 12, fontWeight: 800, color: QUASAR.primary }}>Silné</span>
        </div>
        <p style={{ margin: '8px 2px 0', fontSize: 12, fontWeight: 500, color: inkSoft, lineHeight: 1.4 }}>
          Aspoň 8 znakov, jedno veľké písmeno a číslo.
        </p>

        {/* Uložiť button */}
        <button style={{ ...loginBtnStyle(), marginTop: 22 }}>
          Uložiť heslo
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2e-3. LOGIN — heslo zmenené (potvrdenie)
// ─────────────────────────────────────────────────────────────
function PasswordChangedScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';

  return (
    <PhoneFrame dark={dark} label="02e-3 Prihlásenie — heslo zmenené">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: `linear-gradient(135deg, ${QUASAR.primary} 0%, ${QUASAR.primaryDeep} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28
        }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 style={{ margin: 0, fontSize: 27, fontWeight: 800, letterSpacing: '-0.3px' }}>
          Hotovo! 🎉
        </h1>
        <p style={{ margin: '10px 0 0', color: inkSoft, fontSize: 15, fontWeight: 500, lineHeight: 1.5, maxWidth: 280 }}>
          Tvoje heslo bolo úspešne zmenené. Teraz sa môžeš prihlásiť s novým heslom.
        </p>

        <button style={{ ...loginBtnStyle(), marginTop: 36, alignSelf: 'stretch' }}>
          Prejsť na prihlásenie
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2d-a. LOGIN — kód školy, krok 1: škola nájdená, vyber triedu
// ─────────────────────────────────────────────────────────────
function LoginSchoolStep1Screen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';
  const sec = window.QUASAR && window.QUASAR.accent || QUASAR.accent;

  const DropArrow = () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>;


  return (
    <PhoneFrame dark={dark} label="02d-a Škola nájdená — vyber triedu">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 140, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
        </div>

        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Ahoj, kamarát! 👋
        </h1>
        <p style={{ margin: '6px 0 20px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
          Prihlás sa a poďme sa hrať a učiť spolu.
        </p>

        {/* Kód školy — predvyplnený */}
        <LoginFieldBlock dark={dark}>
          <LoginField dark={dark} label="E-mail alebo kód školy" value="Platinum"
          icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sec} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
          } />
          
        </LoginFieldBlock>

        {/* Hint — názov školy */}
        <div style={{ fontSize: 12, fontWeight: 600, color: sec, marginTop: 5, marginBottom: 14, paddingLeft: 4 }}>
          Platinum School, Hlavná 1, Prešov
        </div>

        {/* Len Trieda dropdown — čaká sa na výber */}
        <LoginFieldBlock dark={dark}>
          <LoginField dark={dark} label="Trieda" value=""
          icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sec} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
          }
          trailing={<DropArrow />} />
          
        </LoginFieldBlock>

        <div style={{ flex: 1 }} />

        {/* ← SPÄŤ */}
        <div style={{ fontSize: 13, fontWeight: 700, color: inkSoft }}>
          ← SPÄŤ
        </div>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2d. LOGIN — kód školy (trieda + žiak + heslo)
// ─────────────────────────────────────────────────────────────
function LoginSchoolScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';
  const sec = window.QUASAR && window.QUASAR.accent || QUASAR.accent;

  // Dropdown arrow trailing icon
  const DropArrow = () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>;


  return (
    <PhoneFrame dark={dark} label="02d Prihlásenie — kód školy">
      <div style={{
        flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 140, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
        </div>

        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center' }}>
          Ahoj, kamarát! 👋
        </h1>
        <p style={{ margin: '6px 0 20px', textAlign: 'center', color: inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
          Prihlás sa a poďme sa hrať a učiť spolu.
        </p>

        {/* Kód školy + hint */}
        <LoginFieldBlock dark={dark}>
          <LoginField dark={dark} label="E-mail alebo kód školy" value="Platinum"
          icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sec} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
          } />
          
        </LoginFieldBlock>

        {/* Hint — názov školy */}
        <div style={{ fontSize: 12, fontWeight: 600, color: sec, marginTop: 5, marginBottom: 14, paddingLeft: 4 }}>
          Platinum School, Hlavná 1, Prešov
        </div>

        {/* Trieda + Žiak + Heslo */}
        <LoginFieldBlock dark={dark}>
          <LoginField dark={dark} label="Trieda" value="1.A"
          icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sec} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
          }
          trailing={<DropArrow />} />
          
          <LoginField dark={dark} label="Žiak" value="Ján Novák"
          icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sec} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
          }
          trailing={<DropArrow />} />
          
          <LoginField dark={dark} label="Heslo" value=""
          icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sec} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
          }
          trailing={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
          } />
          
        </LoginFieldBlock>

        {/* Prihlásiť sa button */}
        <button style={{ ...loginBtnStyle(), marginTop: 20 }}>
          Prihlásiť sa
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <div style={{ flex: 1 }} />

        {/* ← SPÄŤ */}
        <div style={{ fontSize: 13, fontWeight: 700, color: inkSoft }}>
          ← SPÄŤ
        </div>
      </div>
    </PhoneFrame>);

}

function Field({ dark, label, value, icon, trailing, state = 'default', error, hint }) {
  const p = ALFIK_PALETTE;
  const Q = window.QUASAR || p;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf = dark ? p.darkSurf : p.surface;
  const line = dark ? p.darkLine : p.line;

  // Quasar input states: default · focus · error · success
  const borderByState = {
    default: line,
    focus: Q.primary, // focus = primary (Quasar default)
    error: Q.negative, // error = negative
    success: Q.positive // success = positive
  };
  const glowByState = {
    default: 'none',
    focus: 'none',
    error: 'none',
    success: 'none'
  };
  const borderColor = borderByState[state] || line;
  const shadow = glowByState[state] || glowByState.default;
  const labelColor = state === 'error' ? Q.negative : inkSoft;

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: labelColor, marginBottom: 3, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: surf, height: 40, borderRadius: 10, padding: '0 10px',
        border: `1.5px solid ${borderColor}`,
        boxShadow: shadow,
        transition: 'border-color 0.15s, box-shadow 0.15s'
      }}>
        <span style={{ display: 'flex', width: 24, height: 24, borderRadius: 7, background: dark ? p.darkBg : '#F2F7FB', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </span>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: ink }}>{value}</div>
        {state === 'error' &&
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={Q.negative} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="16.5" r="0.6" fill={Q.negative} />
          </svg>
        }
        {state === 'success' &&
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={Q.positive} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        }
        {!['error', 'success'].includes(state) && trailing && <span>{trailing}</span>}
      </div>
      {error &&
      <div style={{
        marginTop: 8, fontSize: 13, fontWeight: 600, color: Q.negative,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={Q.negative} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="16.5" r="0.5" fill={Q.negative} />
          </svg>
          {error}
        </div>
      }
      {hint && !error &&
      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: inkSoft }}>{hint}</div>
      }
    </div>);

}

// ─────────────────────────────────────────────────────────────
// 1b. PRE-MENU (after Splash, before Login)
// ─────────────────────────────────────────────────────────────
function PreMenuScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf = dark ? p.darkSurf : p.surface;
  const bgTop = dark ? '#16335A' : '#D1EBF9';
  const bgMid = dark ? '#1F4570' : '#E6F5FD';
  const bgBot = dark ? '#0E1622' : '#F9FCFE';

  return (
    <PhoneFrame dark={dark} label="01b Pre-menu">
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        display: 'flex', flexDirection: 'column'
      }}>
        {/* clouds */}
        <Cloud style={{ top: 46, left: -18, opacity: 0.75 }} w={130} />
        <Cloud style={{ top: 120, right: -28, opacity: 0.85 }} w={155} />

        {/* sun glow */}
        <div style={{
          position: 'absolute', top: 54, right: 38,
          width: 72, height: 72, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,220,120,0.65) 0%, rgba(255,220,120,0) 70%)',
          pointerEvents: 'none'
        }} />

        {/* logo */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 26, position: 'relative'
        }}>
          <img
            src="assets/logo_edu_alf.svg"
            style={{
              width: 156, height: 'auto',
              filter: dark ?
              'drop-shadow(0 6px 20px rgba(0,0,0,0.4))' :
              'drop-shadow(0 6px 16px rgba(15,30,55,0.16))'
            }}
            alt="Alfík" />
          
          <div style={{
            marginTop: 8, fontSize: 13, fontWeight: 700,
            color: dark ? '#A8C8E8' : '#3D6A8C', letterSpacing: '2.2px'
          }}>
            UČÍM SA HROU
          </div>
        </div>

        {/* illustration */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: -50, right: -50, height: 80,
            borderRadius: '50%',
            background: dark ?
            'radial-gradient(ellipse at center top, #1F4A3E 0%, transparent 65%)' :
            'radial-gradient(ellipse at center top, #B6E68E 0%, #DFF6BD 50%, transparent 75%)'
          }} />
          <img
            src="assets/light_background_boy.webp"
            style={{
              height: 230, width: 'auto', objectFit: 'contain',
              position: 'relative',
              filter: 'drop-shadow(0 10px 18px rgba(15,30,55,0.22))'
            }}
            alt="" />
          
        </div>

        {/* bottom sheet */}
        <div style={{
          background: surf,
          borderRadius: '32px 32px 0 0',
          padding: '26px 26px 10px',
          boxShadow: '0 -8px 32px rgba(15,30,55,0.10)'
        }}>
          <h2 style={{
            margin: '0 0 4px', fontSize: 25, fontWeight: 900,
            letterSpacing: '-0.5px', color: ink, textAlign: 'center'
          }}>Vitaj v Alfíkovi! 🌟</h2>
          <p style={{
            margin: '0 0 20px', fontSize: 14, fontWeight: 600,
            color: inkSoft, textAlign: 'center', lineHeight: 1.5
          }}>
            Vyber si, ako chceš pokračovať
          </p>

          {/* Primary — Prihlásiť sa */}
          <button style={{
            width: '100%', height: 58, borderRadius: 20, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${QUASAR.primary} 0%, ${QUASAR.primaryDeep} 100%)`,
            color: '#fff', fontFamily: 'inherit', fontWeight: 800, fontSize: 17,
            letterSpacing: '0.2px',
            boxShadow: '0 3px 3px 0px rgba(15,30,55,0.42)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginBottom: 12
          }}>
            Prihlásiť sa
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </button>

          {/* Secondary — Vytvoriť účet */}
          <button style={{
            width: '100%', height: 58, borderRadius: 20, cursor: 'pointer',
            border: `2.5px solid ${p.skyDeep}`,
            background: dark ? 'rgba(63,169,224,0.08)' : 'rgba(63,169,224,0.06)',
            color: dark ? p.darkInk : p.skyDeep,
            fontFamily: 'inherit', fontWeight: 800, fontSize: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginBottom: 18
          }}>
            Vytvoriť účet
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dark ? p.darkInk : p.skyDeep} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </button>

          {/* Ghost — Demo */}
          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: inkSoft, paddingBottom: 4 }}>
            Bez registrácie?{' '}
            <span style={{ color: p.mint, fontWeight: 800 }}>Skús demo zadarmo</span>
          </div>
        </div>
      </div>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// 2b. HOME — Ahoj Adamko, continue card + world tiles
// ─────────────────────────────────────────────────────────────
function ProductChoiceScreen({ dark = false }) {
  return (
    <PhoneFrame dark={dark} label="02b Výber produktu">
      <ProductChoiceContent dark={dark} />
    </PhoneFrame>);

}

function ProductChoiceContent({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const bg = dark ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)' : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)';

  return (
    <div style={{
      flex: 1, overflowY: 'auto', overflowX: 'hidden',
      background: bg,
      display: 'flex', flexDirection: 'column',
      padding: '14px 20px 26px'
    }}>

      {/* ── Top bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 20 }}>
        {/* Hamburger */}
        <button style={{
          width: 38, height: 38, borderRadius: 14,
          background: 'transparent', border: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 5, cursor: 'pointer', flexShrink: 0,
          padding: 0
        }}>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{ width: 18, height: 2.5, borderRadius: 2, background: '#1A2B3D' }} />
          )}
        </button>
      </div>

      {/* ── Greeting ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0,
          border: '3px solid #fff',
          boxShadow: '0 3px 12px rgba(0,0,0,0.16)',
          cursor: 'pointer'
        }}>
          <img src="assets/alfik_world_banner.png" alt="profil" style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: '72% 10%'
          }} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 900, letterSpacing: '-0.5px', color: ink, lineHeight: 1.1 }}>
            Ahoj, Adam!
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 15, fontWeight: 600, color: inkSoft }}>
            Pokračujeme v učení?
          </p>
        </div>
      </div>

      {/* ── Continue card ── */}
      <ContinueCard dark={dark} />

      {/* ── Section header ── */}
      <div style={{ fontSize: 19, fontWeight: 800, color: ink, margin: '20px 0 12px' }}>
        Tvoje svety
      </div>

      {/* ── World tiles ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AlfikWorldCard dark={dark} />
        <AlfbookWorldCard dark={dark} />
      </div>
    </div>);

}

// ── Continue card ────────────────────────────────────────────
function ContinueCard({ dark }) {
  const p = ALFIK_PALETTE;
  const surf = dark ? p.darkSurf : '#fff';
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const lineColor = dark ? p.darkLine : '#E8EFF6';

  // Decorative scatter dots
  const dots = [
  { top: 8, left: 84, color: '#FFD700' },
  { top: 10, right: 90, color: '#9B5DE5' },
  { top: 18, left: 210, color: '#FF6B6B', size: 4 },
  { bottom: 9, right: 48, color: '#8B7CF6' },
  { bottom: 10, left: 170, color: '#FFB400', size: 4 }];


  return (
    <div style={{
      background: surf, borderRadius: 20,
      padding: '14px 14px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      position: 'relative', overflow: 'hidden'
    }}>
      {dots.map((d, i) =>
      <div key={i} style={{
        position: 'absolute', width: d.size || 5, height: d.size || 5,
        borderRadius: '50%', background: d.color, opacity: 0.75,
        top: d.top, bottom: d.bottom, left: d.left, right: d.right
      }} />
      )}

      {/* Star icon */}
      <div style={{
        width: 58, height: 58, borderRadius: '50%',
        background: '#EDE9FF', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28
      }}>⭐</div>

      {/* Text + progress */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 2 }}>
          Pokračuj tam, kde si skončil
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: inkSoft, marginBottom: 7 }}>
          Alfík · Farby a tvary
        </div>
        <div style={{ height: 6, borderRadius: 999, background: lineColor, overflow: 'hidden', maxWidth: 150 }}>
          <div style={{ height: '100%', width: '52%', borderRadius: 999, background: QUASAR.primary }} />
        </div>
      </div>

      {/* Pokračovať button */}
      <div style={{
        flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '10px 13px', borderRadius: 999,
        background: QUASAR.primary,
        color: '#fff', fontWeight: 800, fontSize: 13,
        cursor: 'pointer', whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(143,212,0,0.35)'
      }}>
        Pokračovať
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>);

}

// ── Alfík world tile ─────────────────────────────────────────
function AlfikWorldCard({ dark }) {
  return (
    <div style={{
      position: 'relative', height: 200, borderRadius: 24, overflow: 'hidden',
      background: '#4ECAC1',
      boxShadow: '0 8px 26px rgba(0,0,0,0.13)',
      cursor: 'pointer'
    }}>
      {/* Full illustration positioned right */}
      <img src="assets/alfik_world_banner.png" alt="" style={{
        position: 'absolute', top: 0, right: 0,
        height: '100%', width: '68%',
        objectFit: 'cover', objectPosition: 'right center'
      }} />

      {/* Fade left edge of image so text is readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #4ECAC1 40%, rgba(78,202,193,0.82) 56%, transparent 76%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '18px 16px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div>
          <img src="assets/alfik_logo.svg" alt="Alfík" style={{
            height: 50, width: 'auto', display: 'block',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))'
          }} />
          <div style={{
            marginTop: 8, fontSize: 14, fontWeight: 700,
            color: '#0D3B35', maxWidth: 152, lineHeight: 1.4
          }}>
            Hravé objavovanie pre najmenších
          </div>
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 16px', borderRadius: 999,
          background: '#fff',
          color: QUASAR.accent, fontWeight: 800, fontSize: 14,
          alignSelf: 'flex-start'
        }}>
          Otvoriť
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={QUASAR.accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>);

}

// ── AlfBook world tile ───────────────────────────────────────
function AlfbookWorldCard({ dark }) {
  return (
    <div style={{
      position: 'relative', height: 200, borderRadius: 24, overflow: 'hidden',
      background: '#1C3AAE',
      boxShadow: '0 8px 26px rgba(0,0,0,0.22)',
      cursor: 'pointer'
    }}>
      {/* Illustration — slightly dimmed to show locked state */}
      <img src="assets/alfbook_world_banner.png" alt="" style={{
        position: 'absolute', top: 0, right: 0,
        height: '100%', width: '68%',
        objectFit: 'cover', objectPosition: 'right center',
        filter: 'saturate(0.5) brightness(0.7)'
      }} />

      {/* Left fade overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #1C3AAE 38%, rgba(28,58,174,0.92) 56%, rgba(28,58,174,0.55) 76%)'
      }} />

      {/* 🔒 UZAMKNUTÉ badge — subtle */}
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: 'rgba(0,0,0,0.38)',
        backdropFilter: 'blur(4px)',
        padding: '5px 12px',
        borderRadius: 999,
        display: 'flex', alignItems: 'center', gap: 5,
        border: '1px solid rgba(255,255,255,0.15)'
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
          <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.5px' }}>Uzamknuté</span>
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '18px 16px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div style={{ marginTop: 26 }}>
          <img src="assets/alfbook_logo.svg" alt="AlfBook" style={{
            height: 40, width: 'auto', display: 'block',
            filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
            opacity: 0.85
          }} />
          <div style={{
            marginTop: 10, fontSize: 14, fontWeight: 700,
            color: 'rgba(214,228,255,0.85)', maxWidth: 168, lineHeight: 1.4
          }}>
            Dobrodružstvo a vedomosti pre školákov
          </div>
        </div>

        {/* Prominent CTA */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '9px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: 13,
          cursor: 'pointer', alignSelf: 'flex-start', whiteSpace: 'nowrap'
        }}>
          Získať Free Trial
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A2B3D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// ONBOARDING — Welcome Walkthrough
// ─────────────────────────────────────────────────────────────
function OnboardingDots({ total, active, onDotClick }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) =>
      <div key={i} onClick={() => onDotClick && onDotClick(i)} style={{
        width: i === active ? 26 : 10, height: 10, borderRadius: 999,
        background: i === active ? QUASAR.primary : '#C8DDE8',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s',
        cursor: onDotClick ? 'pointer' : 'default'
      }} />
      )}
    </div>);

}

// ── Statické verzie (zachované pre spätnú kompatibilitu) ──────
function WalkthroughScreen1({ dark = false }) {
  const inkSoft = dark ? '#A8B6C8' : '#5A7A90';
  return (
    <PhoneFrame dark={dark} label="00a · Onboarding 1 (statická)">
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden',
        backgroundImage: 'url(uploads/background.png)',
        backgroundSize: 'cover', backgroundPosition: 'center top'
      }}>
        <div style={{ position: 'absolute', top: 22, right: 24, zIndex: 20,
          fontSize: 16, fontWeight: 700, color: '#2A5A8A', cursor: 'pointer',
          letterSpacing: '0.2px'
        }}>Preskočiť</div>
        <div style={{ position: 'absolute', top: 0, bottom: 280, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 200, height: 'auto' }} alt="AlfEdu" />
          <div style={{ fontSize: 17, fontWeight: 700, color: dark ? '#7AB5D8' : '#3A7A9C', letterSpacing: '0.5px' }}>Učím sa hrou</div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
          borderRadius: '28px 28px 0 0', background: dark ? '#0E1622' : '#fff',
          padding: '20px 36px 36px', minHeight: 280,
          display: 'flex', flexDirection: 'column', gap: 12
        }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: dark ? '#E8F4FF' : '#1A2B3D', letterSpacing: '-0.4px', lineHeight: 1.2 }}>Vitajte v rodine Alf!</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: inkSoft, lineHeight: 1.65, textWrap: 'pretty' }}>
            Vzdelávacia platforma pre deti od 3 do 10 rokov. Hravé lekcie, kvízy a príbehy — navrhnuté tak, aby sa deti učili s radosťou.
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <OnboardingDots total={2} active={0} />
          </div>
          <div style={{ position: 'relative', height: 52 }}>
            <button style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 16, fontWeight: 700, color: QUASAR.primary, fontFamily: 'inherit'
            }}>
              Ďalej
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={QUASAR.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>);

}

function WalkthroughScreen2({ dark = false }) {
  const inkSoft = dark ? '#A8B6C8' : '#5A7A90';
  return (
    <PhoneFrame dark={dark} label="00b · Onboarding 2 (statická)">
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden',
        backgroundImage: 'url(uploads/background.png)',
        backgroundSize: 'cover', backgroundPosition: 'center top'
      }}>
        <div style={{ position: 'absolute', top: 0, bottom: 280, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 200, height: 'auto' }} alt="AlfEdu" />
          <div style={{ fontSize: 17, fontWeight: 700, color: dark ? '#7AB5D8' : '#3A7A9C', letterSpacing: '0.5px' }}>Učím sa hrou</div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
          borderRadius: '28px 28px 0 0', background: dark ? '#0E1622' : '#fff',
          padding: '20px 36px 36px', minHeight: 280,
          display: 'flex', flexDirection: 'column', gap: 12
        }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: dark ? '#E8F4FF' : '#1A2B3D', letterSpacing: '-0.4px', lineHeight: 1.2 }}>Dva svety, jedno dobrodružstvo</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: inkSoft, lineHeight: 1.65, textWrap: 'pretty' }}>
            Alfík pre predškolákov a AlfBook pre školákov — každé dieťa nájde ten správny svet práve pre seba.
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <OnboardingDots total={2} active={1} />
          </div>
          <button style={{ ...loginBtnStyle() }}>Prihlásiť sa</button>
        </div>
      </div>
    </PhoneFrame>);

}

// ── Interaktívny swipe carousel ───────────────────────────────
const WALKTHROUGH_SLIDES = [
{
  title: 'Vitajte v rodine Alf!',
  text: 'Vzdelávacia platforma pre deti od 3 do 10 rokov. Hravé lekcie, kvízy a príbehy — navrhnuté tak, aby sa deti učili s radosťou.'
},
{
  title: 'Dva svety, jedno dobrodružstvo',
  text: 'Alfík pre predškolákov a AlfBook pre školákov — každé dieťa nájde ten správny svet práve pre seba.',
  cta: true
}];


function WalkthroughCarousel({ dark = false }) {
  const TOTAL = WALKTHROUGH_SLIDES.length;
  const [slide, setSlide] = React.useState(0);
  const [dragStart, setDragStart] = React.useState(null);
  const [dragDelta, setDragDelta] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  // swipe hint: fades out after 1.2 s
  const [showHint, setShowHint] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const inkSoft = dark ? '#A8B6C8' : '#5A7A90';
  const panelBg = dark ? '#0E1622' : '#fff';
  const ink = dark ? '#E8F4FF' : '#1A2B3D';

  // ── gesture helpers ──────────────────────────────────────────
  const getX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  const onDragStart = (e) => {
    setDragStart(getX(e));
    setIsDragging(true);
    setDragDelta(0);
  };
  const onDragMove = (e) => {
    if (!isDragging || dragStart === null) return;
    setDragDelta(getX(e) - dragStart);
  };
  const onDragEnd = () => {
    if (dragDelta < -48 && slide < TOTAL - 1) setSlide((s) => s + 1);else
    if (dragDelta > 48 && slide > 0) setSlide((s) => s - 1);
    setIsDragging(false);
    setDragStart(null);
    setDragDelta(0);
  };

  // percentage offset of the whole track
  const pct = -slide * 100 + (isDragging ? dragDelta / 375 * 100 : 0);

  return (
    <PhoneFrame dark={dark} label="00 · Onboarding — swipe">
      <div
        style={{ flex: 1, position: 'relative', overflow: 'hidden',
          backgroundImage: 'url(uploads/background.png)',
          backgroundSize: 'cover', backgroundPosition: 'center top',
          userSelect: 'none'
        }}
        onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
        onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}>
        
        {/* Preskočiť — mizne na poslednom slide */}
        <div style={{
          position: 'absolute', top: 20, right: 22, zIndex: 20,
          fontSize: 15, fontWeight: 700, color: '#2A5A8A', cursor: 'pointer',
          padding: '6px 0',
          opacity: slide === TOTAL - 1 ? 0 : 1,
          pointerEvents: slide === TOTAL - 1 ? 'none' : 'auto',
          transition: 'opacity 0.35s'
        }}>Preskočiť</div>

        {/* Logo + tagline — staticky */}
        <div style={{
          position: 'absolute', top: 0, bottom: 290, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          pointerEvents: 'none'
        }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 200, height: 'auto' }} alt="AlfEdu" />
          <div style={{ fontSize: 17, fontWeight: 700, color: dark ? '#7AB5D8' : '#3A7A9C', letterSpacing: '0.5px' }}>
            Učím sa hrou
          </div>
        </div>

        {/* Swipe hint — animovaná šípka */}
        <div style={{
          position: 'absolute', bottom: 300, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10,
          opacity: showHint && slide === 0 ? 1 : 0,
          transition: 'opacity 0.5s'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(6px)',
            padding: '5px 14px', borderRadius: 20,
            fontSize: 12, fontWeight: 700, color: '#1A2B3D',
            animation: 'swipeHint 1.2s ease-in-out infinite'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            Potiahnite
          </div>
        </div>

        {/* Biely panel — rovnaká štruktúra ako 00b */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          borderRadius: '28px 28px 0 0',
          background: panelBg,
          minHeight: 280,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          padding: '20px 0 36px',
          gap: 12
        }}>
          {/* Sliding text track — neguje bočný padding panelu */}
          <div style={{ overflow: 'hidden', margin: '0 0', padding: '0 0' }}>
            <div style={{
              display: 'flex',
              width: `${TOTAL * 100}%`,
              transform: `translateX(${pct / TOTAL}%)`,
              transition: isDragging ? 'none' : 'transform 0.38s cubic-bezier(0.4,0,0.2,1)'
            }}>
              {WALKTHROUGH_SLIDES.map((s, i) =>
              <div key={i} style={{
                width: `${100 / TOTAL}%`,
                padding: '0 36px',
                display: 'flex', flexDirection: 'column', gap: 10
              }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: ink, letterSpacing: '-0.4px', lineHeight: 1.2 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: inkSoft, lineHeight: 1.65, textWrap: 'pretty' }}>
                    {s.text}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spacer — ako v 00b */}
          <div style={{ flex: 1 }} />

          {/* Bodky — vždy na stred */}
          <div style={{ padding: '0 36px', display: 'flex', justifyContent: 'center' }}>
            <OnboardingDots total={TOTAL} active={slide} onDotClick={setSlide} />
          </div>

          {/* Akcia — Ďalej vpravo / Prihlásiť sa (rovnaká výška ako button v 00b) */}
          <div style={{ padding: '0 36px', position: 'relative', height: 52 }}>
            {/* Ďalej — vpravo, skryje sa na poslednom slide */}
            <button
              onClick={() => setSlide((s) => s + 1)}
              style={{
                position: 'absolute', right: 36, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 15, fontWeight: 700, color: QUASAR.primary,
                padding: '6px 0',
                opacity: slide < TOTAL - 1 ? 1 : 0,
                pointerEvents: slide < TOTAL - 1 ? 'auto' : 'none',
                transition: 'opacity 0.25s'
              }}>
              
              Ďalej
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={QUASAR.primary} strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            {/* Prihlásiť sa — objaví sa na poslednom slide */}
            <button
              style={{
                ...loginBtnStyle(),
                position: 'absolute', inset: '0 0 0 0', margin: 0,
                opacity: slide === TOTAL - 1 ? 1 : 0,
                pointerEvents: slide === TOTAL - 1 ? 'auto' : 'none',
                transition: 'opacity 0.3s'
              }}>
              Prihlásiť sa</button>
          </div>
        </div>
      </div>

      {/* CSS pre swipe hint animáciu */}
      <style>{`
        @keyframes swipeHint {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(8px); opacity: 0.7; }
        }
      `}</style>
    </PhoneFrame>);

}

// ─────────────────────────────────────────────────────────────
// ScaleTile — dlaždica vždy ŠTVOREC a celý jej obsah (emoji, text,
// padding, rádius…) sa škáluje PROPORCIONÁLNE podľa skutočnej šírky
// bunky. Čisté CSS: štvorcová container-query bunka + fixný „design"
// box 154×154 (resp. 99×99) zväčšený transformom scale(100cqw/design).
// Žiadny JS / ResizeObserver → funguje aj v sandboxe aj v reálnom
// prehliadači. Vnútorné rozmery (padding, výšky) zostávajú PRESNE
// navrhnuté na `design` px — menia sa len proporcionálne cez scale.
// ─────────────────────────────────────────────────────────────
function ScaleTile({ design = 154, children }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
      <div style={{ position: 'absolute', inset: 0, containerType: 'inline-size' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: design, height: design,
          transformOrigin: 'top left',
          transform: `scale(calc(100cqw / ${design}px))`
        }}>
          {children}
        </div>
      </div>
    </div>);

}

Object.assign(window, { SplashScreen, PreMenuScreen, LoginScreen, LoginTypingScreen, LoginStep2Screen, ForgotPasswordScreen, VerifyCodeScreen, NewPasswordScreen, PasswordChangedScreen, LoginSchoolStep1Screen, LoginSchoolScreen, ProductChoiceScreen, ProductChoiceContent, PhoneFrame, Field, ALFIK_PALETTE, WalkthroughScreen1, WalkthroughScreen2, WalkthroughCarousel, ScaleTile });