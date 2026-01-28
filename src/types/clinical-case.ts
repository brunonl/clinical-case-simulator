export type DifficultyLevel = "fácil" | "médio" | "difícil";
export type CaseStatus = "pending" | "in_progress" | "completed";

export interface ClinicalCase {
    id: string;
    title: string;
    specialty: string;
    difficulty: DifficultyLevel;
    status?: CaseStatus;
    chief_complaint: string;
    clinical_history: string;
    clinical_exam: string | null;
    lab_results: any | null;
    imaging: any | null;
    questions: any[] | null;
    correct_diagnosis: string | null;
    explanation: string | null;
    institution_id: string | null;
    created_at: string;
}
