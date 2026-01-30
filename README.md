
# 🏥 Simulador de Casos Clínicos (SCC)

> **Plataforma de Treinamento Médico baseada em Evidências e Raciocínio Clínico.**

Este projeto é uma **aplicação Full-Stack moderna** desenvolvida para simular o atendimento clínico em um ambiente virtual controlado. O objetivo é permitir que estudantes de medicina e residentes pratiquem diagnóstico e tomada de decisão através de casos interativos.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-emerald?style=for-the-badge)
![Cobertura de Testes](https://img.shields.io/badge/Testes-Jest_%2B_RTL-success?style=for-the-badge&logo=jest)

---

## 🚀 Tecnologias e Decisões Arquiteturais

Este projeto não foi apenas "codificado", foi **arquitetado** para escalabilidade, performance e manutenibilidade. Abaixo, detalho as escolhas técnicas:

### ⚡ Frontend (Next.js 16 + React 19)
*   **App Router:** Utilizamos a arquitetura mais recente do Next.js para aproveitar **Server Components** por padrão, reduzindo o bundle enviado ao cliente e melhorando o SEO/LCP.
*   **Tailwind CSS v4:** Estilização utility-first para consistência visual e velocidade de desenvolvimento. Utiliza variáveis CSS nativas para um tema flexível.
*   **Shadcn/UI:** Componentes acessíveis e customizáveis baseados no Radix UI. Foco em construir *sobre* primitivos sólidos em vez de reinventar a roda.
*   **TypeScript Strict:** Tipagem estrita para evitar erros em tempo de execução e melhorar a DX (Developer Experience).
*   **Mobile-First UX:** Design responsivo pensado primariamente para uso em dispositivos móveis (plantão/estágio), adaptando-se elegantemente para desktop.

### 🛡️ Backend & Segurança (Supabase)
*   **BaaS (Backend as a Service):** Escolha estratégica para focar no produto. Supabase fornece Auth, Database e Storage com latência mínima.
*   **RLS (Row Level Security):** A segurança é aplicada **no banco de dados**, não apenas na API. Isso garante que um usuário só acesse seus próprios dados de desempenho, independente de onde venha a requisição.
*   **Auth Seguro:** Fluxo de autenticação moderno (OAuth Google + Magic Links), eliminando a necessidade de gerenciamento complexo de senhas locais.

### 🧪 Testes e Qualidade
A qualidade do código é uma prioridade neste projeto. A suíte de testes automatizados garante que as funcionalidades críticas funcionem corretamente e facilita a manutenção futura.

*   **🛡️ Segurança para Mudar:** Testes cobrem o login e componentes principais, permitindo evoluir o código sem medo de quebrar o que já funciona.
*   **📚 Código Documentado:** Os arquivos de teste explicam "o que" e "por que" cada funcionalidade existe, servindo como um manual prático para desenvolvedores.
*   **✅ Ferramentas Modernas:** Utilizamos **Jest** e **React Testing Library** para simular exatamente como um usuário real interage com a aplicação (cliques, digitação), garantindo que a experiência final seja perfeita.

> 👉 *Para entender como testamos, veja nosso [Manual de Testes (TESTING.md)](./TESTING.md).*

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

## 📱 Credenciais para Recrutadores/Testes

Para facilitar a validação do projeto, utilize as credenciais de acesso admin (se aplicável) ou o fluxo de Login Social.

*   **Email de Teste:** admin@scc.com
*   **Senha:** admin123

> *Nota: O sistema prioriza Login Google, mas esta conta fallback existe para ambientes de revisão.*

---

<div align="center">
  <small>Desenvolvido com ❤️ e ☕ por Bruno Lima</small>
</div>
