
# 🏥 Simulador de Casos Clínicos (SCC)

> **Plataforma de Treinamento Médico baseada em Evidências e Raciocínio Clínico.**

Este projeto é uma **aplicação Full-Stack moderna** desenvolvida para simular o atendimento clínico em um ambiente virtual controlado. O objetivo é permitir que estudantes de medicina e residentes pratiquem diagnóstico e tomada de decisão através de casos interativos.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-emerald?style=for-the-badge)
![Cobertura de Testes](https://img.shields.io/badge/Testes-Jest_%2B_RTL-success?style=for-the-badge&logo=jest)

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

---

## 📱 Credenciais para Recrutadores/Testes

Para facilitar a validação do projeto, utilize as credenciais de acesso admin abaixo:

*   **Email de Teste:** `admin@scc.com`
*   **Senha:** `admin123`

---

## 🏗️ Arquitetura e Tecnologias

Este projeto foi desenhado para ser robusto como um sistema hospitalar, mas simples de usar como um app de celular.

### ⚡ Frontend

*   **Next.js 16 (App Router):** A estrutura principal. Usamos a versão mais moderna para garantir que o carregamento das páginas seja instantâneo.
*   **Tailwind CSS + Shadcn:** Garante que o visual seja profissional, limpo e adaptável (funciona perfeitamente no celular e no computador).
*   **TypeScript:** Nosso "corretor ortográfico" de código, que evita erros bobos e garante que o sistema não quebre na mão do usuário.

### 🛡️ Backend & Segurança

*   **Supabase (Banco de Dados):** O "cérebro" onde guardamos os casos clínicos e o progresso dos alunos com segurança máxima.
*   **Segurança Inteligente (RLS):** Diferente de sistemas antigos, a segurança vive dentro do banco de dados. Isso significa que é matematicamente impossível um aluno ver as notas de outro, garantindo privacidade total.
*   **Login Moderno:** Acesso via Google ou Link Mágico, eliminando a necessidade de decorar senhas complexas.

### 🎨 Design System (Storybook)
Adotamos o **Storybook** para desenvolver nossos componentes de forma isolada. Isso funciona como um "catálogo de peças LEGO": criamos botões, cards e formulários separadamente, garantindo que eles sejam bonitos e acessíveis antes mesmo de serem colocados nas páginas.

### 🧪 Qualidade Garantida
Criamos uma bateria de **testes automatizados (Jest)**. São "robôs" que verificam o sistema a cada alteração, garantindo que o login, os botões e os relatórios funcionem perfeitamente antes de qualquer atualização chegar aos usuários.

> 👉 *Veja nosso [Manual de Testes](./TESTING.md) para detalhes técnicos.*

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
*   Node.js 18+
*   Conta no Supabase (para variáveis de ambiente)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/clinical-case-simulator.git
    cd clinical-case-simulator
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Ambiente:**
    Crie um arquivo `.env.local` na raiz e adicione suas credenciais do Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará rodando em [http://localhost:3000](http://localhost:3000).

5.  **Rodar Testes:**
    ```bash
    npm run test
    # Executa a suite Jest com output detalhado
    ```

---

## 🧩 Funcionalidades Principais

*   **Autenticação Robusta:** Login social e persistência de sessão.
*   **Dashboard Interativo:** Navegação por tiles e atalhos de teclado para produtividade.
*   **Simulação de Caso:**
    *   **Anamnese:** Histórico clínico detalhado.
    *   **Exame Físico:** Dados vitais e inspeção.
    *   **Exames Complementares:** Visualização de raios-X, ECG e exames de sangue em abas organizadas (Tabs).
    *   **Quiz Diagnóstico:** Perguntas de múltipla escolha com feedback imediato.
*   **Feedback de Desempenho:**
    *   Visualização de notas com gráficos radiais animados.
    *   Histórico de tentativas com visualização em Cards (Mobile) e Tabela (Desktop).

---


