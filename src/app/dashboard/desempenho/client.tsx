"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { BarChart2, TrendingUp, Trophy, Target, Activity, Zap } from "lucide-react";
import type { QuizAttempt } from "@/lib/supabase/types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";

interface DesempenhoClientProps {
    attempts: (QuizAttempt & { clinical_cases: { title: string; discipline: string } | null })[];
}


const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getScoreBadge = (score: number | null) => {
    const s = score || 0;
    if (s >= 80) return <Badge className="bg-emerald-500 text-white">{s.toFixed(0)}%</Badge>;
    if (s >= 60) return <Badge className="bg-amber-500 text-white">{s.toFixed(0)}%</Badge>;
    return <Badge className="bg-red-500 text-white">{s.toFixed(0)}%</Badge>;
};

export function DesempenhoClient({ attempts }: DesempenhoClientProps) {

    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0
        ? attempts.reduce((acc, a) => acc + (a.score || 0), 0) / totalAttempts
        : 0;
    const bestScore = totalAttempts > 0
        ? Math.max(...attempts.map((a) => a.score || 0))
        : 0;
    const passRate = totalAttempts > 0
        ? (attempts.filter((a) => (a.score || 0) >= 70).length / totalAttempts) * 100
        : 0;


    const statsCards = [
        { title: "Total de Testes", value: totalAttempts, icon: BarChart2, gradient: "gradient-tile-a" },
        { title: "Média Geral", value: `${averageScore.toFixed(1)}%`, icon: TrendingUp, gradient: "gradient-tile-b" },
        { title: "Melhor Nota", value: `${bestScore.toFixed(1)}%`, icon: Trophy, gradient: "gradient-tile-c" },
        { title: "Taxa de Aprovação", value: `${passRate.toFixed(0)}%`, icon: Target, gradient: "gradient-tile-d" },
    ];

    return (
        <div className="space-y-4 p-3 md:p-4 animate-in fade-in duration-500">
            <PageHeader title="Desempenho" icon={Activity} iconClassName="text-[var(--color-tile-a-from)]" />


            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statsCards.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        gradientClass={stat.gradient}
                    />
                ))}
            </div>


            <div className="bg-card border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-[var(--color-tile-b-from)]" />
                    <h2 className="text-base font-semibold text-foreground">Evolução de Desempenho</h2>
                </div>

                {attempts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Nenhum dado disponível</p>
                    </div>
                ) : (
                    <div className="h-64 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={[...attempts]
                                    .filter(a => a.completed_at)
                                    .sort((a, b) => new Date(a.completed_at!).getTime() - new Date(b.completed_at!).getTime())
                                    .map(a => ({
                                        date: new Date(a.completed_at!).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
                                        score: a.score,
                                        title: a.clinical_cases?.title
                                    }))
                                }
                                margin={{ top: 5, right: 10, bottom: 5, left: -20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", color: "#fff", fontSize: '12px', borderRadius: '4px', padding: '8px' }}
                                    itemStyle={{ color: "#fff" }}
                                />
                                <ReferenceLine y={70} stroke="#10b981" strokeDasharray="3 3" />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="var(--color-tile-b-from)"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: "var(--color-tile-b-to)" }}
                                    activeDot={{ r: 5 }}
                                    name="Pontuação"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>


            <div className="bg-card border border-border">
                <div className="p-3 border-b border-border bg-muted/20">
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Histórico Recente</h2>
                </div>
                <div>
                    {attempts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p className="text-sm">Você ainda não realizou nenhum teste.</p>
                        </div>
                    ) : (
                        <>

                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border hover:bg-transparent">
                                            <TableHead className="py-2 h-9 text-[10px] uppercase font-bold text-muted-foreground w-[40%]">Caso Clínico</TableHead>
                                            <TableHead className="py-2 h-9 text-[10px] uppercase font-bold text-muted-foreground">Disciplina</TableHead>
                                            <TableHead className="py-2 h-9 text-[10px] uppercase font-bold text-muted-foreground">Nota</TableHead>
                                            <TableHead className="py-2 h-9 text-[10px] uppercase font-bold text-muted-foreground text-right">Data</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attempts.map((attempt) => (
                                            <TableRow key={attempt.id} className="border-border hover:bg-secondary/30 transition-colors">
                                                <TableCell className="font-medium text-xs py-2">
                                                    {attempt.clinical_cases?.title || "Caso removido"}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground py-2">
                                                    {attempt.clinical_cases?.discipline || "-"}
                                                </TableCell>
                                                <TableCell className="py-2">
                                                    {getScoreBadge(attempt.score)}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground text-right py-2">
                                                    {formatDate(attempt.completed_at)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>


                            <div className="md:hidden flex flex-col gap-3 p-3">
                                {attempts.map((attempt) => (
                                    <div key={attempt.id} className="bg-secondary/10 border border-border rounded-lg p-3 flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
                                                    {attempt.clinical_cases?.discipline || "Geral"}
                                                </span>
                                                <span className="font-medium text-sm text-foreground leading-tight">
                                                    {attempt.clinical_cases?.title || "Caso removido"}
                                                </span>
                                            </div>
                                            {getScoreBadge(attempt.score)}
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                            <span className="text-[10px] text-muted-foreground">
                                                Data: <span className="text-foreground">{formatDate(attempt.completed_at)}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
