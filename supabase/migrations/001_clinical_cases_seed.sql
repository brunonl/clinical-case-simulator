-- ============================================================================
-- MIGRATION: Create Clinical Cases Table and Seed Data
-- Run this in your Supabase SQL Editor or via migration
-- ============================================================================

-- Drop existing table if exists (BE CAREFUL in production!)
-- DROP TABLE IF EXISTS clinical_cases CASCADE;

-- Ensure institutions table exists
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default institution if not exists
INSERT INTO institutions (id, name, code) 
VALUES ('00000000-0000-0000-0000-000000000001', 'UFMG - Faculdade de Medicina', 'UFMG')
ON CONFLICT (code) DO NOTHING;

-- Create clinical_cases table if not exists
CREATE TABLE IF NOT EXISTS clinical_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    discipline TEXT NOT NULL,
    specialty TEXT,
    difficulty TEXT CHECK (difficulty IN ('fácil', 'médio', 'difícil')),
    chief_complaint TEXT NOT NULL,
    clinical_history TEXT NOT NULL,
    clinical_exam TEXT,
    lab_results JSONB,
    imaging JSONB,
    images JSONB DEFAULT '["default_exam.jpg", "default_scan.jpg"]',
    audio_url TEXT DEFAULT 'https://actions.google.com/sounds/v1/alarms/heartbeat.ogg',
    questions JSONB DEFAULT '[]',
    correct_diagnosis TEXT,
    explanation TEXT,
    institution_id UUID REFERENCES institutions(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_attempts table if not exists
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    case_id UUID REFERENCES clinical_cases(id) ON DELETE CASCADE,
    score NUMERIC,
    answers JSONB,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE clinical_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policies for clinical_cases (public read)
CREATE POLICY IF NOT EXISTS "Anyone can view clinical cases" 
    ON clinical_cases FOR SELECT 
    USING (true);

-- Policies for quiz_attempts (user-specific)
CREATE POLICY IF NOT EXISTS "Users can view own attempts" 
    ON quiz_attempts FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own attempts" 
    ON quiz_attempts FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- SEED: 10 Real Clinical Cases
-- ============================================================================

-- Clear existing cases (optional - REMOVE in production)
-- DELETE FROM clinical_cases;

-- Case 1: Infarto Agudo do Miocárdio
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'CARD-001',
    'Dor Torácica Súbita em Paciente Hipertenso',
    'Cardiologia',
    'Cardiologia',
    'médio',
    'Dor torácica intensa há 2 horas',
    'Paciente masculino, 58 anos, hipertenso há 15 anos, diabético tipo 2, tabagista (30 maços-ano). Refere dor torácica de forte intensidade, em aperto, com irradiação para membro superior esquerdo e mandíbula, iniciada há 2 horas durante repouso. Associada a sudorese fria, náuseas e sensação de morte iminente. Nega dispneia ou palpitações. Medicações em uso: Losartana 50mg/dia, Metformina 850mg 2x/dia.',
    'PA: 160x100 mmHg, FC: 98 bpm, FR: 22 irpm, SpO2: 94% em ar ambiente. Paciente ansioso, sudoreico, pálido. Ausculta cardíaca: bulhas normofonéticas, sem sopros. Ausculta pulmonar: murmúrio vesicular presente bilateralmente, sem ruídos adventícios. Extremidades frias, perfusão periférica lentificada.',
    '{"troponina": "0.8 ng/mL (VR: <0.04)", "CK-MB": "28 U/L (VR: <25)", "hemograma": "normal", "glicemia": "186 mg/dL", "creatinina": "1.2 mg/dL", "ECG": "Supradesnivelamento de ST em V1-V4, D2, D3 e aVF"}',
    'Infarto Agudo do Miocárdio com Supradesnivelamento de ST (IAMCSST) - Parede Anterior',
    'O quadro clínico é típico de síndrome coronariana aguda: dor torácica em aperto com irradiação típica, associada a sintomas adrenérgicos (sudorese, palidez). Os fatores de risco cardiovascular (HAS, DM, tabagismo) aumentam a probabilidade pré-teste. O ECG com supradesnivelamento de ST e marcadores cardíacos elevados confirmam o diagnóstico de IAMCSST. Conduta: ativação da sala de hemodinâmica para angioplastia primária em até 90 minutos.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 2: Pneumonia Adquirida na Comunidade
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'PNEU-001',
    'Tosse Produtiva e Febre em Idoso',
    'Pneumologia',
    'Pneumologia',
    'fácil',
    'Tosse com expectoração amarelada e febre há 3 dias',
    'Paciente masculino, 72 anos, hipertenso, ex-tabagista (parou há 5 anos, 40 maços-ano). Há 3 dias iniciou quadro de tosse produtiva com expectoração amarelo-esverdeada, febre (38.5°C), calafrios, astenia e hiporexia. Refere dispneia aos moderados esforços que piorou no último dia. Nega viagens recentes ou contato com pessoas doentes.',
    'PA: 110x70 mmHg, FC: 102 bpm, FR: 28 irpm, Tax: 38.8°C, SpO2: 91% em ar ambiente. Paciente prostrado, taquipneico. Ausculta pulmonar: murmúrio vesicular diminuído em base direita, estertores crepitantes em terço médio e base direita, submacicez à percussão em base direita. Ausculta cardíaca sem alterações.',
    '{"hemograma": "Leucócitos: 15.800/mm3 com desvio à esquerda", "PCR": "148 mg/L", "ureia": "52 mg/dL", "creatinina": "1.3 mg/dL", "RX_torax": "Consolidação em lobo inferior direito com broncograma aéreo"}',
    'Pneumonia Adquirida na Comunidade (PAC) - Lobo Inferior Direito',
    'Apresentação clássica de PAC: tosse produtiva, febre, dispneia em paciente idoso com fatores de risco (idade, ex-tabagismo). Exame físico com sinais de consolidação pulmonar (estertores, submacicez). Leucocitose com desvio e PCR elevado indicam processo infeccioso bacteriano. RX confirmando consolidação lobar. CURB-65: 2 pontos (idade >65, ureia >42, FR >30) - indicação de internação hospitalar.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 3: Apendicite Aguda
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'CIR-001',
    'Dor Abdominal Migratória em Jovem',
    'Cirurgia Geral',
    'Cirurgia',
    'médio',
    'Dor abdominal intensa em fossa ilíaca direita há 18 horas',
    'Paciente feminina, 24 anos, sem comorbidades. Há 18 horas iniciou dor abdominal difusa, tipo cólica, de intensidade moderada, inicialmente periumbilical. Após 6-8 horas, a dor migrou para fossa ilíaca direita, intensificou-se e tornou-se contínua. Associada a náuseas, 2 episódios de vômitos e hiporexia. Refere febre não aferida. Última menstruação há 2 semanas, ciclos regulares. Nega corrimento ou sangramento vaginal.',
    'PA: 120x80 mmHg, FC: 96 bpm, FR: 18 irpm, Tax: 38.2°C. Abdome: RHA diminuídos, dor à palpação profunda em FID com defesa voluntária, Blumberg positivo, sinal de Rovsing positivo, psoas positivo. Toque retal: dor à palpação da parede anterior direita.',
    '{"hemograma": "Leucócitos: 14.200/mm3 com neutrofilia", "PCR": "68 mg/L", "beta_hCG": "negativo", "EAS": "normal", "USG_abdome": "Apêndice cecal com 9mm de diâmetro, não compressível, com líquido periapendicular"}',
    'Apendicite Aguda Não Complicada',
    'Quadro típico de apendicite: dor inicialmente periumbilical que migra para FID (sequência cronológica de Murphy), associada a sinais de irritação peritoneal (Blumberg, defesa). A febre e leucocitose confirmam processo inflamatório/infeccioso. USG mostra apêndice aumentado (>6mm é patológico) e sinais inflamatórios. Score de Alvarado: 9 pontos - alta probabilidade de apendicite. Conduta: apendicectomia (laparoscópica preferencialmente).',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 4: Diabetes Mellitus Descompensado (CAD)
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'ENDO-001',
    'Poliúria, Polidipsia e Confusão Mental',
    'Endocrinologia',
    'Endocrinologia',
    'médio',
    'Sede excessiva, urinar muito e confusão há 2 dias',
    'Paciente masculino, 32 anos, diabético tipo 1 há 8 anos, em uso irregular de insulina. Há 5 dias com quadro gripal (tosse, coriza, febre). Há 2 dias iniciou poliúria intensa, polidipsia, náuseas e vômitos. Família refere que nas últimas 12 horas está sonolento e confuso. Última aplicação de insulina há 3 dias. Nega dor abdominal intensa.',
    'PA: 90x60 mmHg, FC: 118 bpm, FR: 28 irpm (respiração de Kussmaul), Tax: 37.8°C, Glicemia capilar: HIGH (>500). Desidratação +++/4+, mucosas secas, turgor cutâneo diminuído. Hálito cetônico. Glasgow 13 (AO4, RV4, RM5). Abdome: discretamente doloroso à palpação profunda.',
    '{"glicemia": "486 mg/dL", "gasometria": "pH 7.18, pCO2 22, HCO3 10, BE -16", "cetonemia": "5.2 mmol/L", "sodio": "132 mEq/L", "potassio": "5.8 mEq/L", "ànion_gap": "24", "osmolaridade": "298 mOsm/kg"}',
    'Cetoacidose Diabética (CAD) Moderada/Grave',
    'CAD é uma emergência metabólica caracterizada pela tríade: hiperglicemia (>250), acidose metabólica (pH <7.3, HCO3 <18) e cetonemia. O gatilho foi a infecção (gripal) associada à omissão de insulina. A respiração de Kussmaul é resposta compensatória à acidose. Hipercalemia por shift transcelular (acidose). Conduta: expansão volêmica IV, insulina regular IV em bomba, reposição de potássio quando K+ <5.3, correção da causa precipitante.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 5: AVC Isquêmico
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'NEURO-001',
    'Hemiparesia Súbita e Alteração da Fala',
    'Neurologia',
    'Neurologia',
    'difícil',
    'Fraqueza em lado direito do corpo e dificuldade para falar há 1 hora',
    'Paciente masculino, 68 anos, hipertenso mal controlado, fibrilação atrial crônica (não anticoagulado por decisão prévia do paciente), diabético. Há 1 hora, durante o café da manhã, apresentou subitamente fraqueza no braço e perna direitos, com queda da xícara que segurava, e dificuldade para falar (palavras "enroladas"). Familiares chamaram SAMU. Hora do início: 7:30h. Hora atual: 8:30h.',
    'PA: 180x110 mmHg, FC: 88 bpm irregular, FR: 18 irpm, Glicemia: 142 mg/dL. Consciente, orientado mas afásico (afasia de expressão, compreensão preservada). Desvio de rima labial à esquerda (paralisia facial central D). Hemiparesia direita: MS grau 2, MI grau 3. Babinski à direita. NIHSS: 14 pontos.',
    '{"TC_cranio": "Sem hemorragia, sem hipodensidade definida, sinal da artéria cerebral média hiperdensa à esquerda", "ECG": "Fibrilação atrial", "hemograma": "normal", "coagulograma": "INR 1.0, TTPa normal", "glicemia": "142 mg/dL"}',
    'AVC Isquêmico Agudo - Território da ACM Esquerda',
    'Quadro clássico de AVC isquêmico: déficit neurológico focal súbito (hemiparesia + afasia) em paciente com fatores de risco (HAS, DM, FA). A FA não anticoagulada é fonte embólica de alto risco. TC sem hemorragia habilita trombólise. Tempo desde início: 1 hora - dentro da janela para tPA IV (até 4.5h). NIHSS 14 = AVC moderado-grave. Conduta: trombolítico IV (alteplase 0.9mg/kg) + encaminhar para trombectomia mecânica (NIHSS >6, oclusão de grande vaso).',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 6: Crise Hipertensiva
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'CARD-002',
    'Cefaleia Intensa e Pressão Muito Alta',
    'Cardiologia',
    'Cardiologia',
    'fácil',
    'Cefaleia intensa e tontura há 3 horas',
    'Paciente feminina, 52 anos, hipertensa há 10 anos, em uso irregular de medicação (Enalapril 10mg 2x/dia - última tomada há 4 dias). Há 3 horas iniciou cefaleia occipital intensa, pulsátil, associada a tontura, náuseas e visão turva. Nega dor torácica, dispneia ou déficit motor. Refere ter discutido com familiar antes do início dos sintomas.',
    'PA: 220x130 mmHg (confirmada em ambos os braços), FC: 92 bpm, FR: 20 irpm. Consciente, orientada, ansiosa. Fundoscopia: exsudatos algodonosos, hemorragias em chama de vela, papiledema bilateral. Ausculta cardíaca: B4 presente, sem sopros. Ausculta pulmonar: limpa. Força muscular preservada, reflexos simétricos.',
    '{"creatinina": "1.8 mg/dL (prévia 1.0)", "ureia": "68 mg/dL", "EAS": "proteinúria +++, hematúria microscópica", "ECG": "Sobrecarga ventricular esquerda", "TC_cranio": "Sem alterações"}',
    'Emergência Hipertensiva - Encefalopatia Hipertensiva',
    'Diferenciamos urgência de emergência hipertensiva pela presença de lesão de órgão-alvo (LOA). Neste caso: retinopatia hipertensiva grau III-IV (exsudatos, hemorragias, papiledema) + nefropatia aguda (elevação de creatinina, proteinúria). Os sintomas neurológicos (cefaleia, tontura, visão turva) com fundoscopia alterada caracterizam encefalopatia hipertensiva. Conduta: internação em UTI, anti-hipertensivo IV (nitroprussiato ou labetalol), redução de 25% da PAM na primeira hora.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 7: Asma Aguda Grave
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'PNEU-002',
    'Falta de Ar Intensa e Chiado no Peito',
    'Pneumologia',
    'Pneumologia',
    'médio',
    'Dispneia intensa e chiado no peito há 6 horas',
    'Paciente feminina, 28 anos, asmática desde a infância, em uso de Budesonida/Formoterol 200/6mcg 2x/dia. Há 6 horas, após exposição a poeira durante limpeza de quarto, iniciou dispneia progressiva, chiado no peito e tosse seca. Usou salbutamol spray 8 jatos nas últimas 3 horas sem melhora significativa. Refere ter tido 3 crises no último mês, com 1 ida ao pronto-socorro há 2 semanas.',
    'PA: 130x80 mmHg, FC: 120 bpm, FR: 32 irpm, SpO2: 88% em ar ambiente. Paciente ansiosa, dispneica, usando musculatura acessória, tiragem intercostal, fala em palavras entrecortadas. Ausculta pulmonar: sibilos difusos inspiratórios e expiratórios, murmúrio vesicular diminuído difusamente. Pico de fluxo: 35% do predito.',
    '{"gasometria_arterial": "pH 7.38, pO2 58, pCO2 42, HCO3 24, SatO2 88%", "hemograma": "normal", "RX_torax": "Hiperinsuflação pulmonar, sem consolidações"}',
    'Crise Asmática Grave (Quase Fatal)',
    'Classificamos como grave pelos critérios: fala em palavras, uso de musculatura acessória, SpO2 <90%, PFE <50%, refratária ao broncodilatador de resgate. A pCO2 normal (deveria estar baixa pela hiperventilação) indica fadiga respiratória iminente - sinal de alerta para exaustão! Conduta: O2 suplementar, beta2-agonista + ipratrópio nebulização contínua, corticoide IV (metilprednisolona 60-125mg), sulfato de magnésio IV, monitorização contínua, preparar para IOT se deterioração.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 8: Abdome Agudo Obstrutivo
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'CIR-002',
    'Vômitos e Distensão Abdominal',
    'Cirurgia Geral',
    'Cirurgia',
    'difícil',
    'Dor abdominal em cólica, vômitos e parada de eliminação de gases há 2 dias',
    'Paciente masculino, 65 anos, com história de colecistectomia aberta há 20 anos e hernioplastia incisional há 5 anos. Há 2 dias iniciou dor abdominal em cólica, difusa, de intensidade progressiva. Associada a vômitos inicialmente alimentares, depois biliosos, e nas últimas 12 horas fecaloides. Refere parada de eliminação de gases e fezes há 48 horas. Última evacuação há 3 dias (fezes normais).',
    'PA: 100x60 mmHg, FC: 108 bpm, FR: 22 irpm, Tax: 37.6°C. Desidratação ++/4+. Abdome: distendido, timpânico, RHA metálicos de luta, dor difusa sem sinais de irritação peritoneal. Cicatriz de laparotomia mediana com abaulamento em região infraumbilical, irredutível, doloroso à palpação.',
    '{"hemograma": "Leucócitos 12.400, Ht 48%", "sódio": "132 mEq/L", "potássio": "3.2 mEq/L", "creatinina": "1.9 mg/dL", "amilase": "normal", "lactato": "2.8 mmol/L", "RX_abdome": "Distensão de alças de delgado, níveis hidroaéreos escalonados, ausência de gás no cólon"}',
    'Obstrução Intestinal por Brida/Hérnia Incisional Encarcerada',
    'Quadro clássico de obstrução de intestino delgado: tríade de dor em cólica + vômitos + parada de eliminação de gases/fezes. Antecedente de cirurgias abdominais aumenta risco de bridas. A hérnia incisional encarcerada visível pode ser o ponto de obstrução. RX com alças distendidas e níveis hidroaéreos confirma obstrução. Lactato levemente elevado indica sofrimento de alça - urgência! Conduta: ressuscitação volêmica, SNG, correção eletrolítica, antibiótico profilático, laparotomia exploradora de urgência.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 9: Hipotireoidismo
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'ENDO-002',
    'Cansaço, Ganho de Peso e Intolerância ao Frio',
    'Endocrinologia',
    'Endocrinologia',
    'fácil',
    'Cansaço progressivo, ganho de peso e pele seca há 6 meses',
    'Paciente feminina, 45 anos, sem comorbidades conhecidas. Há 6 meses refere fadiga progressiva, sonolência excessiva, ganho de peso (8kg) apesar de dieta habitual, constipação intestinal crônica, pele seca e queda de cabelo. Notou também intolerância ao frio e edema facial matinal. Nega uso de medicações. Menstruação irregular (ciclos longos, fluxo diminuído). Mãe com "problema de tireoide".',
    'PA: 100x70 mmHg, FC: 54 bpm, FR: 14 irpm, Peso: 78kg, IMC: 30. Fácies mixedematosa com edema periorbital. Pele seca, descamativa, fria. Tireoide palpável, aumentada difusamente, consistência firme, indolor. Bradicardia sinusal. Reflexos tendinosos com relaxamento lentificado. Edema de membros inferiores mole, não depressível.',
    '{"TSH": "85 mUI/L (VR: 0.4-4.0)", "T4_livre": "0.3 ng/dL (VR: 0.8-1.8)", "Anti_TPO": "580 UI/mL (VR: <35)", "colesterol_total": "285 mg/dL", "hemograma": "Anemia leve (Hb 11.2)", "ECG": "Bradicardia sinusal, baixa voltagem"}',
    'Hipotireoidismo Primário por Tireoidite de Hashimoto',
    'Quadro clássico de hipotireoidismo: fadiga, ganho de peso, intolerância ao frio, constipação, bradicardia, pele seca, mixedema. TSH muito elevado com T4L baixo confirma hipotireoidismo primário (defeito na tireoide). Anti-TPO elevado indica etiologia autoimune (Hashimoto). Bócio difuso é típico dessa condição. Dislipidemia e anemia são consequências metabólicas. Conduta: Levotiroxina 1.6mcg/kg/dia (iniciar com dose menor em idosos/cardiopatas), repetir TSH em 6-8 semanas para ajuste.',
    '00000000-0000-0000-0000-000000000001'
);

