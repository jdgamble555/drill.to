<script lang="ts">
	import { page } from '$app/stores';
	import Card from '@components/elements/card.svelte';
	import Hr from '@components/elements/hr.svelte';
</script>

<Card class="flex flex-col space-y-4">
	<h1 class="text-2xl">It seems there has been an error, sorry about that.</h1>
	{#if $page?.error}
		{#if $page?.status}
			<p><span class="font-bold">Status: </span>{$page?.status}</p>
		{/if}
		{#if $page?.error?.message}
			<p><span class="font-bold">Error: </span>{$page?.error?.message}</p>
		{/if}
		<Hr />
		<div class="mt-5">
			Try to <a class="underline" href="/login">login</a> again, or choose a different login method!
		</div>
	{/if}
</Card>
