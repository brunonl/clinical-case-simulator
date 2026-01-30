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
            <div className="max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-700 py-4 md:py-8">
                {/* Header do Resultado */}
                <div className="text-center mb-8 relative">
                    <div className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-3xl opacity-20 rounded-full",
                        isPassing ? "bg-emerald-500" : "bg-red-500"
                    )} />

                    <div className="relative z-10">
                        <div className={cn(
                            "inline-flex items-center justify-center p-3 rounded-2xl mb-4 shadow-lg ring-1 ring-inset backdrop-blur-sm",
                            isPassing
                                ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                                : "bg-red-500/10 text-red-400 ring-red-500/20"
                        )}>
                            <Trophy className="w-8 h-8" strokeWidth={1.5} />
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                            {isPassing ? "Aprovado!" : "Não foi dessa vez"}
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                            {isPassing
                                ? "Excelente! Você demonstrou domínio dos conceitos clínicos."
                                : "Revise os pontos de atenção abaixo e tente novamente."}
                        </p>
                    </div>
                </div>

                <Card className="surface-card border-border shadow-2xl overflow-hidden relative">
                    {/* Barra de Status Superior */}
                    <div className={cn(
                        "h-1.5 w-full absolute top-0 left-0",
                        isPassing ? "gradient-tile-a" : "bg-red-500"
                    )} />

                    <CardContent className="space-y-8 pt-8 px-6 md:px-8">
                        {/* Círculo de Nota Principal */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative mb-2">
                                <svg className="w-40 h-40 rotate-[-90deg]">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-secondary opacity-20"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={440}
                                        strokeDashoffset={440 - (440 * score) / 100}
                                        className={cn(
                                            "transition-all duration-1000 ease-out",
                                            isPassing ? "text-emerald-500" : "text-amber-500"
                                        )}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={cn(
                                        "text-4xl font-black tracking-tighter",
                                        isPassing ? "text-emerald-500" : "text-amber-500"
                                    )}>
                                        {score.toFixed(0)}%
                                    </span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
                                        Nota Final
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Grid de Estatísticas */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-emerald-500 mb-1">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{correctCount}</span>
                                </div>
                                <p className="text-[10px] text-emerald-400/70 font-bold uppercase tracking-wider">Acertos</p>
                            </div>
                            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-red-500 mb-1">
                                    <XCircle className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{incorrectCount}</span>
                                </div>
                                <p className="text-[10px] text-red-400/70 font-bold uppercase tracking-wider">Erros</p>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 pt-6 border-t border-border">
                            <Button variant="ghost" onClick={() => router.push("/dashboard/desempenho")} className="w-full sm:w-auto h-11 text-xs font-semibold text-muted-foreground hover:bg-secondary border border-transparent hover:border-border">
                                VER MEU DESEMPENHO
                            </Button>
                            <Button
                                onClick={() => router.push("/dashboard/casos-clinicos")}
                                className={cn(
                                    "w-full sm:w-auto h-11 px-8 text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.02]",
                                    "gradient-tile-a hover:brightness-110 border-0"
                                )}
                            >
                                PRÓXIMO CASO
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Seção de Revisão (Expansível ou Lista) */}
                <div className="mt-8 space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
                        <CheckCircle className="w-4 h-4" />
                        Revisão Questão a Questão
                    </h3>

                    <div className="space-y-3">
                        {questions.map((q, index) => {
                            const userAnswer = answers[q.id];
                            const isCorrect = userAnswer === q.correct;

                            return (
                                <div key={q.id} className={cn(
                                    "rounded-lg border p-4 transition-all duration-300",
                                    isCorrect
                                        ? "bg-secondary/20 border-border hover:border-emerald-500/30"
                                        : "bg-red-500/5 border-red-500/20"
                                )}>
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5",
                                            isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                                        )}>
                                            {index + 1}
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <p className="text-sm font-medium text-foreground leading-relaxed">
                                                {q.question}
                                            </p>

                                            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Sua Resposta:</span>
                                                    <span className={cn(
                                                        "text-xs font-medium flex items-center gap-2",
                                                        isCorrect ? "text-emerald-400" : "text-red-400"
                                                    )}>
                                                        {isCorrect ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                        {q.options[userAnswer]}
                                                    </span>
                                                </div>

                                                {!isCorrect && (
                                                    <div className="flex flex-col gap-1 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                                                        <span className="text-[9px] text-emerald-500/70 uppercase tracking-wider font-semibold">Resposta Correta:</span>
                                                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-2">
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
