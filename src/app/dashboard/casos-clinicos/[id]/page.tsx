"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ClinicalCasesService } from "@/services/clinical-cases";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, FileText, ChevronLeft, AlertTriangle, ArrowRight } from "lucide-react";
import { FullScreenLoader } from "@/components/ui/loaders";
import { ClinicalCase } from "@/types/clinical-case";

export default function CaseBriefingPage() {
    const params = useParams();
    const id = params?.id as string;

    const [clinicalCase, setClinicalCase] = useState<ClinicalCase | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [starting, setStarting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadCase = async () => {
            try {
                if (!id) return;

                const data = await ClinicalCasesService.getById(id);
                if (!data) throw new Error("Caso não encontrado");

                setClinicalCase(data);
            } catch (err: any) {
                console.error("Error loading case:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCase();
        } else {

            const timer = setTimeout(() => {
                if (!id) {
                    setLoading(false);
                    setError("Erro ao identificar caso clínico.");
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [id]);

    const handleStart = () => {
        if (!id) return;
        setStarting(true);
        router.push(`/dashboard/casos-clinicos/${id}/quiz`);
    };

    const handleBack = () => router.push("/dashboard/casos-clinicos");

    if (loading) return <FullScreenLoader text="BUSCANDO PRONTUÁRIO..." />;
    if (starting) return <FullScreenLoader text="PREPARANDO SIMULAÇÃO..." />;

    if (error || !clinicalCase) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050505]">
            <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 text-center max-w-md animate-in fade-in duration-500">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Erro ao Carregar Caso</h2>
                <p className="text-zinc-400 mb-6">{error || "Não identificamos este caso."}</p>
                <Button onClick={handleBack} variant="outline" className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    Voltar para Lista
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 animate-in fade-in duration-500">
            <Card className="w-full max-w-2xl bg-zinc-900/50 border-zinc-800 shadow-2xl relative">
                <Button onClick={handleBack} variant="ghost" className="absolute top-4 left-4 text-zinc-400 hover:text-white">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <CardHeader className="text-center pb-8 pt-12">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
                        <FileText className="w-8 h-8 text-emerald-500" />
                    </div>
                    <CardTitle className="text-3xl text-white font-bold">{clinicalCase.title}</CardTitle>
                    <CardDescription className="text-lg text-emerald-400 font-medium uppercase">{clinicalCase.specialty}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-10">
                    <div className="bg-zinc-950/50 rounded-xl p-6 border border-white/5">
                        <h3 className="text-sm font-semibold text-emerald-500 mb-3 flex items-center gap-2 uppercase">
                            <AlertCircle className="w-4 h-4" /> Queixa Principal
                        </h3>
                        <p className="text-zinc-300 text-lg leading-relaxed">"{clinicalCase.chief_complaint}"</p>
                    </div>
                    <Button
                        onClick={handleStart}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg shadow-lg shadow-emerald-900/20 transition-transform active:scale-95"
                    >
                        Iniciar Atendimento <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
