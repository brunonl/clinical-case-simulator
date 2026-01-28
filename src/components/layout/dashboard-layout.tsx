"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen flex bg-background text-foreground">
            {/* Sidebar */}
            <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--surface-1)]">
                {/* Header */}
                <Header />

                {/* Content */}
                <main
                    className={cn(
                        "flex-1 p-4 md:p-6 overflow-auto",
                        "transition-all duration-300",
                        "bg-[var(--surface-1)]" // Ensure base surface
                    )}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
