import { createClient } from "@/lib/supabase/server";
import type { Institution } from "@/lib/supabase/types";

export class InstitutionService {
    static async getAll(): Promise<Institution[]> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("institutions")
            .select("*")
            .order("name");

        if (error) {
            console.error("Error fetching institutions:", error);
            return [];
        }

        return data || [];
    }

    static async getById(id: string): Promise<Institution | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("institutions")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching institution:", error);
            return null;
        }

        return data;
    }
}
