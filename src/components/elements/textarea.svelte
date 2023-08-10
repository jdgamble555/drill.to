<script lang="ts">
	import InputError from './input-error.svelte';
	import { useFormControl } from './use-form-control';

	export let label: Optional<string> = null;
	export let name: string;
	export let placeholder: Optional<string> = null;
	export let required = false;
	export let value: Optional<FormDataEntryValue> = undefined;
	export let rows = 4;

	let textarea: HTMLTextAreaElement;

	let touched = false;

	const { form } = useFormControl();

	value = value ?? $form.value?.[name];

	const onInput = () => (touched = true);

	const { minlength, maxlength } = $$restProps;

	const inputClasses /*tw*/ =
		'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm disabled:text-gray-400 disabled:cursor-not-allowed';
	const focusClasses /*tw*/ = 'focus:border-2 focus:border-blue-500 focus:outline-none';
	let invalidClasses: string = '';
	$: {
		if (touched) {
			invalidClasses /*tw*/ =
				'invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500';
		}
	}
	const darkClasses /*tw*/ =
		'dark:bg-neutral-500 dark:text-white dark:placeholder-neutral-400 dark:disabled:text-opacity-50 dark:disabled:cursor-not-allowed';
	let allClasses: string;
	$: allClasses = [$$restProps.class, inputClasses, invalidClasses, focusClasses, darkClasses].join(
		' '
	);
	const labelClasses /*tw*/ = 'my-2 block text-sm font-medium leading-6';
</script>

<div class="my-2">
	{#if label}
		<label for={name} class={labelClasses}>{label}</label>
	{/if}
	<textarea
		bind:this={textarea}
		on:input={onInput}
		on:input
		bind:value
		{minlength}
		{maxlength}
		{rows}
		{name}
		id={name}
		class={allClasses}
		{placeholder}
		{required}
		disabled={$$restProps.disabled}
	/>
	{#if touched}
		{#key value}
			<InputError input={textarea} name={label || name} />
		{/key}
	{/if}
</div>
