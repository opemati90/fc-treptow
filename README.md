# FC Treptow e.V. – Webseite

Neubau von fc-treptow.de als statische Astro-Seite mit kostenlosem CMS (Decap).
Sechs Sprachen: Deutsch (Standard), Englisch, Türkisch, Arabisch (RTL), Spanisch, Französisch.

## Lokal starten

```bash
npm install
npm run dev        # http://localhost:4321
```

## Redaktion (CMS)

Das CMS liegt unter `/admin` (Decap CMS). Gepflegt werden:

- **News**: Beiträge mit Bild, Rubrik, Teaser und Text
- **Mannschaften**: Trainingszeiten, Liga, Teamfoto, Spieltagsfotos, letzte Ergebnisse, fussball.de-Widget
- **Sponsoren**: jederzeit hinzufügen und entfernen, mit Logo, Link und Kategorie (Hauptsponsor/Partner)

Lokal testen: in einem zweiten Terminal `npx decap-server` starten, dann
`http://localhost:4321/admin` öffnen (nutzt `local_backend: true`).

### Mehrsprachigkeit im CMS

News und Mannschaften sind mehrsprachig (`i18n: multiple_folders`). Die Inhalte liegen
unter `src/content/<sammlung>/<sprache>/`. Im CMS erscheint pro Beitrag ein Reiter je
Sprache. Felder wie Datum, Bild oder Eigennamen sind auf `duplicate` gestellt und werden
automatisch gespiegelt, übersetzt werden muss nur der Text.

**Wichtig:** Diese Ordnerstruktur und die `i18n`-Angaben in `public/admin/config.yml`
gehören zusammen. Fehlt der `i18n`-Block, legt Decap Beiträge ohne Sprachordner an und
sie erscheinen dann nirgends auf der Seite.

### Tabelle und Spielplan (fussball.de)

Tabelle und kommende Spiele werden **nicht von Hand gepflegt**, sondern kommen von
fussball.de:

1. Auf [fussball.de](https://www.fussball.de) einloggen.
2. „Inhalte verwalten“ → „Deine Widgets“ → Mannschaftswidget anlegen (Spiele, optional
   mit Tabelle).
3. Dort auf „Code anzeigen“ klicken und den **kompletten Code** kopieren.
4. Im CMS bei der Mannschaft in das Feld „fussball.de Widget“ einfügen.

Solange kein Widget hinterlegt ist, zeigt die Teamseite einen Hinweis mit Link auf
fussball.de statt erfundener Daten.

## Formulare

- `/probetraining`: Anfrage für ein kostenloses Probetraining
- `/anmeldung`: Anmeldung, freigeschaltet mit Code vom Trainer
  (Standard `TREPTOW1925`, änderbar in `src/components/sections/AnmeldungSections.astro`)

Standardmäßig öffnen die Formulare eine vorausgefüllte E-Mail an `kontakt@fc-treptow.de`.
Das ist bewusst so: Die Anmeldung erhebt personenbezogene Daten (Geburtsdatum, Anschrift),
und ohne Fremddienst braucht es keinen Auftragsverarbeitungsvertrag.

Wer lieber einen Formulardienst nutzt (Formspree, Web3Forms), setzt die Umgebungsvariable
`PUBLIC_FORM_ENDPOINT` auf die Endpunkt-URL. Dann wird per `fetch` dorthin gesendet.
In dem Fall ist ein AV-Vertrag mit dem Anbieter nötig.

## Instagram-Kacheln („Der Club im Netz“)

Ohne Zugangsdaten zeigt der Bereich Platzhalterbilder, sichtbar als „Beispielbilder“
gekennzeichnet. Für echte Beiträge siehe die Anleitung in `src/lib/instagram.ts` und
setze `INSTAGRAM_ACCESS_TOKEN` und `INSTAGRAM_BUSINESS_ACCOUNT_ID`.

## Vor dem Livegang (offene Punkte)

1. **Impressum vervollständigen (rechtlich erforderlich, §5 TMG).** Es fehlen
   Vertretungsberechtigter (Vorstand), Registergericht und Vereinsregisternummer.
2. **Datenschutzerklärung vervollständigen.** Aktuell nur eine Kurzfassung.
3. Echte **Sponsoren** im CMS eintragen (aktuell bewusst leer statt erfunden).
4. **fussball.de-Widgets** je Mannschaft hinterlegen (siehe oben).
5. **Instagram-Zugang** einrichten, Social-Links prüfen (aktuell geraten:
   `/fctreptow` bei Instagram, Facebook, TikTok).
6. Echtes **Mannschaftsfoto der Freizeit Kickers** ergänzen (nutzt derzeit das
   Foto des Vereinsheims).
7. **PDF-Downloads** (Eintrittserklärung, Spielberechtigung, Satzung) von der alten
   Seite übernehmen.
8. Inhalte für **„In Gedenken“** und **Vorstand** von der alten Seite übernehmen.
9. **DNS** von fc-treptow.de auf Vercel umstellen.

## Bekannte Einschränkungen

- Der Freischalt-Code der Anmeldung liegt im Browser-JavaScript. Er hält Neugierige ab,
  ist aber keine echte Zugangssperre. Für den Zweck (Anmeldung erst nach Probetraining)
  reicht das.
- Der Build meldet „collection sponsors does not exist or is empty“, solange keine
  Sponsoren eingetragen sind. Das ist nur eine Warnung, die Seite baut normal.
- Kein Dark Mode. Die Seite ist bewusst durchgehend hell gehalten.
