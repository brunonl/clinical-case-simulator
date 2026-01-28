import { Play, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge, StatusBadge } from "@/components/ui/custom-badges";
import { ClinicalCase } from "@/types/clinical-case";
import { cn } from "@/lib/utils";

interface CaseCardProps {
    clinicalCase: ClinicalCase;
    onStart: (id: string) => void;
    className?: string;
}

export function CaseCardMobile({ clinicalCase, onStart, className }: CaseCardProps) {
    return (
        <Card className={cn("bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 transition-all", className)}>
            <CardHeader className="pb-3 space-y-3">
                <div className="flex justify-between items-start w-full">
                    <div className="space-y-1 flex-1 mr-2 min-w-0">
                        <CardTitle className="text-lg text-white truncate leading-tight">
                            {clinicalCase.title}
                        </CardTitle>
                        <CardDescription className="text-emerald-400 font-medium text-xs truncate">
                            {clinicalCase.specialty}
                        </CardDescription>
                    </div>
                    <StatusBadge status={clinicalCase.status || "pending"} />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
                    <DifficultyBadge level={clinicalCase.difficulty} />
                    <div className="flex items-center text-xs text-zinc-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(clinicalCase.created_at).toLocaleDateString("pt-BR")}
                    </div>
                </div>

                <Button
                    onClick={() => onStart(clinicalCase.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-transform"
                >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Iniciar Simulação
                </Button>
            </CardContent>
        </Card>
    );
}
