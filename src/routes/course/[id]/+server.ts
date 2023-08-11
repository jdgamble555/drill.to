import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, fetch }) => {

    const { id } = params;

    const res = await fetch(`/api/courses/${id}`);

    if (!res.ok) {
        const message = await res.json();
        throw error(res.status, message);
    }

    const data = await res.json() as CourseType;

    // always refresh
    throw redirect(301, `/course/${data.short_id}/${data.slug}`);

}) satisfies RequestHandler;