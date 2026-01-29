# Clinical Case Simulator

Um simulador médico imersivo desenvolvido para demonstrar domínio em **Next.js 16 (App Router)**, **React 19** e **Arquitetura Front-end Moderna**, unindo precisão técnica com uma experiência de usuário premium.

🔗 **[Acesse a demonstração ao vivo](https://clinical-case-simulator.vercel.app/)**

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

---

## 🚀 Visão Geral

O **SCC (Simulador de Casos Clínicos)** é uma plataforma de educação médica que oferece cenários clínicos interativos. Diferente de sistemas tradicionais, ele foca em **UX refinada**, **feedback em tempo real** e **acessibilidade**, simulando a pressão e a tomada de decisão do ambiente médico real.

## 👨‍💻 Destaques Técnicos (Para Recrutadores)

Este projeto foi construído na "bleeding edge" do ecossistema React, utilizando tecnologias que definem o padrão moderno de desenvolvimento web:

- **Next.js 16 & React 19**: Adoção antecipada das versões mais recentes para explorar Server Actions, melhorias de hidratação e otimizações de compilador.
- **Tailwind CSS v4**: Utilização da nova engine de estilos (Oxide) para builds instantâneos e performance CSS nativa superior.
- **Arquitetura "Feature-First"**: Organização do código por domínios (`(auth)`, `dashboard`), facilitando a escalabilidade e manutenção em times grandes.
- **Type Safety Rigorosa**: Integração profunda entre **TypeScript** e **Zod** para validação de dados end-to-end (do banco de dados ao formulário), eliminando erros em tempo de execução.
- **Componentização Avançada**: Design System construído sobre **Shadcn/UI** (Radix Primitives), garantindo acessibilidade (WAI-ARIA) e consistência visual sem "travar" a customização.

## 🛠️ Stack Tecnológica

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Estilização**: Tailwind CSS v4, Shadcn/UI, Lucide React
- **Backend/Services**: Supabase (Auth, PostgreSQL, Realtime)
- **State/Forms**: React Hook Form, Zod, Server Actions

---

## 🏗️ Estrutura do Projeto

A organização segue uma abordagem modular, isolando responsabilidades e facilitando testes:

```bash
src/
├── app/
│   ├── (auth)/           # Rotas públicas de autenticação
│   ├── dashboard/        # Área logada (Protegida por Middleware)
│   └── api/              # Route Handlers (quando Server Actions não bastam)
├── components/
│   ├── ui/               # Design System (Botões, Modais, Inputs)
│   └── dashboard/        # Componentes de negócio específicos
├── lib/                  # Configurações de infra (Supabase, Utils)
└── types/                # Definições de Tipos globais
```

## 🔧 Instalação e Execução

O projeto está pronto para rodar localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/clinical-case-simulator.git
   cd clinical-case-simulator
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis:**
   Crie um arquivo `.env.local` com suas chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
   ```

4. **Execute:**
   ```bash
   npm run dev
   ```
   Acesse via `http://localhost:3000`.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
