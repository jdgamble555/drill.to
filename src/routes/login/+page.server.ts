import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession }, url }) => {

    const path = url.searchParams.get('path') || '/dashboard';

    const session = await getSession();
    if (session) {
        throw redirect(303, path);
    }

}) satisfies PageServerLoad;

export const actions = {

    signout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut();
        throw redirect(303, '/');
    }

} satisfies Actions;