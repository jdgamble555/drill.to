<script lang="ts">
	import { page } from '$app/stores';
	import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_API_URL } from '$env/static/public';
	import Input from '@components/elements/input.svelte';
	import MagicButton from './buttons/magic-button.svelte';
	import Button from '@components/elements/button.svelte';
	import { useToast } from '@components/elements/toast/use-toast';
	import { dev } from '$app/environment';
	import { useFormControl } from '@components/elements/use-form-control';

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_API_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: null
	});

	const toast = useToast();

	export let { node } = useFormControl();

	let showInput = false;

	const loginWithMagicLink = async (e: Event) => {
		const form = e.target as HTMLFormElement;
		const { email } = Object.fromEntries(new FormData(form));

		if (typeof email !== 'string') {
			return;
		}

		const returnPath = $page.url.searchParams.get('returnPath') || '/dashboard';

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: $page.url.origin + `/auth/callback?returnPath=${returnPath}`
			}
		});
		if (error) {
			console.error(error);
			return;
		}
		toast.open('Your email link has been sent!');
		form.reset();
		showInput = false;
		if (dev) {
			console.log('http://localhost:54324/');
		}
	};
</script>

<MagicButton on:click={() => (showInput = true)} />

{#if showInput}
	<form bind:this={$node} on:submit|preventDefault={loginWithMagicLink}>
		<Input name="email" type="email" label="Email" required />
		<Button class="mt-5" type="submit" disableIfInvalid disableIfPristine>Send Link</Button>
	</form>
{/if}
