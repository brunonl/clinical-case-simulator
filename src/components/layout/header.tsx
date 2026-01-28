"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Power, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./sidebar";
import { createClient } from "@/lib/supabase/client";

export function Header() {
    const [time, setTime] = useState<string>("");
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <header className="bg-card border-b border-border h-16 flex items-center px-4 md:px-6 sticky top-0 z-10 shadow-sm">
            {/* Mobile Menu Button */}
            <MobileSidebar />

            {/* Clock */}
            <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 text-foreground/80">
                    <Clock className="w-5 h-5 opacity-70" />
                    <span className="font-mono text-lg tracking-wider opacity-90">{time}</span>
                </div>
            </div>

            {/* Logout Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-foreground/60 hover:text-foreground hover:bg-muted"
                aria-label="Sair do sistema"
            >
                <Power className="w-5 h-5" />
            </Button>
        </header>
    );
}
