export interface WikipediaSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
  content_urls?: { desktop: { page: string } };
}

export async function searchWikipedia(query: string): Promise<WikipediaSummary | null> {
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
      // Try a search fallback
      return await searchWikipediaFallback(query);
    }

    const data = await response.json();
    if (data.type === 'disambiguation' || data.type === 'not_found') {
      return await searchWikipediaFallback(query);
    }

    return {
      title: data.title,
      extract: data.extract,
      thumbnail: data.thumbnail,
      content_urls: data.content_urls,
    };
  } catch {
    return null;
  }
}

async function searchWikipediaFallback(query: string): Promise<WikipediaSummary | null> {
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&format=json&origin=*`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.query?.search?.length) return null;

    const bestTitle = data.query.search[0].title;
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle)}`;
    const summaryResponse = await fetch(summaryUrl, { headers: { 'Accept': 'application/json' } });
    const summaryData = await summaryResponse.json();

    if (summaryData.type === 'disambiguation' || summaryData.type === 'not_found') return null;

    return {
      title: summaryData.title,
      extract: summaryData.extract,
      thumbnail: summaryData.thumbnail,
      content_urls: summaryData.content_urls,
    };
  } catch {
    return null;
  }
}

export function extractKeywords(text: string): string {
  const stopWords = new Set(['what', 'is', 'the', 'a', 'an', 'how', 'do', 'does', 'are', 'was', 'were', 'be', 'been', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'and', 'or', 'but', 'explain', 'describe', 'difference', 'between', 'main', 'cause', 'meaning', 'vs', 'versus']);
  const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

  // Try to find multi-word topics
  const cleanText = text.toLowerCase();
  if (cleanText.includes('world war i')) return 'World War I';
  if (cleanText.includes('world war ii')) return 'World War II';
  if (cleanText.includes('photosynthesis')) return 'Photosynthesis';
  if (cleanText.includes('mitochondria')) return 'Mitochondria';
  if (cleanText.includes('dna')) return 'DNA';
  if (cleanText.includes('rna')) return 'RNA';
  if (cleanText.includes('newton')) return 'Isaac Newton';
  if (cleanText.includes('gravity')) return 'Gravity';
  if (cleanText.includes('quadratic')) return 'Quadratic equation';
  if (cleanText.includes('pythagoras')) return 'Pythagorean theorem';
  if (cleanText.includes('atom')) return 'Atom';
  if (cleanText.includes('cell')) return 'Cell (biology)';
  if (cleanText.includes('evolution')) return 'Evolution';
  if (cleanText.includes('black hole')) return 'Black hole';
  if (cleanText.includes('solar system')) return 'Solar System';
  if (cleanText.includes('climate')) return 'Climate change';

  return words.slice(0, 3).join(' ') || text;
}
