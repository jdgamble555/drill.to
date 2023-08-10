<script lang="ts">
	import AppleIcon from './icons/apple-icon.svelte';
</script>

<button
	class="bg-white text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded border flex"
	type="button"
	on:click
>
	<AppleIcon class="h-6 w-6 mr-3" />
	Sign in with Apple
</button>
