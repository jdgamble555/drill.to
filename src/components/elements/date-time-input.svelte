<script lang="ts">
	import Input from '@components/elements/input.svelte';

	export let value: string | null;
	export let name: string;
	export let label: string;

	const inputDateToValue = (date: string) =>
		new Date(date).toISOString().replace('.000Z', '+00:00');

	const valueToInputDate = (date: string) => {
		const utcDate = new Date(date);
		const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
		const datetimeLocalValue = localDate.toISOString().slice(0, 16);
		return datetimeLocalValue;
	};

	let inputDate = valueToInputDate(value as string);

	// create set values to avoid infinite dependencies
	const setValue = (date: string) => (value = inputDateToValue(date));
	const setInput = (date: string) => (inputDate = valueToInputDate(date));

	$: setValue(inputDate);
	$: setInput(value as string);
</script>

<Input
	parentClass={$$restProps.class || ''}
	bind:value={inputDate}
	{label}
	name={'tmp_' + name}
	type="datetime-local"
/>
<input type="hidden" {name} {value} />
