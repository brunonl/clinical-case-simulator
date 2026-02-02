import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const AuthService = {
    async signInWithPassword(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("AuthService: Sign in error:", error);
            throw error;
        }

        return data;
    },

    async signUp(email: string, password: string, fullName: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error("AuthService: Sign up error:", error);
            throw error;
        }

        return data;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async resetPasswordForEmail(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/dashboard&type=recovery`,
        });
        if (error) throw error;
    },

    async signInWithOAuth(provider: "google" | "github") {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) throw error;
        return data;
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error("AuthService: Get user error:", error);
            throw error;
        }
        return user;
    }
};
