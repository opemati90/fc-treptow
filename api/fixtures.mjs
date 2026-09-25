// Vercel-Funktion: frischer Spielplan und Tabelle für die Seite.
// Aufruf: /api/fixtures?teams=herren-1:011MI9JOE8000000VTVG0001VTR8C1K7,herren-2:...
// Die Antwort wird eine Stunde im Vercel-CDN gecacht, fussball.de sieht also höchstens
// eine Abfrage pro Stunde und Mannschaftsliste.
import { fetchAll } from '../src/lib/fussballde.mjs';
import { allowedTeams } from './_teams.mjs';

const MAX_TEAMS = 6;

export async function GET(request) {
  const param = new URL(request.url).searchParams.get('teams') ?? '';
  const teams = param
    .split(',')
    .map((pair) => pair.split(':'))
    // Nur die Mannschaften des Vereins, sonst wäre die Funktion ein offenes Relais zu fussball.de
    .filter(([slug, teamId]) => allowedTeams[slug] === teamId)
    .slice(0, MAX_TEAMS)
    .map(([slug, teamId]) => ({ slug, teamId }));

  if (teams.length === 0) {
    return Response.json({ error: 'no valid teams' }, { status: 400 });
  }

  const data = await fetchAll(teams);
  const anyData = Object.values(data.teams).some((t) => (t.games && t.games.length > 0) || t.table);
  return Response.json(data, {
    status: anyData ? 200 : 502,
    headers: {
      // Fehler nur kurz cachen, Erfolg eine Stunde plus einen Tag "stale while revalidate"
      'Cache-Control': anyData ? 'public, s-maxage=3600, stale-while-revalidate=86400' : 'public, s-maxage=60',
    },
  });
}
