<script lang="ts">
	import Card from '@components/elements/card.svelte';

	export let course: CourseType;
</script>

<Card class={$$restProps.class}>
	<h1 class="text-2xl underline hover:no-underline">
		<a href={`/course/${course.short_id}/${course.slug}`}>{course.name}</a>
	</h1>
	{course.description}
</Card>
