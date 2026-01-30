import { Info, Lightbulb, BookOpen, Users, Sparkles, Building2 } from "lucide-react";
import { ABOUT_CONTENT } from "@/constants/about-data";

export default function SobrePage() {
    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <Info className="w-6 h-6 text-muted-foreground" />
                <h1 className="text-xl font-semibold text-foreground">Sobre o Simulador</h1>
            </div>

            {/* Main Content Grid - Responsive */}
            <div className="space-y-4">

                {/* Description Card */}
                <div className="bg-card border border-border group overflow-hidden">
                    <div className="h-1 gradient-tile-c w-full" />
                    <div className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-sm gradient-tile-c flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-foreground mb-1 uppercase tracking-wide">{ABOUT_CONTENT.description.title}</h2>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {ABOUT_CONTENT.description.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology Card */}
                <div className="bg-card border border-border group overflow-hidden">
                    <div className="h-1 gradient-tile-b w-full" />
                    <div className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-sm gradient-tile-b flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-foreground mb-1 uppercase tracking-wide">{ABOUT_CONTENT.methodology.title}</h2>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {ABOUT_CONTENT.methodology.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objective 1 */}
                <div className="bg-card border border-border group overflow-hidden">
                    <div className="h-1 gradient-tile-a w-full" />
                    <div className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-sm gradient-tile-a flex items-center justify-center flex-shrink-0">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-1">{ABOUT_CONTENT.objectives[0].title}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">
                                    {ABOUT_CONTENT.objectives[0].text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objective 2 */}
                <div className="bg-card border border-border group overflow-hidden">
                    <div className="h-1 gradient-tile-d w-full" />
                    <div className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-sm gradient-tile-d flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-1">{ABOUT_CONTENT.objectives[1].title}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">
                                    {ABOUT_CONTENT.objectives[1].text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
