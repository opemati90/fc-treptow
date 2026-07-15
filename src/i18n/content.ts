import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from './languages';

// Inhalte liegen als src/content/{collection}/{locale}/{slug}.md, die Astro-ID lautet
// entsprechend "{locale}/{slug}". Diese Hilfsfunktion filtert nach Sprache und liefert
// die ID ohne Sprachpräfix zurück, damit sie direkt als URL-Slug verwendet werden kann.
export async function getLocalized<C extends 'teams' | 'news'>(collection: C, lang: Locale) {
  const all = await getCollection(collection);
  const filtered = all.filter((entry) => entry.id.startsWith(`${lang}/`));
  const fallback = lang === defaultLocale ? [] : all.filter((entry) => entry.id.startsWith(`${defaultLocale}/`));
  const source = filtered.length > 0 ? filtered : fallback;
  return source.map((entry) => ({
    ...entry,
    slug: entry.id.slice(entry.id.indexOf('/') + 1),
  }));
}

export type LocalizedTeam = CollectionEntry<'teams'> & { slug: string };
export type LocalizedNews = CollectionEntry<'news'> & { slug: string };
