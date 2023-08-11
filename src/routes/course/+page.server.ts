import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {

    const courses = fetch('/api/courses')
        .then(async response => {
            const body = await response.json();
            if (!response.ok) {
                throw error(400, body);
            }
            return body as { count: number, data: CourseType[] };
        });

    return {
        courses
    };
}) satisfies PageServerLoad;