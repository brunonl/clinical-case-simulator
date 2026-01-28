import { FileText, BarChart3, Info, HelpCircle } from "lucide-react";

export const DASHBOARD_TILES = [
    {
        href: "/dashboard/casos-clinicos",
        label: "Casos Clínicos",
        letter: "A",
        gradientClass: "gradient-tile-a",
        buttonLabel: "ENTRAR",
        icon: FileText,
        key: "a",
    },
    {
        href: "/dashboard/desempenho",
        label: "Desempenho",
        letter: "B",
        gradientClass: "gradient-tile-b",
        buttonLabel: "ENTRAR",
        icon: BarChart3,
        key: "b",
    },
    {
        href: "/dashboard/sobre",
        label: "Sobre",
        letter: "C",
        gradientClass: "gradient-tile-c",
        buttonLabel: "ENTRAR",
        icon: Info,
        key: "c",
    },
    {
        href: "/dashboard/ajuda",
        label: "Ajuda",
        letter: "D",
        gradientClass: "gradient-tile-d",
        buttonLabel: "ENTRAR",
        icon: HelpCircle,
        key: "d",
    },
] as const;

export const KEY_MAP: Record<string, string> = {
    a: "/dashboard/casos-clinicos",
    b: "/dashboard/desempenho",
    c: "/dashboard/sobre",
    d: "/dashboard/ajuda",
    e: "/login", // logout
};
