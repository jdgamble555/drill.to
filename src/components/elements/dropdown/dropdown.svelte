<script lang="ts">
	import ChevronDownIcon from '@components/elements/icons/chevron-down-icon.svelte';
	import MenuButton from '@components/elements/menu/menu-button.svelte';
	import MenuItem from '@components/elements/menu/menu-item.svelte';
	import MenuContainer from '@components/elements/menu/menu-container.svelte';
	import Menu from '@components/elements/menu/menu.svelte';

	export let selected: string;
	export let options: string[];
	export let disabled = false;

	$: selected;

	let disabledClasses: string;
	$: disabledClasses /*tw*/ = disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-900';

	const menuItemClasses /*tw*/ = 'px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-200';
	const menuClasses /*tw*/ =
		'right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none';
	const menuButtonClasses /*tw*/ =
		'inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
</script>

<MenuContainer class="ml-3">
	<MenuButton class={menuButtonClasses + ' ' + disabledClasses} {disabled}>
		{selected}
		<ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" />
	</MenuButton>
	<Menu class={menuClasses}>
		{#each options as option}
			<MenuItem on:click={() => (selected = option)} class={menuItemClasses}>
				{option}
			</MenuItem>
		{/each}
	</Menu>
</MenuContainer>