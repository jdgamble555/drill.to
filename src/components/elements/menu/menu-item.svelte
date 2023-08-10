<script lang="ts">
	import { useMenu } from './use-menu';
	export let href = '';

	export let type: 'href' | 'button' = 'href';

	const menu = useMenu();
</script>

{#if type === 'href'}
	<a {href} on:click on:click={menu.close} class={$$restProps.class + ' block'}>
		<slot />
	</a>
{:else}
	<button
		type="button"
		on:click
		on:click={menu.close}
		class={$$restProps.class + ' block w-full text-left'}
	>
		<slot />
	</button>
{/if}
