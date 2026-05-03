import {
  HighlightItem,
  HomeSectionCeasaPrices,
  HomeSectionNews,
  HomeSectionPodcast,
} from "../types";

import IncreaseIcon from '@/src/assets/icons/increase-icon.svg';
import DecreaseIcon from '@/src/assets/icons/decrease-icon.svg';
import StableIcon from '@/src/assets/icons/stable-icon.svg';

class Highlights {
  private playInterval = 10000;
  private mockHighlights: HighlightItem[] = [
    {
      id: 1,
      title: "Manejo inteligente de pastagens",
      description: "Boas praticas para aumentar a produtividade no campo.",
      imageSrc:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=675&fit=crop",
      categoryName: "Mercado",
    },
    {
      id: 2,
      title: "Tecnologia para irrigacao eficiente",
      description: "Solucoes para reduzir desperdicio de agua na lavoura.",
      imageSrc:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop",
      categoryName: "Mercado",
    },
    {
      id: 3,
      title: "Gestao de custos na propriedade",
      description: "Como melhorar resultados com planejamento financeiro.",
      imageSrc:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=675&fit=crop",
      categoryName: "Mercado",
    },
  ];
  private mockNewsHighlights: HomeSectionNews[] = [
    {
      coverImage:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=675&fit=crop",
      categoryName: "Mercado",
      title: "Manejo inteligente de pastagens",
      shortDescription: "Boas praticas para aumentar a produtividade no campo.",
      link: "/noticias/slug",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop",
      categoryName: "Mercado",
      title: "Irrigacao por gotejamento ganha espaco no campo",
      shortDescription:
        "Produtores investem em eficiencia hidrica para reduzir perdas.",
      link: "/noticias/irrigacao-por-gotejamento",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=675&fit=crop",
      categoryName: "Gestao",
      title: "Planejamento financeiro rural para a proxima safra",
      shortDescription:
        "Organizacao de custos ajuda a proteger margens de lucro.",
      link: "/noticias/planejamento-financeiro-rural",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1200&h=675&fit=crop",
      categoryName: "Tecnologia",
      title: "Drones aceleram monitoramento de areas de cultivo",
      shortDescription:
        "Mapeamento aereo identifica falhas e melhora decisoes tecnicas.",
      link: "/noticias/drones-no-monitoramento",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=675&fit=crop",
      categoryName: "Clima",
      title: "Previsao sazonal indica atencao com veranicos",
      shortDescription:
        "Especialistas recomendam ajustar calendario de plantio.",
      link: "/noticias/previsao-sazonal-veranicos",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=675&fit=crop",
      categoryName: "Sustentabilidade",
      title: "Recuperacao de solo melhora produtividade no medio prazo",
      shortDescription:
        "Praticas conservacionistas reduzem erosao e aumentam fertilidade.",
      link: "/noticias/recuperacao-de-solo",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=1200&h=675&fit=crop",
      categoryName: "Mercado",
      title: "Cotacoes de graos fecham semana em alta",
      shortDescription:
        "Demanda externa pressiona precos em importantes pracas.",
      link: "/noticias/cotacoes-graos-semana",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=1200&h=675&fit=crop",
      categoryName: "Pecuaria",
      title: "Bem-estar animal se torna diferencial competitivo",
      shortDescription:
        "Protocolos de manejo elevam desempenho e qualidade da producao.",
      link: "/noticias/bem-estar-animal-no-campo",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?w=1200&h=675&fit=crop",
      categoryName: "Tecnologia",
      title: "Sensores no campo auxiliam tomada de decisao diaria",
      shortDescription: "Dados em tempo real melhoram eficiencia operacional.",
      link: "/noticias/sensores-agro-dados",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1200&h=675&fit=crop",
      categoryName: "Infraestrutura",
      title: "Armazenagem adequada reduz perdas pos-colheita",
      shortDescription:
        "Investimentos em silos elevam qualidade e valor do produto.",
      link: "/noticias/armazenagem-pos-colheita",
    },
    {
      coverImage:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=675&fit=crop",
      categoryName: "Capacitacao",
      title: "Cursos tecnicos impulsionam profissionalizacao no agro",
      shortDescription:
        "Formacao continua amplia produtividade e competitividade.",
      link: "/noticias/cursos-tecnicos-agro",
    },
  ];
  private mockCeasaPrices: HomeSectionCeasaPrices[] = [
    {
      uf: "SP",
      title: "Tomate Salada",
      link: "/precos-ceasa/tomate-salada-sp",
      price: 98.5,
      priceVariation: 2.4,
      priceVariationIcon: IncreaseIcon.src,
    },
    {
      uf: "SP",
      title: "Batata Inglesa",
      link: "/precos-ceasa/batata-inglesa-sp",
      price: 76.2,
      priceVariation: -1.1,
      priceVariationIcon: DecreaseIcon.src,
    },
    {
      uf: "MG",
      title: "Cebola Pera",
      link: "/precos-ceasa/cebola-pera-mg",
      price: 64.9,
      priceVariation: 0.8,
      priceVariationIcon: IncreaseIcon.src,
    },
    {
      uf: "PR",
      title: "Cenoura",
      link: "/precos-ceasa/cenoura-pr",
      price: 58.3,
      priceVariation: -0.6,
      priceVariationIcon: DecreaseIcon.src,
    },
    {
      uf: "GO",
      title: "Alho Nacional",
      link: "/precos-ceasa/alho-nacional-go",
      price: 145.0,
      priceVariation: 0,
      priceVariationIcon: StableIcon.src,
    },
    {
      uf: "BA",
      title: "Banana Prata",
      link: "/precos-ceasa/banana-prata-ba",
      price: 43.7,
      priceVariation: 1.5,
      priceVariationIcon: IncreaseIcon.src,
    },
    {
      uf: "RS",
      title: "Maca Gala",
      link: "/precos-ceasa/maca-gala-rs",
      price: 82.4,
      priceVariation: -2.0,
      priceVariationIcon: DecreaseIcon.src,
    },
    {
      uf: "PE",
      title: "Mamao Formosa",
      link: "/precos-ceasa/mamao-formosa-pe",
      price: 55.6,
      priceVariation: 0.9,
      priceVariationIcon: IncreaseIcon.src,
    },
    {
      uf: "CE",
      title: "Melancia",
      link: "/precos-ceasa/melancia-ce",
      price: 37.8,
      priceVariation: 1.1,
      priceVariationIcon: IncreaseIcon.src,
    },
    {
      uf: "SC",
      title: "Laranja Pera",
      link: "/precos-ceasa/laranja-pera-sc",
      price: 49.3,
      priceVariation: -0.4,
      priceVariationIcon: DecreaseIcon.src,
    },
  ];
  private mockHighlightPodcast: HomeSectionPodcast = {
    episode: "Episódio 42",
    title: "Agro em Foco: desafios e oportunidades da safra",
    description:
      "Um panorama sobre clima, mercado e tecnologia para melhorar resultados no campo.",
    embedUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    embedKind: "audio",
    link: "/podcast/agro-em-foco-ep-001",
  };

  public getHighlights(): HighlightItem[] {
    return this.mockHighlights;
  }
  public getHighlightPlayInterval(): number {
    return this.playInterval;
  }
  public getHighlightNews(): HomeSectionNews[] {
    return this.mockNewsHighlights;
  }
  public getHighlightCeasaPrices(): HomeSectionCeasaPrices[] {
    return this.mockCeasaPrices;
  }
  public getHighlightPodcast(): HomeSectionPodcast {
    return this.mockHighlightPodcast;
  }
}
export default new Highlights();
