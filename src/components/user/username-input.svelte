<script lang="ts">
	import { deserialize } from '$app/forms';
	import { page } from '$app/stores';
	import { useDebounce } from '$lib/use-debounce';
	import Input from '@components/elements/input.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import FormError from '@components/elements/form-error.svelte';

	export let value: Optional<string> = '';
	const initialValue = value;

	let touched: boolean;

	let _input: HTMLInputElement;

	let errorMsg = '';

	const debounce = useDebounce(async () => {
		if (initialValue === value) {
			_input.setCustomValidity('');
			return;
		}
		if (value) {
			const formData = new FormData();
			formData.append('username', value);

			const response = await fetch(`${$page.url.origin}/username?/valid`, {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			switch (result.type) {
				case 'error':
					errorMsg = result.error.message;
					break;
				case 'failure':
					_input.setCustomValidity('');
					break;
				case 'success':
					_input.setCustomValidity('usernameTaken');
			}
		}
	}, 500);
</script>

<Input
	bind:input={_input}
	name="username"
	label="Username"
	on:input={debounce}
	bind:value
	bind:touched
	minlength={3}
	maxlength={15}
	required
/>

{#if touched && value && value?.length > 2}
	{#if errorMsg}
		<FormError error={errorMsg} />
	{:else if _input?.validationMessage === 'usernameTaken'}
		<FormError error={`Username is taken!`} />
	{:else}
		<p class="mt-2 text-sm font-bold text-green-600">Username is available!</p>
	{/if}
{/if}
