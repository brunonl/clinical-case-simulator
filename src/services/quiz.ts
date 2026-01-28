import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface SaveAttemptParams {
    userId: string;
    caseId: string;
    answers: Record<number, number>;
    score: number;
}

export const QuizService = {
    async saveAttempt({ userId, caseId, answers, score }: SaveAttemptParams) {
        const { error } = await supabase.from("quiz_attempts").insert({
            user_id: userId,
            case_id: caseId,
            answers: answers,
            score: score,
        });

        if (error) {
            console.error("Error saving attempt:", error);
            // Fallback for older schema migration compatibility if needed
            if (error.message.includes('column "case_id" of relation "quiz_attempts" does not exist')) {
                const { error: fallbackError } = await supabase.from("quiz_attempts").insert({
                    user_id: userId,
                    clinical_case_id: caseId, // Fallback key
                    answers: answers,
                    score: score,
                });
                if (fallbackError) throw new Error(fallbackError.message);
                return;
            }
            throw new Error(error.message);
        }
    },

    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw new Error(error.message);
        return user;
    }
};
