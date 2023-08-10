<script lang="ts">
	import MoonIconSolid from './../../elements/icons/moon-icon-solid.svelte';
	import { useDarkMode } from '$lib/stores';
	import MoonIcon from '@components/elements/icons/moon-icon.svelte';
	import SunIcon from '@components/elements/icons/sun-icon.svelte';
	import { fly } from 'svelte/transition';
	import SunIconSolid from '@components/elements/icons/sun-icon-solid.svelte';

	const darkMode = useDarkMode();
</script>

<button type="button" class="text-white" on:click={() => darkMode.update((u) => !u)}>
	{#if $darkMode}
		<div in:fly={{ duration: 4000 }} class="group">
			<SunIcon class="mt-0.5 w-6 h-6 stroke-2 text-yellow-200 block group-hover:hidden" />
			<SunIconSolid class="mt-0.5 w-6 h-6 stroke-2 text-yellow-200 hidden group-hover:block" />
		</div>
	{:else}
		<div in:fly={{ duration: 4000 }} class="group">
			<MoonIcon class="mt-0.5 w-6 h-6 stroke-2 text-gray-200 block group-hover:hidden" />
			<MoonIconSolid class="mt-0.5 w-6 h-6 stroke-2 text-gray-200 hidden group-hover:block" />
		</div>
	{/if}
</button>
