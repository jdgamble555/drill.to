<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	export let active: string;
	export let panels: string[];

	const tabs = writable<{ active: string; panels: string[] }>({ active, panels: [...panels] });
	setContext('tabs', tabs);
</script>

<div class="flex justify-center {$$restProps.class || ''}">
	<ul
		class="flex flex-grow text-sm text-center text-gray-500 font-bold"
	>
		{#each panels as panel}
			<li class="mr-2 w-full">
				<button
					on:click={() => {
						tabs.update((_tabs) => {
							_tabs.active = panel;
							return _tabs;
						});
					}}
					class="p-4 text-red-500 dark:text-white rounded-t-lg w-full {$tabs.active === panel
						? 'bg-gray-100 dark:bg-neutral-700 dark:border-neutral-500'
						: ''}"
				>
					{panel}
				</button>
				{#if $tabs.active === panel}
					<div transition:fly|local class="border-b border-gray-200" />
				{/if}
			</li>
		{/each}
	</ul>
</div>
<slot />
