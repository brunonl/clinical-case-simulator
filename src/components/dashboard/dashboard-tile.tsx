import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTileProps {
    href: string;
    letter: string;
    label: string;
    gradientClass: string;
    buttonLabel: string;
    icon: LucideIcon;
    onClick?: (e: React.MouseEvent) => void;
    className?: string; // Added to support external sizing (flex-1 or h-full)
}

export function DashboardTile({
    href,
    letter,
    label,
    gradientClass,
    buttonLabel,
    icon: Icon,
    onClick,
    className,
}: DashboardTileProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "group relative block",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset",
                "motion-safe:transition-all motion-safe:duration-300",
                className
            )}
            role="menuitem"
        >
            {/* Background com gradiente usando utility class */}
            <div
                className={cn(
                    "absolute inset-0",
                    gradientClass,
                    "group-hover:brightness-110 group-focus-visible:brightness-110",
                    "motion-safe:transition-all motion-safe:duration-300"
                )}
            >
                {/* Barra escura inferior - Flexbox com Padding Reduzido */}
                <div className="absolute bottom-0 left-0 right-0 py-2 sm:py-2.5 px-4 flex items-center justify-between tile-bar min-h-[32px] sm:min-h-[36px]">
                    {/* Texto ENTRAR/SAIR */}
                    <span className="text-[11px] sm:text-xs text-white/90 uppercase tracking-[0.15em] font-medium leading-none">
                        {buttonLabel}
                    </span>

                    {/* Indicador - Flat (quadrado) */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border border-white/40 flex items-center justify-center bg-white/10 group-hover:bg-white/20 motion-safe:transition-colors motion-safe:duration-200">
                        <span className="text-white/80 text-[10px] sm:text-xs leading-none mb-[1px]">→</span>
                    </div>
                </div>

                {/* Conteúdo central: Letra + Label - Reposicionado para não encavalar */}
                <div
                    className="absolute inset-0 bottom-8 flex items-center justify-center p-4"
                    aria-hidden="true"
                >
                    <div className="text-center text-white select-none relative z-10">
                        {/* Letras aumentadas para mobile */}
                        <span className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-thin block leading-none tracking-wide drop-shadow-md mb-2">
                            {letter}
                        </span>
                        <span className="text-xs sm:text-xs md:text-sm font-medium block drop-shadow-md opacity-90 uppercase tracking-wider">
                            {label}
                        </span>
                    </div>
                </div>

                {/* Ícone decorativo - Mais visível */}
                <div
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-[55%] opacity-20 group-hover:opacity-30 motion-safe:transition-opacity motion-safe:duration-300"
                    aria-hidden="true"
                >
                    <Icon
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white"
                        strokeWidth={1}
                    />
                </div>

                {/* Indicador de tecla de atalho */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <kbd className="text-[8px] sm:text-[10px] text-white/50 font-mono bg-black/20 px-1.5 py-0.5">
                        {letter}
                    </kbd>
                </div>
            </div>
        </Link>
    );
}
