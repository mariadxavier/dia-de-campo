import { companyInfo, type LegalSection } from './companyInfo';

export const termsOfUseSections: LegalSection[] = [
  {
    title: '1. Aceitação dos Termos',
    paragraphs: [
      `Estes Termos de Uso ("Termos") regulam o acesso e a utilização do ${companyInfo.portalName}, disponível em ${companyInfo.portalUrl}, operado por ${companyInfo.legalName}, CNPJ ${companyInfo.cnpj}.`,
      'Ao acessar ou utilizar qualquer funcionalidade do Portal, você declara ter lido, compreendido e concordado integralmente com estes Termos e com a nossa Política de Privacidade. Se não concordar, interrompa o uso imediatamente.',
    ],
  },
  {
    title: '2. Descrição dos serviços',
    paragraphs: [
      'O Portal oferece informação estratégica para o mercado hortigranjeiro e agronegócio, incluindo:',
    ],
    list: [
      'Notícias e cobertura editorial do setor.',
      'Conteúdo técnico especializado.',
      'Cotações e indicadores de preços de CEASAs.',
      'Podcast com episódios em áudio e vídeo.',
      'Classificados para compra, venda e divulgação de produtos, serviços e oportunidades.',
      'Busca integrada de conteúdo publicado no Portal.',
      'Canais de contato comercial via e-mail e WhatsApp.',
    ],
  },
  {
    title: '3. Uso permitido',
    paragraphs: [
      'Você pode utilizar o Portal para consulta de informações, compartilhamento de links para conteúdo publicado e contato com anunciantes ou com o time comercial do Portal, respeitando estes Termos e a legislação vigente.',
    ],
  },
  {
    title: '4. Condutas proibidas',
    paragraphs: [
      'É expressamente proibido, entre outras condutas:',
    ],
    list: [
      'Utilizar o Portal para fins ilícitos, fraudulentos ou que violem direitos de terceiros.',
      'Tentar acessar áreas restritas, sistemas ou dados sem autorização.',
      'Realizar engenharia reversa, scraping automatizado abusivo ou ações que comprometam a disponibilidade do serviço.',
      'Reproduzir, distribuir ou modificar conteúdo editorial do Portal sem autorização prévia, salvo nos limites legais de citação.',
      'Publicar ou veicular informações falsas, difamatórias ou enganosas em nome do Portal.',
      'Utilizar dados de contato de anunciantes para spam, assédio ou finalidades não relacionadas ao anúncio.',
    ],
  },
  {
    title: '5. Propriedade intelectual',
    paragraphs: [
      'Todo o conteúdo editorial do Portal — textos, imagens, logotipos, layout, marcas, podcasts e demais materiais — é protegido por direitos autorais e legislação de propriedade intelectual, pertencendo ao Portal ou a seus licenciadores.',
      'A reprodução, distribuição ou exploração comercial de qualquer conteúdo sem autorização prévia e por escrito é vedada, ressalvadas as exceções legais (como citação com indicação da fonte).',
    ],
  },
  {
    title: '6. Classificados',
    paragraphs: [
      'Os anúncios publicados na seção de Classificados são de responsabilidade exclusiva dos anunciantes quanto à veracidade, legalidade e atualização das informações divulgadas, incluindo preços, descrições e dados de contato.',
      'O Portal atua como veículo de divulgação e não garante a conclusão de negócios entre usuários e anunciantes. Qualquer transação é realizada diretamente entre as partes, sem participação ou responsabilidade do Portal.',
      'Reservamo-nos o direito de recusar, editar ou remover anúncios que violem estes Termos, a legislação aplicável ou que prejudiquem a experiência dos usuários.',
    ],
  },
  {
    title: '7. Preços CEASA e conteúdo informativo',
    paragraphs: [
      'As cotações e indicadores de preços exibidos no Portal têm caráter informativo e referencial. Podem sofrer alterações sem aviso prévio e não constituem oferta comercial, recomendação de investimento ou garantia de preço praticado no mercado.',
      'Recomendamos confirmar valores e condições diretamente com as centrais de abastecimento ou com os respectivos fornecedores antes de tomar decisões comerciais.',
    ],
  },
  {
    title: '8. Links e serviços de terceiros',
    paragraphs: [
      'O Portal pode conter links para sites, aplicativos ou serviços de terceiros (redes sociais, WhatsApp, Spotify, YouTube, entre outros). Não nos responsabilizamos pelo conteúdo, políticas ou práticas desses serviços externos.',
      'O acesso a links externos é por sua conta e risco, sujeito aos termos e políticas dos respectivos provedores.',
    ],
  },
  {
    title: '9. Publicidade',
    paragraphs: [
      'O Portal pode exibir banners publicitários e conteúdo patrocinado. Anunciantes são responsáveis pelo material veiculado. A presença de publicidade não implica endosso ou recomendação pelo Portal, salvo quando expressamente indicado.',
    ],
  },
  {
    title: '10. Disponibilidade e alterações',
    paragraphs: [
      'Empregamos esforços razoáveis para manter o Portal disponível, mas não garantimos operação ininterrupta ou livre de erros. Podemos modificar, suspender ou descontinuar funcionalidades a qualquer momento, com ou sem aviso prévio.',
      'Podemos atualizar estes Termos periodicamente. O uso continuado do Portal após alterações constitui aceitação da versão vigente.',
    ],
  },
  {
    title: '11. Limitação de responsabilidade',
    paragraphs: [
      'Na máxima extensão permitida pela lei aplicável, o Portal não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou da impossibilidade de uso do serviço, incluindo perdas comerciais, interrupção de negócios ou perda de dados.',
      'Nada nestes Termos exclui ou limita responsabilidades que não possam ser legalmente excluídas ou limitadas.',
    ],
  },
  {
    title: '12. Indenização',
    paragraphs: [
      'Você concorda em indenizar e isentar o Portal, seus representantes e parceiros de quaisquer reclamações, perdas ou despesas (incluindo honorários advocatícios) decorrentes do uso indevido do serviço ou violação destes Termos.',
    ],
  },
  {
    title: '13. Lei aplicável e foro',
    paragraphs: [
      'Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de ' +
        companyInfo.jurisdiction +
        ', com renúncia a qualquer outro, por mais privilegiado que seja, para dirimir controvérsias decorrentes destes Termos, ressalvado o direito do consumidor de optar pelo foro de seu domicílio quando aplicável.',
    ],
  },
  {
    title: '14. Contato',
    paragraphs: [
      `Para dúvidas sobre estes Termos, entre em contato pelo e-mail ${companyInfo.contactEmail}.`,
    ],
  },
];
