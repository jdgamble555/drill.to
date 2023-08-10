<script lang="ts">
	import { useFormControl } from './use-form-control';

	type T = $$Generic<Record<string, unknown> | undefined>;
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let action: string | undefined = undefined;
	export let useEnhance: SubmitFunction<T> = () => {};
	export let value: Optional<Record<string, FormDataEntryValue>> = null;
	export let { node, form, setValue } = useFormControl();

	if (value) setValue(value);
</script>

<form method="POST" on:submit action={action} bind:this={$node} use:enhance={useEnhance} on:input>
	<slot />
</form>
