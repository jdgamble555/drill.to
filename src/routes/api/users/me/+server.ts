import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { minLength, object, string, email as v_email, safeParse } from 'valibot';

// READ
export const GET = (async ({ locals: { supabase, getSession } }) => {

    const session = await getSession();

    if (!session) {
        throw redirect(303, '/login');
    }

    // grab post by short id
    const { data, error: _error } = await supabase.from('profiles')
        .select('*')
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

    if (dev) {
        console.log('Get current user', data);
    }

    return json(data);

}) satisfies RequestHandler;

// UPDATE
export const PUT = (async ({ locals: { supabase, getSession }, request }) => {

    const session = await getSession();

    if (!session) {
        throw redirect(301, '/login');
    }

    const userSchema = object({
        display_name: string([minLength(2)]),
        email: string([v_email()])
    });

    const formData = Object.fromEntries(await request.formData());

    const result = safeParse(userSchema, formData);
    if (!result.success) {
        throw error(405, result.error.message);
    }

    const { display_name, email } = result.data;

    const { error: userError } = await supabase.auth.updateUser({
        email,
        data: { full_name: display_name }
    });
    if (userError) {
        throw error(400, userError.message);
    }

    const { data, error: profilesError } = await supabase.from('profiles')
        .update({ display_name })
        .eq('id', session.user.id)
        .select('*')
        .single();

    if (profilesError) {
        if (profilesError.code !== 'PGRST116') {
            throw error(400, profilesError.message);
        }
    }

    if (!data) {
        throw error(500, 'Database Error!');
    }

    const { error: refreshError } = await supabase.auth.refreshSession(session);
    if (refreshError) {
        throw error(500, 'Session Error!');
    }

    if (dev) {
        console.log('Update current user', data);
    }

    return json(data);

}) satisfies RequestHandler;
