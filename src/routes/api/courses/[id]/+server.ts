import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

// READ
export const GET = (async ({ locals: { supabase }, params }) => {

    const { id: short_id } = params;

    const { error: _error, data } = await supabase.from('courses')
        .select('*')
        .eq('short_id', short_id)
        .single();

    if (_error) {

        // not found using single()
        if (_error.code === 'PGRST116') {
            throw error(404, 'Not Found');
        }
        throw error(400, _error.message);
    }

    if (!data) {
        throw error(404, 'Not Found');
    }

    if (dev) {
        console.log('Select a course', data);
    }

    // TODO - add cache headers

    return json(data);

}) satisfies RequestHandler;
