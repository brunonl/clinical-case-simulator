import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, BarChart2, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8">
            <span className="text-4xl font-bold text-white">SCC</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simulador de Casos Clínicos
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Uma ferramenta de apoio ao ensino médico para simulação de casos
            clínicos reais, com diferentes níveis de complexidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                variant="gradient"
                size="lg"
                className="w-40 px-8"
              >
                Acessar Plataforma
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/10 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Casos Reais
              </h3>
              <p className="text-white/70">
                Estude casos clínicos baseados em situações reais do dia a dia
                médico.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Acompanhe seu Progresso
              </h3>
              <p className="text-white/70">
                Monitore seu desempenho e identifique pontos de melhoria.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ambiente Seguro
              </h3>
              <p className="text-white/70">
                Pratique com segurança em um ambiente virtual controlado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-white/60">
        <p>
          CINS – Centro de Informática em Saúde da Faculdade de Medicina da UFMG
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} Simulador de Casos Clínicos
        </p>
      </footer>
    </div>
  );
}
