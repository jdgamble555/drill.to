<script lang="ts">
	import { useDarkMode } from '$lib/stores';

	const darkMode = useDarkMode();

	export let href: string;
	export let bgDark = false;
	export let icon = '';
</script>

<a	class:text-white={bgDark && !$darkMode}
	class:text-black={!bgDark && !$darkMode}
	{href}
>
	{#if icon}
		<span class="flex items-center gap-3">
			<i class="material-icons text-lg dark:text-sky-300">{icon}</i>
			<span class="hover:underline"><slot /></span>
		</span>
	{:else}
		<span class="hover:underline"><slot /></span>
	{/if}
</a>
