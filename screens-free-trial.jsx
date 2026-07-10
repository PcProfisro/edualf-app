// Alfík — Free trial / registračný flow
// Adaptované zo samostatného "Free trial - flow.html" do zdieľaného PhoneFrame.
// Každá obrazovka je renderovaná vo <window.PhoneFrame>, aby zapadla do design canvasu.

(function () {
  const P = window.ALFIK_PALETTE || {};
  const PRIMARY = '#7DB800';
  const PRIMARY_DEEP = '#5E9600';
  const ACCENT = '#3FA9E0';

  // Dark-aware token helper
  function tok(dark) {
    return {
      ink: dark ? '#F2F7FB' : '#1A2B3D',
      inkSoft: dark ? '#A8B6C8' : '#4A5B6E',
      inkMute: dark ? '#7A8BA0' : '#8194A8',
      line: dark ? 'rgba(90,108,128,0.6)' : 'rgba(190,206,222,0.7)',
      surf: dark ? '#1A2433' : 'rgba(255,255,255,0.94)',
      fieldBorder: dark ? 'rgba(70,86,106,0.55)' : 'rgba(200,215,230,0.4)'
    };
  }

  // ── Icons ──────────────────────────────────────────────────
  const arrowIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  const mailIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 7l9 6 9-6" /></svg>;
  const userIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>;
  const schoolIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>;
  const lockIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
  const eyeIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8194A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>;
  const pinIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
  const gradeIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 2 8l10 5 10-5-10-5z" /><path d="M6 10v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>;
  const chevDown = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8194A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;

  // ── Field helpers (zdieľané so screens.jsx — window.LoginField / window.LoginFieldBlock) ──

  function FtBackRow({ dark, onClick }) {
    const t = tok(dark);
    return (
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, marginBottom: 6, marginLeft: -6, borderRadius: 12, alignSelf: 'flex-start', cursor: onClick ? 'pointer' : 'default' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.inkSoft} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </div>
    );
  }

  function FtLogo({ size = 132 }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 16 }}>
        <img src="assets/logo_edu_alf.svg" style={{ width: size, height: 'auto', filter: 'drop-shadow(0 4px 10px rgba(15,30,55,0.12))' }} alt="Alfík" />
      </div>
    );
  }

  // Padded content wrapper matching other screens (rovnaké pozadie ako Prihlásenie)
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

  // ═══════════════════════════════════════════════════════════
  // 1 — Zadaj e-mail
  // ═══════════════════════════════════════════════════════════
  function FreeTrialEmailScreen({ dark = false, nav }) {
    const t = tok(dark);
    return (
      <window.PhoneFrame dark={dark} label="FT-01 Free trial — e-mail">
        <Pad dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <FtLogo />
          <h1 style={{ margin: 0, fontSize: 25, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center', color: t.ink }}>Registrujte sa</h1>
          <p style={{ margin: '8px 0 24px', textAlign: 'center', color: t.inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
            Zadaj svoj e-mail a vytvor si konto. Pošleme ti naň overovací kód.
          </p>
          <window.LoginFieldBlock dark={dark}>
            <window.LoginField label="E-mail" value="skola@email.com" icon={mailIcon} dark={dark} />
          </window.LoginFieldBlock>
          <button onClick={() => nav && nav.next && nav.next()} style={{ ...window.loginBtnStyle(), width: "100%", marginTop: 20 }}>Odoslať kód {arrowIcon}</button>
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 2 — Verifikácia kódom (OTP)
  // ═══════════════════════════════════════════════════════════
  function FreeTrialCodeScreen({ dark = false, nav }) {
    const t = tok(dark);
    const code = ['5', '2', '8', '', '', ''];
    return (
      <window.PhoneFrame dark={dark} label="FT-02 Free trial — overenie kódu">
        <Pad dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: dark ? '#1A2433' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px -8px rgba(15,30,55,0.25)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3" /><path d="M2 7l10 6 10-6" /></svg>
            </div>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.3px', textAlign: 'center', color: t.ink }}>Skontroluj si e-mail 📬</h1>
          <p style={{ margin: '8px 0 24px', textAlign: 'center', color: t.inkSoft, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
            Zadaj 6-miestny kód, ktorý sme poslali na<br /><strong style={{ color: t.ink }}>skola@email.com</strong>
          </p>
          <div style={{ display: 'flex', gap: 9, justifyContent: 'center', marginBottom: 24 }}>
            {code.map((d, i) => {
              const active = i === 3;
              return (
                <div key={i} style={{
                  width: 44, height: 54, borderRadius: 12, background: t.surf,
                  border: `2px solid ${active ? PRIMARY : t.line}`,
                  boxShadow: active ? `0 0 0 3px rgba(125,184,0,0.20)` : '0 1px 4px rgba(15,30,55,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 23, fontWeight: 800, color: t.ink, position: 'relative'
                }}>
                  {d}
                  {active && <span style={{ position: 'absolute', width: 2, height: 24, background: PRIMARY, borderRadius: 1 }} />}
                </div>
              );
            })}
          </div>
          <button onClick={() => nav && nav.next && nav.next()} style={{ ...window.loginBtnStyle(), width: "100%" }}>Overiť kód
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          </button>
          <div style={{ flex: 1 }} />
          <p style={{ margin: 0, textAlign: 'center', color: t.inkSoft, fontSize: 13, fontWeight: 600 }}>
            Neprišiel kód? <span style={{ color: t.inkMute, fontWeight: 700, opacity: 0.6 }}>Poslať znova (0:42)</span>
          </p>
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 3 — Výber typu konta
  // ═══════════════════════════════════════════════════════════
  function FtChoiceCard({ icon, title, sub, selected, dark }) {
    const t = tok(dark);
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '16px 16px', borderRadius: 16,
        background: selected ? 'rgba(125,184,0,0.12)' : t.surf,
        border: selected ? `2px solid ${PRIMARY}` : 'none',
        boxShadow: selected ? 'none' : '0 2px 10px rgba(15,30,55,0.07)'
      }}>
        <div style={{ width: 54, height: 54, borderRadius: 14, flexShrink: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: t.ink, lineHeight: 1.15 }}>{title}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.inkMute, marginTop: 3, lineHeight: 1.3 }}>{sub}</div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, border: selected ? 'none' : '2px solid rgba(129,148,168,0.5)', background: selected ? PRIMARY : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
      </div>
    );
  }

  // Kompaktná radio-dlaždica (2 v riadku) — ako na SK-03
  function FtRadioTile({ icon, title, sub, selected, dark, onClick }) {
    const t = tok(dark);
    return (
      <div onClick={onClick} style={{
        flex: 1, minWidth: 0, position: 'relative', display: 'flex', alignItems: 'center', gap: 9,
        padding: '12px 12px', borderRadius: 14,
        background: selected ? 'rgba(63,169,224,0.10)' : t.surf,
        border: selected ? `2px solid ${ACCENT}` : `2px solid transparent`,
        boxShadow: selected ? 'none' : '0 2px 10px rgba(15,30,55,0.08)',
        cursor: onClick ? 'pointer' : 'default'
      }}>
        <div style={{ width: 26, height: 26, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: t.ink, lineHeight: 1.1 }}>{title}</div>
          {sub && <div style={{ fontSize: 11, fontWeight: 600, color: t.inkMute, marginTop: 2, lineHeight: 1.2 }}>{sub}</div>}
        </div>
        <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, border: selected ? 'none' : '2px solid rgba(129,148,168,0.5)', background: selected ? ACCENT : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
      </div>
    );
  }

  // Jazykový dropdown — klikateľný výber verzie
  function FtLangDropdown({ dark }) {
    const t = tok(dark);
    const surf = dark ? '#1A2433' : 'rgba(255,255,255,0.94)';
    const [open, setOpen] = React.useState(false);
    const [val, setVal] = React.useState('Slovenská verzia (SK)');
    const opts = ['Slovenská verzia (SK)', 'Česká verzia (CZ)', 'Anglická verzia (EN)'];
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (!open) return;
      const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);
    const globe = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>;
    const chev = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8194A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
    return (
      <div ref={ref} style={{ position: 'relative' }}>
        <div onClick={() => setOpen(o => !o)} style={{
          background: surf, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
          border: `1px solid ${open ? ACCENT : 'rgba(200,215,230,0.4)'}`,
          boxShadow: open ? `inset 0 0 0 1px ${ACCENT}` : '0 2px 12px rgba(15,30,55,0.09)', cursor: 'pointer'
        }}>
          <div className="lf-lead-icon" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{globe}</div>
          <div style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 700, color: t.ink }}>{val}</div>
          <div style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}>{chev}</div>
        </div>
        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: surf, borderRadius: 12,
            boxShadow: '0 10px 28px rgba(15,30,55,0.20)', border: `1px solid ${dark ? 'rgba(90,108,128,0.4)' : 'rgba(200,215,230,0.6)'}`,
            overflow: 'hidden', zIndex: 30
          }}>
            {opts.map((o, i) => (
              <div key={o} onClick={() => { setVal(o); setOpen(false); }} style={{
                padding: '12px 14px', fontSize: 14.5, fontWeight: 700,
                color: o === val ? ACCENT : t.ink,
                background: o === val ? (dark ? 'rgba(63,169,224,0.14)' : 'rgba(63,169,224,0.08)') : 'transparent',
                borderTop: i > 0 ? `1px solid ${dark ? 'rgba(90,108,128,0.3)' : 'rgba(200,215,230,0.6)'}` : 'none', cursor: 'pointer'
              }}>{o}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function FreeTrialChoiceScreen({ dark = false, nav }) {
    const t = tok(dark);
    const [role, setRole] = React.useState('teacher');
    const [product, setProduct] = React.useState('alfik');
    const icTeacher = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /><path d="M22 10v5" /></svg>;
    const icParent = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>;
    const icAlfik = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>;
    const icAlfbook = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h13" /><path d="M9 7h6" /></svg>;
    const globeIcon = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3FA9E0" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>;
    const chevDown = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8194A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
    return (
      <window.PhoneFrame dark={dark} label="FT-03 Free trial — typ konta">
        <Pad scroll dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />

          <div style={{ textAlign: 'center', marginTop: 0, marginBottom: 14, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Typ konta a produkt</h1>
            <p style={{ margin: '5px 0 0', color: t.inkSoft, fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
              Vyber si typ konta a produkt.
            </p>
          </div>

          <FtFieldLabel dark={dark}>Som</FtFieldLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            <FtRadioTile dark={dark} selected={role === 'teacher'} onClick={nav && (() => setRole('teacher'))} icon={icTeacher} title="Učiteľ" />
            <FtRadioTile dark={dark} selected={role === 'parent'} onClick={nav && (() => setRole('parent'))} icon={icParent} title="Rodič" />
          </div>

          <FtFieldLabel dark={dark} style={{ marginTop: 16 }}>Produkt</FtFieldLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            <FtRadioTile dark={dark} selected={product === 'alfik'} onClick={nav && (() => setProduct('alfik'))} icon={icAlfik} title="Alfík" sub="Cvičenia pre materskú školu" />
            <FtRadioTile dark={dark} selected={product === 'alfbook'} onClick={nav && (() => setProduct('alfbook'))} icon={icAlfbook} title="AlfBook" sub="Testy pre základnú školu" />
          </div>

          <FtFieldLabel dark={dark} style={{ marginTop: 16 }}>Jazyková verzia</FtFieldLabel>
          <FtLangDropdown dark={dark} />

          <button onClick={() => nav && nav.next && nav.next(role === 'teacher' ? 'school' : 'parent')} style={{ ...window.loginBtnStyle(), width: "100%", marginTop: 20 }}>Pokračovať {arrowIcon}</button>
          <div style={{ height: 6, flexShrink: 0 }} />
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ── form controls for reg form ─────────────────────────────
  function FtFieldLabel({ children, style, dark }) {
    const t = tok(dark);
    return <div style={{ fontSize: 12.5, fontWeight: 800, color: t.inkSoft, letterSpacing: '0.2px', margin: '0 4px 7px', ...style }}>{children}</div>;
  }

  function FtConsentRow({ children, dark }) {
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

  // ═══════════════════════════════════════════════════════════
  // 4a / 4b — Registračný formulár
  // ═══════════════════════════════════════════════════════════
  function FreeTrialRegFormScreen({ dark = false, variant = 'school', nav }) {
    const t = tok(dark);
    const isSchool = variant === 'school';
    return (
      <window.PhoneFrame dark={dark} label={isSchool ? 'FT-04a Free trial — formulár škola' : 'FT-04b Free trial — formulár rodič'}>
        <Pad scroll dark={dark}>
          <FtBackRow dark={dark} onClick={nav && nav.back} />
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 16, flexShrink: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>
              {isSchool ? 'Vytvor učiteľské konto' : 'Vytvor rodičovské konto'}
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {isSchool ? (
              <>
                <window.LoginFieldBlock dark={dark}>
                  <window.LoginField compact label="Meno *" icon={userIcon} dark={dark} />
                  <window.LoginField compact label="Priezvisko" icon={userIcon} dark={dark} />
                </window.LoginFieldBlock>
                <window.LoginFieldBlock dark={dark}>
                  <window.LoginField compact label="Názov školy" icon={schoolIcon} dark={dark} />
                  <window.LoginField compact label="Ulica školy" icon={pinIcon} dark={dark} />
                  <window.LoginField compact label="Mesto školy" icon={pinIcon} dark={dark} />
                </window.LoginFieldBlock>
              </>
            ) : (
              <>
                <FtFieldLabel dark={dark} style={{ marginBottom: -4 }}>Údaje dieťaťa</FtFieldLabel>
                <window.LoginFieldBlock dark={dark}>
                  <window.LoginField compact label="Meno dieťaťa *" icon={userIcon} dark={dark} />
                  <window.LoginField compact label="Priezvisko dieťaťa" icon={userIcon} dark={dark} />
                  <window.LoginField compact label="Ročník" value="1. ročník" icon={gradeIcon} trailing={chevDown} dark={dark} />
                  <window.LoginField compact label="Pohlavie" value="Chlapec" icon={userIcon} trailing={chevDown} dark={dark} />
                </window.LoginFieldBlock>
                <FtFieldLabel dark={dark} style={{ marginBottom: -4 }}>Údaje rodiča</FtFieldLabel>
                <window.LoginFieldBlock dark={dark}>
                  <window.LoginField compact label="Meno rodiča" icon={userIcon} dark={dark} />
                  <window.LoginField compact label="Priezvisko rodiča" icon={userIcon} dark={dark} />
                </window.LoginFieldBlock>
              </>
            )}

            <window.LoginFieldBlock dark={dark}>
              <window.LoginField compact label="Heslo *" value="••••••••" icon={lockIcon} trailing={eyeIcon} dark={dark} />
              <window.LoginField compact label="Potvrď heslo *" value="••••••••" icon={lockIcon} trailing={eyeIcon} dark={dark} />
            </window.LoginFieldBlock>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 2, flexShrink: 0 }}>
              <FtConsentRow checked dark={dark}>Súhlasím so spracovaním osobných údajov (<span style={{ color: ACCENT, fontWeight: 800 }}>GDPR</span>) *</FtConsentRow>
              <FtConsentRow checked dark={dark}>Súhlasím so zasielaním reklamných e-mailov *</FtConsentRow>
            </div>
          </div>

          <div style={{ flexShrink: 0, paddingTop: 14, paddingBottom: 6 }}>
            <button onClick={() => nav && nav.next && nav.next()} style={{ ...window.loginBtnStyle(), width: "100%" }}>Zaregistrovať sa {arrowIcon}</button>
          </div>
        </Pad>
      </window.PhoneFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 5 — Konto vytvorené
  // ═══════════════════════════════════════════════════════════
  function FreeTrialDoneScreen({ dark = false, nav }) {
    const t = tok(dark);
    return (
      <window.PhoneFrame dark={dark} label="FT-05 Free trial — konto vytvorené">
        <Pad dark={dark}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: 110, height: 110, borderRadius: '50%', background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <h1 style={{ margin: 0, fontSize: 27, fontWeight: 800, letterSpacing: '-0.3px', color: t.ink }}>Účet bol vytvorený!</h1>
            <p style={{ margin: '10px 0 0', color: t.inkSoft, fontSize: 15, fontWeight: 500, lineHeight: 1.5, maxWidth: 280 }}>
              Vaše 30-dňové skúšobné obdobie pre Alfík začalo. Budete presmerovaní do aplikácie za 3 sekundy.
            </p>
          </div>
          <button onClick={() => nav && nav.restart && nav.restart()} style={{ ...window.loginBtnStyle(), width: "100%" }}>Otvoriť Alfík {arrowIcon}</button>
        </Pad>
      </window.PhoneFrame>
    );
  }

  Object.assign(window, {
    FreeTrialEmailScreen,
    FreeTrialCodeScreen,
    FreeTrialChoiceScreen,
    FreeTrialRegFormScreen,
    FreeTrialDoneScreen
  });
})();
