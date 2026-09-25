// Holt Spielplan und Tabelle einmal pro Build für alle Mannschaften (gecacht über alle Seiten).
import { fetchAll } from './fussballde.mjs';
import { getTeams } from '../i18n/content';
import type { TeamFixtures } from './fixturesView';

let cache: Promise<{ fetchedAt: string; teams: Record<string, TeamFixtures> }> | null = null;

export async function leagueTeams() {
  const teams = await getTeams('de');
  return teams
    .filter((t) => t.data.fussballDeTeamId)
    .map((t) => ({ slug: t.slug, teamId: t.data.fussballDeTeamId! }));
}

export function buildFixtures() {
  if (!cache) {
    cache = leagueTeams().then(async (teams) => {
      if (process.env.SKIP_FIXTURES) return { fetchedAt: new Date().toISOString(), teams: {} };
      return fetchAll(teams) as Promise<{ fetchedAt: string; teams: Record<string, TeamFixtures> }>;
    });
  }
  return cache;
}

/** Query-String für /api/fixtures, damit der Browser dieselben Teams nachlädt. */
export async function fixturesQuery() {
  const teams = await leagueTeams();
  return teams.map((t) => `${t.slug}:${t.teamId}`).join(',');
}
