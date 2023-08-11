import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { minLength, object, string, safeParse } from 'valibot';

// create a course
export const POST = (async ({ locals: { supabase, getSession }, request }) => {

    const session = await getSession();

    if (!session) {
        throw redirect(303, '/login');
    }

    const courseSchema = object({
        name: string([minLength(3)]),
        description: string([minLength(4)])
    });

    const formData = Object.fromEntries(await request.formData());

    const result = safeParse(courseSchema, formData);
    if (!result.success) {
        throw error(405, result.error.message);
    }

    const { name, description } = result.data;

    const { error: _error, data } = await supabase.from('courses')
        .insert({ name, description })
        .select('*')
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

    if (dev) {
        console.log('Create a new course', data);
    }

    return json(data);

}) satisfies RequestHandler;

// get all courses
export const GET = (async ({ locals: { supabase }, url }) => {

    // add page
    const page = Number(url.searchParams.get('page')) || 1;
    const items = Number(url.searchParams.get('items')) || 5;

    const { data, error: _error, count } = await supabase
        .from('courses')
        .select('*', { count: 'exact' })
        .range(page * items - items, page * items - 1);


    if (_error) {
        console.log(_error)
        throw error(400, _error.message);
    }

    if (!data) {
        console.log('sss')
        throw error(404, 'Not Found');
    }

    if (dev) {
        console.log('Select all courses', data);
    }

    return json({
        data,
        count
    });

}) satisfies RequestHandler;