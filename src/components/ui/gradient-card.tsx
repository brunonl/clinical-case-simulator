import { cn } from "@/lib/utils";

interface GradientCardProps {
    children: React.ReactNode;
    gradientClass?: string;
    className?: string;
}

export function GradientCard({
    children,
    gradientClass = "gradient-tile-a",
    className,
}: GradientCardProps) {
    return (
        <div className={cn("bg-card border border-border overflow-hidden rounded-md", className)}>
            <div className={cn("h-1 w-full", gradientClass)} />
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
