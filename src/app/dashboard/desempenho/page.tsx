import { createClient } from "@/lib/supabase/server";
import { DesempenhoClient } from "./client";
import { PerformanceServerService } from "@/services/server/performance";

export default async function DesempenhoPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Faça login para ver seu desempenho.</p>
            </div>
        );
    }
    const attempts = await PerformanceServerService.getUserAttempts(user.id);

    return <DesempenhoClient attempts={attempts || []} />;
}
