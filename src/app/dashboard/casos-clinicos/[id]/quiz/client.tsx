"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Trophy, Loader2 } from "lucide-react";
import { QuizService } from "@/services/quiz";
import { cn } from "@/lib/utils";
import type { ClinicalCase } from "@/lib/supabase/types";

// Define the structure of questions stored in JSONB
interface QuestionJSON {
    id: number;
    question: string;
    options: string[];
    correct: number; // 0-based index
}

interface QuizClientProps {
    clinicalCase: ClinicalCase;
}

export function QuizClient({ clinicalCase }: QuizClientProps) {
    const router = useRouter();

    // Parse questions from JSONB column
    const questions: QuestionJSON[] = Array.isArray(clinicalCase.questions)
        ? (clinicalCase.questions as unknown as QuestionJSON[])
        : [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> optionIndex
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [saving, setSaving] = useState(false);

    // Safety check if no questions exist
    if (!questions || questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-card border border-border">
                <h3 className="text-xl font-bold mb-2">Sem questões cadastradas</h3>
                <p className="text-muted-foreground mb-6">Este caso clínico ainda não possui perguntas configuradas.</p>
                <Button onClick={() => router.back()} variant="outline">Voltar</Button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    const handleSelectAnswer = (optionIndex: number) => {
        if (showResult) return; // Prevent changing after finish
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: optionIndex,
        }));
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleFinish = async () => {
        setSaving(true);

        // Calculate score
        let correctCount = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correct) {
                correctCount++;
            }
        });

        const finalScore = (correctCount / totalQuestions) * 100;
        setScore(finalScore);

        // Save attempt to database via Service
        try {
            const user = await QuizService.getUser();
            if (user) {
                await QuizService.saveAttempt({
                    userId: user.id,
                    caseId: clinicalCase.id,
                    answers: answers,
                    score: finalScore
                });
            }
        } catch (error) {
            console.error("Error saving attempt via service:", error);
        }

        setSaving(false);
        setShowResult(true);
    };

    const isAnswered = (questionId: number) => answers[questionId] !== undefined;
    const allAnswered = questions.every((q) => isAnswered(q.id));

    if (showResult) {
        const correctCount = questions.filter((q) => answers[q.id] === q.correct).length;
        const incorrectCount = totalQuestions - correctCount;
        const isPassing = score >= 70;

        return (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
                <Card className="surface-card border-border shadow-2xl">
                    <CardHeader className="text-center border-b border-border/50 py-6">
                        <div className="flex justify-center mb-4">
                            <div className={cn(
                                "w-10 h-10 rounded-none flex items-center justify-center border-2",
                                isPassing
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                                    : "bg-red-500/10 border-red-500 text-red-500"
                            )}>
                                <Trophy className="w-5 h-5" />
                            </div>
                        </div>
                        <CardTitle className="text-lg font-bold tracking-tight">
                            {isPassing ? "Excelente desempenho!" : "Bom esforço!"}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {isPassing
                                ? "Você demonstrou domínio sobre este caso clinico."
                                : "Revise os conceitos e tente novamente para melhorar."}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <div className="text-center">
                            <div className={cn(
                                "text-3xl font-black mb-1 tracking-tighter",
                                isPassing ? "text-emerald-500" : "text-amber-500"
                            )}>
                                {score.toFixed(0)}%
                            </div>
                            <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-semibold">Nota Final</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-emerald-500 mb-1">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{correctCount}</span>
                                </div>
                                <p className="text-[10px] text-emerald-400 font-medium uppercase">Acertos</p>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-red-500 mb-1">
                                    <XCircle className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{incorrectCount}</span>
                                </div>
                                <p className="text-[10px] text-red-400 font-medium uppercase">Erros</p>
                            </div>
                        </div>

                        {/* Review Section */}
                        <div className="space-y-3 pt-2">
                            <h3 className="font-semibold text-base flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                                Revisão Detalhada
                            </h3>
                            <div className="space-y-3">
                                {questions.map((q, index) => {
                                    const userAnswer = answers[q.id];
                                    const isCorrect = userAnswer === q.correct;

                                    return (
                                        <div key={q.id} className={cn(
                                            "p-3 border-l-2 transition-all hover:bg-white/5",
                                            isCorrect
                                                ? "border-l-emerald-500 bg-emerald-500/5"
                                                : "border-l-red-500 bg-red-500/5"
                                        )}>
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 flex-shrink-0">
                                                    <span className="text-[10px] font-mono opacity-50">#{index + 1}</span>
                                                </div>
                                                <div className="flex-1 space-y-1.5">
                                                    <p className="font-medium text-xs leading-relaxed">
                                                        {q.question}
                                                    </p>

                                                    <div className="grid gap-1 text-[10px]">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-muted-foreground uppercase opacity-70">Sua Resposta</span>
                                                            <span className={cn(
                                                                "font-medium flex items-center gap-1.5",
                                                                isCorrect ? "text-emerald-400" : "text-red-400"
                                                            )}>
                                                                {isCorrect ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                                {q.options[userAnswer]}
                                                            </span>
                                                        </div>

                                                        {!isCorrect && (
                                                            <div className="flex flex-col gap-0.5 mt-1">
                                                                <span className="text-muted-foreground uppercase opacity-70">Correta</span>
                                                                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                                                                    <CheckCircle className="w-3 h-3" />
                                                                    {q.options[q.correct]}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 pt-4 border-t border-border">
                            <Button variant="outline" onClick={() => router.push("/dashboard/desempenho")} className="w-32 h-9 text-xs border-border hover:bg-secondary">
                                Ver Dashboard
                            </Button>
                            <Button onClick={() => router.push("/dashboard/casos-clinicos")} className="w-32 h-9 text-xs gradient-tile-a hover:brightness-110 text-white border-0">
                                Novo Caso
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground pl-0 mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar ao caso
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{clinicalCase.title}</h1>
                </div>
                <Badge variant="outline" className="border-border bg-secondary text-sm px-4 py-1 h-8">
                    {currentIndex + 1} / {totalQuestions}
                </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    <span>Progresso</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-secondary [&>div]:gradient-tile-a" />
            </div>

            {/* Question Card */}
            <div className="perspective-1000">
                <Card className="surface-card border-border shadow-xl overflow-hidden relative min-h-[400px] flex flex-col">
                    <div className="h-1 w-full gradient-tile-c absolute top-0 left-0" />

                    <CardHeader className="pb-2 pt-8 px-8">
                        <CardTitle className="text-xl font-medium leading-relaxed">
                            {currentQuestion.question}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 px-8 pb-8 pt-4 flex-1">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = answers[currentQuestion.id] === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAnswer(index)}
                                    className={cn(
                                        "w-full text-left p-4 border transition-all duration-200 group relative overflow-hidden",
                                        isSelected
                                            ? "border-[var(--color-tile-a-to)] bg-[var(--color-tile-a-from)]/10"
                                            : "border-border hover:border-white/20 hover:bg-white/5"
                                    )}
                                >
                                    {isSelected && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 gradient-tile-a" />
                                    )}

                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 flex items-center justify-center border transition-colors",
                                            isSelected
                                                ? "gradient-tile-a border-0 text-white"
                                                : "border-muted-foreground/30 text-transparent group-hover:border-white/50"
                                        )}>
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                        <span className={cn(
                                            "text-base transition-colors",
                                            isSelected ? "text-white font-medium" : "text-muted-foreground group-hover:text-white"
                                        )}>
                                            {option}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </CardContent>

                    <div className="p-4 bg-secondary/30 border-t border-border flex justify-between items-center">
                        <div className="flex gap-1">
                            {questions.map((q, idx) => (
                                <div
                                    key={q.id}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-colors",
                                        idx === currentIndex ? "bg-white" :
                                            isAnswered(q.id) ? "bg-[var(--color-tile-c-to)]" : "bg-muted-foreground/20"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-4">
                <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="h-10 text-sm text-muted-foreground hover:text-white hover:bg-secondary"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                </Button>

                {currentIndex === totalQuestions - 1 ? (
                    <Button
                        onClick={handleFinish}
                        disabled={!allAnswered || saving}
                        variant="gradient" className="h-10 px-8 text-sm" // Removed size="lg"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                        {saving ? "Finalizando..." : "Finalizar Prova"}
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!isAnswered(currentQuestion.id)}
                        variant="gradient" className="h-10 px-8 text-sm" // Removed size="lg"
                    >
                        Próxima Questão
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div >
    );
}
