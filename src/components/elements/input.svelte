<script lang="ts">
	import InputError from './input-error.svelte';
	import { useFormControl } from './use-form-control';

	export let label: Optional<string> = null;
	export let type: 'text' | 'email' | 'password' | 'datetime-local' | 'datetime' = 'text';
	export let name: string;
	export let placeholder: Optional<string> = null;
	export let required = false;
	export let value: Optional<FormDataEntryValue> = '';
	export let parentClass = '';

	value = value ?? '';

	export let input: Optional<HTMLInputElement> = null;

	export let touched = false;

	const { minlength, maxlength } = $$restProps;

	const { form } = useFormControl();

	value = value ?? $form.value?.[name];

	// https://stackoverflow.com/a/57393751/271450
	const onInput = (e: Event) => {
		touched = true;
		const _value = (e.target as HTMLFormElement).value;
		value = type.match(/^(number|range)$/) ? +_value : _value;
	};

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

<div class="{parentClass} my-2">
	{#if label}
		<label for={name} class={labelClasses}>{label}</label>
	{/if}
	<input
		bind:this={input}
		on:input={onInput}
		on:input
		{minlength}
		{maxlength}
		width={$$restProps.width}
		{value}
		{type}
		{name}
		id={name}
		class={allClasses}
		{placeholder}
		{required}
		disabled={$$restProps.disabled}
	/>
	{#if touched}
		{#key value}
			<InputError {input} name={label || name} {type} />
		{/key}
	{/if}
</div>
