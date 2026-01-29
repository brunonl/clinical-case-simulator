# Simulador de Casos Clínicos

Um simulador médico interativo desenvolvido para demonstrar a aplicação prática de tecnologias modernas como **Next.js 16 (App Router)** e **React 19**, com foco em usabilidade, performance e qualidade de código.

🔗 **[Acesse a demonstração ao vivo](https://clinical-case-simulator.vercel.app/)**

### 🔐 Credenciais para Recrutadores
Para testar a plataforma sem criar uma conta, utilize:
- **Email:** `admin@scc.com`
- **Senha:** `admin123`

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

---

## 🚀 O Projeto

O **SCC (Simulador de Casos Clínicos)** é uma plataforma educacional que permite a estudantes e profissionais de medicina treinarem suas habilidades de diagnóstico em um ambiente seguro e controlado. O sistema oferece casos clínicos detalhados com multimídia, quizzes interativos e feedback imediato.

Principais funcionalidades:
- **Autenticação Segura**: Login simplificado via Google ou e-mail corporativo.
- **Simulação Realista**: Apresentação de casos com histórico, exames, áudios (ausculta) e imagens.
- **Avaliação Interativa**: Quizzes dinâmicos para testar o raciocínio clínico.
- **Dashboard de Desempenho**: Acompanhamento do progresso e histórico de casos resolvidos.

## 💻 Aspectos Técnicos

Este projeto reflete práticas atuais de desenvolvimento web, priorizando manutenibilidade e experiência do desenvolvedor:

- **Next.js 16 & React 19**: Uso de Server Components e Server Actions para uma aplicação rápida e otimizada.
- **Tailwind CSS v4**: Estilização moderna e performática, utilizando a nova engine para builds mais rápidos.
- **Arquitetura Modular**: O código é organizado por domínios funcionais, facilitando a navegação e o entendimento da estrutura.
- **TypeScript & Zod**: Tipagem estática e validação de esquemas para garantir a integridade dos dados em toda a aplicação.
- **Interface Polida**: Componentes UI reutilizáveis baseados no Shadcn/UI, garantindo consistência visual e acessibilidade.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Estilos**: Tailwind CSS, Shadcn/UI, Lucide React
- **Backend & Auth**: Supabase (PostgreSQL, Auth)
- **Gerenciamento de Estado/Forms**: React Hook Form, Zod

## 🎨 Design System

O projeto conta com um sistema de design documentado via Storybook, facilitando a reutilização e teste isolado de componentes como botões, cards e inputs.

📖 **[Ver Design System](https://main--697ba3867e42ce1866dd5951.chromatic.com)**

Para rodar o Storybook localmente:
```bash
npm run storybook
# Abre em http://localhost:6006
```

## 🏗️ Estrutura de Diretórios

```
src/
├── app/
│   ├── (auth)/           # Páginas de Login e Cadastro
│   ├── dashboard/        # Área restrita (Casos, Perfil)
│   └── api/              # Endpoints da API
├── components/
│   ├── ui/               # Componentes base (Design System)
│   └── ...               # Componentes específicos por funcionalidade
├── lib/                  # Utilitários e configurações (Supabase Client)
└── types/                # Definições de tipos TypeScript
```

## 🔧 Como Executar Localmente

Siga os passos abaixo para rodar o projeto em sua máquina:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/clinical-case-simulator.git
   cd clinical-case-simulator
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em `http://localhost:3000`.

---

## 📄 Licença
Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.
