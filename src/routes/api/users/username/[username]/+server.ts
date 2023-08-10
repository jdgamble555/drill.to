import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// get record with a certain username
export const GET = (async ({ locals: { supabase, getSession }, params }) => {

    const session = await getSession();

    if (!session) {
        throw redirect(303, '/login');
    }

    // get username
    const { username } = params;

    // grab post by short id
    const { data, error: _error } = await supabase.from('profiles')
        .select('*')
        .eq('username', username)
        .single();

    if (_error) {

        // not found using single()
        if (_error.code === 'PGRST116') {
            throw error(404, 'Not Found');
        }
        throw error(500, _error.message);
    }

    if (!data) {
        throw error(404, 'Not Found');
    }

    return json(data);

}) satisfies RequestHandler;