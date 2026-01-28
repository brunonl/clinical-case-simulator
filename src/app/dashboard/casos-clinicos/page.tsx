import { ClinicalCasesServerService } from "@/services/server/clinical-cases";
import CasosClinicosClient from "./client";

export default async function CasosClinicosPage() {
    // Fetch data via Server Service
    const [institutions, cases] = await Promise.all([
        ClinicalCasesServerService.getInstitutions(),
        ClinicalCasesServerService.getAll()
    ]);

    return (
        <CasosClinicosClient
            institutions={institutions || []}
            cases={cases || []}
        />
    );
}
