// Schreibt die fussball.de-Team-IDs aus src/content/teams/de nach api/_teams.mjs, damit die
// Vercel-Funktion nur die eigenen Mannschaften abfragt. Läuft automatisch vor dev und build.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const dir = 'src/content/teams/de';
const teams = {};
for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
  const m = readFileSync(`${dir}/${f}`, 'utf8').match(/^fussballDeTeamId:\s*"?([0-9A-Z]{32})"?/m);
  if (m) teams[f.replace(/\.md$/, '')] = m[1];
}
writeFileSync('api/_teams.mjs', `// Automatisch erzeugt von scripts/gen-teams.mjs, nicht von Hand ändern.\nexport const allowedTeams = ${JSON.stringify(teams, null, 2)};\n`);
