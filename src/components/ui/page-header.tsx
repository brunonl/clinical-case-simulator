import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    className?: string;
    iconClassName?: string;
}

export function PageHeader({ icon: Icon, title, description, className, iconClassName }: PageHeaderProps) {
    return (
        <div className={cn("flex items-center gap-3 mb-4", className)}>
            <Icon className={cn("w-8 h-8 text-muted-foreground", iconClassName)} />
            <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-none">
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground text-sm mt-1">{description}</p>
                )}
            </div>
        </div>
    );
}
