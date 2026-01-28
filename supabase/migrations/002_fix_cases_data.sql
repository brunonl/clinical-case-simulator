-- ============================================================================
-- MIGRATION 002: Fix Institutions and Re-Seed Clinical Cases (V3 - Fix Schema)
-- ============================================================================

-- 0. Prep: Clean duplicates and Add Constraints
DELETE FROM clinical_cases 
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (partition BY code ORDER BY id) AS rnum
        FROM clinical_cases
    ) t
    WHERE t.rnum > 1
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'clinical_cases_code_key') THEN
        ALTER TABLE clinical_cases ADD CONSTRAINT clinical_cases_code_key UNIQUE (code);
    END IF;
END $$;


-- 1. Schema Extensions (Create missing columns)
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS difficulty TEXT;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS specialty TEXT;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS lab_results JSONB;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS correct_diagnosis TEXT;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS explanation TEXT;
ALTER TABLE clinical_cases ADD COLUMN IF NOT EXISTS questions JSONB DEFAULT '[]'::jsonb;


-- 2. Unify Institutions
UPDATE clinical_cases 
SET institution_id = '00000000-0000-0000-0000-000000000001'
WHERE institution_id != '00000000-0000-0000-0000-000000000001';

DELETE FROM institutions 
WHERE id != '00000000-0000-0000-0000-000000000001';

INSERT INTO institutions (id, name, code) 
VALUES ('00000000-0000-0000-0000-000000000001', 'UFMG - Faculdade de Medicina', 'UFMG')
ON CONFLICT (id) DO UPDATE 
SET name = 'UFMG - Faculdade de Medicina', code = 'UFMG';


-- 3. Seed/Update Cases

