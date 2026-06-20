type PageDefinition = {
  type: "main" | "institutional";
  href: string;
  name: string;
  showOnMenu: boolean;
};

class PageDefinitions {
  private pages: PageDefinition[] = [
    {
      type: "main",
      href: "/",
      name: "Home",
      showOnMenu: true,
    },
    {
      type: "main",
      href: "/noticias",
      name: "Notícias",
      showOnMenu: true,
    },
    {
      type: "main",
      href: "/precos-ceasa",
      name: "Preços Ceasa",
      showOnMenu: true,
    },
    {
      type: "main",
      href: "/podcast",
      name: "Podcast",
      showOnMenu: true,
    },
    {
      type: "main",
      href: "/classificados",
      name: "Classificados",
      showOnMenu: false,
    },
    {
      type: "institutional",
      href: "/conteudo-tecnico",
      name: "Conteúdo Técnico",
      showOnMenu: true,
    },
    {
      type: "institutional",
      href: "/anuncie",
      name: "Anuncie",
      showOnMenu: false,
    },
    {
      type: "institutional",
      href: "/politica-privacidade",
      name: "Política de Privacidade",
      showOnMenu: false,
    },
    {
      type: "institutional",
      href: "/termos-uso",
      name: "Termos de Uso",
      showOnMenu: false,
    },
  ];

  public getAllPages() {
    return this.pages;
  }

  public getPagesToShowOnMenu() {
    return this.pages.filter((page) => page.showOnMenu);
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
