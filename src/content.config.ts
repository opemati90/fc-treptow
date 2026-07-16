import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    teaser: z.string(),
    image: z.string().optional(),
    tag: z.string().default('Verein'),
  }),
});

const teams = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teams' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    league: z.string(),
    order: z.number(),
    training: z.array(z.string()),
    ground: z.string().default('Willi-Sänger-Sportanlage, Köpenicker Landstraße 186, 12437 Berlin'),
    contact: z.string().default('kontakt@fc-treptow.de'),
    image: z.string(),
    // Bildausschnitt für das Kopfbild. 0% = oberer Bildrand, 100% = unterer Bildrand.
    // Bei Mannschaftsfotos liegen die Gesichter meist im oberen Drittel, deshalb ein
    // niedriger Wert. Pro Foto einstellbar, weil jedes anders aufgebaut ist.
    imageFocus: z.number().min(0).max(100).default(30),
    // nullish + transform statt default: Wenn jemand im CMS eine Liste leert, steht im
    // YAML "gallery:" (also null). Mit default([]) allein würde der Build hart brechen.
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .nullish()
      .transform((v) => v ?? []),
    // Tabelle und Spielplan kommen von fussball.de. Der Verein erzeugt das Widget in
    // seinem fussball.de-Konto ("Deine Widgets" -> "Code anzeigen") und fügt den
    // fertigen Code hier ein. Wir bauen die Einbettung bewusst nicht selbst nach:
    // fussball.de erzeugt den Code pro Mannschaft, ein selbst geratenes Format wäre
    // von vornherein kaputt. Ohne Widget zeigt die Seite einen ehrlichen Hinweis.
    fussballDeWidget: z.string().optional(),
    // Letzte Ergebnisse pflegt der Verein selbst: wenige Zeilen, dafür laufen sie auch
    // auf der Startseite. Leer lassen ist erlaubt.
    results: z
      .array(z.object({ date: z.string(), home: z.string(), away: z.string(), score: z.string(), note: z.string().optional() }))
      .nullish()
      .transform((v) => v ?? []),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    url: z.string().optional(),
    tier: z.enum(['Hauptsponsor', 'Partner']).default('Partner'),
    order: z.number().default(99),
  }),
});

export const collections = { news, teams, sponsors };