-- Case 1 (Cardio)
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, audio_url, images, questions)
VALUES (
    'CARD-001', 'Dor Torácica Súbita em Paciente Hipertenso', 'Cardiologia', 'Cardiologia', 'médio',
    'Dor torácica intensa há 2 horas',
    'Paciente masculino, 58 anos, hipertenso, diabético, tabagista. Dor em aperto irradiada para MSE e mandíbula.',
    'PA: 160x100, FC: 98. Sudoreico, pálido.',
    '{"troponina": "0.8", "ECG": "Suprasdesnivelamento ST"}',
    'IAM com Supradesnivelamento de ST (IAMCSST)',
    'Quadro clássico de IAMCSST com fatores de risco e ECG típico.',
    '00000000-0000-0000-0000-000000000001',
    'https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg',
    '["ecg_card001.png"]',
    '[
        {"id": 1, "question": "Qual é a principal hipótese diagnóstica?", "options": ["Angina estável", "Pericardite", "IAMCSST", "Dissecção Aórtica"], "correct": 2},
        {"id": 2, "question": "Qual a conduta imediata?", "options": ["Nitroglicerina SL e alta", "Angioplastia Primária (<90min)", "Heparina venosa apenas", "Teste ergométrico"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title, questions = EXCLUDED.questions, institution_id = EXCLUDED.institution_id, audio_url = EXCLUDED.audio_url, images = EXCLUDED.images,
    lab_results = EXCLUDED.lab_results, correct_diagnosis = EXCLUDED.correct_diagnosis, explanation = EXCLUDED.explanation, difficulty = EXCLUDED.difficulty, specialty = EXCLUDED.specialty;

-- Case 2 (Pneumo)
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, audio_url, images, questions)
VALUES (
    'PNEU-001', 'Tosse Produtiva e Febre em Idoso', 'Pneumologia', 'Pneumologia', 'fácil',
    'Tosse e febre há 3 dias',
    'Paciente masculino, 72 anos, tosse produtiva amarelada, febre e dispneia.',
    'Crepitações em base direita. Tax 38.8C.',
    '{"RX": "Consolidação lobar", "Leucocitose": "15.800"}',
    'Pneumonia Adquirida na Comunidade (PAC)',
    'Clínica de PAC típica em idoso com consolidação radiológica.',
    '00000000-0000-0000-0000-000000000001',
    'https://actions.google.com/sounds/v1/human_voices/coughing.ogg',
    '["rx_pneu001.png"]',
    '[
        {"id": 1, "question": "Qual o diagnóstico provável?", "options": ["Bronquite aguda", "PAC", "Tuberculose", "Embolia Pulmonar"], "correct": 1},
        {"id": 2, "question": "Qual escore define a internação?", "options": ["GOLD", "CURB-65", "SOFA", "TIMI"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, audio_url = EXCLUDED.audio_url, images = EXCLUDED.images;

-- Case 3
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'CIR-001', 'Dor Abdominal Migratória', 'Cirurgia Geral', 'Cirurgia', 'médio',
    'Dor em FID há 18 horas',
    'Feminina, 24 anos. Dor peri-umbilical que migrou para Fossa Ilíaca Direita.',
    'Blumberg positivo (descompressão brusca dolorosa).',
    '{"Leucocitose": "14000", "USG": "Apêndice 9mm"}',
    'Apendicite Aguda',
    'História clássica de migração da dor e Blumberg positivo.',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Qual sinal semiológico indica irritação peritoneal na FID?", "options": ["Murphy", "Blumberg", "Giordano", "Piparote"], "correct": 1},
        {"id": 2, "question": "Qual o tratamento definitivo?", "options": ["Antibioticoterapia exclusiva", "Apendicectomia", "Drenagem percutânea", "Observação"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 4
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'ENDO-001', 'Poliúria e Confusão Mental', 'Endocrinologia', 'Endocrinologia', 'médio',
    'Alteração do nível de consciência',
    'Diabético tipo 1, suspendeu insulina, apresenta hálito cetônico.',
    'Respiração de Kussmaul, desidratado.',
    '{"Glicemia": "486", "pH": "7.18", "Cetonúria": "Positiva"}',
    'Cetoacidose Diabética (CAD)',
    'Tríade: Hiperglicemia, Acidose Metabólica, Cetonemia.',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Qual a complicação aguda apresentada?", "options": ["Estado Hiperosmolar", "Hipoglicemia", "Cetoacidose Diabética", "Acidose Lática"], "correct": 2},
        {"id": 2, "question": "Qual a prioridade terapêutica inicial?", "options": ["Insulina NPH", "Hidratação Venosa Vigorosa", "Bicarbonato de Sódio", "Antibiótico"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 5
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'NEURO-001', 'Hemiparesia Súbita', 'Neurologia', 'Neurologia', 'difícil',
    'Fraqueza à direita e afasia',
    '68 anos, portador de FA não anticoagulada. Déficit súbito há 1h.',
    'Hemiparesia D, Afasia de expressão.',
    '{"TC": "Sem hemorragia"}',
    'AVC Isquêmico (Cardioembólico)',
    'Déficit focal súbito em paciente com FA + TC normal (fase aguda).',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Com 1 hora de evolução e TC normal, qual a conduta?", "options": ["AAS 300mg", "Trombólise venosa (rTPA)", "Heparina plena", "Controle pressórico apenas"], "correct": 1},
        {"id": 2, "question": "Qual a provável etiologia?", "options": ["Ateroembólica", "Cardioembólica (FA)", "Lacunar", "Dissecção"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 6
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'CARD-002', 'Crise Hipertensiva', 'Cardiologia', 'Cardiologia', 'fácil',
    'Cefaleia e PA elevada',
    '52 anos, má adesão medicamentosa. Cefaleia e visão turva.',
    'PA 220x130. Papiledema (Retinopatia grau IV).',
    '{"Creatinina": "1.8", "EAS": "Proteinúria"}',
    'Emergência Hipertensiva',
    'PA elevada com lesão de órgão alvo aguda (Retina/Rim).',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Classifique o quadro da pressão arterial.", "options": ["Hipertensão Estágio 2", "Urgência Hipertensiva", "Emergência Hipertensiva", "Pseudocrise"], "correct": 2},
         {"id": 2, "question": "Qual medicação EV é indicada?", "options": ["Captopril", "Nitroprussiato de Sódio", "Hidralazina IM", "Furosemida"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 7
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'PNEU-002', 'Crise Asmática', 'Pneumologia', 'Pneumologia', 'médio',
    'Falta de ar e chiado',
    '28 anos, asmática prévia. Crise após exposição a poeira.',
    'Sibilos difusos, SatO2 88%. Fala entrecortada.',
    '{"Gasometria": "pH 7.38, pCO2 normal (falsa normalidade)"}',
    'Asma Grave',
    'Sinais de gravidade: hipoxemia, fala entrecortada e pCO2 normalizando (fadiga).',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Qual achado indica gravidade extrema?", "options": ["Sibilos", "Taquicardia", "Silêncio Auscultatório/Fadiga", "Tosse"], "correct": 2},
        {"id": 2, "question": "Além de O2 e broncodilatador, o que prescrever?", "options": ["Corticoide sistêmico precoce", "Antibiótico", "Mucolítico", "Sedação"], "correct": 0}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 8
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'CIR-002', 'Obstrução Intestinal', 'Cirurgia Geral', 'Cirurgia', 'difícil',
    'Vômitos e distensão',
    'Cirurgia prévia. Parada de gases e fezes. Vômitos fecaloides.',
    'Distensão, RHA metálicos, cicatriz cirúrgica.',
    '{"RX": "Níveis hidroaéreos"}',
    'Obstrução Intestinal por Bridas',
    'Quadro obstrutivo em paciente com abdome cirúrgico prévio.',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Qual a principal causa de obstrução em delgado?", "options": ["Câncer", "Aderências (Bridas)", "Hérnias", "Bolo de áscaris"], "correct": 1},
        {"id": 2, "question": "Qual a conduta inicial?", "options": ["Laparotomia imediata", "Sonda Nasogástrica e Hidratação", "Colonoscopia", "Laxante"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 9
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'ENDO-002', 'Hipotireoidismo Franco', 'Endocrinologia', 'Endocrinologia', 'fácil',
    'Cansaço e ganho de peso',
    'Mulher 45 anos. Pele seca, constipação, sonolência.',
    'Bradicardia, reflexos lentificados, bócio.',
    '{"TSH": "85 (Alto)", "T4L": "Baixo"}',
    'Hipotireoidismo (Hashimoto)',
    'TSH alto + T4 baixo define hipotireoidismo primário.',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Qual o perfil laboratorial do Hipotireoidismo Primário?", "options": ["TSH baixo, T4 alto", "TSH alto, T4 baixo", "Ambos altos", "Ambos baixos"], "correct": 1},
        {"id": 2, "question": "Qual o tratamento?", "options": ["Metimazol", "Levotiroxina Sódica", "Iodo radioativo", "Corticoide"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;

-- Case 10
INSERT INTO clinical_cases (code, title, discipline, specialty, difficulty, chief_complaint, clinical_history, clinical_exam, lab_results, correct_diagnosis, explanation, institution_id, questions)
VALUES (
    'INF-001', 'Meningite Bacteriana', 'Infectologia', 'Infectologia', 'difícil',
    'Febre, cefaleia e rigidez de nuca',
    '22 anos. Sinais meníngeos. Petéquias (Meningococo).',
    'Rigidez de nuca, Kerning e Brudzinski positivos.',
    '{"LCR": "Turvo, polimorfonucleares, diplococos gram-negativos"}',
    'Meningite Meningocócica',
    'Tríade meníngea + petéquias + LCR purulento.',
    '00000000-0000-0000-0000-000000000001',
    '[
        {"id": 1, "question": "Qual o agente etiológico provável (diplococo gram-negativo)?", "options": ["Pneumococo", "Meningococo", "Haemophilus", "Listeria"], "correct": 1},
        {"id": 2, "question": "Qual medida deve ser tomada para os contactantes?", "options": ["Vacinação imediata apenas", "Quimioprofilaxia (Rifampicina)", "Isolamento social", "Nenhuma"], "correct": 1}
    ]'
) ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title, questions = EXCLUDED.questions, difficulty = EXCLUDED.difficulty;
