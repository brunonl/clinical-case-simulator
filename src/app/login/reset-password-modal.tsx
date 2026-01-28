import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth";

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await AuthService.resetPasswordForEmail(email);
            alert("Email enviado com sucesso!");
            onClose();
        } catch (error: any) {
            alert("Erro: " + error.message);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Recuperar Senha</h3>
                <p className="text-gray-400 text-sm mb-4">Digite seu email para receber o link.</p>
                <form onSubmit={handleReset}>
                    <Input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 bg-[#0a0a0a] border-white/10 text-white"
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="bg-transparent border-white/10 text-white hover:bg-white/5"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            {loading ? "Enviando..." : "Enviar Link"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
