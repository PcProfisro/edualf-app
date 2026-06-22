// Alfík — mobile screens (modernized, playful)
// All screens share a viewport ~ 390×844 (iPhone-like), but design is platform-neutral.

const ALFIK_PALETTE = {
  // Light
  sky:        '#7CC4F0',
  skyDeep:    '#3FA9E0',
  sun:        '#FFC542',
  sunDeep:    '#FF9F2D',
  coral:      '#FF6B6B',
  mint:       '#3DD9B0',
  grape:      '#8B7CF6',
  ink:        '#1A2B3D',
  inkSoft:    '#4A5B6E',
  inkMute:    '#8194A8',
  line:       '#E4EBF2',
  bg:         '#F2F7FB',
  surface:    '#FFFFFF',
  // Dark
  darkBg:     '#0E1622',
  darkSurf:   '#1A2433',
  darkLine:   '#2A3447',
  darkInk:    '#F2F7FB',
  darkInkSoft:'#A8B6C8',
};

// ─────────────────────────────────────────────────────────────
// Shared chrome — phone-style frame (platform-neutral)
// ─────────────────────────────────────────────────────────────
function PhoneFrame({ children, dark = false, label, width = 390, height = 844 }) {
  const p = ALFIK_PALETTE;
  const bg = dark ? p.darkBg : p.bg;
  const ink = dark ? p.darkInk : p.ink;
  return (
    <div data-screen-label={label} style={{
      width, height, borderRadius: 44, background: bg, color: ink,
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Nunito", "SF Pro", system-ui, sans-serif',
      boxShadow: '0 0 0 10px #0E1622, 0 0 0 12px #2A3447, 0 30px 60px -20px rgba(15,30,55,0.35)',
    }}>
      {/* status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 44,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 28px 0', zIndex: 30,
        fontSize: 15, fontWeight: 700, color: ink,
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <SignalIcon color={ink}/>
          <WifiIcon color={ink}/>
          <BatteryIcon color={ink}/>
        </div>
      </div>
      {/* notch */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 32, background: '#0E1622', borderRadius: 999, zIndex: 40,
      }}/>
      {/* content */}
      <div style={{ position: 'absolute', inset: 0, paddingTop: 50, paddingBottom: 28, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 134, height: 5, borderRadius: 999, background: dark ? '#F2F7FB' : '#1A2B3D', opacity: 0.85, zIndex: 40,
      }}/>
    </div>
  );
}

