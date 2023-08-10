<script lang="ts">
	import Toolbar from '@components/elements/toolbar.svelte';
	import DarkModeButton from './dark-mode-button.svelte';
	import IconTitle from './icon-title.svelte';
	import LoginMenu from './login-menu.svelte';
</script>

<Toolbar>
	<IconTitle />
	<div class="flex gap-5 items-center justify-between">
		<DarkModeButton />
		<LoginMenu />
	</div>
</Toolbar>
