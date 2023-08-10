<script lang="ts">
	import Input from '@components/elements/input.svelte';
	import { applyAction } from '$app/forms';
	import Button from '@components/elements/button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { useToast } from '@components/elements/toast/use-toast';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Card from '@components/elements/card.svelte';
	import UsernameInput from '@components/user/username-input.svelte';
	import Form from '@components/elements/form.svelte';

	export let user: UserType;
	export let profile: AuthorType;

	const toast = useToast();

	const updateName: SubmitFunction<AuthorType> = () => {
		return async ({ result }) => {
			switch (result.type) {
				case 'error':
					applyAction(result);
					toast.error(result.error);
					break;
				case 'failure':
					applyAction(result);
					toast.error(result.data?.error);
					break;
				case 'success':
					await invalidateAll();
					toast.open('Profile updated successfully!');
			}
		};
	};
</script>

<Card class="mb-5 p-10">
	<h1 class="mb-5 text-4xl">Profile Settings</h1>
	<Form action="/settings" useEnhance={updateName}>
		<Input
			label="Name"
			name="display_name"
			minlength={2}
			value={user.user_metadata.full_name}
			required
		/>
		<Input label="Email" name="email" value={user.email} required type="email" />
		<UsernameInput value={profile.username} />
		<Button type="submit" class="mt-3" disabledIfInvalid disableIfPristine>Save</Button>
	</Form>
</Card>

