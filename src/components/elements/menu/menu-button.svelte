<script lang="ts">
	import { useMenu } from './use-menu';

	const menu = useMenu();

	export let disabled = false;
</script>

<button
	bind:this={$menu.ref}
	type={$$restProps.type || 'button'}
	on:click={menu.toggle}
	class={$$restProps.class}
	{disabled}
>
	<slot />
</button>

<!--
TODO
aria-expanded="false"
aria-haspopup="true"
aria-expanded="true"
aria-haspopup="true"
-->
