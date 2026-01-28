import { createClient } from "@/lib/supabase/server";

export const PerformanceServerService = {
    async getUserAttempts(userId: string) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("quiz_attempts")
            .select(`
                *,
                clinical_cases (title, discipline)
            `)
            .eq("user_id", userId)
            .order("completed_at", { ascending: false });

        if (error) throw new Error(error.message);
        return data || [];
    }
};
