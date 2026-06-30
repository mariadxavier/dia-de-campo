import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

type StaticPage = {
  name: string;
  href: string;
  category: string;
  description: string;
};

function normalize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function sanitizeSearch(value: string) {
  return value
    .replace(/[(),]/g, "")
    .replace(/"/g, "")
    .trim();
}

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

const ilikeFilter = (query: string, col1: string, col2?: string) => {
  const queryNorm = normalize(query);
  const terms = [query, queryNorm].filter((v, i, arr) => arr.indexOf(v) === i);
  const conditions = terms.flatMap(term =>
    col2
      ? [`${col1}.ilike.%${term}%`, `${col2}.ilike.%${term}%`]
      : [`${col1}.ilike.%${term}%`]
  );
  return conditions.join(",");
};

const formatQuery = (query: string) => query
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .map(term => `${term}:*`)
  .join(" & ");

const contentItemsSearch = async (supabase: SupabaseClient, query: string, type: "technical" | "news" | "all") => {
  const formattedQuery = formatQuery(normalize(query));
  try {
    let supabaseQuery = supabase
      .from("content_items")
      .select("title, slug, short_description, type")
      .eq("is_published", true)
      .textSearch("search_vector", formattedQuery, {
        config: "portuguese",
        type: "plain",
      })
      .limit(5);

    if (type !== "all") {
      supabaseQuery = supabaseQuery.eq("type", type);
    }
    const { data, error } = await supabaseQuery;

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
      const safeQuery = sanitizeSearch(query);

      const { data } = await supabase
        .from("content_items")
        .select("title, slug, short_description, type")
        .eq("is_published", true)
        .or(ilikeFilter(safeQuery, "title", "short_description"))
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
}

const podcastSearch = async (supabase: SupabaseClient, query: string) => {
  try {
    const safeQuery = sanitizeSearch(query);

    const { data, error } = await supabase
      .from("podcast_episodes")
      .select("title, slug, description")
      .eq("is_published", true)
      .or(ilikeFilter(safeQuery, "title", "description"))
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
}

const classifiedsSearch = async (supabase: SupabaseClient, query: string) => {
  try {
    const safeQuery = sanitizeSearch(query);

    const { data, error } = await supabase
      .from("classifieds")
      .select("title, slug, short_description")
      .eq("is_published", true)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .or(ilikeFilter(safeQuery, "title", "short_description"))
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
}

const ceasaPricesSearch = async (supabase: SupabaseClient, query: string) => {
  try {
    const safeQuery = sanitizeSearch(query);

    const { data, error } = await supabase
      .from("ceasa_prices")
      .select("product_name, product_slug, ceasa_name")
      .or(ilikeFilter(safeQuery, "product_name", "ceasa_name"))
      .limit(10);

    if (error) throw error;

    const queryNorm = normalize(query);

    const matchedProduct = data?.find(item =>
      normalize(item.product_name).includes(queryNorm)
    );

    const matchedCeasa = data?.find(item =>
      normalize(item.ceasa_name).includes(queryNorm)
    );

    const seen = new Set<string>();
    const results: any[] = [];

    if (matchedProduct) {
      results.push({
        name: matchedProduct.product_name,
        href: `/precos-ceasa?produto=${matchedProduct.product_slug}&ceasa=Todas+as+centrais`,
        category: "Preços CEASA",
        description: `Cotação de ${matchedProduct.product_name} em todas as centrais`,
      });
    } else if (matchedCeasa) {
      results.push({
        name: matchedCeasa.ceasa_name,
        href: `/precos-ceasa?produto=all&ceasa=${encodeURIComponent(matchedCeasa.ceasa_name)}`,
        category: "Preços CEASA",
        description: `Todos os produtos da central ${matchedCeasa.ceasa_name}`,
      });
    }

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
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("path") || "";
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const queryNorm = normalize(query);

  const matchedStatic = STATIC_PAGES.filter(
    (page) =>
      normalize(page.name).includes(queryNorm) ||
      normalize(page.description).includes(queryNorm) ||
      normalize(page.category).includes(queryNorm)
  );

  const supabase = getSupabaseAdmin();
  const searchPromises: Promise<any[]>[] = [];

  switch (pathname) {
    case "/conteudo-tecnico":
      searchPromises.push(contentItemsSearch(supabase, query, "technical"));
      break;
    case "/noticias":
      searchPromises.push(contentItemsSearch(supabase, query, "news"));
      break;
    case "/podcast":
      searchPromises.push(podcastSearch(supabase, query));
      break;
    case "/classificados":
      searchPromises.push(classifiedsSearch(supabase, query));
      break;
    case "/precos-ceasa":
      searchPromises.push(ceasaPricesSearch(supabase, query));
      break;
    default:
      searchPromises.push(contentItemsSearch(supabase, query, "all"));
      searchPromises.push(podcastSearch(supabase, query));
      searchPromises.push(classifiedsSearch(supabase, query));
      searchPromises.push(ceasaPricesSearch(supabase, query));
      break;
  }

  const searchResults = await Promise.all(searchPromises);

  const allResults = [
    ...matchedStatic,
    ...searchResults.flat()
  ];

  return NextResponse.json(allResults.slice(0, 5));
}
