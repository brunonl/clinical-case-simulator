import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function BaseBadge({ children, className }: BadgeProps) {
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", className)}>
            {children}
        </span>
    );
}

export function DifficultyBadge({ level }: { level: string }) {
    const styles = {
        Iniciante: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        Intermediário: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Avançado: "bg-red-500/10 text-red-500 border-red-500/20"
    };

    // Default to gray/blue if unknown
    const selectedStyle = styles[level as keyof typeof styles] || "bg-blue-500/10 text-blue-500 border-blue-500/20";

    return (
        <BaseBadge className={selectedStyle}>
            {level}
        </BaseBadge>
    );
}

export function StatusBadge({ status }: { status: string }) {
    const styles = {
        completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        in_progress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        pending: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    };

    const labels = {
        completed: "Concluído",
        in_progress: "Em Andamento",
        pending: "Pendente"
    };

    const s = status as keyof typeof styles;

    return (
        <BaseBadge className={styles[s] || styles.pending}>
            {labels[s] || "Pendente"}
        </BaseBadge>
    );
}
