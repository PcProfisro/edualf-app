# Alfík — interaktívny prototyp

Klikací HTML prototyp aplikácie Alfík (EduAlf). Spúšťa sa priamo v prehliadači, bez build kroku.

## Spustenie

Otvor `index.html` v prehliadači. Pre správne načítanie `.jsx` súborov ho spusti cez lokálny server (nie cez `file://`):

```bash
# Python
python3 -m http.server 8000
# alebo Node
npx serve .
```

Potom otvor `http://localhost:8000`.

### GitHub Pages
Repozitár má `index.html` v koreni tohto priečinka — stačí zapnúť GitHub Pages nad týmto adresárom (`/release`) a prototyp pobeží online.

## Štruktúra

| Súbor | Obsah |
|---|---|
| `index.html` | Hlavný shell — flow, hotspoty, navigácia |
| `screens.jsx` | Prihlásenie, výber sveta, úvodné obrazovky |
| `screens-2.jsx` | Strom kategórií, interaktívne cvičenia |
| `screens-pracovne.jsx` | Pracovné listy |
| `screens-quiz.jsx` | Kvízy / cvičenia |
| `screens-profile.jsx` | Profil, drawer menu, GDPR |
| `screens-testy-v2.jsx` | Testy |
| `screens-alfbook.jsx` | AlfBook — výber jazyka, domov |
| `screens-alfbook-flow.jsx` | AlfBook — ročníky, predmety, témy, obsah |
| `assets/` | Logá, ikony, ratingy, vlajky |
| `uploads/` | Obrázky dlaždíc kategórií a podkategórií |

## Závislosti

React 18, ReactDOM 18 a Babel Standalone sa načítavajú z CDN (unpkg) — potrebné je pripojenie na internet. Font Dosis sa ťahá z Google Fonts.
