
import { cn } from './utils';

/**
 * Suíte de Testes para Utilitários CSS (cn)
 * 
 * OBJETIVO:
 * Garantir que a função de concatenação de classes (usada em 100% dos componentes)
 * mescle corretamente estilos Tailwind e resolva conflitos de especificidade.
 */
describe('Unit: CN Utility (class name merger)', () => {
    /**
     * Teste Básico
     * Verifica se strings simples são concatenadas com espaço.
     */
    it('Scenario: Basic string merging - joins class names with spaces', () => {
        // Act
        const result = cn('bg-red-500', 'text-white');
        // Assert
        expect(result).toBe('bg-red-500 text-white');
    });

    /**
     * Lógica Condicional
     * Crítico para estados de UI (ex: botão ativo/inativo).
     * Deve ignorar valores false/null/undefined.
     */
    it('Scenario: Conditional rendering - ignores falsy values', () => {
        // Act
        const result = cn(
            'bg-red-500',
            false && 'text-white', // deve sumir
            true && 'p-4'          // deve ficar
        );
        // Assert
        expect(result).toBe('bg-red-500 p-4');
    });

    /**
     * Resolução de Conflitos (Tailwind Merge)
     * O grande diferencial dessa função. Garante que classes passadas via props
     * sobrescrevam as padrão do componente (ex: p-4 ganha de p-2 se vier depois).
     */
    it('Scenario: Conflict Resolution - later utilities override earlier ones (Tailwind logic)', () => {
        // px-4 deve ganhar de px-2 porque vem depois e conflita (mesma propriedade CSS)
        const result = cn('px-2', 'px-4');
        expect(result).toBe('px-4');
    });

    /**
     * Estruturas Complexas
     * Suporte para arrays aninhados e objetos (compatibilidade com clsx).
     */
    it('Scenario: Complex Structures - flattens arrays and handles object keys', () => {
        const result = cn('base', ['variant', { active: true, disabled: false }]);
        expect(result).toBe('base variant active');
    });
});
