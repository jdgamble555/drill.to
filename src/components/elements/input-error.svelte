<script lang="ts">
	import FormError from './form-error.svelte';

	export let input: HTMLInputElement | HTMLTextAreaElement;
	export let name: string;
	export let type: 'text' | 'email' | 'password' | 'datetime-local' | 'datetime' = 'text';

	const capitalName = name.replace(/^\w/, (c) => c.toUpperCase());
</script>

{#if input?.validity?.tooShort}
	<FormError error={`${capitalName} must containt at least ${input.minLength} character(s)`} />
{/if}
{#if input?.validity?.valueMissing}
	<FormError error={`${capitalName} is required`} />
{/if}
{#if input?.validity?.typeMismatch}
	<FormError error={`${capitalName} must be a valid ${type}`} />
{/if}