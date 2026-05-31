import type { NewsListItem } from "@/src/types/Content";

type NewsApiResponse = {
  data: NewsListItem[];
  meta?: { limit: number; offset: number };
};

async function fetchHomeNews(): Promise<NewsListItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/v1/news?limit=3`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as NewsApiResponse;
    return payload.data ?? [];
  } catch {
    return [];
  }
}

export default async function HomeApiExample() {
  const news = await fetchHomeNews();

  return (
    <section
      className="w-full max-w-5xl mx-auto px-4 py-6 mt-4 border border-dashed border-zinc-300 rounded-lg bg-zinc-50/80"
      aria-label="API integration example"
    >
      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
        Exemplo de integração com a API (backend)
      </p>
      {news.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Nenhuma notícia retornada. Configure Supabase, aplique as migrations e
          inicie o Redis com{" "}
          <code className="text-xs bg-zinc-200 px-1 rounded">
            docker compose up -d redis
          </code>
          .
        </p>
      ) : (
        <ul className="list-disc list-inside text-sm text-zinc-800 space-y-1">
          {news.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
