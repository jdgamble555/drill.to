<script lang="ts">
	import { minLength } from 'valibot';
	import { applyAction } from '$app/forms';
	import Button from '@components/elements/button.svelte';
	import Card from '@components/elements/card.svelte';
	import Form from '@components/elements/form.svelte';
	import Input from '@components/elements/input.svelte';
	import Textarea from '@components/elements/textarea.svelte';
	import { useToast } from '@components/elements/toast/use-toast';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toast = useToast();

	const createCourse: SubmitFunction<CourseType> = async () => {
		return async ({ result }) => {
			switch (result.type) {
				case 'failure':
					applyAction(result);
					console.log(result);
					toast.error(result.data?.message);
					break;
				case 'error':
					toast.error(result.error, 5000);
					console.error(result.error);
					break;
				case 'success':
					if (result.data?.name) {
						toast.open(`Course Successfully Created: ${result.data.id}`);
					}
			}
		};
	};
</script>

<Card>
	<h1 class="text-4xl mb-10">Create a Course</h1>
	<Form action="/course/new?/create" useEnhance={createCourse}>
		<Input name="name" label="Name" minlength={3} required />
		<Textarea name="description" label="Description" minlength={4} required />
		<Button type="submit" class="mt-5" disableIfInvalid disableIfPristine>Create</Button>
	</Form>
</Card>
