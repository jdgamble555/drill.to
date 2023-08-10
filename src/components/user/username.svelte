<script lang="ts">
	import Button from '@components/elements/button.svelte';
	import Card from '@components/elements/card.svelte';
	import UsernameInput from './username-input.svelte';
	import { applyAction } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { useToast } from '@components/elements/toast/use-toast';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Form from '@components/elements/form.svelte';

	const toast = useToast();

	const updateUsername: SubmitFunction<AuthorType> = async () => {
		return async ({ result }) => {
			switch (result.type) {
				case 'failure':
					applyAction(result);
					toast.error(result.data?.error);
					break;
				case 'error':
					toast.error(result.error, 5000);
					console.error(result.error);
					break;
				case 'success':
					if (result.data?.username) {
						toast.open(`Username successfully updated to "${result.data.username}"`);
						const returnPath = $page.url.searchParams.get('returnPath') || 'dashboard';
						goto(returnPath);
					}
			}
		};
	};
</script>

<Card class="mb-5 p-10">
	<h1 class="mb-5 text-4xl">Create a Username</h1>

	<Form action="/username?/update" useEnhance={updateUsername}>
		<div class="mb-5 max-w-sm">
			<UsernameInput />
		</div>
		<Button type="submit" disableIfPristine disableIfInvalid>Create</Button>
	</Form>
</Card>
