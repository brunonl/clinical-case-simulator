"use client";

interface FullScreenLoaderProps {
    text?: string;
}

export function FullScreenLoader({ text = "Carregando..." }: FullScreenLoaderProps) {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative flex flex-col items-center gap-8">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Simple Pulsing Circles */}
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                    <div className="relative w-full h-full border-2 border-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]" />

                    {/* Static Center Dot */}
                    <div className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </div>

                <p className="text-emerald-500/80 font-medium tracking-[0.2em] text-[10px] uppercase animate-pulse">
                    {text}
                </p>
            </div>
        </div>
    );
}
