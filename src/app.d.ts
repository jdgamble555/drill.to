// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database as DB } from './lib/database.types';

declare global {
	type Optional<T> = T | null | undefined;
	type CourseType = DB['public']['Tables']['courses']['Row'];
	type UserType = Session['user'];
	type Database = DB;
	type AuthorType = DB['public']['Tables']['profiles']['Row'];
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Error {}
		// interface Platform {}
	}

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:clickOutside'?: CompositionEventHandler<T>;
		}
	}
}