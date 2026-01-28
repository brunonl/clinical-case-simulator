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
import { Stethoscope, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";


const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setError("Email ou senha incorretos");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError("Erro ao fazer login com Google");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#050505] selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0a0a0a] border-r border-white/5 flex-col justify-center">

                {/* Dynamic Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 blur-[100px] rounded-full mix-blend-screen opacity-40" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light" />

                    {/* Architectural Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-2xl px-16">
                    {/* Logo Section */}
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

                    {/* Headline */}
                    <div className="space-y-6">
                        <h2 className="text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                            Domine a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                                prática clínica.
                            </span>
                        </h2>

                        <p className="text-white/60 text-xl leading-relaxed max-w-lg font-light border-l border-emerald-500/30 pl-6 py-2">
                            A plataforma definitiva para simulações realistas e preparação médica avançada.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#050505] p-8 lg:p-12">
                <div className="w-full max-w-[420px] animate-in slide-in-from-right-4 duration-700 fade-in">

                    {/* Header */}
                    <div className="mb-12">
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Bem-vindo</h3>
                        <p className="text-gray-300 text-base font-normal">
                            Entre suas credenciais para acessar o sistema.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-xl flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200 text-sm font-medium pl-1">
                                Email Corporativo
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="medico@exemplo.com"
                                {...register("email")}
                                className="h-10 bg-[#1a1a1a] border-white/10 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-[#202020] transition-all text-white placeholder:text-gray-500 text-base px-5"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between pl-1 pr-1">
                                <Label htmlFor="password" className="text-gray-200 text-sm font-medium">
                                    Senha
                                </Label>
                                <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                                    Recuperar acesso
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                className="h-10 bg-[#1a1a1a] border-white/10 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-[#202020] transition-all text-white placeholder:text-gray-500 text-base px-5"
                            />
                            {errors.password && (
                                <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="gradient"
                            size="lg"
                            className="w-full mt-4 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all rounded-xl"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Acessar Plataforma
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
                            <span className="bg-[#050505] px-4">Ou</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full bg-white/[0.05] border-white/10 hover:bg-white/[0.1] hover:text-white hover:border-white/20 text-white font-medium transition-all gap-3"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continuar com Google
                    </Button>

                    <p className="text-center text-sm text-gray-300 mt-10 font-normal">
                        Ainda não possui acesso?{" "}
                        <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4">
                            Solicitar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
