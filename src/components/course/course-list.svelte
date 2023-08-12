<script lang="ts">
	import Course from '@components/course/course.svelte';
	export let courses: CourseType[];
	//export let count: number;
</script>

{#if courses.length}
	<ul class="list-disc">
		{#each courses as course}
			<Course class="mb-5" {course} />
		{/each}
	</ul>
{:else}
	<p>No Courses Yet!</p>
{/if}
