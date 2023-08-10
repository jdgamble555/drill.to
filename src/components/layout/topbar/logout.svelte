<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { useAuth } from '$lib/supabase/auth';
	import type { SubmitFunction } from '@sveltejs/kit';

	const auth = useAuth();

	const registerAction: SubmitFunction = () => {
		auth.set({ loading: true, data: null });
		return async ({ result }) => {
			auth.setSession(null);
			if (result.type === 'redirect') {
				applyAction(result);
			}
		};
	};
</script>

<div class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-200">
	<form method="POST" action="/login?/signout" use:enhance={registerAction}>
		<button class="w-full text-left">Logout</button>
	</form>
</div>
