-- Migration 003: Seed full 10 cases data
-- Populates all remaining cases with dummy multimedia data and questions

-- Helper function to ensure we don't duplicate questions if run multiple times
-- (Assuming questions column is JSONB, we just overwrite it for simplicity in this dev phase)

-- Case 2: Insuficiência Cardíaca Descompensada
UPDATE clinical_cases 
SET 
  difficulty = 'médio',
  specialty = 'Cardiologia',
  audio_url = '/audio/heart_failure.mp3',
  images = ARRAY['rx_pneu001.png', 'ecg_card001.png'],
  questions = '[
    {
      "id": 1, 
      "question": "Qual é a classificação da IC deste paciente com base na FEVE reduzida?", 
      "options": ["ICFEr", "ICFEp", "ICFEm", "IC Recuperada"], 
      "correct": 0
    },
    {
      "id": 2, 
      "question": "Qual medicamento modificador de mortalidade deve ser priorizado?", 
      "options": ["Furosemida", "Digoxina", "IECA/BRA", "Dobutamina"], 
      "correct": 2
    },
    {
      "id": 3, 
      "question": "Qual achado ao exame físico indica congestão sistêmica?", 
      "options": ["Estertores crepitantes", "Turgência jugular patológica", "B3", "Sopro sistólico"], 
      "correct": 1
    }
  ]'::jsonb
WHERE title LIKE '%Insuficiência Cardíaca%';

-- Case 3: Cetoacidose Diabética
UPDATE clinical_cases 
SET 
  difficulty = 'difícil',
  specialty = 'Endocrinologia',
  audio_url = NULL,
  images = ARRAY['glicemia_monitor.png'],
  questions = '[
    {
      "id": 1, 
      "question": "Qual o primeiro passo no manejo da CAD?", 
      "options": ["Insulina Regular IV", "Hidratação com SF 0,9%", "Bicarbonato de Sódio", "Potássio IV"], 
      "correct": 1
    },
    {
      "id": 2, 
      "question": "Quando iniciar a reposição de potássio?", 
      "options": ["Sempre junto com a insulina", "Se K < 5.0", "Se K < 3.3", "Apenas se arritmia"], 
      "correct": 2
    }
  ]'::jsonb
WHERE title LIKE '%Poliúria e Confusão%';

-- Case 4: Sepse
UPDATE clinical_cases 
SET 
  difficulty = 'difícil',
  specialty = 'Medicina Intensiva',
  images = ARRAY['rx_pneu001.png'],
  questions = '[
    {
      "id": 1, 
      "question": "Qual o pacote da primeira hora na Sepse?", 
      "options": ["Antibiótico + Lactato + Hemocullturas + Cristalóide", "Corticoide + Vasopressor", "Intubação imediata", "Diálise"], 
      "correct": 0
    }
  ]'::jsonb
WHERE title LIKE '%Sepse%';

-- Case 5: AVE Isquêmico
UPDATE clinical_cases 
SET 
  difficulty = 'médio',
  specialty = 'Neurologia',
  images = ARRAY['tc_cranio001.png'],
  questions = '[
    {
      "id": 1, 
      "question": "Qual a janela terapêutica padrão para trombólise IV?", 
      "options": ["3 horas", "4.5 horas", "6 horas", "24 horas"], 
      "correct": 1
    }
  ]'::jsonb
WHERE title LIKE '%Fraqueza Súbita%';

-- Case 6: Pneumonia Comunitária
UPDATE clinical_cases 
SET 
  difficulty = 'fácil',
  specialty = 'Pneumologia',
  audio_url = '/audio/lung_crackles.mp3',
  images = ARRAY['rx_pneu001.png'],
  questions = '[
    {
      "id": 1, 
      "question": "Qual o escore utilizado para decisão de internação?", 
      "options": ["CURB-65", "SOFA", "TIMI", "Wells"], 
      "correct": 0
    }
  ]'::jsonb
WHERE title LIKE '%Tosse Produtiva%';

-- Case 7: Abdome Agudo Inflamatório
UPDATE clinical_cases 
SET 
  difficulty = 'fácil',
  specialty = 'Cirurgia Geral',
  images = ARRAY['usg_appendix.png'],
  questions = '[
    {
      "id": 1, 
      "question": "Qual sinal propedêutico sugere apendicite aguda?", 
      "options": ["Sinal de Murphy", "Sinal de Blumberg", "Sinal de Giordano", "Sinal de Kernig"], 
      "correct": 1
    }
  ]'::jsonb
WHERE title LIKE '%Dor Abdominal%';

-- Case 8: Crise Hipertensiva
UPDATE clinical_cases 
SET 
difficulty = 'fácil',
specialty = 'Cardiologia',
images = ARRAY['ecg_card001.png'],
questions = '[
  {
    "id": 1, 
    "question": "Diferencie Urgência de Emergência Hipertensiva.", 
    "options": ["Níveis de PA", "Lesão de Órgão Alvo", "Sintomas de cefaleia", "Idade do paciente"], 
    "correct": 1
  }
]'::jsonb
WHERE title LIKE '%Cefaleia Intensa%';

-- Case 9: Dengue
UPDATE clinical_cases 
SET 
difficulty = 'fácil',
specialty = 'Infectologia',
images = NULL,
questions = '[
  {
    "id": 1, 
    "question": "Qual o sinal de alarme na Dengue?", 
    "options": ["Febre alta", "Dor retro-orbital", "Dor abdominal intensa e contínua", "Exantema"], 
    "correct": 2
  }
]'::jsonb
WHERE title LIKE '%Febre e Mialgia%';

-- Case 10: TEP
UPDATE clinical_cases 
SET 
difficulty = 'médio',
specialty = 'Pneumologia',
images = ARRAY['angiotc_rx.png'],
questions = '[
  {
    "id": 1, 
    "question": "Qual o exame padrão-ouro para diagnóstico de TEP?", 
    "options": ["D-Dímero", "Angio-TC de Tórax", "Cintilografia", "Ecocardiograma"], 
    "correct": 1
  }
]'::jsonb
WHERE title LIKE '%Dispneia Súbita%';
