import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    gradientClass?: string;
    size?: "sm" | "md";
    className?: string;
    children?: React.ReactNode;
}

export function InfoCard({
    icon: Icon,
    title,
    description,
    gradientClass = "gradient-tile-c",
    size = "md",
    className,
    children,
}: InfoCardProps) {
    const iconSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";
    const iconInnerSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    const titleSize = size === "sm" ? "text-sm" : "text-base";
    const descriptionSize = size === "sm" ? "text-xs" : "text-sm";

    return (
        <div className={cn("bg-card border border-border group overflow-hidden", className)}>
            <div className={cn("h-1 w-full", gradientClass)} />
            <div className="p-4">
                <div className="flex items-start gap-4">
                    <div
                        className={cn(
                            iconSize,
                            "rounded-sm flex items-center justify-center flex-shrink-0",
                            gradientClass
                        )}
                    >
                        <Icon className={cn(iconInnerSize, "text-white")} />
                    </div>
                    <div className="w-full">
                        <h2
                            className={cn(
                                titleSize,
                                "font-bold text-foreground mb-1 uppercase tracking-wide"
                            )}
                        >
                            {title}
                        </h2>
                        {description && (
                            <p
                                className={cn(
                                    descriptionSize,
                                    "text-muted-foreground leading-relaxed"
                                )}
                            >
                                {description}
                            </p>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
