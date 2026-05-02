import { HighlightItem } from "../types";


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

  public getHighlights(): HighlightItem[] {
    return this.mockHighlights;
  }
  public getHighlightPlayInterval(): number {
    return this.playInterval;
  }
}
 export default new Highlights();