import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase/server";

type StaticPage = {
  name: string;
  href: string;
  category: string;
  description: string;
};

const STATIC_PAGES: StaticPage[] = [
  {
    name: "Notícias - Portal Dia de Campo",
    href: "/noticias",
    category: "Notícias",
    description: "Fique por dentro das últimas notícias do agronegócio com o Portal Dia de Campo. Atualizações diárias, tendências de mercado e conteúdo técnico especializado para impulsionar o seu negócio.",
  },
  {
    name: "Conteúdo Técnico - Portal Dia de Campo",
    href: "/conteudo-tecnico",
    category: "Conteúdo Técnico",
    description: "Fique por dentro do conteúdo técnico do agronegócio com o Portal Dia de Campo. Atualizações diárias, tendências de mercado e conteúdo técnico especializado para impulsionar o seu negócio.",
  },
  {
    name: "Podcasts - Portal Dia de Campo",
    href: "/podcast",
    category: "Podcasts",
    description: "Conversas com especialistas, lideranças e produtores sobre mercado, CEASA, produção e tecnologia no campo.",
  },
  {
    name: "Preços CEASA - Portal Dia de Campo",
    href: "/precos-ceasa",
    category: "Preços CEASA",
    description: "Cotações atualizadas por central de abastecimento, produto e categoria",
  },
  {
    name: "Classificados - Portal Dia de Campo",
    href: "/classificados",
    category: "Classificados",
    description: "Compra, venda e oportunidades",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const queryLower = query.toLocaleLowerCase();

  const matchedStatic = STATIC_PAGES.filter(
    (page) =>
      page.name.toLocaleLowerCase().includes(queryLower) ||
      page.description.toLocaleLowerCase().includes(queryLower) ||
      page.category.toLocaleLowerCase().includes(queryLower)
  );

  const supabase = getSupabaseAdmin();
  const searchPromises: Promise<any[]>[] = [];

  const formattedQuery = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(term => `${term}:*`)
    .join(" & ");

  searchPromises.push(
    (async () => {
      try {
        const { data, error } = await supabase
          .from("content_items")
          .select("title, slug, short_description, type")
          .eq("is_published", true)
          .textSearch("search_vector", formattedQuery, {
            config: "portuguese",
            type: "plain",
          })
          .limit(5);

        if (error) throw error;
        return (data ?? []).map((item) => ({
          name: item.title,
          href: item.type === "news" ? `/noticias/${item.slug}` : `/conteudo-tecnico/${item.slug}`,
          category: item.type === "news" ? "Notícias" : "Conteúdo Técnico",
          description: item.short_description,
        }));
      } catch (err) {
        console.error("Error searching content_items:", err);
        try {
          const { data } = await supabase
            .from("content_items")
            .select("title, slug, short_description, type")
            .eq("is_published", true)
            .or(`title.ilike.%${query}%,short_description.ilike.%${query}%`)
            .limit(5);
          return (data ?? []).map((item) => ({
            name: item.title,
            href: item.type === "news" ? `/noticias/${item.slug}` : `/conteudo-tecnico/${item.slug}`,
            category: item.type === "news" ? "Notícias" : "Conteúdo Técnico",
            description: item.short_description,
          }));
        } catch {
          return [];
        }
      }
    })()
  );

  searchPromises.push(
    (async () => {
      try {
        const { data, error } = await supabase
          .from("podcast_episodes")
          .select("title, slug, description")
          .eq("is_published", true)
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(5);

        if (error) throw error;
        return (data ?? []).map((item) => ({
          name: item.title,
          href: `/podcast/${item.slug}`,
          category: "Podcasts",
          description: item.description,
        }));
      } catch (err) {
        console.error("Error searching podcast_episodes:", err);
        return [];
      }
    })()
  );

  searchPromises.push(
    (async () => {
      try {
        const { data, error } = await supabase
          .from("classifieds")
          .select("title, slug, short_description")
          .eq("is_published", true)
          .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
          .or(`title.ilike.%${query}%,short_description.ilike.%${query}%`)
          .limit(5);

        if (error) throw error;
        return (data ?? []).map((item) => ({
          name: item.title,
          href: `/classificados/${item.slug}`,
          category: "Classificados",
          description: item.short_description,
        }));
      } catch (err) {
        console.error("Error searching classifieds:", err);
        return [];
      }
    })()
  );

  searchPromises.push(
    (async () => {
      try {
        const { data, error } = await supabase
          .from("ceasa_prices")
          .select("product_name, product_slug, ceasa_name")
          .or(`product_name.ilike.%${query}%,ceasa_name.ilike.%${query}%`)
          .limit(10);

        if (error) throw error;

        const seen = new Set<string>();
        const results: any[] = [];
        for (const item of (data ?? [])) {
          const key = `${item.product_slug}-${item.ceasa_name}`;
          if (!seen.has(key)) {
            seen.add(key);
            results.push({
              name: item.product_name,
              href: `/precos-ceasa?ceasa=${encodeURIComponent(item.ceasa_name)}&produto=${item.product_slug}`,
              category: "Preços CEASA",
              description: `Cotação de ${item.product_name} na central ${item.ceasa_name}`,
            });
          }
        }
        return results.slice(0, 5);
      } catch (err) {
        console.error("Error searching ceasa_prices:", err);
        return [];
      }
    })()
  );

  const searchResults = await Promise.all(searchPromises);

  const allResults = [
    ...matchedStatic,
    ...searchResults.flat()
  ];

  return NextResponse.json(allResults.slice(0, 5));
}
