<script lang="ts">
	import { useFormControl } from './use-form-control';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	const { form } = useFormControl();

	export let disableIfInvalid = false;
	export let disableIfPristine = false;

	let disabled: boolean;
	$: disabled =
		$$restProps.disabled ||
		(disableIfInvalid && !$form.isValid) ||
		(disableIfPristine && $form.isPristine);
</script>

<button
	on:click
	{disabled}
	{type}
	formaction={$$restProps.formaction}
	class="{$$restProps.class || ''}
	 rounded-md bg-slate-950 px-3
	py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800
	disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-slate-950
	dark:bg-sky-700 dark:hover:bg-sky-800 dark:disabled:hover:bg-sky-700"
>
	<slot />
</button>