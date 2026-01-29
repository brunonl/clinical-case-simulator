"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FileText, Volume2, ImageIcon, CheckCircle, AlertTriangle, Stethoscope } from "lucide-react";
import type { Institution, ClinicalCase } from "@/lib/supabase/types";

interface CasosClinicosClientProps {
    institutions: Institution[];
    cases: (ClinicalCase & { institutions: { name: string } | null })[];
}

type Step = 1 | 2 | 3 | 4;

export function CasosClinicosClient({ institutions, cases }: CasosClinicosClientProps) {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [selectedInstitution, setSelectedInstitution] = useState<string>("");
    const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const filteredCases = selectedInstitution
        ? cases.filter((c) => c.institution_id === selectedInstitution)
        : cases;

    const stepTitles = [
        "Seleção Instituição",
        "Seleção Casos Clínicos",
        "Visualização Caso Clínico",
        "Desafio",
    ];

    const handleNext = () => {
        if (step === 1 && selectedInstitution) {
            setStep(2);
        } else if (step === 2 && selectedCase) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((step - 1) as Step);
        }
    };

    const handleStartQuiz = () => {
        if (selectedCase) {
            router.push(`/dashboard/casos-clinicos/${selectedCase.id}/quiz`);
        }
    };

    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Stethoscope className="w-8 h-8 text-[var(--color-tile-a-from)]" />
                <h1 className="text-2xl font-semibold text-foreground">Casos Clínicos</h1>
            </div>

            {/* Progress Steps - Dark theme */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {stepTitles.map((title, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap ${step === index + 1
                                ? "gradient-tile-a text-white"
                                : step > index + 1
                                    ? "gradient-tile-a text-white"
                                    : "bg-secondary text-muted-foreground"
                                }`}
                        >
                            <span className="font-bold">{index + 1}</span>
                            <span className="hidden md:inline">{title}</span>
                        </div>
                        {index < stepTitles.length - 1 && (
                            <div className="w-4 md:w-8 h-0.5 bg-border mx-1" />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Select Institution */}
            {step === 1 && (
                <div className="bg-card border border-border">
                    <div className="h-1 gradient-tile-a" />
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Badge className="bg-[var(--color-tile-a-from)] text-white">1</Badge>
                            <h2 className="text-xl font-semibold text-foreground">Seleção Instituição</h2>
                        </div>

                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                Por favor, selecione sua instituição de ensino.
                            </p>
                            <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                                <SelectTrigger className="w-full max-w-md bg-background border-border text-foreground">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border">
                                    {institutions.map((inst) => (
                                        <SelectItem key={inst.id} value={inst.id} className="text-foreground">
                                            {inst.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-400">* Campo Obrigatório!</p>
                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleNext}
                                    disabled={!selectedInstitution}
                                    variant="gradient"
                                    size="lg"
                                    className="w-40"
                                >
                                    Próximo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Select Clinical Case */}
            {step === 2 && (
                <div className="bg-card border border-border">
                    <div className="h-1 gradient-tile-b" />
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-[var(--color-tile-b-from)] text-white">2</Badge>
                                <h2 className="text-xl font-semibold text-foreground">Seleção Casos Clínicos</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {!selectedCase && (
                                <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span>Primeiro selecione um caso clínico para poder avançar.</span>
                                </div>
                            )}

                            {filteredCases.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-lg border border-border mt-4">
                                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                    <p>Nenhum caso clínico encontrado para esta instituição.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-border hover:bg-transparent">
                                                <TableHead className="text-muted-foreground w-24">Código</TableHead>
                                                <TableHead className="text-muted-foreground">Disciplina</TableHead>
                                                <TableHead className="text-muted-foreground">Dificuldade</TableHead>
                                                <TableHead className="text-muted-foreground">Título</TableHead>
                                                <TableHead className="text-muted-foreground text-right">Ação</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredCases.map((c) => (
                                                <TableRow
                                                    key={c.id}
                                                    className={`border-border transition-colors ${selectedCase?.id === c.id ? "bg-[var(--color-tile-b-from)]/20" : "hover:bg-secondary/30"}`}
                                                >
                                                    <TableCell className="text-foreground font-mono text-xs">{c.code}</TableCell>
                                                    <TableCell className="text-muted-foreground">{c.discipline}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className={`capitalize ${c.difficulty === "fácil"
                                                                ? "bg-teal-500/10 text-teal-400 border-teal-500/30"
                                                                : c.difficulty === "médio"
                                                                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                                                    : "bg-red-500/10 text-red-400 border-red-500/30"
                                                                }`}
                                                        >
                                                            {c.difficulty || "N/A"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-foreground font-medium">{c.title}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant={selectedCase?.id === c.id ? "gradient" : "outline"}
                                                            onClick={() => setSelectedCase(c)}
                                                            size="lg"
                                                            className="w-36"
                                                        >
                                                            {selectedCase?.id === c.id ? "Selecionado" : "Selecionar"}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}

                            <div className="flex justify-between pt-4">
                                <Button variant="ghost" onClick={handleBack} size="lg" className="w-40 bg-secondary text-foreground hover:bg-secondary/80">
                                    Voltar
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!selectedCase}
                                    variant="gradient"
                                    size="lg"
                                    className="w-40"
                                >
                                    Próximo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: View Clinical Case */}
            {step === 3 && selectedCase && (
                <div className="bg-card border border-border">
                    <div className="h-1 gradient-tile-c" />
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Badge className="bg-[var(--color-tile-c-from)] text-white">3</Badge>
                            <h2 className="text-xl font-semibold text-foreground">Visualização Caso Clínico</h2>
                        </div>

                        <Tabs defaultValue="texto" className="w-full">
                            <TabsList className="bg-secondary border border-border">
                                <TabsTrigger value="texto" className="flex items-center gap-2 data-[state=active]:bg-card">
                                    <FileText className="w-4 h-4" />
                                    Texto
                                </TabsTrigger>
                                <TabsTrigger value="audio" className="flex items-center gap-2 data-[state=active]:bg-card">
                                    <Volume2 className="w-4 h-4" />
                                    Áudios
                                </TabsTrigger>
                                <TabsTrigger value="galeria" className="flex items-center gap-2 data-[state=active]:bg-card">
                                    <ImageIcon className="w-4 h-4" />
                                    Galeria
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="texto" className="space-y-4 mt-4">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-3">Caso Clínico</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-bold text-foreground">Título</h4>
                                                <p className="text-muted-foreground mt-1">{selectedCase.title}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-foreground">Queixa Principal</h4>
                                                <p className="text-muted-foreground mt-1">{selectedCase.chief_complaint}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-foreground">História Clínica</h4>
                                                <p className="text-muted-foreground mt-1 whitespace-pre-line">{selectedCase.clinical_history}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-foreground">Exame Clínico</h4>
                                                <p className="text-muted-foreground mt-1 whitespace-pre-line">{selectedCase.clinical_exam}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="audio" className="mt-4">
                                {selectedCase.audio_url ? (
                                    <div className="bg-card border border-border p-6 rounded-lg flex flex-col items-center justify-center gap-6 py-12">
                                        <div className="relative">
                                            <div className="absolute inset-0 gradient-tile-b blur-xl opacity-20 rounded-full" />
                                            <div className="relative w-20 h-20 gradient-tile-b rounded-full flex items-center justify-center shadow-xl">
                                                <Volume2 className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-lg font-semibold text-foreground">Ausculta</h3>
                                            <p className="text-sm text-muted-foreground">Clique no play para ouvir os sons da ausculta.</p>
                                        </div>
                                        <audio
                                            controls
                                            className="w-full max-w-md mt-2 accent-[var(--color-tile-b-to)]"
                                            src={selectedCase.audio_url}
                                        >
                                            Seu navegador não suporta o elemento de áudio.
                                        </audio>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-lg border border-border">
                                        <Volume2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p>Nenhum áudio disponível para este caso.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="galeria" className="mt-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {(selectedCase.images as string[] || []).map((img, index) => (
                                        <div key={index} className="aspect-square bg-secondary overflow-hidden border border-border relative">
                                            <Image
                                                src={img.startsWith('/') ? img : `/images/pacientes/${img}`}
                                                alt={`Paciente - Imagem ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    {(!selectedCase.images || (selectedCase.images as string[]).length === 0) && (
                                        <div className="col-span-full text-center py-12 text-muted-foreground">
                                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                            <p>Nenhuma imagem disponível</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-between pt-6 border-t border-border mt-6">
                            <Button variant="ghost" onClick={handleBack} size="lg" className="w-40 bg-secondary text-foreground hover:bg-secondary/80">
                                Voltar
                            </Button>
                            <Button
                                onClick={handleNext}
                                variant="gradient"
                                size="lg"
                                className="w-40"
                            >
                                Próximo
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: Challenge */}
            {step === 4 && (
                <div className="bg-card border border-border">
                    <div className="h-1 gradient-tile-d" />
                    <div className="p-6 text-center space-y-6 py-12">
                        <div className="w-20 h-20 gradient-tile-a mx-auto flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold text-foreground">Desafio</h2>
                        <p className="text-muted-foreground">Pronto para iniciar o desafio?</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="ghost" onClick={handleBack} size="lg" className="w-40 bg-secondary text-foreground hover:bg-secondary/80">
                                Voltar
                            </Button>
                            <Button
                                variant="gradient"
                                size="lg"
                                className="w-40"
                                onClick={() => setShowConfirmDialog(true)}
                            >
                                Pronto
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog - Dark theme */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="bg-card border-border">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-amber-400">
                            <AlertTriangle className="w-5 h-5" />
                            Alerta
                        </DialogTitle>
                        <DialogDescription className="space-y-2 pt-4 text-muted-foreground">
                            <p>Deseja realizar a sua prova?</p>
                            <p className="font-medium text-foreground">
                                Fique atento! Após a confirmação não será possível refazer o teste.
                            </p>
                            <p>Já estudou todo o caso clínico? Então clique no botão Iniciar e boa sorte!</p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button variant="ghost" onClick={() => setShowConfirmDialog(false)} size="lg" className="w-40 bg-secondary text-foreground hover:bg-secondary/80">
                            Voltar
                        </Button>
                        <Button onClick={handleStartQuiz} variant="gradient" size="lg" className="w-40">
                            Iniciar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
