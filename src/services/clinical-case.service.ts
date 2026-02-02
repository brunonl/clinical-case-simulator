import { createClient } from "@/lib/supabase/server";
import type { ClinicalCase } from "@/lib/supabase/types";

export class ClinicalCaseService {
    static async getAllWithInstitution(): Promise<(ClinicalCase & { institutions: { name: string } | null })[]> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("clinical_cases")
            .select(`
                *,
                institutions (name)
            `)
            .order("code");

        if (error) {
            console.error("Error fetching clinical cases:", error);
            return [];
        }

        return data || [];
    }

    static async getById(id: string): Promise<ClinicalCase | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("clinical_cases")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching clinical case:", error);
            return null;
        }

        return data;
    }

    static async getByInstitution(institutionId: string): Promise<ClinicalCase[]> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("clinical_cases")
            .select("*")
            .eq("institution_id", institutionId)
            .order("code");

        if (error) {
            console.error("Error fetching clinical cases by institution:", error);
            return [];
        }

        return data || [];
    }
}