-- Case 10: Meningite Bacteriana
INSERT INTO clinical_cases (
    code, title, discipline, specialty, difficulty,
    chief_complaint, clinical_history, clinical_exam,
    lab_results, correct_diagnosis, explanation, institution_id
) VALUES (
    'INF-001',
    'Febre Alta, Cefaleia Intensa e Rigidez de Nuca',
    'Infectologia',
    'Infectologia',
    'difícil',
    'Febre alta, cefaleia intensa e confusão há 24 horas',
    'Paciente masculino, 22 anos, universitário, hígido. Há 24 horas iniciou febre alta (39.5°C), cefaleia holocraniana de forte intensidade, fotofobia e vômitos. Nas últimas 6 horas familiares notaram confusão mental (não reconhece familiares, fala desconectada). Colegas de república referem surto de "gripe forte" no alojamento há 1 semana. Vacinação incompleta.',
    'PA: 90x50 mmHg, FC: 122 bpm, FR: 26 irpm, Tax: 39.8°C, Glasgow: 12 (AO3, RV4, RM5). Prostrado, confuso, fotofobia intensa. Rigidez de nuca presente. Brudzinski e Kernig positivos. Petéquias em membros inferiores e tronco. Ausculta cardíaca e pulmonar: sem alterações.',
    '{"LCR": "Aspecto turvo, pressão aumentada, céls 2.800/mm³ (95% PMN), proteínas 320 mg/dL, glicose 22 mg/dL (glicemia: 95), Gram com diplococos Gram-negativos", "hemograma": "Leucócitos 22.000 com desvio à esquerda", "PCR": "245 mg/L", "procalcitonina": "18 ng/mL", "lactato": "4.2 mmol/L", "hemocultura": "em andamento"}',
    'Meningite Meningocócica (Neisseria meningitidis)',
    'Tríade clássica de meningite: febre + cefaleia + rigidez de nuca, associada a sinais meníngeos (Brudzinski, Kernig) e alteração do nível de consciência. As petéquias sugerem meningococcemia. LCR típico de meningite bacteriana: pleocitose neutrofílica, proteína elevada, glicose baixa (<40% da glicemia). Diplococos Gram-negativos = Neisseria meningitidis. Contexto epidemiológico (surto em alojamento) reforça. Conduta: Ceftriaxona 2g IV 12/12h + Dexametasona 0.15mg/kg 6/6h (antes do ATB), notificação compulsória, quimioprofilaxia dos contactantes.',
    '00000000-0000-0000-0000-000000000001'
);

-- Add questions for each case (simplified example for Case 1)
UPDATE clinical_cases 
SET questions = '[
    {
        "id": 1,
        "question": "Qual é o diagnóstico mais provável neste caso?",
        "options": [
            "Angina estável",
            "Pericardite aguda",
            "Infarto Agudo do Miocárdio",
            "Dissecção de aorta"
        ],
        "correct": 2
    },
    {
        "id": 2,
        "question": "Qual é a conduta inicial mais adequada?",
        "options": [
            "Solicitar teste ergométrico",
            "Ativar sala de hemodinâmica para angioplastia primária",
            "Iniciar anticoagulação plena e aguardar",
            "Realizar ecocardiograma de emergência"
        ],
        "correct": 1
    }
]'
WHERE code = 'CARD-001';

COMMIT;
