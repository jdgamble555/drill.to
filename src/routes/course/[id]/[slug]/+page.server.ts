import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {

    const { id, slug } = params;

    // get post from endpoint
    const res = await fetch(`/api/courses/${id}`);

    if (!res.ok) {
        const message = await res.json();
        throw error(res.status, message);
    }

    const data: CourseType = await res.json();

    // check for valid slug or redirect
    if (data.slug !== slug) {
        throw redirect(301, `/p/${data.short_id}/${data.slug}`);
    }

    return {
        course: data
    };

}) satisfies PageServerLoad;