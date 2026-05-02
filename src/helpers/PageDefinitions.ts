type PageDefinition = {
  type: "main" | "institutional";
  href: string;
  name: string;
};

class PageDefinitions {
  private pages: PageDefinition[] = [
    {
      type: "main",
      href: "/",
      name: "Home",
    },
    {
      type: "main",
      href: "/noticias",
      name: "Notícias",
    },
    {
      type: "main",
      href: "/precos-ceasa",
      name: "Preços Ceasa",
    },
    {
      type: "main",
      href: "/podcast",
      name: "Podcast",
    },
    {
      type: "main",
      href: "/classificados",
      name: "Classificados",
    },
    {
      type: "institutional",
      href: "/conteudo-tecnico",
      name: "Conteúdo Técnico",
    },
    {
      type: "institutional",
      href: "/anuncie",
      name: "Anuncie",
    },
    {
      type: "institutional",
      href: "/contato",
      name: "Contato",
    },
    {
      type: "institutional",
      href: "/politica-privacidade",
      name: "Política de Privacidade",
    },
    {
      type: "institutional",
      href: "/termos-uso",
      name: "Termos de Uso",
    },
  ];

  public getAllPages() {
    return this.pages;
  }

  public getMainPages() {
    const mainPages = this.pages.filter((page) => page.type === "main");
    return mainPages;
  }

  public getinstitutionalPages() {
    const institutionalPages = this.pages.filter(
      (page) => page.type === "institutional",
    );
    return institutionalPages;
  }
}

export default new PageDefinitions();
