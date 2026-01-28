# SCC - Simulador de Casos Clínicos

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

> **A plataforma definitiva para simulações médicas realistas e preparação avançada.**

O **SCC** é uma aplicação web moderna desenvolvida para treinar profissionais de saúde através de casos clínicos interativos. Este projeto demonstra proficiência em arquitetura frontend escalável, UX refinada e integração robusta com serviços de backend.

---

## 🚀 Demonstração

[**Acesse a Aplicação Live**](https://clinical-case-simulator.vercel.app/login)

### Credenciais de Acesso (Recrutador)
Para facilitar sua avaliação, utilize as credenciais de teste abaixo (já pré-preenchidas na tela de login):

| Campo | Valor |
| :--- | :--- |
| **Email** | `admin@scc.com` |
| **Senha** | `admin123` |

---

## 🛠️ Stack Tecnológica

A escolha das tecnologias priorizou **performance**, **segurança de tipos** e **velocidade de desenvolvimento**.

- **Core:** [Next.js 14 (App Router)](https://nextjs.org/) - Para SSR, SEO e rotas otimizadas.
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) - Tipagem estática rigorosa para reduzir bugs em produção.
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS para UI consistente e responsiva.
- **Componentes:** [Shadcn/UI](https://ui.shadcn.com/) (baseado em Radix UI) - Acessibilidade e personalização.
- **Validação:** [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) - Gerenciamento robusto de formulários e schemas.
- **Backend/Auth:** [Supabase](https://supabase.com/) - Auth, Database (PostgreSQL) e Realtime.
- **Ícones:** [Lucide React](https://lucide.dev/) - Ícones leves e consistentes.

---

## 🏗️ Arquitetura e Decisões Técnicas

### 1. Next.js App Router & Server Components
Adotamos o **App Router** para aproveitar ao máximo os React Server Components (RSC).
- **Performance:** A maior parte da renderização (casos clínicos estáticos, layouts) ocorre no servidor, enviando menos JavaScript para o cliente.
- **Data Fetching:** Dados sensíveis são buscados diretamente no servidor, melhorando a segurança.

### 2. Autenticação com Supabase
Utilizamos a autenticação gerenciada do Supabase para um fluxo seguro e escalável.
- **Middleware Protegido:** Rotas privadas (`/dashboard/*`) são protegidas via Middleware do Next.js, garantindo que requisições não autorizadas sejam interceptadas antes de renderizar qualquer UI.

### 3. Design System & UI/UX
A interface segue um design "Dark Mode First" focado em imersão profissional.
- **Componentização:** Botões, Cards e Inputs são componentes reutilizáveis (`src/components/ui`), facilitando a manutenção.
- **Acessibilidade:** Uso de tags semânticas e labels ARIA (via Radix UI) para garantir que a aplicação seja acessível.
- **Feedback Visual:** Carregamentos (Loaders), estados de erro e notificações (Toasts) fornecem feedback constante ao usuário.

### 4. Organização de Código
A estrutura do projeto segue uma organização modular por domínio:
```bash
src/
├── app/              # Rotas e Páginas (Next.js App Router)
├── components/       # Componentes React
│   ├── ui/           # Componentes base (Botões, Inputs)
│   ├── dashboard/    # Componentes específicos do Dashboard
│   └── ...
├── lib/              # Utilitários (cn, formatters)
├── services/         # Camada de integração com APIs (AuthService)
└── types/            # Definições de Tipos Globais
```

---

## 🏁 Como Rodar Localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/clinical-case-simulator.git
   cd clinical-case-simulator
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz e adicione suas chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

