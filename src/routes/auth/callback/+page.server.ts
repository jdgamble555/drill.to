import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals: { supabase } }) => {

    const _error = url.searchParams.get('error_description');
    if (_error) {
        const description = _error || 'Authentication Provider Error';
        throw error(400, description);
    }

    const code = url.searchParams.get('code');
    const returnPath = url.searchParams.get('returnPath') || '/dashboard';

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    throw redirect(303, returnPath);

}) satisfies PageServerLoad;