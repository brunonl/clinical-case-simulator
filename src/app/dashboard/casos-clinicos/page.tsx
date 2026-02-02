import { InstitutionService } from "@/services/institution.service";
import { ClinicalCaseService } from "@/services/clinical-case.service";
import { CasosClinicosClient } from "./client";

export default async function CasosClinicosPage() {
    // Usa services ao invés de acessar o banco diretamente
    const institutions = await InstitutionService.getAll();
    const cases = await ClinicalCaseService.getAllWithInstitution();

    return (
        <CasosClinicosClient
            institutions={institutions}
            cases={cases}
        />
    );
}
