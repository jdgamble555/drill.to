<script lang="ts">
	import { page } from '$app/stores';
	import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
	import GoogleButton from './buttons/google-button.svelte';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_API_URL } from '$env/static/public';
	import AppleButton from './buttons/apple-button.svelte';

	export let provider: 'apple' | 'google';

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_API_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: null
	});

	const loginWithProvider = async () => {
		const returnPath = $page.url.searchParams.get('returnPath') || '/dashboard';

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: $page.url.origin + `/auth/callback?returnPath=${returnPath}`
			}
		});
		if (error) {
			console.error(error);
		}
	};
</script>

{#if provider === 'google'}
	<GoogleButton on:click={loginWithProvider} />
{:else if provider === 'apple'}
	<AppleButton on:click={loginWithProvider} />
{/if}
