import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    gradientClass?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    gradientClass = "gradient-tile-a",
    className,
}: StatCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-card border border-border group hover:border-opacity-50 transition-colors",
                className
            )}
        >
            {/* Gradient accent bar */}
            <div className={cn("h-1 w-full", gradientClass)} />

            <div className="p-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div
                            className={cn(
                                "w-8 h-8 rounded-sm flex items-center justify-center",
                                gradientClass
                            )}
                        >
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider text-right ml-2">
                            {title}
                        </span>
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground leading-none mt-2">
                            {value}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
