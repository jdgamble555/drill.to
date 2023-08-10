import type { PageServerLoad } from './$types';
import { redirect, type Actions, fail, error } from '@sveltejs/kit';

export const load = (async ({ locals: { getSession }, fetch }) => {

  const session = await getSession();
  if (!session) {
    throw redirect(303, '/login');
  }

  const response = await fetch('/api/users/me');
  const data = await response.json();
  if (!response.ok) {
    throw error(400, data.message);
  }

  return {
    profile: data as AuthorType,
    user: session.user
  };

}) satisfies PageServerLoad;

export const actions = {

  default: async ({ fetch, request }) => {

    const response = await fetch(`/api/users/me`, {
      method: 'PUT',
      body: await request.formData()
    });

    const data = await response.json();

    if (!response.ok) {
      return fail(500, { error: data.message });
    }

    return data as AuthorType;
  }

} satisfies Actions;