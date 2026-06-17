// Alfík — Môj profil (5 tabs)
// Layout adapted from tablet screenshots for the mobile viewport.

const PROFILE_TABS = [
  { id: 'zakladne', label: 'ZÁKLADNÉ',  icon: 'user'    },
  { id: 'heslo',    label: 'HESLO',     icon: 'lock'    },
  { id: 'ucitel',   label: 'UČITEĽ',    icon: 'key'     },
  { id: 'ziak',     label: 'ŽIAK',      icon: 'cap'     },
  { id: 'gdpr',     label: 'GDPR',      icon: 'shield'  }
];

function ProfileTabIcon({ id, color, size = 22 }) {
  const s = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'user') return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    </svg>
  );
  if (id === 'lock') return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
      <rect x="5" y="11" width="14" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  );
  if (id === 'key') return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
      <circle cx="8" cy="15" r="4"/>
      <path d="M11 12l9-9M16 8l3 3"/>
    </svg>
  );
  if (id === 'cap') return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
      <path d="M2 9l10-5 10 5-10 5L2 9z"/>
      <path d="M6 11v5c3 2 9 2 12 0v-5"/>
    </svg>
  );
  if (id === 'shield') return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>
      <circle cx="12" cy="11" r="2.2"/>
      <path d="M13.6 12.7L15.5 14.5"/>
    </svg>
  );
  return null;
}

// ─────────────────────────────────────────────────────────────
// Common chrome — vlastný topbar: Ema vľavo, titulok v strede, krížik vpravo
// ─────────────────────────────────────────────────────────────
function ProfileTopBar({ dark }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  return (
    <div style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', padding: '6px 18px 14px',
      minHeight: 58,
      background: dark
        ? 'linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(15,30,55,0.30) 70%, rgba(15,30,55,0) 100%)'
        : 'transparent'
    }}>
      {/* Centered title */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 6, bottom: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        fontSize: 19, fontWeight: 800, letterSpacing: '-0.2px',
        fontFamily: '"Dosis", sans-serif', color: ink
      }}>Môj profil</div>

      {/* Left: back button */}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
        <button title="Späť" style={{
          width: 38, height: 38, borderRadius: 14,
          border: 'none',
          background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, flexShrink: 0, cursor: 'pointer'
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
  );
}


