import { fail, type Actions } from "@sveltejs/kit";

export const actions = {

    create: async ({ request, fetch }) => {

        const response = await fetch(`/api/courses`, {
            method: 'POST',
            body: await request.formData()
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            return fail(response.status, data);
        }
        return data as AuthorType;
    }

} satisfies Actions;
