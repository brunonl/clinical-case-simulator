# Plan: Case Details Restructure & UI Polish

**Goal**: Restructure the "Case Details" modal to fix visual bugs (tab borders) and improve the overall aesthetic (replace flat black background with premium design).

## 1. Analysis & Design Decisions
- **Problem**: "Buggy borders" on tabs likely caused by conflicting border definitions between `tabs.tsx` defaults and `page.tsx` overrides.
- **Problem**: "Black background" feels too heavy/flat.
- **Solution**:
  - **Tabs**: Simplify tab styling. Remove double borders. Use a "Segmented Control" style for the tabs (pills) without outer borders, or a clean linear tab with a bottom border highlight.
  - **Background**: Introduce a subtle radial gradient (`bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]`) to give depth.
  - **Card**: Use a "Glassmorphism" effect or a cleaner border hierarchy (one main border, not nested borders).

## 2. Implementation Steps

### Phase 2.1: Foundation (UI Components)
- [ ] **Refactor `components/ui/tabs.tsx`**: Ensure the "default" variant is clean and doesn't enforce active borders that clash with custom styles. Alternatively, rely on `page.tsx` creating a custom look using unstyled primitives if needed, but standardizing `tabs.tsx` is better.
- [ ] **Global Background**: Update the page wrapper in `page.tsx` to use a premium dark gradient.

### Phase 2.2: Case Details Layout (`page.tsx`)
- [ ] **Header**: Simplify. Remove the heavy `bg-zinc-900/50` blockiness. Make it flow into the card.
- [ ] **Tabs Area**: 
    - Remove `border border-zinc-800` from `TabsList` if it causes double-border issues.
    - Use a floating background for the active tab (using `framer-motion` layoutId if possible, or just standard CSS transitions).
- [ ] **Content Area**: 
    - Ensure `TabsContent` fills the remaining height without scrollbar jank.
    - Remove nested borders in `ScrollArea` containers.
- [ ] **Actions**: Ensure the "Start" button feels "floating" or anchored clearly at the bottom without a hard cut-off line.

### Phase 2.3: Verification
- [ ] Check tab switching animation (no layout shift).
- [ ] Verify background is not "pitch black".
- [ ] Ensure responsive mobile layout.

## 3. Agents Required (Implementation Phase)
- **Frontend Specialist**: To execute the CSS/Tailwind changes.
- **Test Engineer**: To verify the visual regressions.
