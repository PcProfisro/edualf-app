# Alfík — interaktívny prototyp

Klikateľný prototyp mobilnej aplikácie Alfík (EduAlf) — onboarding, prihlásenie,
strom kategórií, interaktívne cvičenia, pracovné listy, testy, profil a bočné menu.

## Spustenie

Otvor `index.html` v prehliadači.

> Prototyp načítava React a Babel z CDN (unpkg.com), preto je pri prvom spustení
> potrebné pripojenie na internet. Súbory `.jsx` sa kompilujú priamo v prehliadači.

### Lokálny server (odporúčané)

Niektoré prehliadače blokujú načítanie `.jsx` cez `file://`. Spusti jednoduchý server:

```bash
# Python 3
python3 -m http.server 8000
# potom otvor http://localhost:8000
```

### GitHub Pages

Repozitár sa dá publikovať priamo cez GitHub Pages (Settings → Pages → branch root).
`index.html` je vstupný bod.

## Štruktúra

```
index.html              # vstupný bod (prototyp v3)
screens.jsx             # splash, onboarding, prihlásenie, výber produktu
screens-2.jsx           # kategórie, podkategórie, bočné menu (ProfileDrawerV2)
screens-pracovne.jsx    # pracovné listy
screens-quiz.jsx        # kvíz / test
screens-profile.jsx     # profil učiteľa/žiaka, GDPR
screens-testy-v2.jsx    # zoznam testov
assets/                 # logá, ilustrácie, ikony vekových filtrov
uploads/                # obrázky kategórií a pozadia
```

## Navigácia v prototype

Hore je lišta s krokmi (flow), vpravo dole prepínač **◎ hotspoty** pre zvýraznenie
klikateľných oblastí. Tlačidlo **Reset** vráti prototyp na začiatok.