function ProfileTabs({ active, dark }) {
  const p = ALFIK_PALETTE;
  const accent = (window.QUASAR && window.QUASAR.primary) || '#8FD400';
  const inkSoft = dark ? p.darkInkSoft : p.inkSoft;
  return (
    <div style={{
      background: dark ? 'rgba(15,30,55,0.45)' : 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,30,55,0.06)'}`,
      position: 'relative'
    }}>
      {PROFILE_TABS.map(t => {
        const isActive = t.id === active;
        return (
          <div key={t.id} style={{
            padding: '10px 4px 8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            position: 'relative',
            cursor: 'pointer'
          }}>
            <ProfileTabIcon id={t.icon} color={isActive ? accent : (dark ? inkSoft : '#6A7A8F')} size={22}/>
            <div style={{
              fontSize: 10.5, fontWeight: 800,
              color: isActive ? accent : (dark ? inkSoft : '#6A7A8F'),
              fontFamily: '"Dosis", sans-serif',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>{t.label}</div>
            {isActive && (
              <div style={{
                position: 'absolute', left: '12%', right: '12%', bottom: -1,
                height: 3, borderRadius: 2, background: accent
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProfileFrame({ children, dark, label, activeTab }) {
  return (
    <PhoneFrame dark={dark} label={label}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: dark
          ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
          : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)',
        overflow: 'hidden'
      }}>
        <ProfileTopBar dark={dark}/>
        <ProfileTabs dark={dark} active={activeTab}/>
        <div data-scroll-area style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 24px' }}>
          {children}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function ProfileCard({ children, dark, style }) {
  const p = ALFIK_PALETTE;
  return (
    <div style={{
      background: dark ? p.darkSurf : '#FFFFFF',
      borderRadius: 18,
      padding: '18px 16px',
      border: dark ? `1px solid ${p.darkLine}` : 'none',
      boxShadow: dark ? 'none' : '0 2px 4px 0 rgba(15,30,55,0.06)',
      ...style
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, dark }) {
  const p = ALFIK_PALETTE;
  return (
    <div style={{
      fontSize: 19, fontWeight: 800,
      color: dark ? p.darkInk : p.ink,
      fontFamily: '"Dosis", sans-serif',
      letterSpacing: '-0.2px',
      marginBottom: 10
    }}>{children}</div>
  );
}

function MaterialInput({ label, value, icon, dark, suffix }) {
  const p = ALFIK_PALETTE;
  const Q = window.QUASAR || p;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const surf = dark ? p.darkSurf : p.surface || '#FFFFFF';
  const line = dark ? p.darkLine : p.line || 'rgba(15,30,55,0.08)';
  return (
    <div>
      {label && (
        <div style={{
          fontSize: 10, fontWeight: 700, color: inkSoft,
          marginBottom: 3, letterSpacing: '0.3px',
          textTransform: 'uppercase', fontFamily: '"Dosis", sans-serif'
        }}>{label}</div>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: surf, height: 40, borderRadius: 10, padding: '0 10px',
        border: `1.5px solid ${line}`,
        boxShadow: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s'
      }}>
        {icon && (
          <span style={{
            display: 'flex', width: 24, height: 24, borderRadius: 7,
            background: dark ? p.darkBg : '#F2F7FB',
            alignItems: 'center', justifyContent: 'center',
            color: inkSoft, flexShrink: 0
          }}>
            {icon}
          </span>
        )}
        <div style={{
          flex: 1, fontSize: 14, fontWeight: 600,
          color: value ? ink : inkSoft,
          fontFamily: '"Dosis", sans-serif',
          minWidth: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}>{value || '\u00A0'}</div>
        {suffix}
      </div>
    </div>
  );
}

function PillButton({ children, variant = 'primary', size = 'md', dark, onClick, icon }) {
  const p = ALFIK_PALETTE;
  const Q = window.QUASAR || p;
  // Quasar variants: primary (hlavná akcia), secondary (Späť/Zrušiť),
  // accent (prepínače), negative (mazanie), text (linka), ghost (outline)
  const styles = {
    primary:   { bg: `linear-gradient(135deg, ${Q.primary} 0%, ${Q.primaryDeep} 100%)`, color: '#FFFFFF', border: 'transparent' },
    secondary: { bg: 'transparent', color: Q.accent, border: Q.accent },
    accent:    { bg: `linear-gradient(135deg, ${Q.accent} 0%, ${Q.accentDeep} 100%)`, color: '#FFFFFF', border: 'transparent' },
    negative:  { bg: 'transparent', color: Q.negative, border: Q.negative },
    // Legacy aliases (backward compat with older screen code)
    success:   { bg: `linear-gradient(135deg, ${Q.primary} 0%, ${Q.primaryDeep} 100%)`, color: '#FFFFFF', border: 'transparent' },
    outline:   { bg: 'transparent', color: Q.primary, border: Q.primary },
    ghost:     { bg: 'transparent', color: dark ? p.darkInkSoft : '#9FB1C6', border: dark ? p.darkLine : 'rgba(15,30,55,0.18)' },
    text:      { bg: 'transparent', color: dark ? p.darkInkSoft : '#6A7A8F', border: 'transparent' }
  };
  const sizes = {
    sm: { padding: '6px 11px', fontSize: 11, gap: 6 },
    md: { padding: '11px 18px', fontSize: 13, gap: 8 }
  };
  const v = styles[variant];
  const s = sizes[size] || sizes.md;
  const isFilled = variant === 'primary' || variant === 'success' || variant === 'accent';
  return (
    <button onClick={onClick} style={{
      background: v.bg, color: v.color,
      border: v.border === 'transparent' ? 'none' : `1.5px solid ${v.border}`,
      padding: s.padding,
      fontSize: s.fontSize, fontWeight: 800, letterSpacing: '0.8px',
      fontFamily: '"Dosis", sans-serif',
      borderRadius: 10,
      cursor: 'pointer',
      textTransform: 'uppercase',
      display: 'inline-flex', alignItems: 'center', gap: s.gap,
      boxShadow: isFilled ? '0 2px 4px rgba(15,30,55,0.18)' : 'none'
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. Základné údaje
// ─────────────────────────────────────────────────────────────
function ProfileZakladneScreen({ dark = false, subscribed = true }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  return (
    <ProfileFrame dark={dark} label="07 Profil — Základné údaje" activeTab="zakladne">
      <SectionLabel dark={dark}>Základné údaje</SectionLabel>
      <ProfileCard dark={dark}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #fff',
            boxShadow: '0 6px 14px -4px rgba(139,124,246,0.5)'
          }}>
            <img src="assets/alfik_world_banner.png" alt="profil" style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: '72% 10%'
            }}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: inkSoft, fontFamily: '"Dosis", sans-serif', marginBottom: 4 }}>Profilová fotka</div>
            <PillButton dark={dark} variant="secondary" size="sm"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              }>
              Vybrať fotografiu
            </PillButton>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <MaterialInput dark={dark} label="E-mail *" value="admin@betaalf.com"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>}/>
          <MaterialInput dark={dark} label="Meno *" value="System"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>}/>
          <MaterialInput dark={dark} label="Priezvisko *" value="Admin"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>}/>
          <div>
            <MaterialInput dark={dark} label="Telefón" value=""
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2L8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2-.4c.9.3 1.8.5 2.7.6A2 2 0 0 1 22 16.9z"/></svg>}/>
            <div style={{ fontSize: 11, color: inkSoft, fontFamily: '"Dosis", sans-serif', marginTop: 6, marginLeft: 12 }}>
              Formát: +421 XXX XXX XXX
            </div>
          </div>
          <MaterialInput dark={dark} label="Jazyk *" value="Slovenčina"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>}
            suffix={
              <svg width="14" height="14" viewBox="0 0 24 24" fill={inkSoft}><path d="M7 10l5 5 5-5z"/></svg>
            }/>
        </div>

        <div data-checkbox="subscribed" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, paddingTop: 16, borderTop: `1px solid ${dark ? p.darkLine : 'rgba(15,30,55,0.06)'}`, cursor: 'pointer' }}>
          <div style={{
            width: 22, height: 22, borderRadius: 4,
            background: subscribed ? (window.QUASAR||p).accent : 'transparent',
            border: subscribed ? 'none' : `2px solid ${dark ? p.darkLine : 'rgba(15,30,55,0.30)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .15s ease, border-color .15s ease'
          }}>
            {subscribed && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            )}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: ink, fontFamily: '"Dosis", sans-serif' }}>
            Zasielať priebežné výsledky súťaží
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22 }}>
          <PillButton dark={dark} variant="primary"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>}
          >Uložiť zmeny</PillButton>
          <PillButton dark={dark} variant="secondary">Zrušiť</PillButton>
        </div>
      </ProfileCard>
    </ProfileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Zmena hesla
// ─────────────────────────────────────────────────────────────
function ProfileHesloScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const lockIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>;
  return (
    <ProfileFrame dark={dark} label="07b Profil — Zmena hesla" activeTab="heslo">
      <SectionLabel dark={dark}>Zmena hesla</SectionLabel>
      <ProfileCard dark={dark} style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 22 }}>
          <MaterialInput dark={dark} label="" value="Staré heslo" icon={lockIcon}/>
          <MaterialInput dark={dark} label="" value="Nové heslo" icon={lockIcon}/>
          <MaterialInput dark={dark} label="" value="Potvrdiť nové heslo" icon={lockIcon}/>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <PillButton dark={dark} variant="primary">Zmeniť heslo</PillButton>
          <PillButton dark={dark} variant="secondary">Zrušiť</PillButton>
        </div>
      </ProfileCard>

      <ProfileCard dark={dark} style={{ background: dark ? 'rgba(63,169,224,0.12)' : '#FFFFFF', borderColor: dark ? 'rgba(63,169,224,0.30)' : '#3FA9E0', borderWidth: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: '#3FA9E0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: '"Dosis", sans-serif',
            flexShrink: 0
          }}>i</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: ink, fontFamily: '"Dosis", sans-serif' }}>
            Požiadavky na heslo
          </div>
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, color: ink, fontSize: 13.5, fontWeight: 500, fontFamily: '"Dosis", sans-serif', lineHeight: 1.55 }}>
          <li>Heslo musí mať aspoň 8 znakov</li>
          <li style={{ marginTop: 4 }}>Odporúčame používať kombináciu veľkých a malých písmen, čísiel a špeciálnych znakov</li>
          <li style={{ marginTop: 4 }}>Nepoužívajte jednoduché heslá ako „12345678“ alebo „password“</li>
        </ul>
      </ProfileCard>
    </ProfileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Licence card
// ─────────────────────────────────────────────────────────────
function LicenceCard({ dark, name, logo, active, dateText, primaryAction = 'O PRODUKTE', secondaryAction = 'OBJEDNAŤ' }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  const Q = window.QUASAR || p;
  const borderColor = active ? Q.primary : (dark ? p.darkLine : 'rgba(15,30,55,0.15)');
  return (
    <div style={{
      background: dark ? p.darkSurf : '#FFFFFF',
      border: active ? `2px solid ${borderColor}` : `2px dashed ${borderColor}`,
      borderRadius: 12,
      padding: '14px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 10,
      position: 'relative'
    }}>
      <div style={{
        fontSize: 13, fontWeight: 800, letterSpacing: '1px',
        color: inkSoft, textTransform: 'uppercase',
        fontFamily: '"Dosis", sans-serif',
        textAlign: 'center'
      }}>{name}</div>

      <div style={{
        height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: inkSoft, fontFamily: 'monospace'
      }}>{logo}</div>

      <div style={{
        width: 36, height: 28, margin: '0 auto',
        borderRadius: 7,
        background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,30,55,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/>
          <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>
        </svg>
      </div>

      <div style={{
        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(15,30,55,0.04)',
        borderRadius: 8,
        padding: '10px 8px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        <div style={{ fontSize: 10.5, color: inkSoft, fontFamily: '"Dosis", sans-serif', fontWeight: 600 }}>
          Platnosť prístupu do
        </div>
        <div style={{
          fontSize: 13, fontWeight: 800,
          color: active ? ink : inkSoft,
          fontFamily: '"Dosis", sans-serif'
        }}>{dateText}</div>
      </div>

      {active ? (
        <button style={{
          background: `linear-gradient(135deg, ${Q.primary} 0%, ${Q.primaryDeep} 100%)`,
          color: '#FFFFFF', border: 'none',
          borderRadius: 10, padding: '9px 0',
          fontSize: 12, fontWeight: 800, letterSpacing: '0.6px',
          fontFamily: '"Dosis", sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: 'pointer',
          textTransform: 'uppercase',
          boxShadow: '0 3px 8px -2px rgba(114,182,0,0.55)'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
          Videonávody
        </button>
      ) : (
        <>
          <button style={{
            background: 'transparent',
            color: Q.primary,
            border: `1.5px solid ${Q.primary}`,
            borderRadius: 10, padding: '7px 0',
            fontSize: 11.5, fontWeight: 800, letterSpacing: '0.6px',
            fontFamily: '"Dosis", sans-serif',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}>{primaryAction}</button>
          <button style={{
            background: Q.accent,
            color: '#FFFFFF', border: 'none',
            borderRadius: 10, padding: '7px 0',
            fontSize: 11.5, fontWeight: 800, letterSpacing: '0.6px',
            fontFamily: '"Dosis", sans-serif',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}>{secondaryAction}</button>
        </>
      )}
    </div>
  );
}

function BrandLogo({ name }) {
  if (name === 'ALFPÉDIA' || name === 'DOMÁCE ÚLOHY') return (
    <img src="assets/alfpedia_logo.svg" alt={name}
      style={{ maxWidth: '100%', maxHeight: 50, objectFit: 'contain', display: 'block' }} />
  );
  if (name === 'ALFBOOK') return (
    <img src="assets/alfbook_logo.svg" alt={name}
      style={{ maxWidth: '100%', maxHeight: 50, objectFit: 'contain', display: 'block' }} />
  );
  if (name === 'ALFÍK') return (
    <img src="assets/alfik_logo.svg" alt={name}
      style={{ maxWidth: '100%', maxHeight: 50, objectFit: 'contain', display: 'block' }} />
  );
  if (name === 'ALF FAMILY') return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span style={{ fontSize: 18, fontWeight: 900, fontFamily: '"Dosis", sans-serif', color: '#1A2B3D' }}>Alf</span>
      <svg width="12" height="16" viewBox="0 0 24 32"><path d="M6 8a6 6 0 0 1 12 0c0 4-6 5-6 9M12 24v2" stroke="#FFB400" strokeWidth="3.5" strokeLinecap="round" fill="none"/></svg>
      <span style={{ fontSize: 11, fontWeight: 800, fontFamily: '"Dosis", sans-serif', color: '#1A2B3D', marginLeft: 1 }}>family</span>
      <svg width="22" height="22" viewBox="0 0 32 32" style={{ marginLeft: 2 }}>
        <circle cx="16" cy="6" r="3" fill="#3FA9E0"/>
        <circle cx="6" cy="20" r="3" fill="#3FA9E0"/>
        <circle cx="26" cy="20" r="3" fill="#3FA9E0"/>
        <circle cx="11" cy="26" r="2.5" fill="#3FA9E0"/>
        <circle cx="21" cy="26" r="2.5" fill="#3FA9E0"/>
        <path d="M16 8L7 18M16 8l9 10M9 21l3 4M23 21l-3 4" stroke="#3FA9E0" strokeWidth="1.5"/>
      </svg>
    </div>
  );
  return name;
}

// ─────────────────────────────────────────────────────────────
// 3. Prístup učiteľa
// ─────────────────────────────────────────────────────────────
function ProfileUcitelScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  return (
    <ProfileFrame dark={dark} label="07c Profil — Prístup učiteľa" activeTab="ucitel">
      <SectionLabel dark={dark}>Prístup učiteľa</SectionLabel>

      <ProfileCard dark={dark} style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: inkSoft, fontFamily: '"Dosis", sans-serif', marginBottom: 14 }}>
          Prístupové údaje
        </div>

        <AccessRow dark={dark} label="Kód školy" sub="Pre prihlásenie" code="adminaccount"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/></svg>}/>

        <div style={{ height: 1, background: dark ? p.darkLine : 'rgba(15,30,55,0.06)', margin: '14px 0' }} />

        <AccessRow dark={dark} label="Kód učiteľa" sub="Pre registráciu nového učiteľa" code="12345"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M9 10h6M9 14h4"/></svg>}/>

        <div style={{ height: 1, background: dark ? p.darkLine : 'rgba(15,30,55,0.06)', margin: '14px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: inkSoft, fontFamily: '"Dosis", sans-serif' }}>Administrátor školy</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: ink, fontFamily: '"Dosis", sans-serif', marginTop: 2 }}>System Admin</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4, color: '#3FA9E0', fontSize: 13, fontWeight: 700, fontFamily: '"Dosis", sans-serif' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
              Napísať e-mail
            </div>
          </div>
        </div>
      </ProfileCard>

      <SectionLabel dark={dark}>Licencie</SectionLabel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <LicenceCard dark={dark} name="ALFPÉDIA" active dateText="04.01.2031" logo={<BrandLogo name="ALFPÉDIA"/>} />
        <LicenceCard dark={dark} name="ALFBOOK" dateText="Neaktívne" logo={<BrandLogo name="ALFBOOK"/>} />
        <LicenceCard dark={dark} name="ALFÍK" dateText="Neaktívne" logo={<BrandLogo name="ALFÍK"/>} />
        <LicenceCard dark={dark} name="ALF FAMILY" dateText="Neaktívne" logo={<BrandLogo name="ALF FAMILY"/>} />
      </div>
    </ProfileFrame>
  );
}

function AccessRow({ dark, label, sub, code, icon }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: ink, fontFamily: '"Dosis", sans-serif' }}>{label}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: inkSoft, fontFamily: '"Dosis", sans-serif', marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{
        background: '#D6ECF8',
        color: '#3FA9E0',
        padding: '6px 12px',
        borderRadius: 10,
        fontFamily: 'monospace, monospace',
        fontSize: 13, fontWeight: 700,
        letterSpacing: '1px'
      }}>{code}</div>
      <button style={{
        width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Prístup žiaka
// ─────────────────────────────────────────────────────────────
function ProfileZiakScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  return (
    <ProfileFrame dark={dark} label="07d Profil — Prístup žiaka" activeTab="ziak">
      <SectionLabel dark={dark}>Prístup žiaka</SectionLabel>

      <ProfileCard dark={dark} style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: inkSoft, fontFamily: '"Dosis", sans-serif', marginBottom: 14 }}>
          Prístupové údaje
        </div>
        <AccessRow dark={dark} label="Kód školy" sub="Kód pre prihlásenie" code="adminaccount"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/></svg>}/>
      </ProfileCard>

      <SectionLabel dark={dark}>Licencie</SectionLabel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <LicenceCard dark={dark} name="ALFBOOK" dateText="Neaktívne" logo={<BrandLogo name="ALFBOOK"/>} />
        <LicenceCard dark={dark} name="ALFÍK" dateText="Neaktívne" logo={<BrandLogo name="ALFÍK"/>} />
        <LicenceCard dark={dark} name="DOMÁCE ÚLOHY" dateText="Neaktívne" logo={<BrandLogo name="DOMÁCE ÚLOHY"/>} />
      </div>
    </ProfileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. GDPR
// ─────────────────────────────────────────────────────────────
function ProfileGdprScreen({ dark = false }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : p.ink;
  const inkSoft = dark ? p.darkInkSoft : '#6A7A8F';
  return (
    <ProfileFrame dark={dark} label="07e Profil — GDPR" activeTab="gdpr">
      <SectionLabel dark={dark}>GDPR</SectionLabel>

      <ProfileCard dark={dark} style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: ink, fontFamily: '"Dosis", sans-serif', marginBottom: 18 }}>
          Ochrana osobných údajov
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 36, flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 2 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>
              <circle cx="12" cy="11" r="2.2"/>
              <path d="M13.6 12.7L15.5 14.5"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: ink, fontFamily: '"Dosis", sans-serif', marginBottom: 6 }}>
              Podmienky ochrany osobných údajov
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: inkSoft, fontFamily: '"Dosis", sans-serif', lineHeight: 1.45, marginBottom: 12 }}>
              Prečítajte si naše zásady ochrany osobných údajov a podmienky používania služieb.
            </div>
            <PillButton dark={dark} variant="ghost"
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14L21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>}
            >Zobraziť podmienky</PillButton>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ width: 36, flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 2 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <path d="M7 10l5 5 5-5M12 15V3"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: ink, fontFamily: '"Dosis", sans-serif', marginBottom: 6 }}>
              Stiahnite si svoje osobné údaje
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: inkSoft, fontFamily: '"Dosis", sans-serif', lineHeight: 1.45, marginBottom: 12 }}>
              Podľa GDPR máte právo získať kópiu všetkých osobných údajov, ktoré o vás spracovávame.
            </div>
            <PillButton dark={dark} variant="primary"
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>}
            >Stiahnuť údaje</PillButton>
          </div>
        </div>
      </ProfileCard>

      <ProfileCard dark={dark} style={{
        background: dark ? 'rgba(63,169,224,0.08)' : '#EAF4FB',
        borderColor: dark ? p.darkLine : 'rgba(63,169,224,0.20)'
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#3FA9E0',
            color: '#fff', fontSize: 16, fontWeight: 800,
            fontFamily: '"Dosis", sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>i</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: ink, fontFamily: '"Dosis", sans-serif', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 800 }}>Poznámka:</span> V prípade akýchkoľvek otázok týkajúcich sa spracovania vašich osobných údajov alebo odstránenia vášho účtu nás neváhajte kontaktovať na adrese{' '}
            <span style={{ color: '#3FA9E0', textDecoration: 'underline', fontWeight: 700 }}>info@interaktivnaskola.sk</span>.
          </div>
        </div>
      </ProfileCard>
    </ProfileFrame>
  );
}

Object.assign(window, {
  ProfileZakladneScreen,
  ProfileHesloScreen,
  ProfileUcitelScreen,
  ProfileZiakScreen,
  ProfileGdprScreen
});
