# FC Treptow e.V. – Webseite

Kompletter Neubau von fc-treptow.de als statische Astro-Seite mit kostenlosem CMS (Decap).

## Lokal starten

```bash
npm install
npm run dev        # http://localhost:4321
```

## Redaktion (CMS)

Das CMS liegt unter `/admin` (Decap CMS). Die Redaktion kann dort pflegen:

- **News**: Beiträge mit Bild, Rubrik, Teaser und Text
- **Mannschaften**: Trainingszeiten, Liga, Tabelle, Ergebnisse, Spieltagsfotos (Karussell)
- **Sponsoren**: jederzeit hinzufügen/entfernen, mit Logo, Link und Kategorie (Hauptsponsor/Partner). Erscheinen automatisch prominent auf der Startseite und der Sponsorenseite.

Lokal testen: in einem zweiten Terminal `npx decap-server` starten, dann `http://localhost:4321/admin` öffnen (nutzt `local_backend: true`).

Produktion: Repo auf GitHub pushen, Seite auf **Netlify** (kostenlos) deployen, **Netlify Identity + Git Gateway** aktivieren und die Vorstands-E-Mails als CMS-Nutzer einladen. Jede Änderung im CMS erzeugt einen Commit und die Seite baut sich automatisch neu.

## Formulare

- `/probetraining`: Anfrage für kostenloses Probetraining
- `/anmeldung`: Registrierung, freigeschaltet mit Code vom Trainer (Standard: `TREPTOW1925`, änderbar in `src/pages/anmeldung.astro`)

Für den Livegang die Formular-Submits an **Netlify Forms** oder **Formspree** (beide mit Gratis-Kontingent) anschließen; die Stellen sind im Code mit `Produktion:` kommentiert.

## Vor dem Livegang (offene Punkte)

1. Tabellen/Ergebnisse: echte **fussball.de-Widgets** je Team einbetten (Widget-ID auf fussball.de generieren); die aktuellen Daten sind gekennzeichnete Beispieldaten.
2. Platzhalterfotos (picsum.photos) und Instagram-Kacheln gegen echte Vereinsfotos tauschen, Instagram-Link setzen.
3. PDF-Downloads (Eintrittserklärung, Spielberechtigung, Satzung, Datenschutz) von der alten Seite übernehmen (`/downloads`).
4. Impressum/Datenschutz vollständig übernehmen.
5. Sponsoren-Logos + „In Gedenken"-Inhalte migrieren.
6. DNS von fc-treptow.de auf Netlify/Cloudflare Pages umstellen.
