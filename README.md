# SCC - Simulador de Casos Clínicos

<div align="center">

[![Next.js 14](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

> **A plataforma definitiva para simulações médicas realistas e preparação avançada.**

[Demonstração ao Vivo](https://clinical-case-simulator.vercel.app/login) · [Relatar Bug](https://github.com/seu-usuario/clinical-case-simulator/issues) · [Solicitar Feature](https://github.com/seu-usuario/clinical-case-simulator/issues)

</div>

---

## 📖 Visão Geral

O **SCC (Simulador de Casos Clínicos)** é uma aplicação web moderna e imersiva desenvolvida para capacitação de profissionais de saúde. Focada em **UX refinada** e **performance**, a plataforma oferece um ambiente prático para resolução de casos clínicos complexos.

O projeto foi construído seguindo um design "Dark Mode First", utilizando as mais recentes tecnologias do ecossistema React para garantir escalabilidade, acessibilidade e uma experiência de uso premium.

## ✨ Funcionalidades Principais

- **Simulações Realistas:** Navegação interativa por casos clínicos com feedback imediato.
- **Autenticação Segura:** Login, Cadastro e Recuperação de Senha gerenciados via Supabase Auth com proteção de rotas via Middleware.
- **Interface Premium:** Design System completo construído com Tailwind CSS e componentes acessíveis Shadcn/UI (Radix).
- **Alta Performance:** Otimização SEO e Server-Side Rendering (SSR) com Next.js App Router.
- **Design Responsivo:** Layout adaptável para desktop, tablets e dispositivos móveis.

## 🚀 Demonstração & Acesso

Para fins de avaliação ou testes, utilize as credenciais de recrutador abaixo:

| Perfil | Email | Senha |
| :--- | :--- | :--- |
| **Recrutador** | `admin@scc.com` | `admin123` |

---

## 🛠️ Stack Tecnológica

A arquitetura foi desenhada priorizando **segurança de tipos** (Type Safety) e **Developer Experience**.

### Core
- **[Next.js 14](https://nextjs.org/)** (App Router) - Framework React full-stack.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática rigorosa.

### Interface & Estilo
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework.
- **[Shadcn/UI](https://ui.shadcn.com/)** - Componentes de interface reutilizáveis.
- **[Lucide React](https://lucide.dev/)** - Ícones vetoriais leves.
- **[Zod](https://zod.dev/)** - Validação de schemas e dados.

### Backend & Serviços
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service (PostgreSQL, Auth, Realtime).

---

## 🏗️ Arquitetura do Projeto

A estrutura de pastas segue uma organização por domínio, maximizando a manutenibilidade:

```bash
src/
├── app/                  # Rotas e Páginas (Next.js App Router)
│   ├── (auth)/           # Grupo de rotas de autenticação
│   ├── dashboard/        # Área protegida da aplicação
│   └── layout.tsx        # Layout raiz
├── components/           # Biblioteca de Componentes
│   ├── auth/             # Componentes específicos de Auth
│   ├── dashboard/        # Componentes de negócio do Dashboard
│   └── ui/               # Componentes base (Botões, Modais, Inputs)
├── lib/                  # Configurações e Utilitários (Supabase client, utils)
├── services/             # Camada de Serviço (Abstração de chamadas API)
└── types/                # Definições de Tipos Globais (TypeScript)
```

## 🏁 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/clinical-case-simulator.git
   cd clinical-case-simulator
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o ambiente**
   Crie um arquivo `.env.local` na raiz do projeto com suas chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Inicie o servidor**
   ```bash
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.

---

<div align="center">
  Desenvolvido com 💙 por [Seu Nome]
  <br />
  <sup>Clinical Case Simulator © 2024</sup>
</div>

