"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home,
    FileUser,
    BarChart2,
    Info,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
    { href: "/dashboard", label: "Início", icon: Home },
    { href: "/dashboard/casos-clinicos", label: "Casos Clínicos", icon: FileUser },
    { href: "/dashboard/desempenho", label: "Desempenho", icon: BarChart2 },
    { href: "/dashboard/sobre", label: "Sobre", icon: Info },
    { href: "/dashboard/ajuda", label: "Ajuda", icon: HelpCircle },
];

interface SidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="p-4 border-b border-sidebar-border">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-lg">
                        <span className="text-xl flex items-center gap-[1px]">
                            <span className="font-light text-emerald-500">S</span>
                            <span className="font-bold text-sidebar-foreground">C</span>
                            <span className="font-bold text-sidebar-foreground">C</span>
                        </span>
                    </div>
                    {!collapsed && (
                        <span className="font-semibold text-lg">Simulador</span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 transition-all text-sidebar-foreground/70",
                                        "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                                        isActive && "gradient-tile-a text-white shadow-md"
                                    )}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Collapse Button */}
            <div className="p-2 border-t border-sidebar-border">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCollapse?.(!collapsed)}
                    className="w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            <span>Recolher</span>
                        </>
                    )}
                </Button>
            </div>
        </aside>
    );
}

// Mobile Sidebar - Theme Aware
export function MobileSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent">
                    <Menu className="w-6 h-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-sidebar border-r border-sidebar-border w-64 text-sidebar-foreground">
                {/* Logo */}
                <div className="p-4 border-b border-sidebar-border">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                        <div className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-lg">
                            <span className="text-xl flex items-center gap-[2px]">
                                <span className="font-light text-emerald-500">S</span>
                                <span className="font-bold text-sidebar-foreground">C</span>
                                <span className="font-bold text-sidebar-foreground">C</span>
                            </span>
                        </div>
                        <span className="font-semibold text-lg">Simulador</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="py-4">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href ||
                                (item.href !== "/dashboard" && pathname.startsWith(item.href));

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-3 transition-all text-sidebar-foreground/70",
                                            "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                                            isActive && "gradient-tile-a text-white shadow-md"
                                        )}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
