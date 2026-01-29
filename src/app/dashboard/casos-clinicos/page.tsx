import { createClient } from "@/lib/supabase/server";
import { CasosClinicosClient } from "./client";

export default async function CasosClinicosPage() {
    const supabase = await createClient();

    // Fetch institutions
    const { data: institutions } = await supabase
        .from("institutions")
        .select("*")
        .order("name");

    // Fetch clinical cases with institution name
    const { data: cases } = await supabase
        .from("clinical_cases")
        .select(`
      *,
      institutions (name)
    `)
        .order("code");

    return (
        <CasosClinicosClient
            institutions={institutions || []}
            cases={cases || []}
        />
    );
}
