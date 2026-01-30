"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { DASHBOARD_TILES, KEY_MAP } from "@/constants/dashboard-data";
import { DashboardTile } from "@/components/dashboard/dashboard-tile";
import { AuthService } from "@/services/auth";

export default function DashboardPage() {
    const router = useRouter();

    // =========================================
    // KEYBOARD NAVIGATION
    // =========================================
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            const key = e.key.toLowerCase();
            const route = KEY_MAP[key];

            // Only blocks keys if we have a valid route for it
            if (route && route !== "/login") {
                e.preventDefault();
                router.push(route);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    return (
        <main
            className="flex flex-col h-full w-full p-3 sm:p-4 gap-3 bg-background animate-in fade-in duration-500"
            role="menu"
            aria-label="Menu principal do dashboard"
        >
            {/* Header com estilo padronizado (text-xl font-semibold) */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    {/* Opcional: Ícone para combinar com as outras páginas */}
                    <LayoutGrid className="w-6 h-6 text-muted-foreground hidden sm:block" />
                    <h1 className="text-xl font-semibold text-foreground tracking-tight">
                        Visão Geral
                    </h1>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-right">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <span className="opacity-60 text-[10px] uppercase tracking-wider hidden sm:inline">Teclas:</span>
                        <div className="flex gap-1">
                            {["A", "B", "C", "D"].map((k) => (
                                <kbd key={k} className="bg-secondary px-1.5 py-0.5 rounded border border-border font-mono font-bold text-[10px] uppercase shadow-sm min-w-[20px] text-center">
                                    {k}
                                </kbd>
                            ))}
                        </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground opacity-70 italic">
                        Pressione a tecla ou clique para continuar
                    </p>
                </div>
            </div>

            {/* Navigation Stack (A-D) - Maximized Vertical Space */}
            <div className="flex flex-col flex-1 gap-3 overflow-hidden">
                {DASHBOARD_TILES.map((tile) => (
                    <DashboardTile
                        key={tile.href}
                        className="flex-1 min-h-[14%]"
                        href={tile.href}
                        letter={tile.letter}
                        label={tile.label}
                        gradientClass={tile.gradientClass}
                        buttonLabel={tile.buttonLabel}
                        icon={tile.icon}
                    />
                ))}
            </div>
        </main>
    );
}
