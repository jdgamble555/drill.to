
import { useSharedStore } from "$lib/use-shared-store";
import type { Session } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export interface User {
    email: string;
    id: string;
    avatar_url: string;
    full_name: string;
}

export interface Auth {
    data: User | null;
    loading: boolean;
}

const _useAuth = () => {
    const store = writable<Auth>();
    return {
        ...store,
        setSession: (session: Session | null) => {
            if (!session?.user.email) {
                store.set({ loading: false, data: null });
                return;
            }

            // set auth store with user data
            const { email, id } = session.user;
            const { avatar_url, full_name } = session.user.user_metadata;
            store.set({ loading: false, data: { email, id, avatar_url, full_name } });
        }
    }
};

export const useAuth = () => useSharedStore('auth', _useAuth);