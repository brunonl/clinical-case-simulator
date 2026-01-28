import { createClient } from "@/lib/supabase/client";
import { ClinicalCase } from "@/types/clinical-case";

const supabase = createClient();

export const ClinicalCasesService = {
    async getAll() {
        const { data, error } = await supabase
            .from("clinical_cases")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);
        return data as ClinicalCase[];
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from("clinical_cases")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);
        return data as ClinicalCase;
    },

    async startCase(caseId: string, userId: string) {
        return true;
    }
};
