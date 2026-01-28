import { createClient } from "@/lib/supabase/server";
import { QuizClient } from "./client";
import { notFound } from "next/navigation";

interface QuizPageProps {
    params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch the clinical case
    const { data: clinicalCase, error: caseError } = await supabase
        .from("clinical_cases")
        .select("*")
        .eq("id", id)
        .single();

    if (caseError || !clinicalCase) {
        notFound();
    }

    // Now uses questions from JSONB inside clinicalCase
    // We cast it to ensure type safety in the client component
    return (
        <QuizClient
            clinicalCase={clinicalCase}
        />
    );
}
