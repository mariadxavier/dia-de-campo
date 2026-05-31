import {
  ClassifiedListItem,
  HomeSectionCeasaPrices,
  HomeSectionNews,
  HomeSectionPodcast,
  TechnicalContentListItem,
} from '../types';

import IncreaseIcon from '@/src/assets/icons/increase-icon.svg';
import DecreaseIcon from '@/src/assets/icons/decrease-icon.svg';
import StableIcon from '@/src/assets/icons/stable-icon.svg';

class FeaturedContent {
  private playInterval = 10000;
  private mockTechnicalContent: TechnicalContentListItem[] = [
    {
      id: '1',
      type: 'technical',
      title: 'Como otimizar o desempenho de aplicações React',
      slug: 'como-otimizar-desempenho-react',
      shortDescription:
        'Conheça técnicas para reduzir renderizações desnecessárias e melhorar a experiência do usuário.',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      categoryName: 'Tecnologia',
      link: '/conteudos/como-otimizar-desempenho-react',
      publishedAt: '2026-05-31T09:00:00Z',
      isFeatured: true,
      featuredPriority: 1,
    },
    {
      id: '2',
      type: 'technical',
      title: 'Mercado de TI segue aquecido em 2026',
      slug: 'mercado-ti-segue-aquecido-2026',
      shortDescription:
        'Empresas ampliam investimentos em transformação digital e contratação de especialistas.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      categoryName: 'Negócios',
      link: '/conteudos/mercado-ti-segue-aquecido-2026',
      publishedAt: '2026-05-30T14:15:00Z',
      isFeatured: true,
      featuredPriority: 2,
    },
    {
      id: '3',
      type: 'technical',
      title: 'Guia completo para freelancers de tecnologia',
      slug: 'guia-completo-freelancers-tecnologia',
      shortDescription:
        'Aprenda sobre precificação, contratos, emissão de notas fiscais e prospecção de clientes.',
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      categoryName: 'Carreira',
      link: '/conteudos/guia-completo-freelancers-tecnologia',
      publishedAt: '2026-05-28T18:00:00Z',
      isFeatured: false,
      featuredPriority: null,
    },
    {
      id: '4',
      type: 'technical',
      title: 'Introdução ao Docker para desenvolvedores',
      slug: 'introducao-docker-desenvolvedores',
      shortDescription:
        'Entenda os conceitos básicos de containers e como utilizá-los no dia a dia.',
      coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b',
      categoryName: 'DevOps',
      link: '/conteudos/introducao-docker-desenvolvedores',
      publishedAt: '2026-05-26T11:30:00Z',
      isFeatured: false,
      featuredPriority: null,
    },
  ];
  private mockClassifieds = [
    {
      id: '1',
      title: 'Apartamento 3 quartos no Centro',
      slug: 'apartamento-3-quartos-centro',
      shortDescription:
        'Apartamento reformado com 3 quartos, vaga de garagem e excelente localização.',
      coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      city: 'Belo Horizonte',
      state: 'MG',
      price: 450000,
      link: '/classificados/apartamento-3-quartos-centro',
      publishedAt: '2026-05-31T10:00:00Z',
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Notebook Dell Inspiron i7',
      slug: 'notebook-dell-inspiron-i7',
      shortDescription: 'Notebook em ótimo estado, 16GB RAM, SSD 512GB e tela Full HD.',
      coverImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      city: 'Contagem',
      state: 'MG',
      price: 3200,
      link: '/classificados/notebook-dell-inspiron-i7',
      publishedAt: '2026-05-30T15:30:00Z',
      isFeatured: false,
    },
    {
      id: '3',
      title: 'Honda Civic EXL 2022',
      slug: 'honda-civic-exl-2022',
      shortDescription: 'Veículo único dono, revisões em dia e baixa quilometragem.',
      coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      city: 'Betim',
      state: 'MG',
      price: 128900,
      link: '/classificados/honda-civic-exl-2022',
      publishedAt: '2026-05-29T08:45:00Z',
      isFeatured: true,
    },
    {
      id: '4',
      title: 'Mesa de Escritório em Madeira',
      slug: 'mesa-escritorio-madeira',
      shortDescription: 'Mesa ampla para home office, acabamento em madeira maciça.',
      coverImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
      city: 'Nova Lima',
      state: 'MG',
      price: 850,
      link: '/classificados/mesa-escritorio-madeira',
      publishedAt: '2026-05-28T12:00:00Z',
      isFeatured: false,
    },
  ];
  private mockHighlights = [
    {
      title: 'Manejo inteligente de pastagens',
      description: 'Boas praticas para aumentar a produtividade no campo.',
      imageSrc:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=675&fit=crop',
      categoryName: 'Mercado',
      link: '',
    },
    {
      title: 'Tecnologia para irrigacao eficiente',
      description: 'Solucoes para reduzir desperdicio de agua na lavoura.',
      imageSrc:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop',
      categoryName: 'Mercado',
    },
    {
      title: 'Gestao de custos na propriedade',
      description: 'Como melhorar resultados com planejamento financeiro.',
      imageSrc:
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=675&fit=crop',
      categoryName: 'Mercado',
    },
  ];
  private mockNewsHighlights: HomeSectionNews[] = [
    {
      coverImage:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=675&fit=crop',
      categoryName: 'Mercado',
      title: 'Manejo inteligente de pastagens',
      shortDescription: 'Boas praticas para aumentar a produtividade no campo.',
      link: '/noticias/slug',
    },
    {
      coverImage:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop',
      categoryName: 'Mercado',
      title: 'Irrigacao por gotejamento ganha espaco no campo',
      shortDescription: 'Produtores investem em eficiencia hidrica para reduzir perdas.',
      link: '/noticias/irrigacao-por-gotejamento',
    },
    {
      coverImage:
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=675&fit=crop',
      categoryName: 'Gestao',
      title: 'Planejamento financeiro rural para a proxima safra',
      shortDescription: 'Organizacao de custos ajuda a proteger margens de lucro.',
      link: '/noticias/planejamento-financeiro-rural',
    },
    {
      coverImage:
        'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1200&h=675&fit=crop',
      categoryName: 'Tecnologia',
      title: 'Drones aceleram monitoramento de areas de cultivo',
      shortDescription: 'Mapeamento aereo identifica falhas e melhora decisoes tecnicas.',
      link: '/noticias/drones-no-monitoramento',
    },
  ];
  private mockCeasaPrices: HomeSectionCeasaPrices[] = [
    {
      uf: 'SP',
      title: 'Tomate Salada',
      link: '/precos-ceasa/tomate-salada-sp',
      price: 98.5,
      priceVariation: 2.4,
      priceVariationIcon: IncreaseIcon.src,
      unity: 'KG',
    },
    {
      uf: 'SP',
      title: 'Batata Inglesa',
      link: '/precos-ceasa/batata-inglesa-sp',
      price: 76.2,
      priceVariation: -1.1,
      priceVariationIcon: DecreaseIcon.src,
      unity: 'KG',
    },
    {
      uf: 'MG',
      title: 'Cebola Pera',
      link: '/precos-ceasa/cebola-pera-mg',
      price: 64.9,
      priceVariation: 0.8,
      priceVariationIcon: IncreaseIcon.src,
      unity: 'KG',
    },
    {
      uf: 'PR',
      title: 'Cenoura',
      link: '/precos-ceasa/cenoura-pr',
      price: 58.3,
      priceVariation: -0.6,
      priceVariationIcon: DecreaseIcon.src,
      unity: 'KG',
    },
    {
      uf: 'GO',
      title: 'Alho Nacional',
      link: '/precos-ceasa/alho-nacional-go',
      price: 145.0,
      priceVariation: 0,
      priceVariationIcon: StableIcon.src,
      unity: 'KG',
    },
  ];
  private mockHighlightPodcast: HomeSectionPodcast = {
    episodeNumber: '042',
    episode: 'Episódio 42',
    title: 'Agro em Foco: desafios e oportunidades da safra',
    description: 'Um panorama sobre clima, mercado e tecnologia para melhorar resultados no campo.',
    embedUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    embedKind: 'audio',
    link: '/podcast/agro-em-foco-ep-001',
    author: 'Dr. Carlos Mendes',
    duration: '35min',
  };

  public getHighlights() {
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
  public getHighlightPodcastList(): HomeSectionPodcast[] {
    return [this.mockHighlightPodcast];
  }
  public getClassifieds(): ClassifiedListItem[] {
    return this.mockClassifieds;
  }
  public getTechnicalContent(): TechnicalContentListItem[] {
    return this.mockTechnicalContent;
  }
}

export default new FeaturedContent();
