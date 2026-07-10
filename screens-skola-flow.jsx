// Alfík — Registrácia cez školu (nový flow)
// Začína rovnako ako free trial (e-mail → overenie kódom), potom:
//  • Výber typu: rola (učiteľ/rodič) + produkt (Alfík/AlfBook) + jazyková verzia
//  • Druhá možnosť: Školská licencia (aktivačný kód od školy) → žiak/učiteľ → formulár
// Formulár školskej licencie bude špecifikovaný neskôr (placeholder screen).

(function () {
  const PRIMARY = '#7DB800';
  const PRIMARY_DEEP = '#5E9600';
  const ACCENT = '#3FA9E0';

  function tok(dark) {
    return {
      ink: dark ? '#F2F7FB' : '#1A2B3D',
      inkSoft: dark ? '#A8B6C8' : '#4A5B6E',
      inkMute: dark ? '#7A8BA0' : '#8194A8',
      line: dark ? 'rgba(90,108,128,0.6)' : 'rgba(190,206,222,0.7)',
      surf: dark ? '#1A2433' : 'rgba(255,255,255,0.96)'
    };
  }

  // ── Icons ──────────────────────────────────────────────────
  const arrowIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  const chevDown = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8194A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
  const keyIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.5 12.5 21 2M17 6l3 3M14 9l2.5 2.5" /></svg>;
  const schoolIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>;
  const userIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>;
  const lockIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
  const eyeIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8194A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>;
  const gradeIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 2 8l10 5 10-5-10-5z" /><path d="M6 10v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>;

  function FtBackRow({ dark, onClick }) {
    const t = tok(dark);
    return (
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, marginBottom: 6, marginLeft: -6, borderRadius: 12, alignSelf: 'flex-start', cursor: onClick ? 'pointer' : 'default' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </div>
    );
  }

  function Pad({ children, scroll, dark }) {
    const bgTop = dark ? '#16335A' : '#D1EBF9';
    const bgMid = dark ? '#1F4570' : '#E6F5FD';
    const bgBot = dark ? '#0E1622' : '#F9FCFE';
    return (
      <div className={scroll ? 'lf-no-sb' : undefined} style={{
        flex: 1, padding: '12px 22px 26px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 55%, ${bgBot} 100%)`,
        overflowY: scroll ? 'auto' : 'hidden', minHeight: 0, position: 'relative'
      }}>
        {children}
      </div>
    );
  }

  // Malá sekundárna sekcia — bordered blok
  function Block({ children, dark, accent }) {
    const t = tok(dark);
    return (
      <div style={{
        background: t.surf, borderRadius: 16, padding: 13,
        border: 'none',
        boxShadow: '0 2px 12px rgba(15,30,55,0.07)',
        display: 'flex', flexDirection: 'column', gap: 9
      }}>
        {children}
      </div>
    );
  }

  function GroupLabel({ children, dark }) {
    const t = tok(dark);
    return <div style={{ fontSize: 12.5, fontWeight: 800, color: t.inkSoft, letterSpacing: '0.2px', margin: '0 2px -2px' }}>{children}</div>;
  }

  // Consent riadok (ako na free trial)
  function ConsentRow({ children, dark }) {
    const t = tok(dark);
    const [checked, setChecked] = React.useState(false);
    return (
      <div onClick={() => setChecked(c => !c)} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '2px 2px', cursor: 'pointer' }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
          background: checked ? ACCENT : 'transparent',
          border: `2px solid ${checked ? ACCENT : 'rgba(129,148,168,0.6)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {checked && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: t.inkSoft, lineHeight: 1.4 }}>{children}</div>
      </div>
    );
  }

  // Radio-štýl dlaždica vedľa seba (2 v riadku) — samostatná biela karta ako na free trial
  function RadioTile({ icon, title, sub, selected, dark, accent, onClick }) {
    const t = tok(dark);
    const ring = accent ? ACCENT : PRIMARY;
    return (
      <div onClick={onClick} style={{
        flex: 1, minWidth: 0, position: 'relative', display: 'flex', alignItems: 'center', gap: 9,
        padding: '12px 12px', borderRadius: 14,
        background: selected ? (accent ? 'rgba(63,169,224,0.10)' : 'rgba(125,184,0,0.12)') : t.surf,
        border: selected ? `2px solid ${ring}` : `2px solid transparent`,
        boxShadow: selected ? 'none' : '0 2px 10px rgba(15,30,55,0.08)',
        cursor: 'pointer'
      }}>
        <div style={{ width: 26, height: 26, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: t.ink, lineHeight: 1.1 }}>{title}</div>
          {sub && <div style={{ fontSize: 11, fontWeight: 600, color: t.inkMute, marginTop: 2, lineHeight: 1.2 }}>{sub}</div>}
        </div>
        <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, border: selected ? 'none' : '2px solid rgba(129,148,168,0.5)', background: selected ? ring : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
      </div>
    );
  }

  // Radio-štýl riadok (ako na free trial)
  function RadioRow({ icon, title, sub, selected, dark, accent }) {
    const t = tok(dark);
    const ring = accent ? ACCENT : PRIMARY;
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: sub ? '11px 13px' : '12px 13px', borderRadius: 13,
        background: selected ? (accent ? 'rgba(63,169,224,0.10)' : 'rgba(125,184,0,0.12)') : (dark ? '#0F1826' : '#F4F8FC'),
        border: selected ? `2px solid ${ring}` : `2px solid transparent`,
        cursor: 'pointer'
      }}>
        <div style={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15.5, fontWeight: 800, color: t.ink, lineHeight: 1.1 }}>{title}</div>
          {sub && <div style={{ fontSize: 12, fontWeight: 600, color: t.inkMute, marginTop: 2, lineHeight: 1.25 }}>{sub}</div>}
        </div>
        <div style={{ width: 23, height: 23, borderRadius: '50%', flexShrink: 0, border: selected ? 'none' : '2px solid rgba(129,148,168,0.5)', background: selected ? ring : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selected && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
      </div>
    );
  }

  // Dve možnosti vedľa seba (rola)
  function Segmented({ options, value, dark }) {
    const t = tok(dark);
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((o) => {
          const sel = o.key === value;
          return (
            <div key={o.key} style={{
              flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 8px', borderRadius: 12,
              background: sel ? 'rgba(125,184,0,0.12)' : (dark ? '#0F1826' : '#F4F8FC'),
              border: sel ? `2px solid ${PRIMARY}` : `2px solid transparent`,
              cursor: 'pointer'
            }}>
              <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{o.icon}</div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: t.ink }}>{o.label}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // Produktové dlaždice
  function ProductTile({ title, sub, icon, selected, dark }) {
    const t = tok(dark);
    return (
      <div style={{
        flex: 1, position: 'relative', padding: '10px 11px', borderRadius: 13,
        background: selected ? 'rgba(125,184,0,0.12)' : (dark ? '#0F1826' : '#F4F8FC'),
        border: selected ? `2px solid ${PRIMARY}` : `2px solid transparent`,
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, cursor: 'pointer'
      }}>
        {selected && (
          <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        )}
        <div style={{ width: 30, height: 30, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: t.ink, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: t.inkMute, marginTop: 2, lineHeight: 1.25 }}>{sub}</div>
        </div>
      </div>
    );
  }

  const roleTeacher = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /><path d="M22 10v5" /></svg>;
  const roleParent = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>;
  const roleStudent = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>;
  const roleTeacher2 = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>;

  const alfikIcon = <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>;
  const alfbookIcon = <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h13" /><path d="M9 7h6" /></svg>;

  // ═══════════════════════════════════════════════════════════
  // SK-03 — Krok 1: Ako chceš pokračovať? (Skúšobná verzia / Školská licencia)
  // ═══════════════════════════════════════════════════════════
  function MethodCard({ icon, title, sub, selected, dark, accent, onClick }) {
    const t = tok(dark);
    const ring = accent ? ACCENT : PRIMARY;
    const tint = accent ? 'rgba(63,169,224,0.10)' : 'rgba(125,184,0,0.12)';
    return (
      <div onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '16px 16px', borderRadius: 16,
        background: selected ? tint : t.surf,
        border: selected ? `2px solid ${ring}` : '2px solid transparent',
        boxShadow: selected ? 'none' : '0 2px 10px rgba(15,30,55,0.08)', cursor: 'pointer'
      }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: t.ink, lineHeight: 1.15 }}>{title}</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: t.inkMute, marginTop: 3, lineHeight: 1.3 }}>{sub}</div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, border: selected ? 'none' : '2px solid rgba(129,148,168,0.5)', background: selected ? ring : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
      </div>
    );
  }

  function SkolaChoiceScreen({ dark = false, nav }) {
    const t = tok(dark);
    const [method, setMethod] = React.useState('trial');
    const trialIcon = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>;
    const licIcon = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.5 12.5 21 2M17 6l3 3M14 9l2.5 2.5" /></svg>;
    return (
      <window.PhoneFrame dark={dark} label="SK-03 Krok 1 — spôsob registrácie">
        <Pad dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 16, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Ako chceš pokračovať?</h1>
            <p style={{ margin: '6px 0 0', color: t.inkSoft, fontSize: 13, fontWeight: 600, lineHeight: 1.45 }}>
              Vyber si spôsob registrácie.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
            <MethodCard dark={dark} accent selected={method === 'trial'} onClick={nav && (() => setMethod('trial'))} icon={trialIcon} title="Skúšobná verzia" sub="Vytvor si vlastné konto a vyskúšaj si produkty EduAlf" />
            <MethodCard dark={dark} accent selected={method === 'lic'} onClick={nav && (() => setMethod('lic'))} icon={licIcon} title="Školská licencia" sub="Zaregistruj sa s prístupovými kódmi od školy" />
          </div>

          <div style={{ flex: 1, minHeight: 16 }} />
          <button onClick={() => nav && (method === 'trial' ? nav.trial && nav.trial() : nav.school && nav.school())} style={{ ...window.loginBtnStyle(), width: "100%" }}>Pokračovať {arrowIcon}</button>
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // SK-03a — Krok 2 (skúšobná verzia): typ konta + produkt + verzia
  // ═══════════════════════════════════════════════════════════
  function SkolaTrialScreen({ dark = false }) {
    const t = tok(dark);
    return (
      <window.PhoneFrame dark={dark} label="SK-03a Skúšobná verzia — typ konta a produkt">
        <Pad scroll dark={dark}>
          <FtBackRow dark={dark} />
          <div style={{ textAlign: 'center', marginTop: 0, marginBottom: 14, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Typ konta a produkt</h1>
            <p style={{ margin: '5px 0 0', color: t.inkSoft, fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
              Vyber si typ konta a produkt.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <GroupLabel dark={dark}>Som</GroupLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <RadioTile dark={dark} selected icon={roleTeacher} title="Učiteľ" />
              <RadioTile dark={dark} icon={roleParent} title="Rodič" />
            </div>

            <GroupLabel dark={dark}>Produkt</GroupLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <RadioTile dark={dark} selected icon={alfikIcon} title="Alfík" sub="Cvičenia pre materskú školu" />
              <RadioTile dark={dark} icon={alfbookIcon} title="AlfBook" sub="Testy pre základnú školu" />
            </div>

            <GroupLabel dark={dark}>Jazyková verzia</GroupLabel>
            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="" value="Slovenská verzia (SK)" icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
              } trailing={chevDown} dark={dark} />
            </window.LoginFieldBlock>

            <button style={{ ...window.loginBtnStyle(), height: 52, width: "100%", marginTop: 6 }}>Pokračovať {arrowIcon}</button>
          </div>
          <div style={{ height: 4, flexShrink: 0 }} />
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // SK-03b — Krok 2 (školská licencia): žiak / učiteľ
  // ═══════════════════════════════════════════════════════════
  function SkolaLicenseRoleScreen({ dark = false, nav }) {
    const t = tok(dark);
    const [role, setRole] = React.useState('ziak');
    return (
      <window.PhoneFrame dark={dark} label="SK-03b Školská licencia — žiak/učiteľ">
        <Pad dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 14 }}>
            <div style={{ width: 66, height: 66, borderRadius: '50%', background: 'rgba(63,169,224,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.5 12.5 21 2M17 6l3 3M14 9l2.5 2.5" /></svg>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Školská licencia</h1>
            <p style={{ margin: '6px 0 0', color: t.inkSoft, fontSize: 13, fontWeight: 600, lineHeight: 1.45 }}>
              Registruješ sa ako žiak alebo učiteľ?
            </p>
          </div>

          <GroupLabel dark={dark}>Registrujem sa ako</GroupLabel>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <RadioTile dark={dark} accent selected={role === 'ziak'} onClick={nav && (() => setRole('ziak'))} icon={roleStudent} title="Žiak" />
            <RadioTile dark={dark} accent selected={role === 'ucitel'} onClick={nav && (() => setRole('ucitel'))} icon={roleTeacher2} title="Učiteľ" />
          </div>

          <button onClick={() => nav && nav.next && nav.next(role)} style={{ ...window.loginBtnStyle(), width: '100%', marginTop: 20 }}>Pokračovať {arrowIcon}</button>
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // SK-04 — Školská licencia → registračný formulár
  // ═══════════════════════════════════════════════════════════
  function SkolaFormScreen({ dark = false, nav }) {
    const t = tok(dark);
    return (
      <window.PhoneFrame dark={dark} label="SK-04 Školská licencia — formulár">
        <Pad scroll dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 16, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Školská licencia</h1>
            <p style={{ margin: '6px 0 0', color: t.inkSoft, fontSize: 13, fontWeight: 600, lineHeight: 1.45 }}>
              Zadaj kódy od školy a vytvor si konto žiaka.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <FtFieldLabel dark={dark}>Prístup od školy</FtFieldLabel>
            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="Kód žiaka *" value="ALF-2026-••••" icon={keyIcon} dark={dark} />
            </window.LoginFieldBlock>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: -7, paddingLeft: 4 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: ACCENT, lineHeight: 1.35 }}>
                Základná škola Lipová, <span style={{ fontWeight: 600, color: ACCENT }}>Lipová 12, 949 01 Nitra</span>
              </div>
            </div>
            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="Meno *" icon={userIcon} dark={dark} />
              <window.LoginField compact label="Priezvisko *" icon={userIcon} dark={dark} />
              <window.LoginField compact label="Ročník *" value="1. ročník" icon={gradeIcon} trailing={chevDown} dark={dark} />
            </window.LoginFieldBlock>

            <FtFieldLabel dark={dark}>Heslo</FtFieldLabel>
            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="Heslo *" value="••••••••" icon={lockIcon} trailing={eyeIcon} dark={dark} />
              <window.LoginField compact label="Potvrď heslo *" value="••••••••" icon={lockIcon} trailing={eyeIcon} dark={dark} />
            </window.LoginFieldBlock>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4, flexShrink: 0 }}>
              <ConsentRow checked dark={dark}>Súhlasím so spracovaním osobných údajov (<span style={{ color: ACCENT, fontWeight: 800 }}>GDPR</span>) *</ConsentRow>
              <ConsentRow dark={dark}>Súhlasím so zasielaním reklamných e-mailov</ConsentRow>
            </div>
          </div>

          <div style={{ flexShrink: 0, paddingTop: 14, paddingBottom: 6 }}>
            <button onClick={() => nav && nav.done && nav.done()} style={{ ...window.loginBtnStyle(), width: "100%" }}>Zaregistrovať sa {arrowIcon}</button>
          </div>
        </Pad>
      </window.PhoneFrame>
    );
  }

  // form label helper
  function FtFieldLabel({ children, dark }) {
    const t = tok(dark);
    return <div style={{ fontSize: 12.5, fontWeight: 800, color: t.inkSoft, letterSpacing: '0.2px', margin: '0 4px -3px' }}>{children}</div>;
  }

  // ═══════════════════════════════════════════════════════════
  // SK-04b — Školská licencia → registračný formulár (učiteľ)
  // ═══════════════════════════════════════════════════════════
  function SkolaFormTeacherScreen({ dark = false, nav }) {
    const t = tok(dark);
    return (
      <window.PhoneFrame dark={dark} label="SK-04b Školská licencia — formulár (učiteľ)">
        <Pad scroll dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 16, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Školská licencia</h1>
            <p style={{ margin: '6px 0 0', color: t.inkSoft, fontSize: 13, fontWeight: 600, lineHeight: 1.45 }}>
              Zadaj kódy od školy a vytvor si konto učiteľa.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <FtFieldLabel dark={dark}>Prístup od školy</FtFieldLabel>
            <div style={{ borderRadius: 12, boxShadow: '0 0 0 2px #E5484D' }}>
              <window.LoginFieldBlock dark={dark}>
                <window.LoginField compact label="Kód učiteľa *" value="ALF-2026-••••" icon={keyIcon} dark={dark} />
              </window.LoginFieldBlock>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: -3, paddingLeft: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#E5484D', lineHeight: 1.35 }}>Kód učiteľa je nesprávny</div>
            </div>

            <FtFieldLabel dark={dark}>Údaje učiteľa</FtFieldLabel>
            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="Meno *" icon={userIcon} dark={dark} />
              <window.LoginField compact label="Priezvisko *" icon={userIcon} dark={dark} />
            </window.LoginFieldBlock>

            <FtFieldLabel dark={dark}>Heslo</FtFieldLabel>
            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="Heslo *" value="••••••••" icon={lockIcon} trailing={eyeIcon} dark={dark} />
              <window.LoginField compact label="Potvrď heslo *" value="••••••••" icon={lockIcon} trailing={eyeIcon} dark={dark} />
            </window.LoginFieldBlock>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4, flexShrink: 0 }}>
              <ConsentRow checked dark={dark}>Súhlasím so spracovaním osobných údajov (<span style={{ color: ACCENT, fontWeight: 800 }}>GDPR</span>) *</ConsentRow>
              <ConsentRow dark={dark}>Súhlasím so zasielaním reklamných e-mailov</ConsentRow>
            </div>
          </div>

          <div style={{ flexShrink: 0, paddingTop: 14, paddingBottom: 6 }}>
            <button onClick={() => nav && nav.done && nav.done()} style={{ ...window.loginBtnStyle(), width: "100%" }}>Zaregistrovať sa {arrowIcon}</button>
          </div>
        </Pad>
      </window.PhoneFrame>
    );
  }

  Object.assign(window, {
    SkolaChoiceScreen,
    SkolaTrialScreen,
    SkolaLicenseRoleScreen,
    SkolaFormScreen,
    SkolaFormTeacherScreen
  });
})();
