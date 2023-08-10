<script lang="ts">
	import { useDarkMode } from '$lib/stores';

	const darkMode = useDarkMode();
</script>

<div class:dark={$darkMode}>
	<main class="dark:bg-neutral-800 dark:text-white h-full min-h-screen">
		<slot />
	</main>
</div>
