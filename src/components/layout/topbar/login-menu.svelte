<script lang="ts">
	import { useAuth } from '$lib/supabase/auth';
	import Link from '@components/elements/link.svelte';
	import Loader from '@components/elements/loader.svelte';
	import UserMenu from './user-menu.svelte';

	const auth = useAuth();
</script>

<div>
	{#if $auth.loading}
		<Loader />
	{:else if !$auth.data}
		<Link href="/login" bgDark>Login</Link>
	{:else}
		<UserMenu />
	{/if}
</div>
