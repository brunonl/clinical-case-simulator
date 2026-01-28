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

export function DesempenhoClient({ attempts }: DesempenhoClientProps) {
    // Calculate stats
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

    // Stats cards config - Using tile colors
    const statsCards = [
        {
            title: "Total de Testes",
            value: totalAttempts,
            icon: BarChart2,
            gradient: "gradient-tile-a",
        },
        {
            title: "Média Geral",
            value: `${averageScore.toFixed(1)}%`,
            icon: TrendingUp,
            gradient: "gradient-tile-b",
        },
        {
            title: "Melhor Nota",
            value: `${bestScore.toFixed(1)}%`,
            icon: Trophy,
            gradient: "gradient-tile-c",
        },
        {
            title: "Taxa de Aprovação",
            value: `${passRate.toFixed(0)}%`,
            icon: Target,
            gradient: "gradient-tile-d",
        },
    ];

    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Activity className="w-8 h-8 text-[var(--color-tile-a-from)]" />
                <h1 className="text-2xl font-semibold text-foreground">Desempenho</h1>
            </div>

            {/* Stats Cards - Dark with gradient accent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden bg-card border border-border"
                    >
                        {/* Gradient accent bar */}
                        <div className={`h-1 ${stat.gradient}`} />

                        <div className="p-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${stat.gradient} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-card border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-[var(--color-tile-b-from)]" />
                    <h2 className="text-lg font-semibold text-foreground">Evolução do Desempenho</h2>
                </div>

                {attempts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <BarChart2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg">Nenhum dado disponível</p>
                        <p className="text-sm">Complete seu primeiro caso clínico para ver os gráficos.</p>
                    </div>
                ) : (

                    <div className="h-80 w-full mt-4">
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
                                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1e1e1e", borderColor: "#333", color: "#fff" }}
                                    itemStyle={{ color: "#fff" }}
                                />
                                <ReferenceLine y={70} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: '70%', fill: '#10b981', fontSize: 10 }} />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="var(--color-tile-b-from)"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "var(--color-tile-b-to)" }}
                                    activeDot={{ r: 6 }}
                                    name="Pontuação"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div >
                )
                }
            </div >

            {/* History Table - Dark theme */}
            < div className="bg-card border border-border" >
                <div className="p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Histórico de Testes</h2>
                </div>
                <div className="p-4">
                    {attempts.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <BarChart2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>Você ainda não realizou nenhum teste.</p>
                            <p className="text-sm">Complete seu primeiro caso clínico para ver seu desempenho aqui.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border hover:bg-secondary/50">
                                    <TableHead className="text-muted-foreground">Caso Clínico</TableHead>
                                    <TableHead className="text-muted-foreground">Disciplina</TableHead>
                                    <TableHead className="text-muted-foreground">Pontuação</TableHead>
                                    <TableHead className="text-muted-foreground">Data</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attempts.map((attempt) => (
                                    <TableRow key={attempt.id} className="border-border hover:bg-secondary/30">
                                        <TableCell className="font-medium text-foreground">
                                            {attempt.clinical_cases?.title || "Caso removido"}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {attempt.clinical_cases?.discipline || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {getScoreBadge(attempt.score)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(attempt.completed_at)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div >
        </div >
    );
}
