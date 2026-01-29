# Design System: CSS Utilities + Storybook

## Overview

Este plano implementa duas melhorias complementares no projeto:

1. **CSS Utilities Refactor**: Criar classes utilitárias globais com `@apply` para elementos que não usam CVA (tipografia, forms genéricos, overlays, layouts), complementando o sistema CVA existente.
2. **Storybook Integration**: Implementar Storybook para documentar e catalogar todos os componentes do design system.

**Tipo de Projeto:** WEB (Next.js 16 + Tailwind v4)

---

## Success Criteria

| Critério | Métrica |
|----------|---------|
| Classes CSS Utilitárias | Mínimo 15 classes globais documentadas |
| Storybook Funcionando | `npm run storybook` abre catálogo |
| Stories Criadas | 100% dos componentes `ui/` com stories |
| Build Passando | `npm run build` sem erros |
| Documentação | Autodocs habilitado no Storybook |

---

## Tech Stack

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| Tailwind CSS | v4 | Já em uso, @apply será usado em `@layer utilities` |
| Storybook | v8+ | Última versão com suporte a React 19 e Vite |
| @storybook/nextjs | latest | Integração nativa com Next.js App Router |
| CVA | Mantido | Padrão existente para variantes de componentes |

---

## File Structure (Novo)

```
src/
├── app/
│   └── globals.css          # [MODIFY] Adicionar @layer utilities
├── components/
│   └── ui/
│       ├── button.tsx       # [KEEP] Já usa CVA
│       ├── button.stories.tsx  # [NEW] Story
│       ├── card.tsx         # [KEEP] Já usa CVA
│       ├── card.stories.tsx    # [NEW] Story
│       └── ...              # Stories para cada componente
├── styles/
│   └── utilities.css        # [NEW] Classes utilitárias opcionais (se globals.css ficar grande)
.storybook/
├── main.ts                  # [NEW] Config principal
├── preview.ts               # [NEW] Decorators globais + globals.css
└── manager.ts               # [NEW] Tema dark do Storybook
```

---

## Task Breakdown

### Phase 1: CSS Utilities Refactor

#### Task 1.1: Criar Classes de Tipografia
- **Agent:** `frontend-specialist`
- **Skill:** `tailwind-patterns`
- **Priority:** P1
- **Dependencies:** Nenhuma
- **INPUT:** `globals.css` atual
- **OUTPUT:** Classes `.text-heading-1`, `.text-heading-2`, `.text-body`, `.text-caption`, `.text-label`
- **VERIFY:** Classes aplicáveis em qualquer componente sem erro

```css
/* Exemplo esperado */
@layer utilities {
  .text-heading-1 {
    @apply text-2xl font-bold tracking-tight text-foreground;
  }
  .text-body {
    @apply text-base text-muted-foreground leading-relaxed;
  }
}
```

---

#### Task 1.2: Criar Classes de Formulário
- **Agent:** `frontend-specialist`
- **Skill:** `tailwind-patterns`
- **Priority:** P1
- **Dependencies:** Task 1.1
- **INPUT:** Análise de `input.tsx`, `label.tsx`
- **OUTPUT:** Classes `.form-group`, `.form-label`, `.form-input`, `.form-error`
- **VERIFY:** Estilos consistentes com componentes Shadcn existentes

---

#### Task 1.3: Criar Classes de Layout/Overlay
- **Agent:** `frontend-specialist`
- **Skill:** `tailwind-patterns`
- **Priority:** P2
- **Dependencies:** Task 1.1
- **INPUT:** Análise de `dialog.tsx`, `sheet.tsx`
- **OUTPUT:** Classes `.overlay-backdrop`, `.overlay-content`, `.section-container`, `.page-wrapper`
- **VERIFY:** Overlay escurece fundo corretamente

---

#### Task 1.4: Criar Classes de Superfície (Cards/Panels)
- **Agent:** `frontend-specialist`
- **Skill:** `tailwind-patterns`
- **Priority:** P2
- **Dependencies:** Task 1.1
- **INPUT:** `.surface-card` existente em globals.css
- **OUTPUT:** Classes `.surface-elevated`, `.surface-inset`, `.surface-interactive`
- **VERIFY:** Hierarquia visual clara entre superfícies

---

### Phase 2: Storybook Setup

#### Task 2.1: Instalar e Configurar Storybook
- **Agent:** `frontend-specialist`
- **Skill:** `app-builder`
- **Priority:** P0
- **Dependencies:** Tasks 1.x (paralelo OK)
- **INPUT:** Projeto Next.js existente
- **OUTPUT:** `.storybook/` configurado, `npm run storybook` funcional
- **VERIFY:** Storybook abre em `localhost:6006`

```bash
npx storybook@latest init --builder vite
```

---

#### Task 2.2: Configurar Tema Dark + Globals
- **Agent:** `frontend-specialist`
- **Skill:** `frontend-design`
- **Priority:** P1
- **Dependencies:** Task 2.1
- **INPUT:** `globals.css`, tema "Flat Dark Premium"
- **OUTPUT:** `preview.ts` com decorators, `manager.ts` com tema escuro
- **VERIFY:** Storybook UI em dark mode, componentes renderizam com tema correto

---

#### Task 2.3: Criar Stories para Componentes Atômicos (UI)
- **Agent:** `frontend-specialist`
- **Skill:** `clean-code`
- **Priority:** P1
- **Dependencies:** Task 2.2
- **INPUT:** Componentes em `src/components/ui/`
- **OUTPUT:** Stories para: Button, Card, Badge, Input, Dialog, Tabs, Select, Progress
- **VERIFY:** Autodocs gera documentação automática, controls funcionam

---

#### Task 2.4: Criar Stories para Componentes de Domínio
- **Agent:** `frontend-specialist`
- **Skill:** `clean-code`
- **Priority:** P2
- **Dependencies:** Task 2.3
- **INPUT:** Componentes em `src/components/dashboard/`, `src/components/layout/`
- **OUTPUT:** Stories para: DashboardTile, Header, Sidebar, Loaders
- **VERIFY:** Componentes renderizam corretamente isolados

---

### Phase X: Verification

#### Checklist Final

- [ ] `npm run build` passa sem erros
- [ ] `npm run storybook` abre catálogo
- [ ] Todas as classes utilitárias documentadas em `globals.css`
- [ ] Mínimo 10 stories criadas
- [ ] Autodocs habilitado e funcionando
- [ ] Tema dark aplicado no Storybook UI

#### Scripts de Verificação

```bash
# Build check
npm run build

# Storybook
npm run storybook

# Lint
npm run lint
```

---

## Rollback Strategy

| Problema | Ação |
|----------|------|
| Storybook quebra Next.js | Remover `.storybook/` e dependências via `npm uninstall` |
| Classes CSS conflitam | Reverter `globals.css` via git |
| Build falha | Verificar `tsconfig.json` e imports |

---

## Agent Assignments Summary

| Task | Agent | Skill |
|------|-------|-------|
| 1.1-1.4 CSS Utilities | `frontend-specialist` | `tailwind-patterns` |
| 2.1 Storybook Install | `frontend-specialist` | `app-builder` |
| 2.2 Theme Config | `frontend-specialist` | `frontend-design` |
| 2.3-2.4 Stories | `frontend-specialist` | `clean-code` |

---

## Next Steps

Após aprovação deste plano:
1. Executar `/create` ou iniciar implementação manual
2. Fase 1 e Fase 2 podem rodar em paralelo
3. Verificação final com Phase X checklist
