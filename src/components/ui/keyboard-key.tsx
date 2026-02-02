import { cn } from "@/lib/utils";

interface KeyboardKeyProps {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "secondary" | "compact";
}

export function KeyboardKey({ children, className, size = "md", variant = "default" }: KeyboardKeyProps) {
    const sizeClasses = {
        sm: "text-[10px] px-1.5 py-0.5 min-w-[20px]", // Dashboard header style
        md: "text-xs px-1.5 py-0.5 min-w-[24px]",
        lg: "text-sm px-2 py-1 min-w-[28px]",
    };

    const variantClasses = {
        default: "bg-background text-foreground border border-border rounded-sm shadow-sm",
        secondary: "bg-secondary text-foreground border border-border rounded shadow-sm uppercase", // Dashboard style
        compact: "bg-black/20 text-white/50 rounded-sm",
    };

    return (
        <kbd
            className={cn(
                "font-mono font-bold text-center inline-flex items-center justify-center",
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        >
            {children}
        </kbd>
    );
}
