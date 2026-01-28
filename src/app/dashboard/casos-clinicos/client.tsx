"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DifficultyBadge, StatusBadge } from "@/components/ui/custom-badges";
import { CaseCardMobile } from "@/components/clinical-cases/case-card";
import { ClinicalCase } from "@/types/clinical-case";
import { FullScreenLoader } from "@/components/ui/loaders";

interface ClinicalCasesClientProps {
    cases: ClinicalCase[];
    institutions: any[];
}

export default function ClinicalCasesClient({ cases: initialCases, institutions }: ClinicalCasesClientProps) {
    const router = useRouter();
    const [cases, setCases] = useState<ClinicalCase[]>(initialCases);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");



    const [isNavigating, setIsNavigating] = useState(false);

    const filteredCases = cases.filter((c) => {
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.specialty.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || c.difficulty.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const handleStartCase = (id: string) => {
        if (!id) {
            console.error("Attempted to start case with invalid ID");
            return;
        }
        setIsNavigating(true);
        console.log("Starting case:", id);
        router.push(`/dashboard/casos-clinicos/${id}`);
    };

    if (isNavigating) {
        return <FullScreenLoader text="Iniciando simulação..." />;
    }



    return (
        <div className="space-y-4 p-3 md:p-4 animate-in fade-in duration-500">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">Casos Clínicos</h1>
                    <p className="text-zinc-400 text-xs">Simulações disponíveis para o seu nível.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                        <Input
                            placeholder="Buscar caso..."
                            className="pl-9 h-9 text-xs bg-zinc-900 border-zinc-800 focus:border-emerald-500/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full sm:w-[150px] h-9 text-xs bg-zinc-900 border-zinc-800">
                            <Filter className="w-3.5 h-3.5 mr-2 text-zinc-500" />
                            <SelectValue placeholder="Dificuldade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="text-xs">Todas</SelectItem>
                            <SelectItem value="fácil" className="text-xs">Iniciante</SelectItem>
                            <SelectItem value="médio" className="text-xs">Intermediário</SelectItem>
                            <SelectItem value="difícil" className="text-xs">Avançado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* MOBILE VIEW: Cards (Stacked) */}
            <div className="grid grid-cols-1 gap-3 md:hidden pb-20">
                {filteredCases.map((c) => (
                    <CaseCardMobile
                        key={c.id}
                        clinicalCase={c}
                        onStart={handleStartCase}
                    />
                ))}
            </div>

            {/* DESKTOP VIEW: Table */}
            <div className="hidden md:block border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
                <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] font-semibold tracking-wider">
                        <tr>
                            <th className="px-5 py-3">Caso Clínico</th>
                            <th className="px-5 py-3">Especialidade</th>
                            <th className="px-5 py-3">Dificuldade</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {filteredCases.map((c) => (
                            <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors group">
                                <td className="px-5 py-3 font-medium text-white">{c.title}</td>
                                <td className="px-5 py-3 text-zinc-300">{c.specialty}</td>
                                <td className="px-5 py-3">
                                    <DifficultyBadge level={c.difficulty} />
                                </td>
                                <td className="px-5 py-3">
                                    <StatusBadge status={c.status || "pending"} />
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <Button
                                        size="sm"
                                        onClick={() => handleStartCase(c.id)}
                                        className="h-7 text-xs px-3 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white border border-emerald-500/20"
                                    >
                                        Iniciar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredCases.length === 0 && (
                <div className="text-center py-10 text-zinc-500 text-sm">
                    Nenhum caso encontrado.
                </div>
            )}
        </div>
    );
}
