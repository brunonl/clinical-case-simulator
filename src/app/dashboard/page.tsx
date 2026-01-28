"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, LogOut, LucideIcon, BarChart3, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface DashboardTileProps {
    href: string;
    letter: string;
    label: string;
    gradientClass: string;
    buttonLabel: string;
    icon?: LucideIcon;
    isLogout?: boolean;
    onLogout?: () => void;
}

// ============================================================================
// TILE DATA - Using CSS custom properties
// ============================================================================

const DASHBOARD_TILES = [
    {
        href: "/dashboard/casos-clinicos",
        label: "Casos Clínicos",
        letter: "A",
        gradientClass: "gradient-tile-a",
        buttonLabel: "ENTRAR",
        icon: FileText,
        key: "a",
    },
    {
        href: "/dashboard/desempenho",
        label: "Desempenho",
        letter: "B",
        gradientClass: "gradient-tile-b",
        buttonLabel: "ENTRAR",
        icon: BarChart3,
        key: "b",
    },
    {
        href: "/dashboard/sobre",
        label: "Sobre",
        letter: "C",
        gradientClass: "gradient-tile-c",
        buttonLabel: "ENTRAR",
        icon: Info,
        key: "c",
    },
    {
        href: "/dashboard/ajuda",
        label: "Ajuda",
        letter: "D",
        gradientClass: "gradient-tile-d",
        buttonLabel: "ENTRAR",
        icon: HelpCircle,
        key: "d",
    },
] as const;

// ============================================================================
// KEYBOARD NAVIGATION MAP
// ============================================================================

const KEY_MAP: Record<string, string> = {
    a: "/dashboard/casos-clinicos",
    b: "/dashboard/desempenho",
    c: "/dashboard/sobre",
    d: "/dashboard/ajuda",
    e: "/login", // logout
};

// ============================================================================
// DASHBOARD TILE COMPONENT
// ============================================================================

function DashboardTile({
    href,
    letter,
    label,
    gradientClass,
    buttonLabel,
    icon: Icon = FileText,
    isLogout = false,
    onLogout,
}: DashboardTileProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (isLogout && onLogout) {
            e.preventDefault();
            onLogout();
        }
    };

    const ariaLabel = isLogout
        ? `Sair do sistema (tecla E)`
        : `Acessar ${label} (tecla ${letter})`;

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(
                "group relative block flex-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset",
                "motion-safe:transition-all motion-safe:duration-300"
            )}
            aria-label={ariaLabel}
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
                <div className="absolute bottom-0 left-0 right-0 py-1 sm:py-1.5 px-3 sm:px-4 flex items-center justify-between tile-bar min-h-[22px] sm:min-h-[26px]">
                    {/* Texto ENTRAR/SAIR */}
                    <span className="text-[9px] sm:text-[10px] text-white/90 uppercase tracking-[0.15em] font-medium leading-none">
                        {buttonLabel}
                    </span>

                    {/* Indicador - Flat (quadrado) */}
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border border-white/40 flex items-center justify-center bg-white/10 group-hover:bg-white/20 motion-safe:transition-colors motion-safe:duration-200">
                        <span className="text-white/80 text-[8px] sm:text-[10px] leading-none mb-[1px]">→</span>
                    </div>
                </div>

                {/* Conteúdo central: Letra + Label - Reposicionado para não encavalar */}
                <div
                    className="absolute inset-0 bottom-8 flex items-center justify-center p-4"
                    aria-hidden="true"
                >
                    <div className="text-center text-white select-none relative z-10">
                        {/* Letras reduzidas para evitar encavalamento */}
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin block leading-none tracking-wide drop-shadow-md mb-1">
                            {letter}
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-medium block drop-shadow-md opacity-90">
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

// ============================================================================
// DASHBOARD PAGE
// ============================================================================

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        router.push("/login");
    }, [router]);

    // =========================================
    // KEYBOARD NAVIGATION
    // =========================================
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignorar se estiver em um input ou textarea
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            const key = e.key.toLowerCase();
            const route = KEY_MAP[key];

            if (route) {
                e.preventDefault();
                if (key === "e") {
                    handleLogout();
                } else {
                    router.push(route);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router, handleLogout]);

    return (
        <main
            className="flex flex-col h-full w-full p-2 sm:p-3 gap-1.5 sm:gap-2 bg-background"
            role="menu"
            aria-label="Menu principal do dashboard - Use as teclas A, B, C, D ou E para navegar"
        >
            {/* Skip link para acessibilidade */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
            >
                Pular para conteúdo principal
            </a>

            {/* Tiles A-D */}
            {DASHBOARD_TILES.map((tile) => (
                <DashboardTile
                    key={tile.href}
                    href={tile.href}
                    letter={tile.letter}
                    label={tile.label}
                    gradientClass={tile.gradientClass}
                    buttonLabel={tile.buttonLabel}
                    icon={tile.icon}
                />
            ))}

            {/* Tile E - Logout */}
            <DashboardTile
                href="/login"
                letter="E"
                label="Sair"
                gradientClass="gradient-tile-e"
                buttonLabel="SAIR"
                icon={LogOut}
                isLogout
                onLogout={handleLogout}
            />
        </main>
    );
}
