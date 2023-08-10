<script lang="ts">
	import LoginWithGoogle from './login-with-google.svelte';
	import LoginWithApple from './login-with-apple.svelte';
	import LoginWithMagicLink from './login-with-magic-link.svelte';
	import Card from '@components/elements/card.svelte';
</script>

<Card>
	<div class="flex flex-col items-center">
		<div class="mt-5 border-gray-200 px-4 py-5 container place-items-center grid gap-y-6">
			<h2 class="text-3xl text-center">Passwordless Login</h2>
			<LoginWithGoogle />
			<LoginWithApple />
			<LoginWithMagicLink />
		</div>
	</div>
</Card>
