import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

// get the current user's username
export const GET = (async ({ locals: { supabase, getSession } }) => {

    const session = await getSession();

    if (!session) {
        throw redirect(303, '/login');
    }

    // grab post by short id
    const { data, error: _error } = await supabase.from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single();

    if (_error) {

        // not found using single()
        if (_error.code === 'PGRST116') {
            throw error(404, 'Not Found');
        }
        throw error(500, _error.message);
    }

    if (!data) {
        throw error(500, 'Database Error!');
    }

    if (!data.username) {
        throw error(404, 'Not Found');
    }

    return json(data);

}) satisfies RequestHandler;


// update the current user's username
export const PUT = (async ({ locals: { supabase, getSession }, request }) => {

    const session = await getSession();

    if (!session) {
        throw redirect(303, '/login');
    }

    const { username } = Object.fromEntries(await request.formData());

    if (!username || typeof username !== 'string') {
        throw error(405, 'Method not allowed!');
    }

    const { error: _error, data } = await supabase.from('profiles')
        .update({ username })
        .eq('id', session.user.id)
        .select('username')
        .single<AuthorType>();

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

    if (dev) {
        console.log('Create a profile username', data);
    }

    return json(data);

}) satisfies RequestHandler;