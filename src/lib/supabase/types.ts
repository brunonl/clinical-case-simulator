export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            clinical_cases: {
                Row: {
                    audio_url: string | null
                    chief_complaint: string | null
                    clinical_exam: string | null
                    clinical_history: string | null
                    code: string
                    correct_diagnosis: string | null
                    created_at: string | null
                    difficulty: string | null
                    discipline: string
                    explanation: string | null
                    id: string
                    images: Json | null
                    institution_id: string | null
                    lab_results: Json | null
                    questions: Json | null
                    specialty: string | null
                    title: string
                }
                Insert: {
                    audio_url?: string | null
                    chief_complaint?: string | null
                    clinical_exam?: string | null
                    clinical_history?: string | null
                    code: string
                    correct_diagnosis?: string | null
                    created_at?: string | null
                    difficulty?: string | null
                    discipline: string
                    explanation?: string | null
                    id?: string
                    images?: Json | null
                    institution_id?: string | null
                    lab_results?: Json | null
                    questions?: Json | null
                    specialty?: string | null
                    title: string
                }
                Update: {
                    audio_url?: string | null
                    chief_complaint?: string | null
                    clinical_exam?: string | null
                    clinical_history?: string | null
                    code?: string
                    correct_diagnosis?: string | null
                    created_at?: string | null
                    difficulty?: string | null
                    discipline?: string
                    explanation?: string | null
                    id?: string
                    images?: Json | null
                    institution_id?: string | null
                    lab_results?: Json | null
                    questions?: Json | null
                    specialty?: string | null
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "clinical_cases_institution_id_fkey"
                        columns: ["institution_id"]
                        isOneToOne: false
                        referencedRelation: "institutions"
                        referencedColumns: ["id"]
                    },
                ]
            }
            institutions: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    name: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                }
                Relationships: []
            }
            questions: {
                Row: {
                    choices: Json
                    clinical_case_id: string | null
                    correct_answer: number
                    created_at: string | null
                    id: string
                    order_index: number | null
                    question_text: string
                }
                Insert: {
                    choices: Json
                    clinical_case_id?: string | null
                    correct_answer: number
                    created_at?: string | null
                    id?: string
                    order_index?: number | null
                    question_text: string
                }
                Update: {
                    choices?: Json
                    clinical_case_id?: string | null
                    correct_answer?: number
                    created_at?: string | null
                    id?: string
                    order_index?: number | null
                    question_text?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "questions_clinical_case_id_fkey"
                        columns: ["clinical_case_id"]
                        isOneToOne: false
                        referencedRelation: "clinical_cases"
                        referencedColumns: ["id"]
                    },
                ]
            }
            quiz_attempts: {
                Row: {
                    answers: Json
                    case_id: string | null
                    completed_at: string | null
                    id: string
                    score: number | null
                    user_id: string | null
                }
                Insert: {
                    answers: Json
                    case_id?: string | null
                    completed_at?: string | null
                    id?: string
                    score?: number | null
                    user_id?: string | null
                }
                Update: {
                    answers?: Json
                    case_id?: string | null
                    completed_at?: string | null
                    id?: string
                    score?: number | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "quiz_attempts_clinical_case_id_fkey"
                        columns: ["clinical_case_id"]
                        isOneToOne: false
                        referencedRelation: "clinical_cases"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Typed entities
export type Institution = Tables<'institutions'>
export type ClinicalCase = Tables<'clinical_cases'>
export type Question = Tables<'questions'>
export type QuizAttempt = Tables<'quiz_attempts'>
