"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope, ArrowRight, Loader2, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { FullScreenLoader } from "@/components/ui/loaders";
import { AuthBackground } from "@/components/auth/auth-background";

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [copied, setCopied] = useState(false);


    const router = useRouter();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setError(null);
        try {
            await AuthService.signInWithPassword(data.email, data.password);
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login failed:", error);
            setError("Email ou senha incorretos");
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await AuthService.signInWithOAuth("google");
        } catch (error: any) {
            setError("Erro ao fazer login com Google");
            setLoading(false);
        }
    };

    const copyCredentials = () => {
        setValue("email", "admin@scc.com");
        setValue("password", "admin123");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return <FullScreenLoader text="Autenticando..." />;
    }

    return (
        <div className="min-h-dvh flex bg-[#050505] selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0a0a0a] border-r border-white/5 flex-col justify-center">
                {/* RESTORED: User Provided Grid Code */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>

                <AuthBackground />

                <div className="relative z-10 w-full max-w-2xl px-16">
                    <div className="flex items-center gap-5 mb-16 group cursor-default">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-2xl">
                                <Stethoscope className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                            </div>
                        </div>
                        <div className="px-2">
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
            <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#050505] relative p-8 lg:p-12">
                {/* Grid Pattern Overlay (Right Side - Matching Aesthetic) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none"></div>

                {/* Radial Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />

                {/* Added pt-4 to container to ensure space for floating pill */}
                <div className="w-full max-w-[420px] animate-in slide-in-from-right-4 duration-700 fade-in relative z-10">

                    {/* Mobile Logo Only (Horizontal match) */}
                    <div className="lg:hidden flex items-center gap-4 mb-6 group cursor-default justify-center mt-6">
                        <div className="relative mobile-logo-icon">
                            <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20" />
                            <div className="relative w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-xl">
                                <Stethoscope className="w-5 h-5 text-emerald-400" />
                            </div>
                        </div>
                        <div className="px-1">
                            <h1 className="text-2xl text-white flex items-center gap-[2px]">
                                <span className="font-light text-emerald-400">S</span>
                                <span className="font-bold">C</span>
                                <span className="font-bold">C</span>
                            </h1>
                        </div>
                    </div>

                    {/* COMPACT Recruiter Note - Mobile: Above Welcome / Desktop: Top Right Absolute */}
                    <div className="relative mx-auto mb-6 w-max lg:absolute lg:top-[-24px] lg:right-0 lg:mx-0 lg:mb-0 lg:w-auto p-1.5 px-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 shadow-sm backdrop-blur-sm animate-in fade-in slide-in-from-top-1 duration-500 hover:bg-emerald-500/10 transition-colors z-20">
                        <span className="text-[10px] text-emerald-200/50 uppercase tracking-widest font-bold">Recrutador</span>
                        <code className="text-[10px] text-emerald-400 font-mono">admin@scc.com</code>
                        <span className="text-emerald-500/20">|</span>
                        <code className="text-[10px] text-emerald-400 font-mono">admin123</code>
                        <div className="w-px h-3 bg-emerald-500/20 mx-0.5" />
                        <button
                            onClick={copyCredentials}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                            title="Copiar credenciais"
                        >
                            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                    </div>

                    <div className="mb-10 mt-2 lg:mt-12">
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Bem-vindo</h3>
                        <p className="text-gray-400 text-sm font-normal">
                            Entre suas credenciais para acessar o sistema.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-lg flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-gray-300 text-sm font-medium pl-1">
                                Email Corporativo
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="medico@exemplo.com"
                                {...register("email")}
                                className="h-10 bg-[#121212] border-white/5 rounded-lg focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-[#1a1a1a] transition-all text-white placeholder:text-gray-600 text-base px-4 shadow-inner"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between pl-1 pr-1">
                                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                                    Senha
                                </Label>

                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                className="h-10 bg-[#121212] border-white/5 rounded-lg focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-[#1a1a1a] transition-all text-white placeholder:text-gray-600 text-base px-4 shadow-inner"
                            />
                            {errors.password && (
                                <p className="text-xs text-red-400 mt-1 pl-1 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="gradient"
                            size="lg"
                            className="w-full mt-4 h-11 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all rounded-lg"
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

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
                            <span className="bg-[#050505] px-2">Ou</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full h-11 bg-white/[0.03] border-white/5 hover:bg-white/[0.05] hover:text-white hover:border-white/10 text-gray-300 text-sm font-medium transition-all gap-3"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        Continuar com Google
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-8 font-normal">
                        Ainda não possui acesso?{" "}
                        <Link href="/signup" className="text-emerald-500 text-opacity-80 hover:text-emerald-400 font-medium transition-colors hover:underline underline-offset-4">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    );
}
