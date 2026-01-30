
# 🧪 Guia de Testes (QA)

Este documento descreve a estratégia de testes do projeto **Clinical Case Simulator**, seguindo as melhores práticas de Engenharia de Software.

## 🎯 Filosofia de Testes

Adotamos uma pirâmide de testes prática:
1.  **Testes de Componentes/Integração (Majoritários):** Testam como os componentes interagem entre si e com mocks de serviços. Focados no comportamento do usuário (click, type, see).
2.  **Testes Unitários (Específicos):** Para lógica de negócio pura, utilitários e funções auxiliares.

## 🛠 Ferramentas

*   **Jest:** Runner de testes e asserções.
*   **React Testing Library (RTL):** Renderização de componentes focada em acessibilidade e comportamento do usuário (ex: `getByRole` em vez de hooks de CSS).
*   **User Event:** Simulação realista de eventos de usuário (digitação, cliques).

## 📂 Estrutura de Testes

Os testes são **co-located** (localizados junto ao arquivo fonte) para facilitar a manutenção e visibilidade.

```
src/
├── components/
│   └── ui/
│       ├── button.tsx       # Componente
│       └── button.test.tsx  # Teste do Componente
├── app/
│   └── login/
│       ├── page.tsx         # Página
│       └── page.test.tsx    # Teste de Página (Integração)
└── lib/
    ├── utils.ts             # Lógica Pura
    └── utils.test.ts        # Teste Unitário
```

## 📝 Documentação nos Testes

Todo arquivo de teste deve seguir o padrão **AAA (Arrange, Act, Assert)** e incluir comentários JSDoc que expliquem o **"Porquê"** do teste, não apenas o "O quê".

### Exemplo de Documentação:

```typescript
/**
 * Teste de Fluxo Feliz (Happy Path)
 * Verifica se um usuário com credenciais válidas é autenticado e redirecionado.
 * Motivo: Crítico para o funil de conversão. Se falhar, usuários não entram no app.
 */
it('Scenario: Successful Login - redirects user to dashboard', async () => {
    // Arrange (Preparação)
    render(<LoginPage />);
    const user = userEvent.setup();
    (AuthService.signIn as jest.Mock).mockResolvedValue({});

    // Act (Ação)
    await user.type(screen.getByLabelText(/email/i), 'test@test.com');
    await user.click(screen.getByRole('button'));

    // Assert (Verificação)
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
});
```

## 🚀 Comandos

| Comando | Descrição |
| :--- | :--- |
| `npm run test` | Executa todos os testes unitários e de integração uma vez. |
| `npm run test:watch` | Executa testes em modo interativo (re-roda ao salvar arquivos). |

## 🧪 Padrões Adotados (Do's & Don'ts)

*   **DO:** Use `screen.getByRole` ou `screen.getByLabelText` (simula como usuário busca elementos).
*   **DO:** Mocke serviços externos (`AuthService`, `API`) para garantir testes rápidos e determinísticos.
*   **DON'T:** Não teste detalhes de implementação (ex: `state.isLoading === true`). Teste o efeito visual (ex: aparece um spinner).
*   **DON'T:** Não use `snapshot tests` excessivamente, pois são frágeis a mudanças cosméticas.

## 🐛 Mocks Globais

Configurados em `jest.setup.ts` ou via `jest.mock()` nos arquivos, simulam dependências como:
*   `next/navigation` (`useRouter`)
*   `lucide-react` (Ícones)
*   Serviços de API (`AuthService`, `Supabase`)
