# Portal Dia de Campo

**Portal de informação estratégica para o mercado hortigranjeiro brasileiro.**

O Portal Dia de Campo conecta produtores rurais, atacadistas, centrais de abastecimento e profissionais do setor hortifrutigranjeiro com notícias editoriais, conteúdo técnico, análises de mercado, podcasts e indicadores de preços atualizados diariamente.

🌐 **Acesso em produção:** [portaldiadecampo.com.br](https://portaldiadecampo.com.br)

---

## Funcionalidades

- 📰 **Notícias** — cobertura editorial do setor hortigranjeiro
- 📊 **Preços CEASA** — cotações diárias sincronizadas com a API da CONAB, filtráveis por central regional
- 🎙️ **Podcast** — entrevistas com especialistas do agronegócio
- 📋 **Classificados** — anúncios de compra, venda e oportunidades
- 📚 **Conteúdo Técnico** — guias, artigos e materiais de apoio
- 🔍 **Busca** — pesquisa de conteúdo por palavras-chave
- 🍪 **LGPD** — banner de consentimento de cookies e páginas de políticas de privacidade e termos de uso

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) com React 19 |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS v4 |
| Banco de dados | [Supabase](https://supabase.com/) (PostgreSQL) |
| Cache | Redis 7 (via [ioredis](https://github.com/redis/ioredis)) |
| Validação | [Zod](https://zod.dev/) |
| Contêineres | Docker + Docker Compose |
| Proxy reverso | Nginx (com SSL via Let's Encrypt) |
| Monitoramento | Grafana |

---

## Arquitetura do Projeto

```
dia-de-campo/
├── app/                        # Rotas da aplicação (Next.js App Router)
│   ├── page.tsx                # Homepage
│   ├── layout.tsx              # Layout raiz (Header, Footer, Cookie Banner)
│   ├── noticias/               # Listagem e detalhe de notícias
│   ├── conteudo-tecnico/       # Biblioteca de conteúdo técnico
│   ├── precos-ceasa/           # Página de cotações por central
│   ├── podcast/                # Listagem e detalhe de episódios
│   ├── classificados/          # Anúncios classificados
│   ├── politica-privacidade/   # Política de privacidade (LGPD)
│   ├── termos-uso/             # Termos de uso
│   ├── api/                    # API Routes internas
│   ├── sitemap.ts              # Sitemap dinâmico
│   └── manifest.ts             # Web App Manifest (PWA)
│
├── src/
│   ├── components/             # Componentes React reutilizáveis
│   ├── server/                 # Camada de servidor
│   │   ├── clients/            # Clientes de serviços externos (Supabase, Redis)
│   │   ├── repositories/       # Acesso a dados
│   │   ├── services/           # Regras de negócio (inclui sync CEASA)
│   │   ├── mappers/            # Transformação de dados
│   │   └── utils/              # Utilitários server-side
│   ├── helpers/                # Helpers de renderização (SEO, featured content)
│   ├── lib/                    # Configurações de bibliotecas
│   ├── context/                # React Context providers
│   ├── types/                  # Definições TypeScript
│   ├── content/                # Conteúdo estático
│   └── assets/                 # Assets estáticos
│
├── scripts/
│   └── sync-ceasa.ts           # Script de sincronização de preços CEASA
│
├── supabase/
│   ├── migrations/             # Migrações do banco de dados
│   └── seed.sql                # Dados iniciais
│
├── Dockerfile                  # Build multi-stage para produção
└── docker-compose.yml          # Orquestração: app + Redis + Nginx + Grafana
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [npm](https://www.npmjs.com/) >= 10
- Uma conta no [Supabase](https://supabase.com/) com o projeto configurado
- Redis (opcional para desenvolvimento local — o cache é ignorado se indisponível)

---

## Getting Started

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dia-de-campo.git
cd dia-de-campo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env .env.local
```

Edite `.env.local` com os valores adequados (veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente) abaixo).

### 4. Execute em modo de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | URL pública da aplicação | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase | ✅ |
| `SUPABASE_ANON_KEY` | Chave anônima do Supabase | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de service role do Supabase (server-only) | ✅ |
| `REDIS_URL` | URL de conexão com o Redis | ⚠️ Opcional |
| `CACHE_TTL_SECONDS` | Tempo de vida do cache em segundos (padrão: `300`) | ⚠️ Opcional |
| `CEASA_API_URL` | URL da API de preços da CONAB | ✅ |
| `CEASA_SYNC_CRON_SECRET` | Secret para autenticar o endpoint de sync CEASA | ✅ |
| `NEXT_PUBLIC_COMERCIAL_PHONE_NUMBER` | Número de WhatsApp comercial | ⚠️ Opcional |
| `NEXT_PUBLIC_COMERCIAL_EMAIL_ADDRESS` | E-mail comercial | ⚠️ Opcional |
| `NEXT_PUBLIC_SOCIAL_YOUTUBE` | URL do canal no YouTube | ⚠️ Opcional |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | URL do perfil no Instagram | ⚠️ Opcional |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` | URL da página no Facebook | ⚠️ Opcional |
| `NEXT_PUBLIC_SOCIAL_SPOTIFY` | URL do podcast no Spotify | ⚠️ Opcional |
| `LOG_PATH` | Caminho local para arquivos de log | ⚠️ Opcional |

---

## Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera o build de produção
npm run start        # Inicia o servidor em modo produção
npm run lint         # Executa o ESLint
npm run sync:ceasa   # Sincroniza os preços CEASA com o banco de dados
```

### Sincronização de Preços CEASA

Os preços são obtidos via arquivo diário da [CONAB (PROHORT)](https://portaldeinformacoes.conab.gov.br/). O script `sync:ceasa` faz o download, processa e persiste os dados no Supabase.

Em produção, esse sync é disparado via chamada ao endpoint interno protegido pelo `CEASA_SYNC_CRON_SECRET`, tipicamente agendado via cron job no servidor.

---

## Deploy com Docker

O projeto inclui um `Dockerfile` multi-stage otimizado e um `docker-compose.yml` completo para produção.

### Serviços orquestrados

| Serviço | Descrição | Porta |
|---|---|---|
| `next_app` | Aplicação Next.js | 3000 (interna) |
| `redis_cache` | Cache Redis 7 | 6379 (interna) |
| `nginx` | Proxy reverso com SSL | 80 / 443 |
| `grafana` | Painel de monitoramento | 3001 |

### Subir em produção

```bash
# Certifique-se de que a rede externa existe
docker network create app-network

# Build e subir todos os serviços
docker compose up -d --build
```

> **Atenção:** o Nginx espera um arquivo de configuração em `../nginx/nginx.conf` relativo ao projeto e certificados SSL em `/etc/letsencrypt`.

---

## Banco de Dados (Supabase)

As migrações ficam em `supabase/migrations/` e podem ser aplicadas com a CLI do Supabase:

```bash
# Instalar a CLI (caso não tenha)
npm install -g supabase

# Aplicar migrações no ambiente remoto
supabase db push
```

Para popular o banco com dados iniciais:

```bash
supabase db reset   # em ambiente local (reaplica migrações + seed.sql)
```

---

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto é proprietário. Todos os direitos reservados ao Portal Dia de Campo.
