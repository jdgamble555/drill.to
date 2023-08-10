<script lang="ts">
	
	import HomeIcon from '@components/elements/icons/home-icon.svelte';
	import Link from '@components/elements/link.svelte';

</script>

<div class="flex items-center gap-3 my-3">
	<Link href="/">
		<div class="flex gap-4">
			<HomeIcon class="w-4 h-4 mt-1 text-red-500" />
			<span>Home</span>
		</div>
	</Link>
	<!--{#if $bc.length}
		{#each $bc as crumb}
			<div>&gt;</div>
			<div>{crumb}</div>
		{/each}
	{/if}-->
</div>
