import { InstitutionService } from "@/services/institution.service";
import { ClinicalCaseService } from "@/services/clinical-case.service";
import { CasosClinicosClient } from "./client";

export default async function CasosClinicosPage() {
    // Uses services instead of accessing the database directly
    const institutions = await InstitutionService.getAll();
    const cases = await ClinicalCaseService.getAllWithInstitution();

    return (
        <CasosClinicosClient
            institutions={institutions}
            cases={cases}
        />
    );
}
