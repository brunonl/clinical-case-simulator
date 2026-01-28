"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Stethoscope, CheckCircle2 } from "lucide-react";
import Link from "next/link";


const signupSchema = z.object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupForm) => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);

        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex bg-[#050505] selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Left Panel - Branding (Igual ao Login para consistência) */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0a0a0a] border-r border-white/5 flex-col justify-center">
                {/* Dynamic Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 blur-[100px] rounded-full mix-blend-screen opacity-40" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-2xl px-16">
                    <div className="flex items-center gap-5 mb-16 group cursor-default">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-2xl">
                                <Stethoscope className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl text-white flex items-center gap-[3px]">
                                <span className="font-light text-emerald-400">S</span>
                                <span className="font-bold">C</span>
                                <span className="font-bold">C</span>
                            </h1>
                            <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-1" />
                            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold">
                                Simulador de Casos Clínicos
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                            Junte-se à <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                                elite médica.
                            </span>
                        </h2>
                        <p className="text-white/60 text-xl leading-relaxed max-w-lg font-light border-l border-emerald-500/30 pl-6 py-2">
                            Comece agora sua jornada de aperfeiçoamento clínico com casos baseados em evidências reais.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#050505] p-8 lg:p-12">
                <div className="w-full max-w-[420px] animate-in slide-in-from-right-4 duration-700 fade-in">

                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/login" className="inline-flex items-center text-sm text-white/40 hover:text-emerald-400 transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Voltar para login
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Criar conta</h3>
                        <p className="text-gray-300 text-base font-normal">
                            Preencha seus dados para iniciar o cadastro.
                        </p>
                    </div>

                    {success && (
                        <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <div>
                                <span className="font-semibold block mb-0.5">Sucesso!</span>
                                Conta criada. Redirecionando...
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-xl flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-200 text-sm font-medium pl-1">
                                Nome Completo
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Dr. João Silva"
                                {...register("name")}
                                className="h-10 bg-[#1a1a1a] border-white/10 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-[#202020] transition-all text-white placeholder:text-gray-500 text-base px-5"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200 text-sm font-medium pl-1">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                {...register("email")}
                                className="h-10 bg-[#1a1a1a] border-white/10 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-[#202020] transition-all text-white placeholder:text-gray-500 text-base px-5"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-200 text-sm font-medium pl-1">
                                    Senha
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className="h-10 bg-[#1a1a1a] border-white/10 rounded-xl focus:border-emerald-500/50 focus:ring-0 focus:bg-[#202020] transition-all text-white placeholder:text-gray-500 text-base px-5"
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-200 text-sm font-medium pl-1">
                                    Confirmar
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("confirmPassword")}
                                    className="h-10 bg-[#1a1a1a] border-white/10 rounded-xl focus:border-emerald-500/50 focus:ring-0 focus:bg-[#202020] transition-all text-white placeholder:text-gray-500 text-base px-5"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="gradient"
                            size="lg"
                            className="w-full mt-4 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all rounded-xl"
                            disabled={loading || success}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Concluir Cadastro"
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-300 mt-10 font-normal">
                        Já possui uma conta?{" "}
                        <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