function SignalIcon({ color }) {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11"><g fill={color}>
      <rect x="0" y="7" width="3" height="4" rx="0.5"/>
      <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
      <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
      <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
    </g></svg>
  );
}
function WifiIcon({ color }) {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
      <path d="M7.5 3a8.5 8.5 0 0 1 6 2.5l1-1A10 10 0 0 0 0.5 4.5l1 1A8.5 8.5 0 0 1 7.5 3z" fill={color}/>
      <path d="M7.5 6.5a5 5 0 0 1 3.5 1.4l1-1a6.5 6.5 0 0 0-9 0l1 1A5 5 0 0 1 7.5 6.5z" fill={color}/>
      <circle cx="7.5" cy="10" r="1.3" fill={color}/>
    </svg>
  );
}
function BatteryIcon({ color }) {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke={color} strokeOpacity="0.5"/>
      <rect x="2" y="2" width="18" height="8" rx="1.8" fill={color}/>
      <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill={color} fillOpacity="0.5"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. SPLASH
// ─────────────────────────────────────────────────────────────
function SplashScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const bgTop = dark ? '#16335A' : '#A8DFF6';
  const bgMid = dark ? '#1F4570' : '#D8F0FB';
  const bgBot = dark ? '#0E1622' : '#F8FBFE';
  return (
    <PhoneFrame dark={dark} label="01 Splash">
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
      }}>
        {/* clouds */}
        <Cloud style={{ top: 70, left: -20, opacity: 0.85 }} w={140}/>
        <Cloud style={{ top: 150, right: -30, opacity: 0.9 }} w={170}/>
        <Cloud style={{ top: 260, left: 30, opacity: 0.6 }} w={110}/>

        {/* sun glow behind logo */}
        <div style={{
          position: 'absolute', top: 70, right: 30, width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,220,120,0.7) 0%, rgba(255,220,120,0) 70%)',
        }}/>

        {/* logo (icon_alfik_sk.svg) */}
        <div style={{
          position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', width: '90%',
        }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 180, height: 'auto', filter: dark ? 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))' : 'drop-shadow(0 8px 16px rgba(15,30,55,0.18))' }} alt="Alfík"/>
          <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: dark ? '#A8C8E8' : '#3D6A8C', letterSpacing: '2px' }}>
            UČÍM SA HROU
          </div>
        </div>

        {/* boy illustration */}
        <div style={{
          position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 320, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          {/* grass arc */}
          <div style={{
            position: 'absolute', bottom: 0, left: -40, right: -40, height: 90,
            background: dark
              ? 'radial-gradient(ellipse at center top, #1F4A3E 0%, transparent 65%)'
              : 'radial-gradient(ellipse at center top, #B6E68E 0%, #DFF6BD 50%, transparent 75%)',
            borderRadius: '50%',
          }}/>
          <img src="assets/light_background_boy.webp"
               style={{ height: 300, width: 'auto', objectFit: 'contain', position: 'relative', filter: 'drop-shadow(0 12px 20px rgba(15,30,55,0.25))' }}
               alt=""/>
        </div>

        {/* loading dots */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 9, height: 9, borderRadius: '50%',
              background: dark ? '#F2F7FB' : '#3D6A8C',
              opacity: 0.3 + i * 0.25,
            }}/>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function Cloud({ style, w = 120 }) {
  return (
    <div style={{ position: 'absolute', width: w, height: w * 0.55, ...style }}>
      <svg viewBox="0 0 100 55" width="100%" height="100%">
        <g fill="#FFFFFF">
          <ellipse cx="25" cy="35" rx="22" ry="18"/>
          <ellipse cx="50" cy="25" rx="28" ry="22"/>
          <ellipse cx="75" cy="35" rx="22" ry="18"/>
          <ellipse cx="50" cy="42" rx="35" ry="13"/>
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. LOGIN
// ─────────────────────────────────────────────────────────────
function LoginScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf = dark ? p.darkSurf : p.surface;
  const line = dark ? p.darkLine : p.line;

  return (
    <PhoneFrame dark={dark} label="02 Prihlásenie">
      <div style={{ flex: 1, padding: '12px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* header — Alfík logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, marginBottom: 18 }}>
          <img src="assets/logo_edu_alf.svg" style={{ width: 130, height: 'auto', filter: dark ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík"/>
        </div>

        <h1 style={{
          margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', textAlign: 'center',
        }}>Ahoj, kamarát! 👋</h1>
        <p style={{ margin: '6px 0 26px', textAlign: 'center', color: inkSoft, fontSize: 15, fontWeight: 500 }}>
          Prihlás sa a poďme sa hrať a učiť spolu.
        </p>

        {/* email */}
        <Field dark={dark} label="E-mail" value="rodic@alfik.sk" icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.skyDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="3"/>
            <path d="M3 7l9 6 9-6"/>
          </svg>
        }/>

        <div style={{ height: 14 }}/>

        <Field dark={dark} label="Heslo" value="••••••••" icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.coral} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2"/>
            <path d="M8 11V8a4 4 0 0 1 8 0v3"/>
          </svg>
        } trailing={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        }/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: inkSoft }}>
            <span style={{
              width: 20, height: 20, borderRadius: 6, background: p.mint,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10"/></svg>
            </span>
            Zapamätať
          </label>
          <a style={{ fontSize: 14, fontWeight: 700, color: p.skyDeep, textDecoration: 'none' }}>Zabudol som heslo</a>
        </div>

        {/* primary button */}
        <button style={{
          marginTop: 22, height: 60, borderRadius: 20, border: 'none',
          background: `linear-gradient(135deg, ${p.coral} 0%, ${p.sunDeep} 100%)`,
          color: '#fff', fontFamily: 'inherit', fontWeight: 800, fontSize: 18, letterSpacing: '0.3px',
          boxShadow: `0 10px 24px -8px ${p.coral}99`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          Prihlásiť sa
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>

        <div style={{ flex: 1 }}/>

        <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, color: inkSoft, marginTop: 16 }}>
          Nemáš účet? <span style={{ color: p.skyDeep, fontWeight: 800 }}>Zaregistruj sa</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Field({ dark, label, value, icon, trailing }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf = dark ? p.darkSurf : p.surface;
  const line = dark ? p.darkLine : p.line;
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: inkSoft, marginBottom: 8, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: surf, height: 56, borderRadius: 18, padding: '0 16px',
        border: `2px solid ${line}`,
        boxShadow: dark ? 'none' : '0 2px 6px rgba(15,30,55,0.04)',
      }}>
        <span style={{ display: 'flex', width: 36, height: 36, borderRadius: 12, background: dark ? p.darkBg : '#F2F7FB', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </span>
        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: ink }}>{value}</div>
        {trailing && <span>{trailing}</span>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1b. PRE-MENU (after Splash, before Login)
// ─────────────────────────────────────────────────────────────
function PreMenuScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink     = dark ? p.darkInk     : p.ink;
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  const surf    = dark ? p.darkSurf    : p.surface;
  const bgTop   = dark ? '#16335A' : '#A8DFF6';
  const bgMid   = dark ? '#1A3D60' : '#CEE9F8';
  const bgBot   = dark ? '#0E1622' : '#EFF7FD';

  return (
    <PhoneFrame dark={dark} label="01b Pre-menu">
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 42%, ${bgBot} 100%)`,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* clouds */}
        <Cloud style={{ top: 46, left: -18, opacity: 0.75 }} w={130}/>
        <Cloud style={{ top: 120, right: -28, opacity: 0.85 }} w={155}/>

        {/* sun glow */}
        <div style={{
          position: 'absolute', top: 54, right: 38,
          width: 72, height: 72, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,220,120,0.65) 0%, rgba(255,220,120,0) 70%)',
          pointerEvents: 'none',
        }}/>

        {/* logo */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 26, position: 'relative',
        }}>
          <img
            src="assets/logo_edu_alf.svg"
            style={{
              width: 156, height: 'auto',
              filter: dark
                ? 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))'
                : 'drop-shadow(0 6px 16px rgba(15,30,55,0.16))',
            }}
            alt="Alfík"
          />
          <div style={{
            marginTop: 8, fontSize: 13, fontWeight: 700,
            color: dark ? '#A8C8E8' : '#3D6A8C', letterSpacing: '2.2px',
          }}>
            UČÍM SA HROU
          </div>
        </div>

        {/* illustration */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: -50, right: -50, height: 80,
            borderRadius: '50%',
            background: dark
              ? 'radial-gradient(ellipse at center top, #1F4A3E 0%, transparent 65%)'
              : 'radial-gradient(ellipse at center top, #B6E68E 0%, #DFF6BD 50%, transparent 75%)',
          }}/>
          <img
            src="assets/light_background_boy.webp"
            style={{
              height: 230, width: 'auto', objectFit: 'contain',
              position: 'relative',
              filter: 'drop-shadow(0 10px 18px rgba(15,30,55,0.22))',
            }}
            alt=""
          />
        </div>

        {/* bottom sheet */}
        <div style={{
          background: surf,
          borderRadius: '32px 32px 0 0',
          padding: '26px 26px 10px',
          boxShadow: '0 -8px 32px rgba(15,30,55,0.10)',
        }}>
          <h2 style={{
            margin: '0 0 4px', fontSize: 25, fontWeight: 900,
            letterSpacing: '-0.5px', color: ink, textAlign: 'center',
          }}>Vitaj v Alfíkovi! 🌟</h2>
          <p style={{
            margin: '0 0 20px', fontSize: 14, fontWeight: 600,
            color: inkSoft, textAlign: 'center', lineHeight: 1.5,
          }}>
            Vyber si, ako chceš pokračovať
          </p>

          {/* Primary — Prihlásiť sa */}
          <button style={{
            width: '100%', height: 58, borderRadius: 20, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${p.coral} 0%, ${p.sunDeep} 100%)`,
            color: '#fff', fontFamily: 'inherit', fontWeight: 800, fontSize: 17,
            letterSpacing: '0.2px',
            boxShadow: `0 10px 26px -8px ${p.coral}99`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginBottom: 12,
          }}>
            Prihlásiť sa
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
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
            marginBottom: 18,
          }}>
            Vytvoriť účet
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dark ? p.darkInk : p.skyDeep} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </button>

          {/* Ghost — Demo */}
          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: inkSoft, paddingBottom: 4 }}>
            Bez registrácie?{' '}
            <span style={{ color: p.mint, fontWeight: 800 }}>Skús demo zadarmo</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, { SplashScreen, PreMenuScreen, LoginScreen, PhoneFrame, ALFIK_PALETTE });
