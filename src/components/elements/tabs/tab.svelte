<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const tabs = getContext<Writable<{ active: string; panels: string[] }>>('tabs');

	let name: string | undefined;
	$: name;

	tabs.update((_tabs) => {
		name = _tabs.panels.shift();
		return _tabs;
	});
</script>

{#if name === $tabs.active}
	<slot />
{/if}
