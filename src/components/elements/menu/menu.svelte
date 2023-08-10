<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/click-outside';
	import { useMenu } from './use-menu';

	const menu = useMenu();

	// TODO - role, tabindex
</script>

{#if $menu.isOpen}
	<div
		class={$$restProps.class + ' absolute z-10'}
		transition:fade={{ duration: 100 }}
		use:clickOutside={$menu.ref}
		on:clickOutside={menu.close}
	>
		<slot />
	</div>
{/if}
