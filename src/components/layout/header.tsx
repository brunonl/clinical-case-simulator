"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Stethoscope, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./sidebar";
import { AuthService } from "@/services/auth";
import { cn } from "@/lib/utils";

export function Header() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await AuthService.signOut();
            router.refresh(); // Clear server component cache
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
            // Force redirect even on error to prevent stuck state
            router.push("/login");
        } finally {
            // Loading state will be unmounted with redirect, but good practice
            // if navigation is cancelled or delayed
            // setLoading(false); 
        }
    };

    const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário";
    const firstName = userName.split(" ")[0]; // For mobile if needed

    return (
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 shadow-sm shrink-0">
            {/* Left: Logo/Menu & Breadcrumbs */}
            <div className="flex items-center gap-4">
                <div className="md:hidden">
                    <MobileSidebar />
                </div>

                {/* Mobile Logo - Text hidden on very small screens, or hidden entirely to prioritize User Name */}
                <div className="flex items-center gap-2 font-bold text-lg md:hidden">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Stethoscope className="w-4 h-4 text-emerald-500" />
                    </div>
                    {/* Hide Title on Mobile to fit User Name */}
                    <span className="tracking-tight text-foreground/80 hidden sm:inline">Simulador</span>
                </div>

                {/* Desktop Breadcrumbs */}
                <div className="hidden md:flex items-center text-sm font-medium">
                    <span className="text-muted-foreground/60">Simulador</span>
                    <span className="mx-2 text-muted-foreground/40">/</span>
                    <CurrentPageTitle />
                </div>
            </div>

            {/* Right: User Profile & Logout */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* User Info - Visible on Mobile now */}
                <div className="flex flex-col items-end text-right">
                    <span className="text-xs font-bold text-foreground leading-none">
                        <span className="sm:hidden">{firstName}</span>
                        <span className="hidden sm:inline">{userName}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground leading-none mt-1 opacity-70 max-w-[100px] truncate sm:max-w-none">
                        {user?.email}
                    </span>
                </div>

                {/* Avatar Placeholder */}
                <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground shadow-inner">
                    <User className="w-5 h-5" />
                </div>

                {/* Vertical Divider */}
                <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

                {/* Integrated Logout Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    disabled={loading}
                    className={cn(
                        "text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 rounded-lg",
                        loading && "opacity-50 cursor-not-allowed"
                    )}
                    title="Sair do sistema"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <LogOut className="w-5 h-5" />
                    )}
                </Button>
            </div>
        </header>
    );
}

function CurrentPageTitle() {
    const pathname = usePathname();

    const getTitle = () => {
        if (pathname === "/dashboard") return "Início";
        if (pathname.includes("/casos-clinicos")) {
            if (pathname.includes("/quiz")) return "Quiz";
            if (pathname.split("/").length > 3) return "Detalhes do Caso";
            return "Casos Clínicos";
        }
        if (pathname.includes("/desempenho")) return "Desempenho";
        if (pathname.includes("/sobre")) return "Sobre";
        if (pathname.includes("/ajuda")) return "Ajuda";
        return "Dashboard";
    };

    const title = getTitle();

    return (
        <span className="text-foreground/90 bg-secondary/50 px-2 py-0.5 rounded-md border border-border/50 text-xs uppercase tracking-wider font-semibold animate-in fade-in slide-in-from-left-2 duration-300">
            {title}
        </span>
    );
}
