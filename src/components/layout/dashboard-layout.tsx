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
        <div className="h-[100dvh] flex flex-col md:flex-row bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--surface-1)] h-full overflow-hidden">
                {/* Header */}
                <Header />

                {/* Content - Scrollable Area */}
                <main
                    className={cn(
                        "flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden",
                        "transition-all duration-300",
                        "bg-[var(--surface-1)]"
                    )}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
