import { createClient } from "@/lib/supabase/server";

export const ClinicalCasesServerService = {
    async getAll() {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("clinical_cases")
            .select(`
                *,
                institutions (name)
            `)
            .order("code");

        if (error) throw new Error(error.message);
        return data || [];
    },

    async getInstitutions() {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("institutions")
            .select("*")
            .order("name");

        if (error) throw new Error(error.message);
        return data || [];
    }
};
