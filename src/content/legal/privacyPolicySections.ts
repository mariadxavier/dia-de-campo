import { companyInfo, type LegalSection } from './companyInfo';

export const privacyPolicySections: LegalSection[] = [
  {
    title: '1. Introdução',
    paragraphs: [
      `Esta Política de Privacidade descreve como o ${companyInfo.portalName} ("Portal", "nós" ou "nosso") coleta, utiliza, armazena e protege dados pessoais de visitantes e usuários, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).`,
      'Ao utilizar o Portal, você declara ter lido e compreendido esta Política. Recomendamos a leitura periódica, pois ela pode ser atualizada conforme descrito na seção "Alterações desta Política".',
    ],
  },
  {
    title: '2. Controlador dos dados',
    paragraphs: [
      `O controlador dos dados pessoais tratados por meio deste Portal é ${companyInfo.legalName}, inscrita no CNPJ sob o nº ${companyInfo.cnpj}, com sede em ${companyInfo.address}, ${companyInfo.city}.`,
      `Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato pelo e-mail ${companyInfo.contactEmail}.`,
    ],
  },
  {
    title: '3. Dados que coletamos',
    paragraphs: [
      'O Portal é predominantemente de leitura e não exige cadastro para navegação. Atualmente, coletamos ou processamos as categorias de dados abaixo:',
    ],
    list: [
      'Dados de geolocalização (latitude e longitude): solicitados com sua permissão no navegador, utilizados exclusivamente para identificar a CEASA mais próxima e personalizar a exibição de preços e classificados por região. As coordenadas não são armazenadas em banco de dados.',
      'Termos de busca: processados em tempo real quando você utiliza a busca do Portal. Não são persistidos em banco de dados.',
      'Parâmetros de navegação: informações presentes na URL (filtros, paginação, termos de pesquisa) permanecem no seu navegador durante a sessão.',
      'Cookies funcionais: cookies `selected-ceasa` e `uf`, definidos após consentimento, para lembrar a central de abastecimento e unidade federativa selecionadas.',
      'Preferências de consentimento: armazenadas localmente no seu navegador (`localStorage`) para registrar suas escolhas sobre cookies e geolocalização.',
      'Dados técnicos de acesso: endereço IP, tipo de navegador, sistema operacional e registros de erro podem ser processados automaticamente pelos servidores da Hostinger e por logs do Portal para fins de segurança e diagnóstico.',
    ],
  },
  {
    title: '4. Finalidade e base legal do tratamento',
    paragraphs: [
      'Tratamos dados pessoais com as seguintes finalidades e bases legais previstas na LGPD:',
    ],
    list: [
      'Personalização regional (CEASA e classificados): execução de consentimento (Art. 7º, I) para geolocalização e cookies funcionais.',
      'Funcionamento do Portal (busca, exibição de conteúdo, cache): execução de contrato ou procedimentos preliminares e legítimo interesse (Art. 7º, V e IX).',
      'Segurança e prevenção a fraudes: legítimo interesse (Art. 7º, IX).',
      'Atendimento a solicitações via e-mail ou WhatsApp: execução de contrato ou consentimento, conforme o canal escolhido pelo usuário.',
    ],
  },
  {
    title: '5. Cookies e tecnologias similares',
    paragraphs: [
      'Utilizamos cookies estritamente necessários ao funcionamento e cookies funcionais, conforme descrito abaixo. Não utilizamos cookies de publicidade comportamental ou ferramentas de analytics de terceiros (como Google Analytics) nesta versão do Portal.',
      'Você pode gerenciar suas preferências pelo banner de consentimento exibido na primeira visita ou recusar cookies opcionais. A recusa de cookies funcionais pode limitar recursos como a seleção automática da CEASA mais próxima.',
    ],
    list: [
      'Cookie `selected-ceasa`: armazena o nome da CEASA selecionada. Finalidade: personalização de preços.',
      'Cookie `uf`: armazena a unidade federativa associada à CEASA. Finalidade: filtro padrão em classificados.',
      'Chave `dia-de-campo-consent` (localStorage): registra suas preferências de consentimento.',
    ],
  },
  {
    title: '6. Dados de anunciantes em classificados',
    paragraphs: [
      'A seção de Classificados exibe anúncios com informações fornecidas pelos anunciantes, incluindo nome de contato, e-mail, telefone, cidade e estado. Esses dados são publicados para viabilizar o contato entre interessados e anunciantes.',
      'O cadastro de anúncios é realizado administrativamente pelo Portal. Anunciantes que desejarem atualizar, corrigir ou remover seus dados devem entrar em contato pelo e-mail indicado na seção "Contato e encarregado".',
    ],
  },
  {
    title: '7. Compartilhamento com terceiros',
    paragraphs: [
      'Podemos compartilhar ou permitir o processamento de dados por terceiros nas seguintes situações:',
    ],
    list: [
      'Supabase: infraestrutura de banco de dados, armazenamento de conteúdo e classificados.',
      'Redis: cache temporário de conteúdo público, sem armazenamento de dados pessoais de visitantes.',
      'API CEASA externa: sincronização de cotações de mercado (dados agregados, sem PII de visitantes).',
      'Google Fonts: carregamento da fonte Inter via `next/font` (pode envolver endereço IP ao servidor do Google).',
      'Spotify e YouTube: players incorporados na seção de Podcast podem definir cookies próprios conforme suas políticas.',
      'WhatsApp e serviços de e-mail: quando você opta por entrar em contato com o Portal ou com anunciantes por esses canais, a comunicação ocorre fora do ambiente do Portal e está sujeita às políticas dessas plataformas.',
      'Hostinger: servidores de hospedagem do Portal, com processamento de logs, tráfego e dados técnicos de acesso necessários à operação do site.',
    ],
  },
  {
    title: '8. Transferência internacional de dados',
    paragraphs: [
      'Alguns dos prestadores de serviço listados acima podem processar dados em servidores localizados fora do Brasil. Nesses casos, adotamos medidas contratuais e técnicas compatíveis com a LGPD para garantir nível adequado de proteção.',
    ],
  },
  {
    title: '9. Retenção dos dados',
    paragraphs: [
      'Mantemos dados pelo tempo necessário para cumprir as finalidades descritas nesta Política:',
    ],
    list: [
      'Geolocalização: processada em tempo real, sem persistência em banco de dados.',
      'Cookies funcionais: permanecem no navegador até expiração ou exclusão manual.',
      'Preferências de consentimento: armazenadas até você limpar os dados do navegador ou alterar suas escolhas.',
      'Dados de anunciantes: mantidos enquanto o anúncio estiver publicado ou conforme prazo de validade (`expires_at`), e posteriormente excluídos ou anonimizados.',
      'Logs de servidor: retidos pelo período necessário para segurança e diagnóstico, conforme política interna de retenção.',
    ],
  },
  {
    title: '10. Segurança',
    paragraphs: [
      'Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida, incluindo comunicação criptografada (HTTPS), controle de acesso ao banco de dados e monitoramento de erros.',
      'Nenhum sistema é completamente seguro. Em caso de incidente de segurança que possa acarretar risco aos titulares, comunicaremos as autoridades e os afetados conforme exigido pela legislação aplicável.',
    ],
  },
  {
    title: '11. Seus direitos (LGPD)',
    paragraphs: [
      'Nos termos da LGPD, você pode solicitar, a qualquer momento:',
    ],
    list: [
      'Confirmação da existência de tratamento e acesso aos dados.',
      'Correção de dados incompletos, inexatos ou desatualizados.',
      'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.',
      'Portabilidade dos dados, quando aplicável.',
      'Eliminação dos dados tratados com base no consentimento.',
      'Informação sobre entidades com as quais compartilhamos dados.',
      'Revogação do consentimento, quando o tratamento tiver essa base legal.',
    ],
  },
  {
    title: '12. Cadastro de usuários (funcionalidade futura)',
    paragraphs: [
      'O Portal pode, no futuro, disponibilizar cadastro e autenticação de usuários. Nessa hipótese, dados como e-mail e senha serão tratados conforme bases legais específicas, e esta Política será atualizada para refletir as novas finalidades e direitos aplicáveis.',
    ],
  },
  {
    title: '13. Menores de idade',
    paragraphs: [
      'O Portal não se destina a menores de 18 anos. Não coletamos intencionalmente dados de crianças ou adolescentes. Caso identifiquemos tal coleta, excluiremos os dados prontamente.',
    ],
  },
  {
    title: '14. Alterações desta Política',
    paragraphs: [
      `Podemos atualizar esta Política periodicamente. A data da última revisão será indicada no topo desta página. Alterações relevantes poderão ser comunicadas por aviso no Portal.`,
    ],
  },
  {
    title: '15. Contato',
    paragraphs: [
      `Para dúvidas, solicitações ou exercício de direitos relacionados a dados pessoais, entre em contato pelo e-mail ${companyInfo.contactEmail}, informando seu nome e a natureza da solicitação. Responderemos dentro dos prazos legais aplicáveis.`,
    ],
  },
];
