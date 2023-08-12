<script lang="ts">
	import { useFormControl } from './use-form-control';

	type T = $$Generic<Record<string, unknown> | undefined>;
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let useEnhance: SubmitFunction<T> | undefined = undefined;
	export let value: Optional<Record<string, FormDataEntryValue>> = null;
	export let { node, form, setValue } = useFormControl();

	if (value) setValue(value);
</script>

{#if useEnhance}
	<form method="POST" on:input on:submit bind:this={$node} use:enhance={useEnhance}>
		<slot />
	</form>
{:else}
	<form method="POST" on:input on:submit bind:this={$node}>
		<slot />
	</form>
{/if}
