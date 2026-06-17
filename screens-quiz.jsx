// screens-quiz.jsx — Cvičenie: Párovanie dvojíc
// Závisí od: PhoneFrame, ALFIK_PALETTE (window exports z screens.jsx)

// ─── Horná lišta quizu ───────────────────────────────────────
function QuizTopBar({ dark = false, progress = 6, total = 10, timeStr = '4:12' }) {
  const p = ALFIK_PALETTE;
  const ink = dark ? p.darkInk : '#1A2B3D';
  const chip = dark ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.92)';
  const pct = Math.round((progress / total) * 100);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 12px' }}>

      {/* X */}
      <button style={{
        width: 40, height: 40, borderRadius: 999, border: 'none', flexShrink: 0,
        background: chip, boxShadow: dark ? 'none' : '0 2px 8px rgba(15,30,55,0.09)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke={ink} strokeWidth="2.8" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Progress counter + bar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <span style={{
          fontSize: 15, fontWeight: 800, color: ink,
          fontFamily: '"Dosis", sans-serif', letterSpacing: '-0.1px',
        }}>{progress}/{total}</span>
        <div style={{ height: 7, borderRadius: 999, background: dark ? 'rgba(255,255,255,0.12)' : '#CBE8F4', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`, borderRadius: 999,
            background: 'linear-gradient(90deg, #3FA9E0 0%, #5BBFB9 100%)',
          }}/>
        </div>
      </div>

      {/* Timer chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: chip, borderRadius: 999, padding: '7px 13px',
        boxShadow: dark ? 'none' : '0 2px 8px rgba(15,30,55,0.09)',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="#3FA9E0" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
        </svg>
        <span style={{
          fontSize: 14, fontWeight: 800, color: ink,
          fontFamily: '"Dosis", sans-serif', letterSpacing: '0.5px',
        }}>{timeStr}</span>
      </div>

      {/* Menu */}
      <button style={{
        width: 40, height: 40, borderRadius: 999, border: 'none', flexShrink: 0,
        background: chip, boxShadow: dark ? 'none' : '0 2px 8px rgba(15,30,55,0.09)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={ink} strokeWidth="2.3" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h10"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Obrázok-placeholder: strom ─────────────────────────────
function ImgTree() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 140 120" style={{ display: 'block' }}>
      <rect width="140" height="120" fill="#B8E0F4"/>
      <ellipse cx="70" cy="75" rx="36" ry="14" fill="#8DC87A" opacity="0.35"/>
      <rect x="65" y="68" width="10" height="36" rx="5" fill="#7A4F15"/>
      <ellipse cx="70" cy="52" rx="32" ry="28" fill="#48B060"/>
      <ellipse cx="50" cy="62" rx="22" ry="17" fill="#3EA854"/>
      <ellipse cx="90" cy="60" rx="22" ry="17" fill="#3EA854"/>
      <ellipse cx="70" cy="28" rx="20" ry="17" fill="#56C46E"/>
    </svg>
  );
}

// ─── Obrázok-placeholder: lístie s gaštanmi ─────────────────
function ImgLeaves() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 140 120" style={{ display: 'block' }}>
      <rect width="140" height="120" fill="#A8D8A0"/>
      <ellipse cx="70" cy="78" rx="34" ry="18" fill="#5AB840" opacity="0.5"/>
      <path d="M22 85 Q50 35 80 28 Q110 35 122 80" fill="#48AA30" opacity="0.85"/>
      <path d="M40 90 Q70 55 100 88" fill="#3A9820" opacity="0.8"/>
      <circle cx="85" cy="52" r="9"  fill="#7A4F15"/>
      <circle cx="97" cy="63" r="8"  fill="#8B5E1A"/>
      <circle cx="80" cy="65" r="7"  fill="#7A4F15"/>
      <circle cx="58" cy="60" r="6"  fill="#6E4512" opacity="0.7"/>
    </svg>
  );
}

// ─── Jedna karta v cvičení ───────────────────────────────────
function QuizCard({ side, answered, isCorrect }) {
  const showOverlay = side === 'right' && answered;
  const good = isCorrect;

  return (
    <div style={{
      flex: 1, borderRadius: 22, overflow: 'hidden',
      background: '#FFFFFF',
      boxShadow: '0 8px 28px -8px rgba(15,50,80,0.22)',
      position: 'relative',
      aspectRatio: '1 / 1',
    }}>
      {/* Placeholder image */}
      {side === 'left' ? <ImgTree/> : <ImgLeaves/>}

      {/* Audio badge */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        width: 32, height: 32, borderRadius: 999,
        background: 'rgba(255,255,255,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="#3FA9E0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
        </svg>
      </div>

      {/* Expand badge */}
      <div style={{
        position: 'absolute', top: 8, right: 8,
        width: 32, height: 32, borderRadius: 999,
        background: 'rgba(255,255,255,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#1A2B3D" strokeWidth="2.4" strokeLinecap="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
        </svg>
      </div>

      {/* Result overlay */}
      {showOverlay && (
        <div style={{
          position: 'absolute', inset: 0,
          background: good ? 'rgba(74,204,112,0.28)' : 'rgba(255,72,72,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 58, height: 58, borderRadius: 999,
            background: good ? '#4EC870' : '#FF4848',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: good
              ? '0 8px 26px -4px rgba(78,200,112,0.68)'
              : '0 8px 26px -4px rgba(255,72,72,0.58)',
          }}>
            {good ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l4 4 10-10"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="3" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Hlavná obrazovka cvičenia ───────────────────────────────
function QuizScreen({ dark = false, state = 'idle' }) {
  // state: 'idle' | 'correct' | 'wrong'
  const p      = ALFIK_PALETTE;
  const answered  = state !== 'idle';
  const isCorrect = state === 'correct';
  const tealBg    = dark ? '#1A3A40' : '#6BC9C3';
  const screenBg  = dark
    ? 'linear-gradient(180deg, #16335A 0%, #1F4570 55%, #0E1622 100%)'
    : 'linear-gradient(180deg, #D1EBF9 0%, #E6F5FD 55%, #F9FCFE 100%)';
  const topCardBg = dark ? p.darkSurf : '#FFFFFF';

  // Stav aktívnej bodky
  const dotFill = state === 'correct'
    ? '#4EC870'
    : state === 'wrong'
    ? '#FF4848'
    : (dark ? p.darkInk : '#1A2B3D');

  return (
    <PhoneFrame dark={dark} label={`06 Quiz · ${state}`}>
      <div style={{
        flex: 1, background: screenBg,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* ── Biela hlavička ── */}
        <div style={{
          background: topCardBg,
          borderRadius: '0 0 32px 32px',
          boxShadow: dark ? 'none' : '0 6px 22px -8px rgba(15,50,80,0.10)',
          zIndex: 2, position: 'relative',
        }}>
          <QuizTopBar dark={dark}/>

          {/* Otázka + tlačidlo zvuku */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '2px 16px 18px',
          }}>
            <p style={{
              flex: 1, margin: 0,
              fontSize: 17, fontWeight: 700, lineHeight: 1.4,
              color: dark ? p.darkInk : '#1A2B3D',
              fontFamily: '"Dosis", sans-serif',
            }}>
              Rozhodni, či k sebe dvojice patria
            </p>
            <button style={{
              width: 48, height: 48, borderRadius: 999, border: 'none', flexShrink: 0,
              background: p.skyDeep,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 18px -4px ${p.skyDeep}AA`,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
                <path d="M18.5 5.5a9 9 0 0 1 0 13"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Bodky pokroku ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '18px 22px 12px',
        }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === 0 ? 28 : 14,
              height: 14,
              borderRadius: 999,
              background: i === 0
                ? dotFill
                : (dark ? 'rgba(255,255,255,0.18)' : 'rgba(26,43,61,0.14)'),
              transition: 'background 0.3s, width 0.3s',
            }}/>
          ))}
        </div>

        {/* ── Teal karta s obrazkami + tlačidlami ── */}
        <div style={{
          margin: '0 14px',
          borderRadius: 34,
          background: tealBg,
          padding: '18px 15px 16px',
          display: 'flex', flexDirection: 'column', gap: 14,
          flex: 1,
          boxShadow: dark
            ? 'none'
            : '0 14px 44px -12px rgba(107,201,195,0.52)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Dekoratívne kruhy */}
          <div style={{
            position: 'absolute', top: -35, right: -35,
            width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', bottom: 90, left: -28,
            width: 95, height: 95, borderRadius: '50%',
            background: 'rgba(255,255,255,0.09)', pointerEvents: 'none',
          }}/>

          {/* Karty */}
          <div style={{ display: 'flex', gap: 13, flex: 1 }}>
            <QuizCard side="left"  answered={answered} isCorrect={isCorrect}/>
            <QuizCard side="right" answered={answered} isCorrect={isCorrect}/>
          </div>

          {/* Tlačidlá ✓ / ✗ */}
          <div style={{ display: 'flex', gap: 13 }}>

            {/* ✓ */}
            <button style={{
              flex: 1, height: 70, borderRadius: 24, border: 'none',
              background: isCorrect ? '#4EC870' : '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isCorrect
                ? '0 10px 30px -6px rgba(78,200,112,0.68)'
                : '0 6px 18px -6px rgba(0,0,0,0.18)',
              transform: isCorrect ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
            }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none"
                stroke={isCorrect ? '#fff' : '#1A2B3D'}
                strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l4 4 10-10"/>
              </svg>
            </button>

            {/* ✗ */}
            <button style={{
              flex: 1, height: 70, borderRadius: 24, border: 'none',
              background: (answered && !isCorrect) ? '#FF4848' : '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: (answered && !isCorrect)
                ? '0 10px 30px -6px rgba(255,72,72,0.58)'
                : '0 6px 18px -6px rgba(0,0,0,0.18)',
              transform: (answered && !isCorrect) ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
            }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none"
                stroke={(answered && !isCorrect) ? '#fff' : '#1A2B3D'}
                strokeWidth="2.8" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Tlačidlo Ďalej ── */}
        <div style={{ padding: '14px 14px 6px' }}>
          <button style={{
            width: '100%', height: 58, borderRadius: 999, border: 'none',
            background: answered
              ? 'linear-gradient(135deg, #3FA9E0 0%, #5BBFB9 100%)'
              : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(26,43,61,0.07)'),
            color: answered
              ? '#fff'
              : (dark ? 'rgba(255,255,255,0.28)' : 'rgba(26,43,61,0.28)'),
            fontFamily: '"Dosis", sans-serif',
            fontSize: 22, fontWeight: 700, letterSpacing: '0.4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: answered ? '0 8px 26px -6px rgba(63,169,224,0.55)' : 'none',
            transition: 'all 0.3s',
          }}>
            Ďalej
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>

      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Test otvorený — len screenshot v telefónnom ráme
// ─────────────────────────────────────────────────────────────
function TestOpenScreen({ dark = false }) {
  return (
    <PhoneFrame dark={dark} label="06 Test otvorený">
      <div style={{
        flex: 1, background: '#fff',
        display: 'flex', alignItems: 'stretch', justifyContent: 'center'
      }}>
        <img
          src="assets/test_screen_06.png"
          alt="Otvorený test"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, { QuizScreen, TestOpenScreen });
